// ApplePayButton.js - Apple Pay only
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './ApplePayButton.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const ApplePayButton = ({ amount, currency = 'USD', product, products, onError }) => {
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkApplePayAvailability = async () => {
      try {
        if (!window.PaymentRequest) {
          setIsApplePayAvailable(false);
          return;
        }
        const stripe = await stripePromise;
        if (stripe) {
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
          const canMakePaymentResult = await paymentRequest.canMakePayment();
          setIsApplePayAvailable(!!canMakePaymentResult && canMakePaymentResult.applePay === true);
        }
      } catch (error) {
        setIsApplePayAvailable(false);
      }
    };
    checkApplePayAvailability();
  }, [amount, currency]);

  const handleApplePay = async () => {
    setIsLoading(true);
    try {
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
          let requestBody;
          if (products && Array.isArray(products)) {
            requestBody = { products, currency };
          } else if (product) {
            requestBody = {
              products: [{
                title: product.title,
                price: amount,
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
            credentials: 'include',
            body: JSON.stringify({
              ...requestBody,
              paymentMethod: 'apple_pay',
            }),
          });
          if (response.status === 401) {
            throw new Error('Authentication required');
          }
          if (response.ok) {
            const result = await response.json();
            if (result.client_secret) {
              const confirmResult = await stripe.confirmCardPayment(result.client_secret, {
                payment_method: event.paymentMethod.id,
              });
              if (confirmResult.error) {
                throw new Error(confirmResult.error.message);
              }
            }
            if (onError) onError('Payment successful!');
          } else {
            throw new Error('Failed to create payment session');
          }
        } catch (error) {
          if (onError) onError(error.message);
        } finally {
          setIsLoading(false);
        }
      });
      paymentRequest.on('cancel', () => setIsLoading(false));
      paymentRequest.show();
    } catch (error) {
      setIsLoading(false);
      if (onError) onError(error.message);
    }
  };

  if (!isApplePayAvailable) {
    return <button disabled style={{ background: '#ccc', color: '#666', borderRadius: 8, padding: '10px 20px', border: 'none', fontWeight: 600 }}>Apple Pay Not Available</button>;
  }

  return (
    <button onClick={handleApplePay} disabled={isLoading} style={{ background: 'black', color: 'white', borderRadius: 8, padding: '10px 20px', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
      {isLoading ? 'Processing...' : 'Pay with Apple Pay'}
    </button>
  );
};

export default ApplePayButton; 