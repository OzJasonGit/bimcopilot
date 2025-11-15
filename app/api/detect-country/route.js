import { NextResponse } from 'next/server';

// Free IP geolocation APIs - try multiple services
const GEOLOCATION_APIS = [
  {
    url: 'https://api.country.is/',
    parser: (data) => ({
      countryCode: data.country,
      countryName: null,
      currency: null,
    }),
  },
  {
    url: 'https://ipapi.co/json/',
    parser: (data) => ({
      countryCode: data.country_code,
      countryName: data.country_name,
      currency: data.currency_code || data.currency,
    }),
  },
  {
    url: 'https://ipinfo.io/json',
    parser: (data) => ({
      countryCode: data.country,
      countryName: null,
      currency: null,
    }),
  },
];

// Country to currency mapping
const COUNTRY_TO_CURRENCY = {
  'US': 'USD', 'GB': 'GBP', 'CA': 'CAD', 'AU': 'AUD', 'NZ': 'NZD',
  'DE': 'EUR', 'FR': 'EUR', 'IT': 'EUR', 'ES': 'EUR', 'NL': 'EUR',
  'BE': 'EUR', 'AT': 'EUR', 'PT': 'EUR', 'FI': 'EUR', 'IE': 'EUR',
  'GR': 'EUR', 'LU': 'EUR', 'MT': 'EUR', 'CY': 'EUR', 'SK': 'EUR',
  'SI': 'EUR', 'EE': 'EUR', 'LV': 'EUR', 'LT': 'EUR',
  'JP': 'JPY', 'CN': 'CNY', 'KR': 'KRW', 'IN': 'INR', 'BR': 'BRL',
  'MX': 'MXN', 'SG': 'SGD', 'HK': 'HKD', 'TW': 'TWD', 'TH': 'THB',
  'MY': 'MYR', 'ID': 'IDR', 'PH': 'PHP', 'VN': 'VND', 'PK': 'PKR',
  'BD': 'BDT', 'LK': 'LKR', 'NP': 'NPR', 'MM': 'MMK', 'KH': 'KHR',
  'LA': 'LAK',
  'CH': 'CHF', 'SE': 'SEK', 'NO': 'NOK', 'DK': 'DKK', 'PL': 'PLN',
  'CZ': 'CZK', 'HU': 'HUF', 'RO': 'RON', 'BG': 'BGN', 'HR': 'HRK',
  'RS': 'RSD', 'IS': 'ISK',
  'AE': 'AED', 'SA': 'SAR', 'IL': 'ILS', 'EG': 'EGP', 'JO': 'JOD',
  'LB': 'LBP', 'QA': 'QAR', 'KW': 'KWD', 'BH': 'BHD', 'OM': 'OMR',
  'IR': 'IRR', 'IQ': 'IQD',
  'ZA': 'ZAR', 'NG': 'NGN', 'KE': 'KES', 'ET': 'ETB', 'GH': 'GHS',
  'UG': 'UGX', 'TZ': 'TZS', 'MA': 'MAD',
  'AR': 'ARS', 'CL': 'CLP', 'CO': 'COP', 'PE': 'PEN', 'UY': 'UYU',
  'VE': 'VES', 'BO': 'BOB', 'PY': 'PYG', 'GT': 'GTQ', 'CR': 'CRC',
  'PA': 'PAB', 'DO': 'DOP', 'JM': 'JMD', 'TT': 'TTD',
  'FJ': 'FJD', 'PG': 'PGK',
  'RU': 'RUB', 'TR': 'TRY', 'UA': 'UAH', 'BY': 'BYN', 'KZ': 'KZT',
  'UZ': 'UZS', 'GE': 'GEL', 'AM': 'AMD', 'AZ': 'AZN', 'KG': 'KGS',
  'TJ': 'TJS', 'TM': 'TMT', 'MD': 'MDL', 'BA': 'BAM', 'MK': 'MKD',
  'AL': 'ALL',
};

export async function GET(request) {
  // Try each API in sequence until one works
  for (const api of GEOLOCATION_APIS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000); // 4 second timeout per API

      const response = await fetch(api.url, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (process.env.NODE_ENV === 'development') {
          console.log(`API ${api.url} failed with status ${response.status}, trying next...`);
        }
        continue; // Try next API
      }

      const data = await response.json();
      const parsed = api.parser(data);
      
      if (parsed.countryCode) {
        const countryCode = parsed.countryCode.toUpperCase();
        
        // Get currency from country code mapping
        const currencyCode = COUNTRY_TO_CURRENCY[countryCode] || parsed.currency || 'USD';
        
        if (process.env.NODE_ENV === 'development') {
          console.log(`✅ Detected country: ${countryCode}, currency: ${currencyCode}`);
        }
        
        // Return country and currency info
        return NextResponse.json({
          success: true,
          country: countryCode,
          countryName: parsed.countryName,
          currency: currencyCode,
          currencyCode: currencyCode,
        });
      }
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.log(`API ${api.url} error:`, error.message);
      }
      continue; // Try next API
    }
  }
  
  // All APIs failed
  if (process.env.NODE_ENV === 'development') {
    console.error('All geolocation APIs failed');
  }
  return NextResponse.json({
    success: false,
    country: null,
    currency: null,
    currencyCode: null,
    error: 'All geolocation APIs failed',
  });
}

