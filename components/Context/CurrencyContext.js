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
      
      // Always try to detect from location first (unless user manually selected)
      // Check if user has manually selected (not auto-detected)
      const wasManuallySelected = localStorage.getItem('currencyManuallySelected') === 'true';
      
      if (!wasManuallySelected) {
        // Try to detect from user's location
        const detectCurrencyFromLocation = async () => {
          try {
            if (process.env.NODE_ENV === 'development') {
              console.log('🌍 Detecting currency from your IP location...');
            }
            
            // Add timeout to prevent hanging
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
            
            const response = await fetch('/api/detect-country', {
              cache: 'no-store',
              method: 'GET',
              signal: controller.signal,
            });
            
            clearTimeout(timeoutId);
            
            if (!response.ok) {
              throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data && data.success && data.currencyCode) {
              if (process.env.NODE_ENV === 'development') {
                console.log(`✅ Auto-selected currency: ${data.currencyCode} (detected from ${data.countryName || data.country || 'your location'})`);
              }
              setCurrency(data.currencyCode);
              if (typeof window !== 'undefined') {
                localStorage.setItem('selectedCurrency', data.currencyCode);
                localStorage.setItem('currencyAutoDetected', 'true');
              }
              return;
            } else if (process.env.NODE_ENV === 'development') {
              console.warn('⚠️ Location detection returned but no currency found:', data);
            }
          } catch (error) {
            // Ignore abort errors (timeout)
            if (error.name !== 'AbortError' && process.env.NODE_ENV === 'development') {
              console.warn('⚠️ IP location detection failed:', error.message);
            }
          }
          
          // Fallback to browser locale detection
          try {
            const detectedCurrency = getUserCurrency();
            if (detectedCurrency) {
              if (process.env.NODE_ENV === 'development') {
                console.log(`📍 Using browser locale currency: ${detectedCurrency}`);
              }
              setCurrency(detectedCurrency);
              if (typeof window !== 'undefined') {
                localStorage.setItem('selectedCurrency', detectedCurrency);
                localStorage.setItem('currencyAutoDetected', 'true');
              }
            }
          } catch (error) {
            // Final fallback to USD
            if (process.env.NODE_ENV === 'development') {
              console.warn('⚠️ Browser locale detection failed, using USD:', error.message);
            }
            setCurrency('USD');
            if (typeof window !== 'undefined') {
              localStorage.setItem('selectedCurrency', 'USD');
              localStorage.setItem('currencyAutoDetected', 'true');
            }
          }
        };
        
        detectCurrencyFromLocation();
      } else if (savedCurrency) {
        // User manually selected, use saved currency
        if (process.env.NODE_ENV === 'development') {
          console.log(`💾 Using manually selected currency: ${savedCurrency}`);
        }
        setCurrency(savedCurrency);
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
        if (process.env.NODE_ENV === 'development') {
          console.error('Error loading exchange rates:', error);
        }
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
      localStorage.setItem('currencyManuallySelected', 'true'); // Mark as manually selected
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

