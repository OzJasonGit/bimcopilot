
'use client';
import { LINKEDIN_URL } from "@/app/helpers/helper";
import { useEffect,  useState } from "react";


export default function Home() {
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const accessToken = params.get('accessToken');
    const firstName = params.get('firstName');
    const lastName = params.get('lastName');

    if (accessToken) {
      localStorage.setItem('linkedinAccessToken', accessToken);
      console.log('Access Token Saved:', accessToken);
      console.log(`Welcome ${firstName} ${lastName}!`);
    }
  }, []);

  const handleSignIn = () => {
    console.log("Redirecting to:", LINKEDIN_URL); // Log the URL
    window.location.href = LINKEDIN_URL;
  };
  
  
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <button disabled={loading} onClick={handleSignIn} style={{ backgroundColor: "white", color: "black", padding: 10 }}>
      {loading ? 'logging...' : 'login to LinkedIn'}
      </button>

    </main>
  );
}

