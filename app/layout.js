
import "./globals.css";
import localFont from 'next/font/local';
import dynamic from 'next/dynamic';

// app/layout.js
import Script from "next/script";
import Analytics from "./analytics";
import { GA_TRACKING_ID } from "../lib/gtag";



// Dynamic import for performance monitor
const PerformanceMonitor = dynamic(() => import('../components/PerformanceMonitor'), {
  ssr: false
});

const avant_garde_bold = localFont
  ({
    src: '../fonts/font.woff2',
    variable: '--font-avant_garde_bold',
    display: 'swap',
  });

const avant_garde_medium = localFont
  ({ 
    src: '../fonts/avant_garde_medium.woff2',
    variable: '--font-avant_garde_medium',
    display: 'swap',
  });

const geistmono_regular = localFont
  ({ 
    src: '../fonts/geistmono_regular.woff2',
    variable: '--font-geistmono_regular',
    display: 'swap',
  });

const geistmono_semibold = localFont
({ 
  src: '../fonts/geistmono_semibold.woff2',
  variable: '--font-geistmono_semibold',
  display: 'swap',
});

const geist_regular = localFont
({ 
  src: '../fonts/geistmono_regular.woff2',
  variable: '--font-geistmono_regular',
  display: 'swap',
});

const geist_semibold = localFont
({ 
  src: '../fonts/geist_semibold.woff2',
  variable: '--font-geist_semibold',
  display: 'swap',
});

const geist_medium = localFont
({ 
  src: '../fonts/geist_medium.woff2',
  variable: '--font-geist_medium',
  display: 'swap',
});

const margin_demo = localFont
({ 
  src: '../fonts/margin_demo.woff2',
  variable: '--font-margin_demo',
  display: 'swap',
});

const calisga_regular = localFont
({ 
  src: '../fonts/calisga_regular.woff2',
  variable: '--font-calisga_regular',
  display: 'swap',
});

export const metadata = {
  title: "bimcopilot.com",
  description: "Sustainable, Richer Architects through BIM, AI, Analytics and Automation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload" 
          href="../fonts/font.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <link
          rel="preload" 
          href="../fonts/avant_garde_medium.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <link
          rel="preload" 
          href="../fonts/geistmono_regular.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <link
          rel="preload" 
          href='../fonts/margin_demo.woff2'
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <link
          rel="preload" 
          href='../fonts/calisga_regular.woff2'
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous"
        />
        <link
          rel="dns-prefetch" 
          href="//res.cloudinary.com"
        />
        <link
          rel="preconnect" 
          href="//res.cloudinary.com"
        />
      </head>
      <body className={`${avant_garde_bold.variable}  ${avant_garde_medium.variable} ${geistmono_regular.variable}   ${geistmono_semibold.variable} ${geist_regular.variable} ${geist_semibold.variable} ${geist_medium.variable} ${margin_demo.variable} ${calisga_regular.variable}`}
            >    
        <>{children}</>

        <PerformanceMonitor />

        <Analytics />

     
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>

        

      </body>
    </html>
  );
}
