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
  // Get client IP from headers (for production)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const clientIp = forwarded ? forwarded.split(',')[0] : realIp || null;
  
  // Try each API in sequence until one works
  for (const api of GEOLOCATION_APIS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout per API

      // Build URL - some APIs support IP parameter
      let apiUrl = api.url;
      if (clientIp && api.url.includes('ipapi.co')) {
        apiUrl = `https://ipapi.co/${clientIp}/json/`;
      }

      const response = await fetch(apiUrl, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; CurrencyDetector/1.0)',
        },
        // Add cache control for production
        cache: 'no-store',
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        console.log(`[detect-country] API ${api.url} failed with status ${response.status}`);
        continue; // Try next API
      }

      const data = await response.json();
      
      // Check for error responses
      if (data.error || data.status === 'fail') {
        console.log(`[detect-country] API ${api.url} returned error:`, data.error || data.message);
        continue;
      }
      
      const parsed = api.parser(data);
      
      if (parsed.countryCode) {
        const countryCode = parsed.countryCode.toUpperCase();
        
        // Get currency from country code mapping
        const currencyCode = COUNTRY_TO_CURRENCY[countryCode] || parsed.currency || 'USD';
        
        console.log(`[detect-country] ✅ Detected country: ${countryCode}, currency: ${currencyCode}`);
        
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
      // Log errors in production for debugging
      console.log(`[detect-country] API ${api.url} error:`, error.message || error.name);
      continue; // Try next API
    }
  }
  
  // All APIs failed - return failure but don't throw error
  console.log('[detect-country] All geolocation APIs failed, returning fallback');
  return NextResponse.json({
    success: false,
    country: null,
    currency: null,
    currencyCode: null,
    error: 'All geolocation APIs failed',
  }, { status: 200 }); // Return 200 so client can handle gracefully
}

