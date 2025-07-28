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
      optimizePackageImports: [
        'lucide-react', 
        '@radix-ui/react-icons',
        '@fortawesome/fontawesome-svg-core',
        '@fortawesome/free-solid-svg-icons',
        '@fortawesome/free-brands-svg-icons',
        'react-icons',
        'antd',
        'd3',
        'chart.js',
        'react-chartjs-2',
        'recharts',
        'framer-motion'
      ],
      webpackBuildWorker: true,
      turbo: {
        rules: {
          '*.svg': {
            loaders: ['@svgr/webpack'],
            as: '*.js',
          },
        },
      },
    },
    compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
    },
    compress: true,
    poweredByHeader: false,
    generateEtags: false,
    swcMinify: true,
    webpack: (config, { dev, isServer }) => {
      // Optimize bundle splitting
      if (!dev && !isServer) {
        config.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              enforce: true,
            },
            // Separate large libraries
            antd: {
              test: /[\\/]node_modules[\\/]antd[\\/]/,
              name: 'antd',
              chunks: 'all',
              priority: 20,
            },
            d3: {
              test: /[\\/]node_modules[\\/]d3[\\/]/,
              name: 'd3',
              chunks: 'all',
              priority: 20,
            },
            charts: {
              test: /[\\/]node_modules[\\/](chart\.js|react-chartjs-2|recharts)[\\/]/,
              name: 'charts',
              chunks: 'all',
              priority: 20,
            },
            ui: {
              test: /[\\/]node_modules[\\/](@radix-ui|lucide-react|framer-motion)[\\/]/,
              name: 'ui',
              chunks: 'all',
              priority: 15,
            },
          },
        };
      }

      // Note: Image optimization is handled by Next.js built-in image optimization

      return config;
    },
    env: {
      LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
      LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET,
      LINKEDIN_REDIRECT_URI: process.env.LINKEDIN_REDIRECT_URI,
      LINKEDIN_STATE: process.env.LINKEDIN_STATE,
      LINKEDIN_SCOPE: process.env.LINKEDIN_SCOPE,
    },
  };

export default withNextVideo(nextConfig);