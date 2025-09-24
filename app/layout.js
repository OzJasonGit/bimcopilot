
import "./globals.css";
import localFont from 'next/font/local';
import dynamic from 'next/dynamic';

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

const marginDemo = localFont
({ 
  src: '../fonts/MarginDemo-7B6ZE',
  variable: '--font-MarginDemo',
  display: 'swap',
});

export const metadata = {
  title: "bimcopilot.com",
  description: "Sustainable, Richer Architects through AI, Analytics and Automation",
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
          rel="dns-prefetch" 
          href="//res.cloudinary.com"
        />
        <link
          rel="preconnect" 
          href="//res.cloudinary.com"
        />
      </head>
      <body className={`${avant_garde_bold.variable}  ${avant_garde_medium.variable} ${geistmono_regular.variable}   ${geistmono_semibold.variable} ${geist_regular.variable} ${geist_semibold.variable} ${geist_medium.variable} ${marginDemo.variable}`}
            >
        <PerformanceMonitor />
        <>{children}</>
      </body>
    </html>
  );
}
