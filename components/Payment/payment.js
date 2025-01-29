import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_51PO0O71Lmdm8PDfxVhohp7HTiqZXWkS6roFSohUrdguSu7kc90q5xvTplojjbu7DdXpLGBaYC2qvBem7x8pvc9jg00XyAMcFw5");


const handleCheckout = async (amount, currency) => {
  try {
    amount= 10000000;
    currency="USD"
    const response = await fetch('/api/payment_route', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount, currency }),
    });

      if (response.ok) {
        const session = await response.json();
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({ sessionId: session.id });
        if (error) {
          console.error('Stripe error:', error.message);
        }
      } else {
        console.error('Failed to create session');
      }
    } catch (error) {

    console.error('Error in handleCheckout:', error);
    console.error("strip publish key", process.env.STRIPE_PUBLISHABLE_KEY);
  }
};

export default handleCheckout;
