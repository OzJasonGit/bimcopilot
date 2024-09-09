import { Inter } from "next/font/google";
import "./globals.css";
import Provider from "./utils/Provider";
import localFont from 'next/font/local';


const avant_garde_bold = localFont
  ({
    src: '../fonts/font.woff2',
    variable: '--font-avant_garde_bold',
  });


const avant_garde_medium = localFont
  ({ 
    src: '../fonts/avant_garde_medium.woff2',
    variable: '--font-avant_garde_medium',
  });

const geistmono_regular = localFont
  ({ 
    src: '../fonts/geistmono_regular.woff2',
    variable: '--font-geistmono_regular',
  });


  const geistmono_semibold = localFont
  ({ 
    src: '../fonts/geistmono_semibold.woff2',
    variable: '--font-geistmono_semibold',
  });


export const metadata = {
  title: "bimcopilot.com",
  description: "Sustainable, Richer Architects through AI, Analytics and Automation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${avant_garde_bold.variable}  ${avant_garde_medium.variable} ${geistmono_regular.variable}   ${geistmono_semibold.variable}`}
            >
      
          <>{children}</>
        
      </body>
    </html>
  );
}
