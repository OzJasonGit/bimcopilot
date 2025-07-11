// components/payment.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const handleCheckout = async ({ amount, currency = 'USD', product }) => {
  try {
    const response = await fetch('/api/payment_route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, currency, product }),
    });

    if (response.ok) {
      const session = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
      if (error) {
        console.error('Stripe redirect error:', error.message);
      }
    } else {
      const err = await response.text();
      console.error('Failed to create Stripe session:', err);
    }
  } catch (error) {
    console.error('handleCheckout error:', error);
  }
};

export default handleCheckout;
