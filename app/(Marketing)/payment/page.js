'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import handleCheckout from '@/components/Payment/payment';
import CheckoutButton from '@/components/Payment/checkoutButton';

const PaymentPage = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const productParam = searchParams.get('product');
    if (productParam) {
      try {
        const parsedProduct = JSON.parse(decodeURIComponent(productParam));
        setProduct(parsedProduct);
      } catch (error) {
        console.error('Invalid product data:', error);
      }
    }
  }, [searchParams]);

  if (!product) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Checkout</h1>
      <h2>{product.title}</h2>
      <p>Price: ${product.price.toFixed(2)}</p>
      <Image src={product.image} alt={product.title} width={300} height={300} />
      <br />
      <CheckoutButton amount={product.price} currency="USD" />
    </div>
  );
};

export default PaymentPage;
