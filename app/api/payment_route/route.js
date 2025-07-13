// pages/api/payment_route/route.js

import { NextResponse } from 'next/server';
import stripeLib from 'stripe';

const stripe = stripeLib(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      
      mode: 'payment',
      success_url: `${origin}/cart`, 
      cancel_url: `${origin}/cart`, 
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error('Error creating Stripe session:', err); 
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export const middleware = async (req, res) => {
  return { next: true };
};
