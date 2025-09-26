// app/(Marketing)/layout.js
"use client";



import { CartProvider } from '../../components/Context/CartContext';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

import { Toaster } from 'sonner';


export const metadata = {
  title: "Bimcopilot",
  description: "Sustainable, Richer Architects through BIM, AI, Analytics and Automation",
};






export default function MarketingLayout({ children }) {
  return (
    <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '', currency: 'USD' }}>
    <CartProvider>
        <Toaster richColors position="top-right" />
        {children}

      </CartProvider>
    </PayPalScriptProvider>
  );
}



