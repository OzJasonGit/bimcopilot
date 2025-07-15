// pages/api/payment_route/route.js

import { NextResponse } from 'next/server';
import stripeLib from 'stripe';
import { getCurrentUser } from '@/app/utils/auth';
import { connectToDatabase } from '@/app/utils/mongodb';

const stripe = stripeLib(process.env.STRIPE_SECRET_KEY);
const ORDERS_COLLECTION = 'orders';

export async function POST(req) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { products, currency, paymentMethod } = await req.json();
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    const lineItems = products.map(product => ({
      price_data: {
        currency,
        product_data: {
          name: product.title,
          images: [product.image || ''],
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: product.quantity || 1,
    }));

    const totalAmount = products.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0);

    const db = await connectToDatabase();
    const order = {
      userId: user.id.toString(),
      userEmail: user.email,
      userName: user.name,
      products,
      amount: totalAmount,
      currency,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod, // Store payment method
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const orderResult = await db.collection(ORDERS_COLLECTION).insertOne(order);

    // 1. Apple Pay via PaymentIntent
    if (paymentMethod === 'apple_pay') {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(totalAmount * 100),
        currency,
        payment_method_types: ['card'], // Apple Pay uses 'card' behind the scenes
        metadata: {
          userId: user.id.toString(),
          orderId: orderResult.insertedId.toString(),
        },
        receipt_email: user.email,
      });

      await db.collection(ORDERS_COLLECTION).updateOne(
        { _id: orderResult.insertedId },
        { $set: { stripePaymentIntentId: paymentIntent.id } }
      );

      return NextResponse.json({ client_secret: paymentIntent.client_secret });
    }

    // 2. Default: Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${origin}/cart`,
      cancel_url: `${origin}/cart`,
      customer_email: user.email,
      metadata: {
        userId: user.id.toString(),
        userEmail: user.email,
        userName: user.name,
        orderId: orderResult.insertedId.toString(),
        products: JSON.stringify(products.map(p => ({
          title: p.title,
          price: p.price,
          quantity: p.quantity
        })))
      }
    });

    await db.collection(ORDERS_COLLECTION).updateOne(
      { _id: orderResult.insertedId },
      { $set: { stripeSessionId: session.id } }
    );

    return NextResponse.json({ id: session.id });

  } catch (err) {
    console.error('Error creating payment:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
