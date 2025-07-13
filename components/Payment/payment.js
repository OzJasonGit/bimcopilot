// components/payment.js
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const handleCheckout = async ({ amount, currency = 'USD', product, products }) => {
  try {
    // Handle both single product and multiple products
    let requestBody;
    
    if (products && Array.isArray(products)) {
      // Multiple products case
      requestBody = { products, currency };
    } else if (product) {
      // Single product case - convert to products array format
      requestBody = {
        products: [{
          title: product.title,
          price: amount / 100, // Convert from cents back to dollars
          image: product.image,
          quantity: 1
        }],
        currency
      };
    } else {
      throw new Error('No product or products provided');
    }

    const response = await fetch('/api/payment_route', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include', // Include cookies for authentication
      body: JSON.stringify(requestBody),
    });

    if (response.status === 401) {
      throw new Error('Authentication required');
    }

    if (response.ok) {
      const session = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
      if (error) {
        console.error('Stripe redirect error:', error.message);
        throw new Error('Payment redirect failed');
      }
    } else {
      const err = await response.text();
      console.error('Failed to create Stripe session:', err);
      throw new Error('Failed to create payment session');
    }
  } catch (error) {
    console.error('handleCheckout error:', error);
    throw error; // Re-throw to let calling component handle it
  }
};

export default handleCheckout;
