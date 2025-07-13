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
