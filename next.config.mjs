import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
      formats: ['image/webp', 'image/avif'],
      deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
      imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
      minimumCacheTTL: 60,
      dangerouslyAllowSVG: true,
      contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    experimental: {
      optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: false,
    env: {
      LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
      LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
      LINKEDIN_REDIRECT_URI: process.env.LINKEDIN_REDIRECT_URI,
      LINKEDIN_STATE: process.env.LINKEDIN_STATE,
      LINKEDIN_SCOPE: process.env.LINKEDIN_SCOPE,
    },
  };

export default withNextVideo(nextConfig);