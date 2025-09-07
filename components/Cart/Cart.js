'use client';

import styles from './cart.module.css';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Sides from "../../components/Sides/sides";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import handleCheckout from '@/components/Payment/payment';
import { useCart } from '@/components/Context/CartContext';
import { toast } from 'react-toastify';
import PayPalButton from '@/components/Payment/PayPalButton';

export default function CheckoutPage() {
  
  const { cartItems, removeFromCart, updateQuantity, loadCart, totalPrice, isLoading } = useCart();
  const [selectedItems, setSelectedItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  useEffect(() => {
    // Only set all items as selected if no items are currently selected
    if (cartItems.length > 0 && selectedItems.length === 0) {
      const allIds = cartItems.map((item) => item.id || item._id);
      setSelectedItems(allIds);
    }
  }, [cartItems, selectedItems.length]);

  const calculateTotal = (items, selectedIds) => {
    return items
      .filter((item) => selectedIds.includes(item.id || item._id))
      .reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const toggleSelection = (id) => {
    const updated = selectedItems.includes(id)
      ? selectedItems.filter((itemId) => itemId !== id)
      : [...selectedItems, id];
    setSelectedItems(updated);
  };

  const handleQuantityChange = async (id, delta) => {
    const item = cartItems.find(item => (item.id || item._id) === id);
    if (item) {
      const newQuantity = Math.max(1, item.quantity + delta);
      await updateQuantity(id, newQuantity);
    }
  };

  const handleStripeCheckout = async () => {
    if (selectedItems.length === 0) {
      toast.error('Please select items to checkout');
      return;
    }

    const itemsToBuy = cartItems.filter((item) => selectedItems.includes(item.id || item._id));
    
    // Convert cart items to products format
    const products = itemsToBuy.map(item => ({
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: item.quantity
    }));

    try {
      await handleCheckout({
        products,
        currency: 'USD',
      });
    } catch (error) {
      if (error.message?.includes('Authentication required')) {
        toast.error('Please login to complete your purchase');
        router.push('/signin');
      } else {
        toast.error('Checkout failed. Please try again.');
      }
    }
  };

  const handleApplePayCheckout = async () => {
    if (selectedItems.length === 0) {
      toast.error('Please select items to checkout');
      return;
    }

    const itemsToBuy = cartItems.filter((item) => selectedItems.includes(item.id || item._id));
    
    // Convert cart items to products format for Apple Pay
    const products = itemsToBuy.map(item => ({
      title: item.title,
      price: item.price,
      image: item.image,
      quantity: item.quantity
    }));

    // Apple Pay will handle the payment through the ApplePayButton component
    console.log('Apple Pay checkout initiated with products:', products);
  };

  const currentTotal = calculateTotal(cartItems, selectedItems);

  if (isLoading) {
    return (
      
      <div className="min-h-screen bg-[#171717] text-white p-8 pt-[110px] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    
    <section id={styles.SHADOW_SECTION_BLACK} className={styles.center_holder}>

      <div className={styles.grid_0}>
        <div         
          style={{
            gridArea: "MAIN-AREA",
            position: 'relative',      
            justifyContent: 'left',
            alignItems: 'left',            
            zIndex: 1,
          }}>
          <h2 id={styles._H1} className="text-left ...  text-stone-50 font-avant_garde_bold"
                              style={{
                                      paddingTop: "100px",
                                      paddingBottom: "60px"
                                    }}> Your Cart ({cartItems.length} items)
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-8">
            {/* Cart Items List */}
            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <div className="text-left py-8">
                  <p className="text-gray-400 mb-4">Your cart is empty.</p>
                  <Button 
                    onClick={() => router.push('/products')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id || item._id}
                    className="flex items-center justify-between border-b border-gray-700 pb-4"
                  >
                    {/* Left: Image + Info */}
                    <div className="flex items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id || item._id)}
                        onChange={() => toggleSelection(item.id || item._id)}
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
                        <p className="font-semibold text-stone-50"
                            style={{
                            paddingBottom: "5px",}}>{item.title}</p>
                        <p className="text-sm text-gray-400">${item.price.toFixed(2)} each</p>
                      </div>
                    </div>

                    {/* Right: Quantity + Total */}
                    <div className="flex items-center gap-3">
                      <button
                        className="px-2 text-xl bg-zinc-800 rounded"
                        onClick={() => handleQuantityChange(item.id || item._id, -1)}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        className="px-2 text-xl bg-zinc-800 rounded"
                        onClick={() => handleQuantityChange(item.id || item._id, 1)}
                      >
                        +
                      </button>
                      <p className="w-20 text-right font-medium text-stone-50">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id || item._id)}
                        className="text-red-400 hover:text-red-300 ml-2"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}

              {cartItems.length > 0 && (
                <div className="text-right text-xl font-semibold mt-6 text-stone-50">
                  Subtotal: ${currentTotal.toFixed(2)}
                </div>
              )}
            </div>

            {/* Checkout Summary */}
            {cartItems.length > 0 && (
              <div className="bg-stone-600 p-6 rounded-xl shadow-md space-y-4 h-fit">
                <h3 className="text-xl font-bold text-stone-50">Checkout Summary</h3>
                <div className="border-t border-zinc-700 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-50">Subtotal</span>
                    <span className="text-stone-50">${currentTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-400">
                    <span className="text-stone-50">Sales Tax</span>
                    <span className="text-stone-50">$0.00</span>
                  </div>
                  <div className="flex justify-between font-semibold text-white border-t border-zinc-700 pt-2">
                    <span className="text-stone-50">Grand Total</span>
                    <span className="text-stone-50">${currentTotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button
                    onClick={handleStripeCheckout}
                    disabled={selectedItems.length === 0}
                    className="w-full bg-green-600 h-14 hover:bg-green-700 text-white disabled:bg-gray-600"
                  >
                    {selectedItems.length === 0 ? 'Select Items to Checkout' : 'Checkout'}
                  </Button>
                  <PayPalButton
                    amount={currentTotal}
                    products={cartItems.filter((item) => selectedItems.includes(item.id || item._id)).map(item => ({
                      title: item.title,
                      price: item.price,
                      image: item.image,
                      quantity: item.quantity
                    }))}
                    onSuccess={(orderId) => {
                      if (orderId) router.push(`/success?orderId=${orderId}`);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <div 
          style={{
              gridArea: "VIDEO_B",
              position: 'relative',      
              width: "100%",
              height: "200px"
          }}>       
        </div>
      </div>
     
    </section>
  );
}
