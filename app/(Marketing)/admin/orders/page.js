'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useRef } from 'react';
import { useFormatPrice } from '@/components/Context/CurrencyContext';
import { getUserCurrency } from '@/app/utils/currency';

const ORDERS_PER_PAGE = 50;

function getMonthOptions() {
  const now = new Date();
  const months = [];
  for (let i = 0; i < 24; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`,
      label: d.toLocaleString('default', { month: 'long', year: 'numeric' })
    });
  }
  return months;
}

const DEFAULT_COL_WIDTHS = {
  orderId: 160,
  customer: 180,
  products: 260,
  amount: 120,
  payment: 140,
  status: 120,
  date: 180,
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [month, setMonth] = useState('');
  const [limit] = useState(ORDERS_PER_PAGE);
  const [colWidths, setColWidths] = useState(DEFAULT_COL_WIDTHS);
  const formatPrice = useFormatPrice();
  const resizingCol = useRef(null);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    loadOrders();
    // eslint-disable-next-line
  }, [page, month]);

  const loadOrders = async () => {
    setLoading(true);
    try {
      // Get user info
      const authResponse = await fetch('/api/header_route', {
        credentials: 'include',
      });
      if (authResponse.ok) {
        const authData = await authResponse.json();
        if (authData.isAuthenticated) {
          setUser(authData.user);
        }
      }
      // Load orders with pagination and month filter
      const params = new URLSearchParams({ page, limit });
      if (month) params.append('month', month);
      if (search) params.append('search', search);
      const ordersResponse = await fetch(`/api/orders?${params.toString()}`, {
        credentials: 'include',
      });
      if (ordersResponse.ok) {
        const { orders, total } = await ordersResponse.json();
        setOrders(orders);
        setTotal(total);
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

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ orderId, status: newStatus }),
      });

      if (response.ok) {
        toast.success('Order status updated');
        // Reload orders
        loadOrders();
      } else {
        toast.error('Failed to update order status');
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Error updating order status');
    }
  };

  // Column resize handlers
  const startResize = (col, e) => {
    resizingCol.current = { col, startX: e.clientX, startWidth: colWidths[col] };
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', stopResize);
  };
  const handleResize = (e) => {
    if (!resizingCol.current) return;
    const { col, startX, startWidth } = resizingCol.current;
    let newWidth = startWidth + (e.clientX - startX);
    // Set min/max width (Order ID can be resized up to half table width)
    const min = 80;
    const max = col === 'orderId' ? 600 : 400;
    newWidth = Math.max(min, Math.min(max, newWidth));
    setColWidths(w => ({ ...w, [col]: newWidth }));
  };
  const stopResize = () => {
    resizingCol.current = null;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
        <div className="text-sm text-gray-600">Welcome, {user?.name}</div>
      </div>
      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <button
          onClick={() => { setPage(1); loadOrders(); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow border border-gray-200 text-gray-700 font-semibold transition"
          title="Refresh orders"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5A9 9 0 1012 3v3m0 0l-3-3m3 3l3-3" />
          </svg>
          Refresh
        </button>
        <div className="flex flex-wrap gap-2 items-center bg-gray-50 rounded-lg px-3 py-2 shadow border border-gray-200">
          <label className="mr-2 font-medium text-gray-700">Month:</label>
          <select
            value={month}
            onChange={e => { setPage(1); setMonth(e.target.value); }}
            className="border border-gray-300 rounded-lg px-2 py-1 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition min-w-[120px] bg-white text-gray-800"
          >
            <option value="">All</option>
            {getMonthOptions().map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <form
            onSubmit={e => {
              e.preventDefault();
              setPage(1);
              setSearch(searchInput.trim());
            }}
            className="flex gap-2 items-center"
          >
            <input
              type="text"
              placeholder="Search orders..."
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              className="border border-gray-300 rounded-lg px-2 py-1 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition min-w-[180px] bg-white text-gray-800"
            />
            <button
              type="submit"
              className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600 shadow border border-blue-500 font-semibold transition"
            >
              Search
            </button>
            {search && (
              <button
                type="button"
                onClick={() => { setSearch(''); setSearchInput(''); setPage(1); }}
                className="px-2 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 border border-gray-300 text-gray-700 font-semibold transition"
              >
                Clear
              </button>
            )}
          </form>
        </div>
        <div className="ml-auto flex gap-2 items-center">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>Page {page} of {Math.max(1, Math.ceil(total / limit))}</span>
          <button
            onClick={() => setPage(p => p + 1)}
            disabled={page >= Math.ceil(total / limit)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p>Loading orders...</p>
          </div>
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No orders found</p>
        </div>
      ) : (
        <div className="overflow-x-scroll scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100" style={{ overflowX: 'scroll' }}>
          <table className="min-w-[1200px] divide-y divide-gray-200" style={{ tableLayout: 'fixed', width: '100%' }}>
            <thead className="bg-gray-50 select-none">
              <tr>
                <th style={{ width: colWidths.orderId }} className="relative group px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r overflow-hidden whitespace-nowrap text-ellipsis">
                  <div className="flex items-center justify-between">
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis block">Order ID</span>
                    <span
                      className="resize-handle group-hover:bg-blue-400"
                      style={{ cursor: 'col-resize', width: 6, height: 28, background: '#e5e7eb', borderRadius: 3, marginLeft: 4, display: 'inline-block' }}
                      onMouseDown={e => startResize('orderId', e)}
                    />
                  </div>
                </th>
                <th style={{ width: colWidths.customer }} className="relative group px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r overflow-hidden whitespace-nowrap text-ellipsis">
                  <div className="flex items-center justify-between">
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis block">Customer</span>
                    <span
                      className="resize-handle group-hover:bg-blue-400"
                      style={{ cursor: 'col-resize', width: 6, height: 28, background: '#e5e7eb', borderRadius: 3, marginLeft: 4, display: 'inline-block' }}
                      onMouseDown={e => startResize('customer', e)}
                    />
                  </div>
                </th>
                <th style={{ width: colWidths.products }} className="relative group px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r overflow-hidden whitespace-nowrap text-ellipsis">
                  <div className="flex items-center justify-between">
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis block">Products</span>
                    <span
                      className="resize-handle group-hover:bg-blue-400"
                      style={{ cursor: 'col-resize', width: 6, height: 28, background: '#e5e7eb', borderRadius: 3, marginLeft: 4, display: 'inline-block' }}
                      onMouseDown={e => startResize('products', e)}
                    />
                  </div>
                </th>
                <th style={{ width: colWidths.amount }} className="relative group px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r overflow-hidden whitespace-nowrap text-ellipsis">
                  <div className="flex items-center justify-between">
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis block">Amount</span>
                    <span
                      className="resize-handle group-hover:bg-blue-400"
                      style={{ cursor: 'col-resize', width: 6, height: 28, background: '#e5e7eb', borderRadius: 3, marginLeft: 4, display: 'inline-block' }}
                      onMouseDown={e => startResize('amount', e)}
                    />
                  </div>
                </th>
                <th style={{ width: colWidths.payment }} className="relative group px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r overflow-hidden whitespace-nowrap text-ellipsis">
                  <div className="flex items-center justify-between">
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis block">Payment Method</span>
                    <span
                      className="resize-handle group-hover:bg-blue-400"
                      style={{ cursor: 'col-resize', width: 6, height: 28, background: '#e5e7eb', borderRadius: 3, marginLeft: 4, display: 'inline-block' }}
                      onMouseDown={e => startResize('payment', e)}
                    />
                  </div>
                </th>
                <th style={{ width: colWidths.status }} className="relative group px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r overflow-hidden whitespace-nowrap text-ellipsis">
                  <div className="flex items-center justify-between">
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis block">Status</span>
                    <span
                      className="resize-handle group-hover:bg-blue-400"
                      style={{ cursor: 'col-resize', width: 6, height: 28, background: '#e5e7eb', borderRadius: 3, marginLeft: 4, display: 'inline-block' }}
                      onMouseDown={e => startResize('status', e)}
                    />
                  </div>
                </th>
                <th style={{ width: colWidths.date }} className="relative group px-2 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider overflow-hidden whitespace-nowrap text-ellipsis">
                  <div className="flex items-center justify-between">
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis block">Date</span>
                    <span
                      className="resize-handle group-hover:bg-blue-400"
                      style={{ cursor: 'col-resize', width: 6, height: 28, background: '#e5e7eb', borderRadius: 3, marginLeft: 4, display: 'inline-block' }}
                      onMouseDown={e => startResize('date', e)}
                    />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td style={{ width: colWidths.orderId }} className="px-2 py-4 whitespace-nowrap overflow-hidden text-ellipsis text-sm font-medium text-gray-900">
                    {order.stripeSessionId || order._id}
                  </td>
                  <td style={{ width: colWidths.customer }} className="px-2 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                    <div>
                      <div className="text-sm font-medium text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap block">
                        {order.userName || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap block">
                        {order.userEmail}
                      </div>
                    </div>
                  </td>
                  <td style={{ width: colWidths.products }} className="px-2 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                    <div className="text-sm text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap block">
                      {order.products && order.products.length > 0 ? (
                        <div>
                          {order.products.map((product, index) => (
                            <div key={index} className="mb-1 overflow-hidden text-ellipsis whitespace-nowrap block">
                              <span className="font-medium overflow-hidden text-ellipsis whitespace-nowrap block">{product.title}</span>
                              <span className="text-gray-500 ml-2">x{product.quantity}</span>
                              <span className="text-gray-500 ml-2">{formatPrice(product.price)}</span>
                            </div>
                          ))}
                        </div>
                      ) : order.lineItems && order.lineItems.length > 0 ? (
                        <div>
                          {order.lineItems.map((item, index) => (
                            <div key={index} className="mb-1 overflow-hidden text-ellipsis whitespace-nowrap block">
                              <span className="font-medium overflow-hidden text-ellipsis whitespace-nowrap block">{item.description || item.price_data?.product_data?.name}</span>
                              <span className="text-gray-500 ml-2">x{item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-500">No items</span>
                      )}
                    </div>
                  </td>
                  <td style={{ width: colWidths.amount }} className="px-2 py-4 whitespace-nowrap overflow-hidden text-ellipsis text-sm text-gray-900">
                    {formatPrice(order.amount || 0)} {order.currency && order.currency !== getUserCurrency() ? `(${order.currency.toUpperCase()})` : ''}
                  </td>
                  <td style={{ width: colWidths.payment }} className="px-2 py-4 whitespace-nowrap overflow-hidden text-ellipsis text-sm text-gray-900">
                    {order.paymentMethod
                      ? order.paymentMethod.charAt(0).toUpperCase() + order.paymentMethod.slice(1)
                      : order.stripeSessionId
                        ? 'Stripe'
                        : order.paypalOrderId || order.paypalId
                          ? 'PayPal'
                          : 'Unknown'}
                  </td>
                  <td style={{ width: colWidths.status }} className="px-2 py-4 whitespace-nowrap overflow-hidden text-ellipsis">
                    {getStatusBadge(order.status)}
                    {order.status === 'pending' && (
                      <button
                        onClick={() => updateOrderStatus(order._id, 'paid')}
                        className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600"
                      >
                        Mark as Paid
                      </button>
                    )}
                  </td>
                  <td style={{ width: colWidths.date }} className="px-2 py-4 whitespace-nowrap overflow-hidden text-ellipsis text-sm text-gray-500">
                    {formatDate(order.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 