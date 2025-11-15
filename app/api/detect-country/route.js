import { NextResponse } from 'next/server';

// Free IP geolocation API - no API key required
// Alternative: You can use ipapi.co, ip-api.com, or other free services
const GEOLOCATION_API = 'https://ipapi.co/json/';

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
  try {
    // Fetch location data
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(GEOLOCATION_API, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const countryCode = (data.country_code || data.country || '').toUpperCase();
    
    // Get currency from country code mapping
    const currencyCode = COUNTRY_TO_CURRENCY[countryCode] || data.currency_code || data.currency || 'USD';
    
    // Return country and currency info
    return NextResponse.json({
      success: true,
      country: countryCode,
      countryName: data.country_name,
      currency: currencyCode,
      currencyCode: currencyCode,
    });
  } catch (error) {
    console.error('Error detecting country:', error.message);
    
    // Return null if detection fails (will fall back to browser locale detection)
    return NextResponse.json({
      success: false,
      country: null,
      currency: null,
      currencyCode: null,
      error: error.message,
    });
  }
}

