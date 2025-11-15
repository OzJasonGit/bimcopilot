'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import handleCheckout from '@/components/Payment/payment';
import CheckoutButton from '@/components/Payment/checkoutButton';
import { useFormatPrice } from '@/components/Context/CurrencyContext';

const PaymentPageInner = () => {
  const searchParams = useSearchParams();
  const [product, setProduct] = useState(null);
  const formatPrice = useFormatPrice();

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
      <p>Price: {formatPrice(product.price)}</p>
      <Image 
        src={product.image} 
        alt={product.title} 
        width={300} 
        height={300} 
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
      <br />
      <CheckoutButton amount={product.price} currency="USD" product={product} />
    </div>
  );
};

const PaymentPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <PaymentPageInner />
  </Suspense>
);

export default PaymentPage;
