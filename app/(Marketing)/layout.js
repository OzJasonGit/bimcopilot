// app/(Marketing)/layout.js
"use client";

import { CartProvider } from '../../components/context/CartContext';
import { Toaster } from 'sonner';

export default function MarketingLayout({ children }) {
  return (
    <CartProvider>
      <Toaster richColors position="top-right" />
      {children}
    </CartProvider>
  );
}
