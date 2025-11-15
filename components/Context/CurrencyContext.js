'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUserCurrency, formatPriceWithCurrencySync, getExchangeRates } from '@/app/utils/currency';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState(null);
  const [ratesLoading, setRatesLoading] = useState(true);

  // Load currency from localStorage on mount, or detect from location/browser
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCurrency = localStorage.getItem('selectedCurrency');
      if (savedCurrency) {
        setCurrency(savedCurrency);
      } else {
        // Try to detect from user's location first
        const detectCurrencyFromLocation = async () => {
          try {
            const response = await fetch('/api/detect-country');
            const data = await response.json();
            
            if (data.success && data.currencyCode) {
              setCurrency(data.currencyCode);
              localStorage.setItem('selectedCurrency', data.currencyCode);
              return;
            }
          } catch (error) {
            console.log('Location detection failed, using browser locale:', error);
          }
          
          // Fallback to browser locale detection
          const detectedCurrency = getUserCurrency();
          setCurrency(detectedCurrency);
          localStorage.setItem('selectedCurrency', detectedCurrency);
        };
        
        detectCurrencyFromLocation();
      }
    }
  }, []);

  // Fetch exchange rates on mount and when currency changes
  useEffect(() => {
    const loadExchangeRates = async () => {
      try {
        setRatesLoading(true);
        const rates = await getExchangeRates();
        setExchangeRates(rates);
      } catch (error) {
        console.error('Error loading exchange rates:', error);
        // Will use fallback rates from formatPriceWithCurrencySync
      } finally {
        setRatesLoading(false);
      }
    };

    loadExchangeRates();
    
    // Refresh rates every hour
    const interval = setInterval(loadExchangeRates, 60 * 60 * 1000);
    return () => clearInterval(interval);
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

  // Format price function that uses current currency with conversion
  const formatPrice = useCallback((price) => {
    if (price === null || price === undefined) return '';
    // Use synchronous version that uses cached rates from localStorage
    return formatPriceWithCurrencySync(price, currency);
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ 
      currency, 
      setCurrency: updateCurrency, 
      formatPrice,
      exchangeRates,
      ratesLoading
    }}>
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

