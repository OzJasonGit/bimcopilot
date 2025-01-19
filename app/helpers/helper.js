export const LINKEDIN_STATE = process.env.LINKEDIN_STATE;
const LINKEDIN_SCOPE = process.env.LINKEDIN_SCOPE;
const LINKEDIN_REDIRECT_URI = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI;
const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;

export const getURLWithQueryParams = (base, params) => {
  const query = Object.entries(params)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&");

  return `${base}?${query}`;
};

export const LINKEDIN_URL = getURLWithQueryParams(
    "https://www.linkedin.com/oauth/v2/authorization",
    {
      response_type: "code",
      scope: LINKEDIN_SCOPE,
      client_id: LINKEDIN_CLIENT_ID,
      redirect_uri: LINKEDIN_REDIRECT_URI,
      state: LINKEDIN_STATE,
    }
  );
  
