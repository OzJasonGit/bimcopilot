'use client';

import styles from './cart.module.css';

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
        const allIds = data.map((item) => item._id);
        setSelectedItems(allIds);
        calculateTotal(data, allIds);
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

  const updateQuantity = (id, delta) => {
    const updatedItems = [...cartItems].map((item) =>
      item._id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems, selectedItems);
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

    <section id={styles.SHADOW_SECTION_BLACK} className={styles.center_holder}>

      <div className={styles.grid_0}>

          <div className="min-h-screen bg-[#171717] text-white p-8 pt-[110px] md:pt-[110px] sm:pt-[65px]"           
                style={{
                  gridArea: "MAIN-AREA",
                  position: 'relative',      
                  justifyContent: 'center',
                  alignItems: 'center',            
                  zIndex: 1,
                }}>
              <h2 className="text-3xl font-bold mb-6">Your Cart ({cartItems.length} items)</h2>

              <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
                {/* Cart Items List */}
                <div className="space-y-6">
                  {cartItems.length === 0 ? (
                    <p className="text-gray-400">Your cart is empty.</p>
                  ) : (
                    cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between border-b border-gray-700 pb-4"
                      >
                        {/* Left: Image + Info */}
                        <div className="flex items-center gap-4">
                          <input
                            type="checkbox"
                            checked={selectedItems.includes(item._id)}
                            onChange={() => toggleSelection(item._id)}
                            className="accent-green-500"
                          />
                          <Image
                            src={item.image}
                            alt={item.title}
                            width={64}
                            height={64}
                            className="rounded-md object-cover"
                          />
                          <div>
                            <p className="font-semibold">{item.title}</p>
                            <p className="text-sm text-gray-400">${item.price.toFixed(2)} each</p>
                          </div>
                        </div>

                        {/* Right: Quantity + Total */}
                        <div className="flex items-center gap-3">
                          <button
                            className="px-2 text-xl bg-zinc-800 rounded"
                            onClick={() => updateQuantity(item._id, -1)}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            className="px-2 text-xl bg-zinc-800 rounded"
                            onClick={() => updateQuantity(item._id, 1)}
                          >
                            +
                          </button>
                          <p className="w-20 text-right font-medium">
                            ${(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))
                  )}

                  {cartItems.length > 0 && (
                    <div className="text-right text-xl font-semibold mt-6">
                      Subtotal: ${totalPrice.toFixed(2)}
                    </div>
                  )}
                </div>

                {/* Checkout Summary */}
                {cartItems.length > 0 && (
                  <div className="bg-zinc-900 p-6 rounded-xl shadow-md space-y-4 h-fit">
                    <h3 className="text-xl font-bold">Checkout Summary</h3>
                    <div className="border-t border-zinc-700 pt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-400">
                        <span>Sales Tax</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between font-semibold text-white border-t border-zinc-700 pt-2">
                        <span>Grand Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                    <Button
                      onClick={handleStripeCheckout}
                      className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white"
                    >
                      Proceed to Stripe Payment
                    </Button>
                  </div>
                )}
              </div>
            </div>

      </div>

    </section>

  );
}
