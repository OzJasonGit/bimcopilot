'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    checkAuthAndLoadOrders();
  }, []);

  const checkAuthAndLoadOrders = async () => {
    try {
      // Check if user is authenticated and is admin
      const authResponse = await fetch('/api/header_route', {
        credentials: 'include',
      });

      if (!authResponse.ok) {
        router.push('/signin');
        return;
      }

      const authData = await authResponse.json();
      
      if (!authData.isAuthenticated) {
        router.push('/signin');
        return;
      }

      if (authData.user.role !== 1) {
        toast.error('Admin access required');
        router.push('/');
        return;
      }

      setUser(authData.user);

      // Load orders
      const ordersResponse = await fetch('/api/orders', {
        credentials: 'include',
      });

      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json();
        setOrders(ordersData);
      } else {
        toast.error('Failed to load orders');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      'pending': 'bg-yellow-500',
      'paid': 'bg-green-500',
      'failed': 'bg-red-500',
      'cancelled': 'bg-gray-500'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-white text-xs font-semibold ${statusColors[status] || 'bg-gray-500'}`}>
        {status.toUpperCase()}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
            <div className="text-sm text-gray-600">
              Welcome, {user?.name}
            </div>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No orders found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.stripeSessionId || order._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {order.userName || 'N/A'}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.userEmail}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {order.products && order.products.length > 0 ? (
                            <div>
                              {order.products.map((product, index) => (
                                <div key={index} className="mb-1">
                                  <span className="font-medium">{product.title}</span>
                                  <span className="text-gray-500 ml-2">x{product.quantity}</span>
                                  <span className="text-gray-500 ml-2">${product.price}</span>
                                </div>
                              ))}
                            </div>
                          ) : order.lineItems && order.lineItems.length > 0 ? (
                            <div>
                              {order.lineItems.map((item, index) => (
                                <div key={index} className="mb-1">
                                  <span className="font-medium">{item.description || item.price_data?.product_data?.name}</span>
                                  <span className="text-gray-500 ml-2">x{item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-500">No items</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order.amount?.toFixed(2) || '0.00'} {order.currency?.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(order.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 