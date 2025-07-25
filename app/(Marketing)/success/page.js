'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Invoice from '@/components/Invoice/Invoice';

const SuccessPageContent = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);
      setError(null);
      try {
        // Try to get orderId from query params
        const orderId = searchParams.get('orderId');
        let url = '/api/orders';
        if (orderId) {
          url += `?search=${orderId}`;
        }
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Failed to fetch order');
        const data = await res.json();
        let foundOrder = null;
        if (orderId) {
          foundOrder = (data.orders || []).find(
            o =>
              (o._id && o._id.toString() === orderId) ||
              o.stripeSessionId === orderId ||
              o.paypalOrderId === orderId
          );
        } else {
          foundOrder = (data.orders || [])[0]; // Most recent order
        }
        if (!foundOrder) throw new Error('Order not found');
        setOrder(foundOrder);
      } catch (err) {
        setError(err.message || 'Failed to load invoice');
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [searchParams]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: 40 }}>Loading invoice...</div>;
  if (error) return <div style={{ color: 'red', textAlign: 'center', marginTop: 40 }}>{error}</div>;
  if (!order) return null;

  return (
    <Invoice
      orderNumber={order._id || order.stripeSessionId || order.paypalOrderId || 'N/A'}
      date={new Date(order.createdAt).toLocaleString()}
      buyer={{ name: order.userName, email: order.userEmail }}
      products={order.products || []}
      total={order.amount || 0}
    />
  );
};

const SuccessPage = () => (
  <Suspense fallback={<div style={{ textAlign: 'center', marginTop: 40 }}>Loading invoice...</div>}>
    <SuccessPageContent />
  </Suspense>
);

export default SuccessPage;
  