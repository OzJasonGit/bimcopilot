// components/ApplePayButton.js
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
          // Only show if Apple Pay is available
          setIsApplePayAvailable(!!canMakePaymentResult && canMakePaymentResult.applePay === true);
        }
      } catch (error) {
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
      
      // Log the current environment for debugging
      console.log('Apple Pay environment check:', {
        userAgent: navigator.userAgent,
        isSecure: window.location.protocol === 'https:',
        isLocalhost: window.location.hostname === 'localhost',
        hasPaymentRequest: !!window.PaymentRequest
      });
      
      // Create payment request with proper Apple Pay configuration
      const paymentRequest = stripe.paymentRequest({
        country: 'US',
        currency: currency.toLowerCase(),
        total: {
          label: 'Total',
          amount: Math.round(amount * 100), // Convert to cents
        },
        requestPayerName: true,
        requestPayerEmail: true,
        requestPayerPhone: false,
        disableWallets: ['googlePay'], // Disable Google Pay to focus on Apple Pay
        // Add Apple Pay specific configuration
        paymentRequestApplePay: {
          merchantCapabilities: ['supports3DS'],
          supportedNetworks: ['visa', 'mastercard', 'amex'],
        },
      });

      // For testing, we'll try to show the payment sheet even if canMakePayment fails
      let canMakePayment = false;
      try {
        const canMakePaymentResult = await paymentRequest.canMakePayment();
        canMakePayment = canMakePaymentResult || false;
        console.log('Apple Pay canMakePayment result:', canMakePayment);
      } catch (error) {
        console.log('canMakePayment check failed:', error);
      }

      // For testing purposes, continue even if canMakePayment fails
      if (!canMakePayment) {
        console.log('Apple Pay canMakePayment returned false, but continuing for testing...');
      }

      // Handle payment request
      paymentRequest.on('paymentmethod', async (event) => {
        try {
          console.log('Apple Pay payment method received:', event);
          if (!event || !event.paymentMethod) {
            throw new Error('Invalid payment method received');
          }
          
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
            console.log('Payment route response:', result);
            
            // For testing, we'll handle the response differently
            if (result.client_secret) {
              // Confirm the payment with the payment method
              const confirmResult = await stripe.confirmCardPayment(result.client_secret, {
                payment_method: event.paymentMethod.id,
              });

              if (confirmResult.error) {
                throw new Error(confirmResult.error.message);
              }
            }

            // Payment successful
            console.log('Apple Pay payment successful!');
            if (onError) {
              onError('Payment successful! (This is a test message)');
            }
            // window.location.href = '/cart'; // Redirect to success page
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
        console.log('Apple Pay payment cancelled');
        setIsLoading(false);
      });

      // Show Apple Pay sheet
      console.log('Attempting to show Apple Pay sheet...');
      try {
        const showResult = await paymentRequest.show();
        console.log('Apple Pay show result:', showResult);
        if (showResult && showResult.error) {
          console.log('Apple Pay show error:', showResult.error);
          throw new Error(showResult.error.message);
        }
      } catch (showError) {
        console.log('Apple Pay show() failed:', showError);
        throw new Error(`Failed to show Apple Pay: ${showError.message}`);
      }
          } catch (error) {
        console.error('Apple Pay error:', error);
        
        // Provide more specific error messages
        let errorMessage = error.message;
        if (error.message.includes('Payment Request is not available')) {
          errorMessage = 'Apple Pay is not available in this browser. Please use Safari, Chrome, or Edge on a supported device.';
        } else if (error.message.includes('Failed to show Apple Pay')) {
          errorMessage = 'Unable to show Apple Pay. Please ensure you have Apple Pay set up on your device.';
        }
        
        if (onError) {
          onError(errorMessage);
        }
        setIsLoading(false);
      }
  };

  // Show informative message when Apple Pay is not available
  if (!isApplePayAvailable) {
    return (
      <div style={{ color: 'red', padding: 8, background: '#fff', border: '1px solid #ccc', borderRadius: 6, marginBottom: 8 }}>
        Apple Pay not available (debug: {String(isApplePayAvailable)})<br/>
        Make sure you are using Safari on a Mac/iOS device with Apple Pay set up and site is served over HTTPS.
      </div>
    );
  }

  return (
    <button
      onClick={handleApplePay}
      disabled={isLoading}
      className={`apple-pay-button${isLoading ? ' loading' : ''}`}
      type="button"
    >
      <span className="apple-pay-logo" aria-label="Apple Pay">
        <svg width="40" height="24" viewBox="0 0 40 24" xmlns="http://www.w3.org/2000/svg">
          <g fill="none" fillRule="evenodd">
            <rect width="40" height="24" rx="12" fill="#000"/>
            <text x="20" y="16" textAnchor="middle" fill="#fff" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" fontSize="13" fontWeight="bold"> Pay</text>
          </g>
        </svg>
      </span>
      {isLoading && <span className="apple-pay-loading">Processing...</span>}
    </button>
  );
};

export default ApplePayButton; 