import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/utils/mongodb';
import stripeLib from 'stripe';
import { ObjectId } from 'mongodb';
import { decrementProductStock } from '@/app/lib/product-stock';

const stripe = stripeLib(process.env.STRIPE_SECRET_KEY);
const ORDERS_COLLECTION = 'orders';

export async function GET() {
  return NextResponse.json({ 
    message: 'Stripe webhook endpoint is working',
    timestamp: new Date().toISOString()
  });
}

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        
        console.log('Processing checkout.session.completed for session:', session.id);
        console.log('Session metadata:', session.metadata);
        console.log('Session amount:', session.amount_total);
        
        // Update existing order or create new one
        const orderId = session.metadata?.orderId;
        
        if (orderId) {
          console.log('Updating existing order with ID:', orderId);
          // Only update and decrement if order is still pending (avoid double-decrement on webhook retries)
          const order = await db.collection(ORDERS_COLLECTION).findOne({ _id: new ObjectId(orderId) });
          const wasPending = order?.status === 'pending' || order?.paymentStatus === 'pending';
          const updateResult = await db.collection(ORDERS_COLLECTION).updateOne(
            { _id: new ObjectId(orderId) },
            { 
              $set: {
                status: 'paid',
                paymentStatus: 'completed',
                stripeSessionId: session.id,
                amount: session.amount_total / 100,
                updatedAt: new Date()
              }
            }
          );
          console.log('Order update result:', updateResult);

          if (wasPending && (updateResult.modifiedCount === 1 || updateResult.matchedCount === 1)) {
            const products = order?.products || [];
            for (const item of products) {
              const id = item.id ?? item._id?.toString?.() ?? item.product_id;
              const qty = Math.max(1, Number(item.quantity) || 1);
              if (id) {
                try {
                  await decrementProductStock(db, id, qty);
                } catch (err) {
                  console.error('Stock decrement failed for product', id, err);
                }
              }
            }
          }
        } else {
          console.log('Creating new order for session:', session.id);
          // Create new order (fallback)
          const order = {
            stripeSessionId: session.id,
            userId: session.metadata?.userId,
            userEmail: session.customer_email || session.metadata?.userEmail,
            userName: session.metadata?.userName,
            amount: session.amount_total / 100, // Convert from cents
            currency: session.currency,
            status: 'paid',
            paymentStatus: 'completed',
            lineItems: session.line_items?.data || [],
            products: session.metadata?.products ? JSON.parse(session.metadata.products) : [],
            createdAt: new Date(),
            updatedAt: new Date()
          };

          const insertResult = await db.collection(ORDERS_COLLECTION).insertOne(order);
          console.log('Order created with ID:', insertResult.insertedId);
        }
        break;

      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object;
        const orderId = paymentIntent.metadata?.orderId;
        if (orderId) {
          const order = await db.collection(ORDERS_COLLECTION).findOne({ _id: new ObjectId(orderId) });
          const wasPending = order?.status === 'pending' || order?.paymentStatus === 'pending';
          if (wasPending) {
            await db.collection(ORDERS_COLLECTION).updateOne(
              { _id: new ObjectId(orderId) },
              { $set: { status: 'paid', paymentStatus: 'completed', stripePaymentIntentId: paymentIntent.id, amount: paymentIntent.amount / 100, updatedAt: new Date() } }
            );
            const products = order?.products || [];
            for (const item of products) {
              const id = item.id ?? item._id?.toString?.() ?? item.product_id;
              const qty = Math.max(1, Number(item.quantity) || 1);
              if (id) {
                try {
                  await decrementProductStock(db, id, qty);
                } catch (err) {
                  console.error('Stock decrement failed for product', id, err);
                }
              }
            }
          }
        }
        break;
      }

      case 'payment_intent.payment_failed':
        console.log('Payment failed:', event.data.object.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
} 