import { NextResponse } from 'next/server';

// Using exchangerate-api.com - free tier, no API key required for basic usage
// Alternative: You can also use fixer.io, exchangerate.host, or other free APIs
const EXCHANGE_RATE_API = 'https://api.exchangerate-api.com/v4/latest/USD';

export async function GET(request) {
  try {
    // Fetch exchange rates with timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(EXCHANGE_RATE_API, {
      signal: controller.signal,
      next: { revalidate: 3600 }, // Revalidate every hour (Next.js caching)
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();
    
    // Validate response structure
    if (!data.rates || typeof data.rates !== 'object') {
      throw new Error('Invalid response format from exchange rate API');
    }
    
    // Return rates with timestamp
    return NextResponse.json({
      success: true,
      base: data.base || 'USD',
      rates: data.rates,
      timestamp: Date.now(),
    });
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching exchange rates:', error.message);
    }
    
    // Return fallback rates (approximate rates, should be updated periodically)
    const fallbackRates = {
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

    return NextResponse.json({
      success: false,
      base: 'USD',
      rates: fallbackRates,
      timestamp: Date.now(),
      error: 'Using fallback rates',
      message: error.message,
    });
  }
}

