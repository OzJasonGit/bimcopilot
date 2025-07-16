// components/GooglePayButton.js
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const GooglePayButton = ({ amount, currency = 'USD', product, products, onError }) => {
  const [canPay, setCanPay] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkGooglePay = async () => {
      const stripe = await stripePromise;
      const paymentRequest = stripe.paymentRequest({
        country: 'US',
        currency: currency.toLowerCase(),
        total: {
          label: 'Total',
          amount: Math.round(amount * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      const result = await paymentRequest.canMakePayment();
      if (result && result.googlePay) {
        setCanPay(true);
      }
    };

    checkGooglePay();
  }, [amount, currency]);

  const handleGooglePay = async () => {
    try {
      setIsLoading(true);
      const stripe = await stripePromise;

      const paymentRequest = stripe.paymentRequest({
        country: 'US',
        currency: currency.toLowerCase(),
        total: {
          label: 'Total',
          amount: Math.round(amount * 100),
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      paymentRequest.on('paymentmethod', async (event) => {
        try {
          const requestBody = product
            ? {
                products: [
                  {
                    title: product.title,
                    price: amount,
                    image: product.image,
                    quantity: 1,
                  },
                ],
                currency,
              }
            : { products, currency };

          const response = await fetch('/api/payment_route', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...requestBody, paymentMethod: 'google_pay' }),
          });

          const result = await response.json();

          if (result.client_secret) {
            const confirmResult = await stripe.confirmCardPayment(result.client_secret, {
              payment_method: event.paymentMethod.id,
            });

            if (confirmResult.error) throw new Error(confirmResult.error.message);
            event.complete('success');
          }
        } catch (error) {
          event.complete('fail');
          if (onError) onError(error.message);
        } finally {
          setIsLoading(false);
        }
      });

      await paymentRequest.show();
    } catch (error) {
      setIsLoading(false);
      if (onError) onError(error.message);
    }
  };

  if (!canPay) return null;

  return (
    <button onClick={handleGooglePay} disabled={isLoading} style={{
      backgroundColor: '#4285F4',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: 4,
      border: 'none',
      fontWeight: 'bold',
      cursor: isLoading ? 'not-allowed' : 'pointer',
    }}>
      {isLoading ? 'Processing...' : 'Pay with Google Pay'}
    </button>
  );
};

export default GooglePayButton;
