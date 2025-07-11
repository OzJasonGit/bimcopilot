// pages/api/payment_route/route.js

import { NextResponse } from 'next/server';
import stripeLib from 'stripe';

const stripe = stripeLib(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { amount, currency, product } = await req.json();
    const origin = req.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: product.title,
              images: [product.image], // must be a publicly accessible URL
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      
      mode: 'payment',
      success_url: `${origin}/success`, // Update success_url
      cancel_url: `${origin}/cancel`, // Update cancel_url
    });

    return NextResponse.json({ id: session.id });
  } catch (err) {
    console.error('Error creating Stripe session:', err); // Log the error to see more details
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export const middleware = async (req, res) => {
  return { next: true };
};
