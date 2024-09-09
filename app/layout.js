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

const geist_mono_regular = localFont
  ({ 
    src: '../fonts/GeistMono-Regular.woff2',
    variable: '--font-GeistMono-Regular',
  });


export const metadata = {
  title: "bimcopilot.com",
  description: "Sustainable, Richer Architects through AI, Analytics and Automation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${avant_garde_bold.variable}  ${avant_garde_medium.variable} ${geist_mono_regular.variable}`}
            >
      
          <>{children}</>
        
      </body>
    </html>
  );
}
