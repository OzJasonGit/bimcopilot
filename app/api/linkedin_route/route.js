import fetch from "node-fetch";

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "Authorization code is missing" });
  }

  try {
    const response = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.LINKEDIN_REDIRECT_URI,
        client_id: process.env.LINKEDIN_CLIENT_ID,
        client_secret: process.env.LINKEDIN_CLIENT_SECRET,
      }),
    });

    // Log the response status and body for debugging
    console.log("Response Status:", response.status);
    const data = await response.json();
    console.log("Response Data:", data);

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error || "Unknown error occurred" });
    }

    // Successfully retrieved access token
    return res.status(200).json({ accessToken: data.access_token });
    
  } catch (error) {
    console.error("Error fetching access token:", error);
    return res.status(500).json({ error: "Internal server error. Please try again later." });
  }
}
