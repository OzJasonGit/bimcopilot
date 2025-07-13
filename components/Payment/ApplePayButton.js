// components/ApplePayButton.js
import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const ApplePayButton = ({ amount, currency = 'USD', product, products, onError }) => {
  const [isApplePayAvailable, setIsApplePayAvailable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkApplePayAvailability = async () => {
      try {
        const stripe = await stripePromise;
        if (stripe) {
          const { error } = await stripe.paymentRequest({
            country: 'US',
            currency: currency.toLowerCase(),
            total: {
              label: 'Total',
              amount: Math.round(amount * 100), // Convert to cents
            },
            requestPayerName: true,
            requestPayerEmail: true,
          });

          if (!error) {
            setIsApplePayAvailable(true);
          }
        }
      } catch (error) {
        console.log('Apple Pay not available:', error);
        setIsApplePayAvailable(false);
      }
    };

    checkApplePayAvailability();
  }, [amount, currency]);

  const handleApplePay = async () => {
    if (!isApplePayAvailable) return;

    setIsLoading(true);
    try {
      const stripe = await stripePromise;
      
      // Create payment request
      const paymentRequest = stripe.paymentRequest({
        country: 'US',
        currency: currency.toLowerCase(),
        total: {
          label: 'Total',
          amount: Math.round(amount * 100), // Convert to cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Handle payment request
      paymentRequest.on('paymentmethod', async (event) => {
        try {
          // Handle both single product and multiple products
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
              paymentMethod: 'apple_pay'
            }),
          });

          if (response.status === 401) {
            throw new Error('Authentication required');
          }

          if (response.ok) {
            const result = await response.json();
            
            // Confirm the payment with the payment method
            const { error } = await stripe.confirmCardPayment(result.client_secret, {
              payment_method: event.paymentMethod.id,
            });

            if (error) {
              throw new Error(error.message);
            }

            // Payment successful
            window.location.href = '/cart'; // Redirect to success page
          } else {
            const err = await response.text();
            throw new Error('Failed to create payment session');
          }
        } catch (error) {
          console.error('Apple Pay payment error:', error);
          if (onError) {
            onError(error.message);
          }
        } finally {
          setIsLoading(false);
        }
      });

      paymentRequest.on('cancel', () => {
        setIsLoading(false);
      });

      // Show Apple Pay sheet
      const { error } = await paymentRequest.show();
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Apple Pay error:', error);
      if (onError) {
        onError(error.message);
      }
      setIsLoading(false);
    }
  };

  if (!isApplePayAvailable) {
    return null; // Don't show button if Apple Pay is not available
  }

  return (
    <button
      onClick={handleApplePay}
      disabled={isLoading}
      style={{
        width: '100%',
        height: '50px',
        backgroundColor: '#000',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: isLoading ? 'not-allowed' : 'pointer',
        opacity: isLoading ? 0.7 : 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '10px',
      }}
    >
      {isLoading ? 'Processing...' : 'Pay with Apple Pay'}
    </button>
  );
};

export default ApplePayButton; 