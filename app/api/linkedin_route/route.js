import { NextRequest, NextResponse } from 'next/server';
import fetch from 'node-fetch'; // npm add node-fetch

export async function GET(req) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');

  if (!code || !state) {
    return NextResponse.json({ error: 'Authorization code or state missing' }, { status: 400 });
  }

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
    scope: process.env.LINKEDIN_SCOPE
  });

  try {
    const tokenResponse = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const tokenData = await tokenResponse.json();

    if (tokenResponse.ok) {
      const accessToken = tokenData.access_token;

      const profileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const profileData = await profileResponse.json();

      const userProfile = {
        firstName: profileData.given_name,
        lastName: profileData.family_name,
        email: profileData.email,
        linkedInId: profileData.sub,
      };

      // Construct the redirect URL with query parameters
      const redirectUrl = new URL('/', req.url);
      redirectUrl.searchParams.append('accessToken', accessToken);
      redirectUrl.searchParams.append('firstName', userProfile.firstName);
      redirectUrl.searchParams.append('lastName', userProfile.lastName);
      redirectUrl.searchParams.append('email', userProfile.email);

      return NextResponse.redirect(redirectUrl.toString());
    } else {
      return NextResponse.json({ error: tokenData.error_description || 'Failed to get access token' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error exchanging authorization code:', error);
    return NextResponse.json({ error: 'Error exchanging authorization code' }, { status: 500 });
  }
}



