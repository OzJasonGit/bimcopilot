// components/context/CartContext.js
"use client";
import React, { createContext, useState, useContext } from "react";
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const addToCart = async (item) => {
    setIsLoading(true);
    try {
      // Save to backend MongoDB first
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({
          id: item._id,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: 1
        }),
      });

      if (response.status === 401) {
        // User not authenticated, redirect to login
        toast.error('Please login to add items to cart');
        router.push('/signin');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }

      // Only update local state after successful API response
      const updatedCart = await response.json();
      setCartItems(updatedCart);
      toast.success('Item added to cart!');
    } catch (error) {
      console.error('Error saving cart item:', error);
      toast.error('Failed to add item to cart');
    } finally {
      setIsLoading(false);
    }
  };
  
  const removeFromCart = async (id) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id }),
      });

      if (response.status === 401) {
        toast.error('Please login to manage your cart');
        router.push('/signin');
        return;
      }

      if (response.ok) {
        const updatedCart = await response.json();
        setCartItems(updatedCart);
        toast.success('Item removed from cart');
      }
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item');
    }
  };

  const updateQuantity = async (id, quantity) => {
    try {
      const response = await fetch('/api/cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id, quantity }),
      });

      if (response.status === 401) {
        toast.error('Please login to manage your cart');
        router.push('/signin');
        return;
      }

      if (response.ok) {
        const updatedCart = await response.json();
        setCartItems(updatedCart);
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const loadCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        credentials: 'include',
      });

      if (response.status === 401) {
        // User not authenticated, clear cart
        setCartItems([]);
        return;
      }

      if (response.ok) {
        const cartData = await response.json();
        setCartItems(cartData);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        loadCart,
        totalPrice,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
