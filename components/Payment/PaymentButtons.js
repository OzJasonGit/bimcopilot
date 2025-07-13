// components/PaymentButtons.js
import React, { useState } from 'react';
import CheckoutButton from './checkoutButton';
import ApplePayButton from './ApplePayButton';

const PaymentButtons = ({ amount, currency = 'USD', product, products, onError }) => {
  const [error, setError] = useState('');

  const handleError = (errorMessage) => {
    setError(errorMessage);
    if (onError) {
      onError(errorMessage);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '400px' }}>
      {error && (
        <div style={{
          color: '#e53e3e',
          backgroundColor: '#fed7d7',
          padding: '10px',
          borderRadius: '5px',
          marginBottom: '15px',
          fontSize: '14px'
        }}>
          {error}
        </div>
      )}
      
      <ApplePayButton
        amount={amount}
        currency={currency}
        product={product}
        products={products}
        onError={handleError}
      />
      
      <CheckoutButton
        amount={amount}
        currency={currency}
        product={product}
      />
    </div>
  );
};

export default PaymentButtons; 