// components/CheckoutButton.js
import React from 'react';
import handleCheckout from './payment';

const CheckoutButton = ({ amount, currency }) => {
  return (
    <button
      onClick={() => handleCheckout(amount, currency)}
      style={{
        padding: '10px 20px',
        fontSize: '16px',
        color: 'white',
        backgroundColor: '#0070f3',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      Pay Now
    </button>
  );
};

export default CheckoutButton;
