/**
 * Currency utility functions
 * Detects user's currency based on browser locale and formats prices accordingly
 * Includes exchange rate fetching and currency conversion
 */

// Cache for exchange rates
let exchangeRatesCache = null;
let exchangeRatesTimestamp = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

/**
 * Fetches exchange rates from the API
 * @returns {Promise<Object>} Exchange rates object
 */
async function fetchExchangeRates() {
  try {
    const response = await fetch('/api/exchange-rates');
    const data = await response.json();
    
    if (data.success && data.rates) {
      return data.rates;
    }
    
    // Return fallback rates if API fails
    return getFallbackRates();
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    return getFallbackRates();
  }
}

/**
 * Gets fallback exchange rates (used when API fails)
 * @returns {Object} Fallback exchange rates
 */
function getFallbackRates() {
  return {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    CAD: 1.35,
    AUD: 1.52,
    JPY: 150,
    CNY: 7.2,
    INR: 83,
    BRL: 4.95,
    MXN: 17,
    KRW: 1330,
    SGD: 1.34,
    HKD: 7.82,
    NZD: 1.64,
    CHF: 0.88,
    SEK: 10.5,
    NOK: 10.7,
    DKK: 6.87,
    PLN: 4.0,
    RUB: 92,
    TRY: 32,
    ZAR: 18.5,
    AED: 3.67,
    SAR: 3.75,
  };
}

/**
 * Gets exchange rates (with caching)
 * @returns {Promise<Object>} Exchange rates object
 */
export async function getExchangeRates() {
  const now = Date.now();
  
  // Return cached rates if still valid
  if (exchangeRatesCache && exchangeRatesTimestamp && (now - exchangeRatesTimestamp) < CACHE_DURATION) {
    return exchangeRatesCache;
  }
  
  // Check localStorage for cached rates
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem('exchangeRates');
      const cachedTimestamp = localStorage.getItem('exchangeRatesTimestamp');
      
      if (cached && cachedTimestamp) {
        const cachedTime = parseInt(cachedTimestamp, 10);
        if (now - cachedTime < CACHE_DURATION) {
          exchangeRatesCache = JSON.parse(cached);
          exchangeRatesTimestamp = cachedTime;
          return exchangeRatesCache;
        }
      }
    } catch (e) {
      console.error('Error reading cached exchange rates:', e);
    }
  }
  
  // Fetch new rates
  const rates = await fetchExchangeRates();
  
  // Cache the rates
  exchangeRatesCache = rates;
  exchangeRatesTimestamp = now;
  
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('exchangeRates', JSON.stringify(rates));
      localStorage.setItem('exchangeRatesTimestamp', now.toString());
    } catch (e) {
      console.error('Error caching exchange rates:', e);
    }
  }
  
  return rates;
}

/**
 * Converts a price from USD to target currency
 * @param {number} priceUSD - Price in USD
 * @param {string} targetCurrency - Target currency code
 * @param {Object} rates - Optional exchange rates (if not provided, will fetch)
 * @returns {Promise<number>} Converted price
 */
export async function convertPrice(priceUSD, targetCurrency, rates = null) {
  if (!priceUSD || priceUSD === 0) return 0;
  if (targetCurrency === 'USD') return priceUSD;
  
  const exchangeRates = rates || await getExchangeRates();
  const rate = exchangeRates[targetCurrency];
  
  if (!rate) {
    console.warn(`Exchange rate not found for ${targetCurrency}, using USD`);
    return priceUSD;
  }
  
  return priceUSD * rate;
}

/**
 * Detects the user's currency code based on their browser locale
 * @returns {string} Currency code (e.g., 'USD', 'EUR', 'GBP')
 */
export function getUserCurrency() {
  if (typeof window === 'undefined') {
    return 'USD'; // Default for server-side rendering
  }

  try {
    // Get the user's locale from browser
    const locale = navigator.language || navigator.userLanguage || 'en-US';
    
    // Use Intl API to get currency for the locale
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'USD', // This is just to get the format, we'll override
    });
    
    // Try to detect currency from locale
    // Common locale-to-currency mappings
    const localeToCurrency = {
      'en-US': 'USD',
      'en-GB': 'GBP',
      'en-CA': 'CAD',
      'en-AU': 'AUD',
      'en-NZ': 'NZD',
      'de-DE': 'EUR',
      'de-AT': 'EUR',
      'fr-FR': 'EUR',
      'fr-CA': 'CAD',
      'es-ES': 'EUR',
      'es-MX': 'MXN',
      'it-IT': 'EUR',
      'nl-NL': 'EUR',
      'pt-BR': 'BRL',
      'pt-PT': 'EUR',
      'ja-JP': 'JPY',
      'ko-KR': 'KRW',
      'zh-CN': 'CNY',
      'zh-TW': 'TWD',
      'ru-RU': 'RUB',
      'pl-PL': 'PLN',
      'sv-SE': 'SEK',
      'no-NO': 'NOK',
      'da-DK': 'DKK',
      'fi-FI': 'EUR',
      'tr-TR': 'TRY',
      'ar-SA': 'SAR',
      'he-IL': 'ILS',
      'hi-IN': 'INR',
      'th-TH': 'THB',
      'vi-VN': 'VND',
      'id-ID': 'IDR',
      'ms-MY': 'MYR',
      'sg-SG': 'SGD',
      'ph-PH': 'PHP',
    };

    // Check exact match first
    if (localeToCurrency[locale]) {
      return localeToCurrency[locale];
    }

    // Check language code match (e.g., 'en' -> 'USD')
    const languageCode = locale.split('-')[0];
    const languageToCurrency = {
      'en': 'USD',
      'de': 'EUR',
      'fr': 'EUR',
      'es': 'EUR',
      'it': 'EUR',
      'nl': 'EUR',
      'pt': 'EUR',
      'ja': 'JPY',
      'ko': 'KRW',
      'zh': 'CNY',
      'ru': 'RUB',
      'pl': 'PLN',
      'sv': 'SEK',
      'no': 'NOK',
      'da': 'DKK',
      'fi': 'EUR',
      'tr': 'TRY',
      'ar': 'SAR',
      'he': 'ILS',
      'hi': 'INR',
      'th': 'THB',
      'vi': 'VND',
      'id': 'IDR',
      'ms': 'MYR',
    };

    if (languageToCurrency[languageCode]) {
      return languageToCurrency[languageCode];
    }

    // Try to get currency from Intl API (may not work in all browsers)
    try {
      const region = new Intl.Locale(locale).region;
      if (region) {
        // This is a simplified approach - in production, you'd want a proper mapping
        const regionToCurrency = {
          'US': 'USD',
          'GB': 'GBP',
          'CA': 'CAD',
          'AU': 'AUD',
          'NZ': 'NZD',
          'DE': 'EUR',
          'FR': 'EUR',
          'ES': 'EUR',
          'IT': 'EUR',
          'NL': 'EUR',
          'BR': 'BRL',
          'PT': 'EUR',
          'JP': 'JPY',
          'KR': 'KRW',
          'CN': 'CNY',
          'TW': 'TWD',
          'RU': 'RUB',
          'PL': 'PLN',
          'SE': 'SEK',
          'NO': 'NOK',
          'DK': 'DKK',
          'FI': 'EUR',
          'TR': 'TRY',
          'SA': 'SAR',
          'IL': 'ILS',
          'IN': 'INR',
          'TH': 'THB',
          'VN': 'VND',
          'ID': 'IDR',
          'MY': 'MYR',
          'SG': 'SGD',
          'PH': 'PHP',
        };
        if (regionToCurrency[region]) {
          return regionToCurrency[region];
        }
      }
    } catch (e) {
      // Intl.Locale might not be available in all browsers
    }

    // Default to USD if we can't determine
    return 'USD';
  } catch (error) {
    console.error('Error detecting currency:', error);
    return 'USD';
  }
}

/**
 * Formats a price in the user's currency
 * Note: This formats the price but doesn't convert it. 
 * For actual conversion, you'd need to fetch exchange rates.
 * 
 * @param {number} price - The price in USD
 * @param {string} currency - Optional currency code (defaults to user's currency)
 * @returns {string} Formatted price string
 */
export function formatPrice(price, currency = null) {
  if (price === null || price === undefined) {
    return '';
  }

  const targetCurrency = currency || getUserCurrency();
  
  try {
    const locale = navigator.language || navigator.userLanguage || 'en-US';
    
    // Format the price in the target currency
    // Note: This assumes prices are stored in USD and just formats them
    // For actual conversion, you'd multiply by exchange rate first
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: targetCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(price);
  } catch (error) {
    console.error('Error formatting price:', error);
    // Fallback formatting
    return `${targetCurrency} ${price.toFixed(2)}`;
  }
}

/**
 * Formats a price with currency symbol only (no conversion)
 * @param {number} price - The price value
 * @param {string} currency - Optional currency code (defaults to user's currency from context or browser)
 * @returns {string} Formatted price with currency symbol
 */
export function formatPriceSimple(price, currency = null) {
  if (price === null || price === undefined) {
    return '';
  }

  // Try to get currency from localStorage first (set by CurrencyContext)
  let targetCurrency = currency;
  if (!targetCurrency && typeof window !== 'undefined') {
    targetCurrency = localStorage.getItem('selectedCurrency') || getUserCurrency();
  } else if (!targetCurrency) {
    targetCurrency = getUserCurrency();
  }
  
  try {
    const locale = navigator.language || navigator.userLanguage || 'en-US';
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: targetCurrency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(price);
  } catch (error) {
    console.error('Error formatting price:', error);
    return `${targetCurrency} ${price.toFixed(2)}`;
  }
}

/**
 * Formats a price with a specific currency code (with conversion)
 * @param {number} priceUSD - The price in USD
 * @param {string} currencyCode - Currency code (e.g., 'USD', 'EUR')
 * @param {Object} rates - Optional exchange rates
 * @returns {Promise<string>} Formatted price with currency symbol
 */
export async function formatPriceWithCurrency(priceUSD, currencyCode, rates = null) {
  if (priceUSD === null || priceUSD === undefined) {
    return '';
  }

  try {
    // Convert price if not USD
    const convertedPrice = await convertPrice(priceUSD, currencyCode, rates);
    
    const locale = navigator.language || navigator.userLanguage || 'en-US';
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(convertedPrice);
  } catch (error) {
    console.error('Error formatting price:', error);
    return `${currencyCode} ${priceUSD.toFixed(2)}`;
  }
}

/**
 * Synchronous version for formatting (uses cached rates or no conversion)
 * @param {number} priceUSD - The price in USD
 * @param {string} currencyCode - Currency code
 * @returns {string} Formatted price
 */
export function formatPriceWithCurrencySync(priceUSD, currencyCode) {
  if (priceUSD === null || priceUSD === undefined) {
    return '';
  }

  try {
    // Try to get cached rates from localStorage
    let convertedPrice = priceUSD;
    if (currencyCode !== 'USD' && typeof window !== 'undefined') {
      try {
        const cached = localStorage.getItem('exchangeRates');
        if (cached) {
          const rates = JSON.parse(cached);
          const rate = rates[currencyCode];
          if (rate) {
            convertedPrice = priceUSD * rate;
          }
        }
      } catch (e) {
        // Use USD price if conversion fails
      }
    }
    
    const locale = navigator.language || navigator.userLanguage || 'en-US';
    const formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formatter.format(convertedPrice);
  } catch (error) {
    console.error('Error formatting price:', error);
    return `${currencyCode} ${priceUSD.toFixed(2)}`;
  }
}

/**
 * React hook to get and use user's currency
 * @returns {object} { currency, formatPrice }
 */
export function useCurrency() {
  if (typeof window === 'undefined') {
    return {
      currency: 'USD',
      formatPrice: (price) => `$${price.toFixed(2)}`,
    };
  }

  const currency = getUserCurrency();
  
  return {
    currency,
    formatPrice: (price) => formatPrice(price, currency),
  };
}

