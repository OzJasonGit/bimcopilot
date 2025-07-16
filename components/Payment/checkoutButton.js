// components/CheckoutButton.js
import React from 'react';
import handleCheckout from './payment';

const CheckoutButton = ({ amount, currency, product }) => {
  const handleClick = () => {
    // If product object is provided, use it; otherwise create a generic product
    const products = [{
      title: product?.title || 'Product',
      price: amount,
      image: product?.image || '',
      quantity: 1
    }];

    handleCheckout({
      products,
      currency
    });
  };

  return (
    <button
      onClick={handleClick}
      style={{
        width: '100%',
        height: '100%',
        padding: '15px 30px',
        backgroundColor: '#0070f3',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1.1rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
      }}
    >
      Pay Now
    </button>
  );
};

export default CheckoutButton;
