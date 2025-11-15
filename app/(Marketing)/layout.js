// app/(Marketing)/layout.js
"use client";



import { CartProvider } from '../../components/Context/CartContext';
import { CurrencyProvider } from '../../components/Context/CurrencyContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { Toaster } from 'sonner';








export default function MarketingLayout({ children }) {
  return (
    <CurrencyProvider>
      <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '', currency: 'USD' }}>
        <CartProvider>
          <Toaster richColors position="top-right" />
          {children}
        </CartProvider>
      </PayPalScriptProvider>
    </CurrencyProvider>
  );
}



