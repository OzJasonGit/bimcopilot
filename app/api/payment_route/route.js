// pages/api/payment_route/route.js

import { NextResponse } from 'next/server';
import stripeLib from 'stripe';
import { getCurrentUser } from '@/app/utils/auth';
import { connectToDatabase } from '@/app/utils/mongodb';

const stripe = stripeLib(process.env.STRIPE_SECRET_KEY);
const ORDERS_COLLECTION = 'orders';

export async function POST(req) {
  try {
    // Check authentication
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { products, currency } = await req.json();
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    const lineItems = products.map(product => ({
      price_data: {
        currency,
        product_data: {
          name: product.title,
          images: [product.image || ''], // Handle cases where product might not have an image
        },
        unit_amount: Math.round(product.price * 100), // Convert price to cents
      },
      quantity: product.quantity || 1, // Default to 1 if quantity is not provided
    }));

    // Calculate total amount
    const totalAmount = products.reduce((sum, product) => sum + (product.price * (product.quantity || 1)), 0);

    // Create initial order record
    const db = await connectToDatabase();
    const order = {
      userId: user.id.toString(),
      userEmail: user.email,
      userName: user.name,
      products: products,
      amount: totalAmount,
      currency: currency,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    const orderResult = await db.collection(ORDERS_COLLECTION).insertOne(order);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      
      mode: 'payment',
      success_url: `${origin}/cart`, 
      cancel_url: `${origin}/cart`, 
      // Add customer email for better tracking
      customer_email: user.email,
      // Add metadata for user tracking
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

    // Update order with Stripe session ID
    await db.collection(ORDERS_COLLECTION).updateOne(
      { _id: orderResult.insertedId },
      { $set: { stripeSessionId: session.id } }
    );

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error('Error creating Stripe session:', err); 
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export const middleware = async (req, res) => {
  return { next: true };
};
