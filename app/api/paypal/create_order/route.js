import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { amount, products = [] } = await req.json();

    // Validate amount
    if (!amount || typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    // Validate products array
    if (!Array.isArray(products) || products.length === 0) {
      return NextResponse.json({ error: 'Products array required' }, { status: 400 });
    }

    // Validate each product
    for (const product of products) {
      if (!product.title || typeof product.price !== 'number' || product.price <= 0 || !product.quantity || product.quantity <= 0) {
        return NextResponse.json({ error: 'Invalid product data' }, { status: 400 });
      }
    }

    // 1. Get access token
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const clientSecret = process.env.PAYPAL_CLIENT_SECRET; // Server-side only, never use NEXT_PUBLIC_ for secrets
    const base = process.env.PAYPAL_ENV === 'production' 
      ? 'https://api-m.paypal.com' 
      : 'https://api-m.sandbox.paypal.com';
    
    if (!clientId || !clientSecret) {
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    const tokenRes = await fetch(`${base}/v1/oauth2/token`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });

    if (!tokenRes.ok) {
      const errText = await tokenRes.text();
      return NextResponse.json({
        error: 'Failed to get PayPal access token',
        status: tokenRes.status,
        details: errText,
      }, { status: 500 });
    }

    const tokenData = await tokenRes.json();

    // 2. Create order
    const orderRes = await fetch(`${base}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokenData.access_token}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: amount,
            },
            items: products.map(p => ({
              name: p.title,
              unit_amount: {
                currency_code: 'USD',
                value: p.price,
              },
              quantity: p.quantity,
              description: p.description || '',
              category: 'PHYSICAL_GOODS',
            })),
          },
        ],
      }),
    });

    const orderData = await orderRes.json();

    if (!orderRes.ok) {
      return NextResponse.json({
        error: 'Failed to create PayPal order',
        status: orderRes.status,
        details: orderData,
      }, { status: 500 });
    }

    // Return the order ID and products array
    return NextResponse.json({ id: orderData.id, products });
  } catch (err) {
    return NextResponse.json({
      error: 'Unexpected server error',
      details: err instanceof Error ? err.message : String(err),
    }, { status: 500 });
  }
}
