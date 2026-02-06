// app/(Marketing)/layout.js
"use client";

import { CartProvider } from '../../components/Context/CartContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Toaster } from 'sonner';

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export default function MarketingLayout({ children }) {
  const content = (
    <CartProvider>
      <Toaster richColors position="top-right" />
      {children}
    </CartProvider>
  );

  // Only load PayPal SDK when client ID is set (avoids "1 error" / invalid client-id in dev)
  if (PAYPAL_CLIENT_ID) {
    return (
      <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID, currency: "USD" }}>
        {content}
      </PayPalScriptProvider>
    );
  }
  return content;
}



