// import React, { useState } from 'react';
// import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

// export default function PayPalButton({ products, currency = 'USD' }) {
//   const [error, setError] = useState(null);
//   // Calculate total for PayPalScriptProvider (for display only)
//   const amount = products.reduce((sum, p) => sum + (p.price * p.quantity), 0).toFixed(2);
//   return (
//     <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <PayPalScriptProvider options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || '', currency }}>
//         <PayPalButtons
//           style={{
//             layout: 'horizontal',
//             color: 'gold',
//             shape: 'pill',
//             label: 'paypal',
//             tagline: false,
//             height: 48,
//             width: 300
//           }}
//           createOrder={async () => {
//             try {
//               const res = await fetch('/api/paypal/create_order', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ products, currency })
//               });
//               const data = await res.json();
//               if (!res.ok || !data.id) {
//                 setError(data.error || 'Failed to create PayPal order.');
//                 return null;
//               }
//               setError(null);
//               return data.id;
//             } catch (err) {
//               setError('A network or server error occurred.');
//               console.error('PayPal createOrder error:', err);
//               return null;
//             }
//           }}
//           onApprove={async (data, actions) => {
//             if (actions.order) {
//               const details = await actions.order.capture();
//               if (onSuccess) onSuccess(details);
//             }
//           }}
//           onError={(err) => {
//             setError('A PayPal error occurred.');
//             console.error('PayPal Button error:', err);
//           }}
//         />
//       </PayPalScriptProvider>
//       {error && (
//         <div style={{ color: 'red', marginTop: 12, fontWeight: 500 }}>
//           {error}
//         </div>
//       )}
//     </div>
//   );
// }




'use client';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ amount }) => {
  return (
    <PayPalButtons
      style={{ layout: 'vertical' }}
      createOrder={async () => {
        try {
          const res = await fetch('/api/paypal/create_order', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: '49.99' }), // pass valid amount
          });
      
          const data = await res.json();
          console.log('PayPal Order Created:', data);
      
          return data.id; // <--- this is required
        } catch (error) {
          console.error('Create order error:', error);
        }
      }}
      
      onApprove={async (data, actions) => {
        const details = await actions.order.capture();
        console.log('Payment Approved: ', details);
        // You can redirect or call your API here
      }}
      onError={(err) => {
        console.error('PayPal Checkout Error: ', err);
      }}
    />
  );
};

export default PayPalButton;
