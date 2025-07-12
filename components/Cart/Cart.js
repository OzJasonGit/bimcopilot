import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import handleCheckout from '@/components/Payment/payment';

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/cart')
      .then((res) => res.json())
      .then((data) => {
        setCartItems(data);
        setSelectedItems(data.map((item) => item._id)); // Select all by default
        calculateTotal(data, data.map((item) => item._id));
      });
  }, []);

  const calculateTotal = (items, selectedIds) => {
    const total = items
      .filter((item) => selectedIds.includes(item._id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotalPrice(total);
  };

  const toggleSelection = (id) => {
    const updated = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId !== id)
      : [...selectedItems, id];
    setSelectedItems(updated);
    calculateTotal(cartItems, updated);
  };

  const handleStripeCheckout = async () => {
    const itemsToBuy = cartItems.filter((item) => selectedItems.includes(item._id));
    const amount = itemsToBuy.reduce((acc, item) => acc + item.price * item.quantity, 0) * 100;

    await handleCheckout({
      amount,
      currency: 'USD',
      product: {
        title: 'Selected Items',
        image: itemsToBuy[0]?.image || '',
      },
    });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-black text-white p-8 gap-8">
      {/* Left: Cart Items */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Shopping Cart</h2>
        {cartItems.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between py-4 border-b border-gray-700"
          >
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={selectedItems.includes(item._id)}
                onChange={() => toggleSelection(item._id)}
              />
              <Image
                src={item.image}
                alt={item.title}
                width={64}
                height={64}
                className="rounded-md"
              />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-400">Quantity: {item.quantity}</p>
              </div>
            </div>
            <div className="text-right">
              <p>${(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
        ))}
        <div className="mt-6 text-right text-lg font-bold">
          Subtotal: ${totalPrice.toFixed(2)}
        </div>
      </div>

      {/* Right: Stripe Checkout */}
      <div className="bg-zinc-900 p-6 rounded-xl shadow-xl">
        <h3 className="text-xl font-semibold mb-4">Secure Checkout</h3>
        <p className="text-sm text-gray-400 mb-4">
          You will be redirected to Stripe for payment.
        </p>
        <Button onClick={handleStripeCheckout} className="mt-6 w-full bg-blue-600 text-white">
          Proceed to Stripe Payment
        </Button>
      </div>
    </div>
  );
}
