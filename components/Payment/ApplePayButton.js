// ApplePayButton.js - Apple Pay only
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import './ApplePayButton.module.css';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const ApplePayButton = ({ amount, currency = 'USD', product, products, onError }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleApplePay = async () => {
    setIsLoading(true);
    setErrorMsg('');
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
      const canMakePaymentResult = await paymentRequest.canMakePayment();
      if (!canMakePaymentResult || canMakePaymentResult.applePay !== true) {
        setIsLoading(false);
        setErrorMsg('Apple Pay is not available on this device or browser. Please use Safari on a supported device with Apple Pay set up.');
        return;
      }
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
          setErrorMsg(error.message);
          if (onError) onError(error.message);
        } finally {
          setIsLoading(false);
        }
      });
      paymentRequest.on('cancel', () => setIsLoading(false));
      paymentRequest.show();
    } catch (error) {
      setIsLoading(false);
      setErrorMsg(error.message);
      if (onError) onError(error.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <button
        onClick={handleApplePay}
        disabled={isLoading}
        style={{
          background: 'black',
          color: 'white',
          borderRadius: 8,
          padding: '0 24px',
          border: 'none',
          fontWeight: 600,
          cursor: isLoading ? 'not-allowed' : 'pointer',
          height: 44,
          minWidth: 180,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          letterSpacing: 1,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" style={{ marginRight: 8 }}>
          <g fill="white">
            <path d="M19.7 7.2c-1.1.1-2.4.8-3.1 1.7-.7.8-1.3 2.1-1.1 3.3 1.2.1 2.5-.7 3.2-1.6.7-.8 1.3-2.1 1-3.4zm-3.2-2.1c.6-.7 1.1-1.7.9-2.7-1 .1-2.1.7-2.7 1.5-.6.7-1.2 1.7-.9 2.7 1.1.1 2.1-.6 2.7-1.5zm7.2 6.7c-1.7-1.6-4.2-1.3-5.3-1.3-1.2 0-2.6.1-4.1.7-1.7.6-3.2 1.7-4.1 3.2-1.5 2.3-1.2 5.7.6 8.1.8 1.1 1.8 2.3 3.1 2.3 1.2 0 1.6-.7 3.1-.7 1.5 0 1.8.7 3.1.7 1.3 0 2.2-1.1 3-2.2.6-.9.8-1.3 1.2-2.3-3.2-1.2-3.7-5.8.7-6.8-.2-.5-.5-1-.8-1.2zm-2.2-4.2c.5-.6.8-1.4.7-2.2-.7.1-1.5.5-2 .9-.5.5-.9 1.2-.7 2 .7.1 1.5-.4 2-.7z"/>
          </g>
        </svg>
        {isLoading ? 'Processing...' : 'Pay with Apple Pay'}
      </button>
      {errorMsg && (
        <div style={{ color: '#e53e3e', background: '#fff0f0', padding: '10px 16px', borderRadius: 6, marginTop: 12, fontSize: 15, maxWidth: 320, textAlign: 'center' }}>
          {errorMsg}
        </div>
      )}
    </div>
  );
};

export default ApplePayButton; 