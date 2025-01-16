"use client";
import React, { useState } from "react";

export default function SocialMedia() {
  const handleAuth = () => {
    const clientId = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
    const redirectUri = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI;


    const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=profile%20email%20w_member_social`;
    window.location.href = authUrl;
  };

  return (
    <div>
      <button onClick={handleAuth}>Connect LinkedIn</button>
    </div>
  );
}
