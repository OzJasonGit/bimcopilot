'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUserCurrency, formatPriceWithCurrencySync, getExchangeRates } from '@/app/utils/currency';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  // Always start with USD to prevent hydration mismatch
  const [currency, setCurrency] = useState('USD');
  const [exchangeRates, setExchangeRates] = useState(null);
  const [ratesLoading, setRatesLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  // Single effect to handle all currency initialization after hydration
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Mark as hydrated first
    setIsHydrated(true);
    
    // Use requestIdleCallback or setTimeout to defer state updates and prevent hydration issues
    const initCurrency = () => {
      let savedCurrency = localStorage.getItem('selectedCurrency');
      const wasManuallySelected = localStorage.getItem('currencyManuallySelected') === 'true';
      const wasAutoDetected = localStorage.getItem('currencyAutoDetected') === 'true';
      
      // Debug: Store detection info in window for debugging (survives console removal)
      if (typeof window !== 'undefined') {
        window.__currencyDebug = {
          savedCurrency,
          wasManuallySelected,
          wasAutoDetected,
          timestamp: new Date().toISOString(),
        };
      }
      
      // If user manually selected, use saved currency immediately
      if (wasManuallySelected && savedCurrency) {
        console.log(`💾 Using manually selected currency: ${savedCurrency}`);
        setCurrency(savedCurrency);
        if (typeof window !== 'undefined') {
          window.__currencyDebug.result = `manual: ${savedCurrency}`;
          window.__currencyDebug.currentCurrency = savedCurrency;
        }
        return;
      }
      
      // Always try IP detection first (even if we have a saved currency)
      // This ensures we get the correct currency based on actual location
      // Only skip if manually selected
      
      // If saved currency is USD and was auto-detected, it might be incorrect - force re-detection
      if (savedCurrency === 'USD' && wasAutoDetected && !wasManuallySelected) {
        // Clear incorrect USD detection and force re-detection
        if (typeof window !== 'undefined') {
          localStorage.removeItem('currencyAutoDetected');
          localStorage.removeItem('selectedCurrency');
          window.__currencyDebug.forceRedetect = 'USD was incorrectly detected, forcing re-detection';
        }
        savedCurrency = null; // Clear so detection runs
      }
      
      // Use saved currency temporarily while detecting (prevents flash) only if it's not USD
      if (savedCurrency && savedCurrency !== 'USD') {
        setCurrency(savedCurrency);
      }
      
      // Try to detect from user's location
      const detectCurrencyFromLocation = async () => {
        try {
          console.log('🌍 Detecting currency from your IP location...');
          if (typeof window !== 'undefined') {
            window.__currencyDebug.detecting = true;
            window.__currencyDebug.apiCallStart = new Date().toISOString();
          }
          
          // Add timeout to prevent hanging
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000); // 8 second timeout
          
          // Use absolute URL for production
          const apiUrl = typeof window !== 'undefined' 
            ? `${window.location.origin}/api/detect-country`
            : '/api/detect-country';
          
          const response = await fetch(apiUrl, {
            cache: 'no-store',
            method: 'GET',
            signal: controller.signal,
            headers: {
              'Accept': 'application/json',
            },
          });
          
          clearTimeout(timeoutId);
          
          if (typeof window !== 'undefined') {
            window.__currencyDebug.apiResponseStatus = response.status;
            window.__currencyDebug.apiCallEnd = new Date().toISOString();
          }
          
          // Even if response is not ok, try to parse JSON (might have error details)
          let data;
          try {
            data = await response.json();
            if (typeof window !== 'undefined') {
              window.__currencyDebug.apiResponse = data;
            }
          } catch (parseError) {
            throw new Error(`Failed to parse response: ${response.status} ${response.statusText}`);
          }
          
          if (data && data.success && data.currencyCode) {
            console.log(`✅ Auto-selected currency: ${data.currencyCode} (detected from ${data.countryName || data.country || 'your location'})`);
            setCurrency(data.currencyCode);
            if (typeof window !== 'undefined') {
              localStorage.setItem('selectedCurrency', data.currencyCode);
              localStorage.setItem('currencyAutoDetected', 'true');
              window.__currencyDebug.result = `ip-detected: ${data.currencyCode}`;
              window.__currencyDebug.country = data.country || data.countryName;
              window.__currencyDebug.finalCurrency = data.currencyCode;
            }
            return;
          } else {
            console.warn('⚠️ Location detection returned but no currency found:', data);
            if (typeof window !== 'undefined') {
              window.__currencyDebug.ipDetectionFailed = data;
            }
            // Don't throw, fall through to browser locale detection
          }
        } catch (error) {
          // Log errors (including in production for debugging)
          if (error.name !== 'AbortError') {
            console.warn('⚠️ IP location detection failed:', error.message);
            if (typeof window !== 'undefined') {
              window.__currencyDebug.ipError = error.message;
              window.__currencyDebug.ipErrorName = error.name;
              window.__currencyDebug.ipErrorStack = error.stack;
            }
          } else {
            if (typeof window !== 'undefined') {
              window.__currencyDebug.ipError = 'Request timeout (8s)';
            }
          }
        }
        
        // Fallback to browser locale detection (always runs if IP detection fails)
        try {
          const detectedCurrency = getUserCurrency();
          if (detectedCurrency && detectedCurrency !== 'USD') {
            console.log(`📍 Using browser locale currency: ${detectedCurrency}`);
            setCurrency(detectedCurrency);
            if (typeof window !== 'undefined') {
              localStorage.setItem('selectedCurrency', detectedCurrency);
              localStorage.setItem('currencyAutoDetected', 'true');
              window.__currencyDebug.result = `browser-locale: ${detectedCurrency}`;
              window.__currencyDebug.finalCurrency = detectedCurrency;
            }
          } else {
            // If browser locale also returns USD, try to get more specific locale info
            const locale = navigator.language || navigator.userLanguage || 'en-US';
            const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
            
            console.warn(`⚠️ Browser locale returned USD. Locale: ${locale}, Timezone: ${timezone}`);
            if (typeof window !== 'undefined') {
              window.__currencyDebug.browserLocale = locale;
              window.__currencyDebug.timezone = timezone;
            }
            
            // Try timezone-based detection as last resort
            if (timezone && (timezone.includes('Karachi') || timezone.includes('Islamabad') || timezone.includes('Lahore'))) {
              console.log('📍 Detected Pakistan from timezone, using PKR');
              setCurrency('PKR');
              if (typeof window !== 'undefined') {
                localStorage.setItem('selectedCurrency', 'PKR');
                localStorage.setItem('currencyAutoDetected', 'true');
                window.__currencyDebug.result = `timezone-detected: PKR`;
                window.__currencyDebug.finalCurrency = 'PKR';
              }
              return;
            }
            
            // Final fallback to USD
            console.warn('⚠️ All detection methods failed, using USD');
            setCurrency('USD');
            if (typeof window !== 'undefined') {
              localStorage.setItem('selectedCurrency', 'USD');
              localStorage.setItem('currencyAutoDetected', 'true');
              window.__currencyDebug.result = `fallback-usd`;
              window.__currencyDebug.finalCurrency = 'USD';
            }
          }
        } catch (error) {
          // Final fallback to USD
          console.warn('⚠️ Browser locale detection failed, using USD:', error.message);
          setCurrency('USD');
          if (typeof window !== 'undefined') {
            localStorage.setItem('selectedCurrency', 'USD');
            localStorage.setItem('currencyAutoDetected', 'true');
            window.__currencyDebug.result = `fallback-usd-error`;
            window.__currencyDebug.error = error.message;
            window.__currencyDebug.finalCurrency = 'USD';
          }
        }
      };
      
      detectCurrencyFromLocation();
    };
    
    // Use requestIdleCallback if available, otherwise setTimeout to defer after hydration
    if (typeof window.requestIdleCallback !== 'undefined') {
      window.requestIdleCallback(initCurrency, { timeout: 1000 });
    } else {
      setTimeout(initCurrency, 0);
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
  // Only format after hydration to prevent hydration mismatches
  const formatPrice = useCallback((price) => {
    if (price === null || price === undefined) return '';
    // During SSR or before hydration, return USD format to prevent mismatch
    if (!isHydrated) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price);
    }
    // Use synchronous version that uses cached rates from localStorage
    return formatPriceWithCurrencySync(price, currency);
  }, [currency, isHydrated]);

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

