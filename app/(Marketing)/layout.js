// app/(Marketing)/layout.js
"use client";

// app/layout.js
import Script from "next/script";
import Analytics from "./analytics"; // we’ll make this next
import { GA_TRACKING_ID } from "../../lib/gtag";

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

         {/* Google Analytics base script */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        <Analytics />

      </CartProvider>
    </PayPalScriptProvider>
  );
}


