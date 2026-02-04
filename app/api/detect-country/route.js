import { NextResponse } from 'next/server';

// Free IP geolocation APIs - try multiple services (order: most reliable first)
const GEOLOCATION_APIS = [
  {
    id: 'apip.cc',
    url: 'https://apip.cc/json',
    urlWithIp: (ip) => `https://apip.cc/api-json/${ip}`,
    parser: (data) => ({
      countryCode: data.CountryCode || data.country_code,
      countryName: data.CountryName || data.country_name,
      currency: data.Currency || data.currency,
    }),
  },
  {
    id: 'ipwho.is',
    url: 'https://ipwho.is/',
    urlWithIp: (ip) => `https://ipwho.is/${encodeURIComponent(ip)}`,
    parser: (data) => ({
      countryCode: data.country_code,
      countryName: data.country,
      currency: null,
    }),
  },
  {
    id: 'ip-api.com',
    url: 'http://ip-api.com/json/?fields=status,country,countryCode',
    urlWithIp: (ip) => `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,countryCode`,
    parser: (data) => ({
      countryCode: data.countryCode,
      countryName: data.country,
      currency: null,
    }),
  },
  {
    id: 'ipinfo.io',
    url: 'https://ipinfo.io/json',
    urlWithIp: (ip) => `https://ipinfo.io/${encodeURIComponent(ip)}/json`,
    parser: (data) => ({
      countryCode: data.country,
      countryName: null,
      currency: null,
    }),
  },
  {
    id: 'ipapi.co',
    url: 'https://ipapi.co/json/',
    urlWithIp: (ip) => `https://ipapi.co/${encodeURIComponent(ip)}/json/`,
    parser: (data) => ({
      countryCode: data.country_code,
      countryName: data.country_name,
      currency: data.currency_code || data.currency,
    }),
  },
];

// Don't send localhost IP to APIs (they often 404/403); use "current IP" endpoint instead
function isLocalhost(ip) {
  if (!ip) return true;
  const s = String(ip).trim().toLowerCase();
  return s === '::1' || s === '127.0.0.1' || s === 'localhost';
}

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
  const forwarded = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const cfConnectingIp = request.headers.get('cf-connecting-ip');
  const clientIp = cfConnectingIp || (forwarded ? forwarded.split(',')[0].trim() : null) || realIp || null;
  const useClientIp = clientIp && !isLocalhost(clientIp);

  for (const api of GEOLOCATION_APIS) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const apiUrl = useClientIp && api.urlWithIp
        ? api.urlWithIp(clientIp)
        : api.url;

      const response = await fetch(apiUrl, {
        signal: controller.signal,
        headers: {
          Accept: 'application/json',
          'User-Agent': 'Mozilla/5.0 (compatible; Bimcopilot/1.0)',
        },
        cache: 'no-store',
      });

      clearTimeout(timeoutId);

      if (!response.ok) continue;

      const data = await response.json();
      if (data.error || data.status === 'fail' || (data.success === false && !data.country_code)) continue;

      const parsed = api.parser(data);
      if (!parsed.countryCode) continue;

      const countryCode = parsed.countryCode.toUpperCase();
      const currencyCode = COUNTRY_TO_CURRENCY[countryCode] || parsed.currency || 'USD';

      return NextResponse.json({
        success: true,
        country: countryCode,
        countryName: parsed.countryName,
        currency: currencyCode,
        currencyCode: currencyCode,
      });
    } catch {
      continue;
    }
  }

  return NextResponse.json({
    success: false,
    country: null,
    currency: null,
    currencyCode: null,
    error: 'All geolocation APIs failed',
  }, { status: 200 });
}

