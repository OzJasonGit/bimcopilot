"use client";
import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

function ListItem({ title, children, href, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium text-stone-50">{title}</div>
          <p className="text-stone-400 line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}

export function ShadCN_Header() {
  return (
    <div className="dark-theme-nav" style={{ color: '#f5f5f4' }}>
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="bg-transparent">
          {/* Services Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className="text-stone-50 bg-transparent hover:bg-stone-700/30 font-avant_garde_bold border-none shadow-none data-[state=open]:bg-stone-700/30 data-[state=open]:text-stone-50 focus:bg-stone-700/30 focus:text-stone-50"
              style={{ 
                color: '#f5f5f4', 
                fontSize: '14px', 
                backgroundColor: 'transparent !important',
                border: 'none !important',
                boxShadow: 'none !important'
              }}
            >
              Services
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-stone-900 border-stone-700">
              <ul className="grid w-[300px] gap-2 p-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/services" className="flex flex-col items-start gap-1 p-2 rounded hover:bg-stone-800/50">
                      <div className="font-avant_garde_bold text-stone-50 text-sm">Our Services</div>
                      <div className="text-stone-400 text-xs">
                        RIBA and ARB registered architects specializing in BIM solutions
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Shop/Products Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className="text-stone-50 bg-transparent hover:bg-stone-700/30 font-avant_garde_bold border-none shadow-none data-[state=open]:bg-stone-700/30 data-[state=open]:text-stone-50 focus:bg-stone-700/30 focus:text-stone-50"
              style={{ 
                color: '#f5f5f4', 
                fontSize: '14px', 
                backgroundColor: 'transparent !important',
                border: 'none !important',
                boxShadow: 'none !important'
              }}
            >
              Shop
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-stone-900 border-stone-700">
              <ul className="grid w-[300px] gap-2 p-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/products" className="flex flex-col items-start gap-1 p-2 rounded hover:bg-stone-800/50">
                      <div className="font-avant_garde_bold text-stone-50 text-sm">All Products</div>
                      <div className="text-stone-400 text-xs">
                        Browse our BIM and technology products
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Copilot Dashboard Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className="text-stone-50 bg-transparent hover:bg-stone-700/30 font-avant_garde_bold border-none shadow-none data-[state=open]:bg-stone-700/30 data-[state=open]:text-stone-50 focus:bg-stone-700/30 focus:text-stone-50"
              style={{ 
                color: '#f5f5f4', 
                fontSize: '14px', 
                backgroundColor: 'transparent !important',
                border: 'none !important',
                boxShadow: 'none !important'
              }}
            >
              Dashboard
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-stone-900 border-stone-700">
              <ul className="grid w-[300px] gap-2 p-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/copilot_dashboard" className="flex flex-col items-start gap-1 p-2 rounded hover:bg-stone-800/50">
                      <div className="font-avant_garde_bold text-stone-50 text-sm">Copilot Dashboard</div>
                      <div className="text-stone-400 text-xs">
                        Access your BIM tools and workspace
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/copilot_real_estate" className="flex flex-col items-start gap-1 p-2 rounded hover:bg-stone-800/50">
                      <div className="font-avant_garde_bold text-stone-50 text-sm">Real Estate</div>
                      <div className="text-stone-400 text-xs">
                        Real estate specific tools and features
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {/* Blog/Stories Menu */}
          <NavigationMenuItem>
            <NavigationMenuTrigger 
              className="text-stone-50 bg-transparent hover:bg-stone-700/30 font-avant_garde_bold border-none shadow-none data-[state=open]:bg-stone-700/30 data-[state=open]:text-stone-50 focus:bg-stone-700/30 focus:text-stone-50"
              style={{ 
                color: '#f5f5f4', 
                fontSize: '14px', 
                backgroundColor: 'transparent !important',
                border: 'none !important',
                boxShadow: 'none !important'
              }}
            >
              Stories
            </NavigationMenuTrigger>
            <NavigationMenuContent className="bg-stone-900 border-stone-700">
              <ul className="grid w-[300px] gap-2 p-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/bloghome" className="flex flex-col items-start gap-1 p-2 rounded hover:bg-stone-800/50">
                      <div className="font-avant_garde_bold text-stone-50 text-sm">Our Blog</div>
                      <div className="text-stone-400 text-xs">
                        Latest insights on BIM, AI, and architecture
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
     
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}