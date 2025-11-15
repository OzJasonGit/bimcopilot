'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUserCurrency, formatPriceWithCurrency } from '@/app/utils/currency';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD');

  // Load currency from localStorage on mount, or detect from browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCurrency = localStorage.getItem('selectedCurrency');
      if (savedCurrency) {
        setCurrency(savedCurrency);
      } else {
        // Detect from browser if no saved preference
        const detectedCurrency = getUserCurrency();
        setCurrency(detectedCurrency);
        localStorage.setItem('selectedCurrency', detectedCurrency);
      }
    }
  }, []);

  // Save to localStorage whenever currency changes
  const updateCurrency = useCallback((newCurrency) => {
    setCurrency(newCurrency);
    if (typeof window !== 'undefined') {
      localStorage.setItem('selectedCurrency', newCurrency);
      // Dispatch a custom event to notify components that currency changed
      window.dispatchEvent(new CustomEvent('currencyChanged', { detail: { currency: newCurrency } }));
    }
  }, []);

  // Format price function that uses current currency
  const formatPrice = useCallback((price) => {
    return formatPriceWithCurrency(price, currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency: updateCurrency, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

// Hook that provides formatPrice function that automatically updates when currency changes
export function useFormatPrice() {
  const { formatPrice } = useCurrency();
  return formatPrice;
}

