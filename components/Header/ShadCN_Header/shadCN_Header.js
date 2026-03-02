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
  const triggerClassName =
    "relative h-9 rounded-md border-none bg-transparent px-3 text-[14px] text-stone-50 shadow-none " +
    "font-avant_garde_bold transition-all duration-300 ease-out " +
    "hover:-translate-y-[1px] hover:bg-white/85 hover:text-black " +
    "focus:bg-white/85 focus:text-black focus:outline-none " +
    "data-[state=open]:bg-white/85 data-[state=open]:text-black " +
    "after:absolute after:left-3 after:right-3 after:bottom-1 after:h-px " +
    "after:origin-left after:scale-x-0 after:bg-black/60 after:transition-transform after:duration-300 " +
    "hover:after:scale-x-100 data-[state=open]:after:scale-x-100";

  const dropdownContentClassName =
    "absolute left-1/2 top-full z-50 mt-2 w-[300px] -translate-x-1/2 rounded-xl border border-white/20 bg-stone-900/95 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md";

  const dropdownLinkClassName =
    "group flex flex-col items-start gap-1 rounded-md p-2 " +
    "transition-all duration-200 ease-out hover:bg-stone-800/60";

  return (
    <div className="dark-theme-nav mt-5" style={{ color: '#f5f5f4' }}>
      <NavigationMenu disableViewport>
        <NavigationMenuList className="bg-transparent">
          {/* Services Menu */}
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className={triggerClassName}>
              Services
            </NavigationMenuTrigger>
            <NavigationMenuContent className={dropdownContentClassName}>
              <ul className="grid w-[300px] gap-2 p-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/services" className={dropdownLinkClassName}>
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
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className={triggerClassName}>
              Shop
            </NavigationMenuTrigger>
            <NavigationMenuContent className={dropdownContentClassName}>
              <ul className="grid w-[300px] gap-2 p-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/products" className={dropdownLinkClassName}>
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
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className={triggerClassName}>
              Dashboard
            </NavigationMenuTrigger>
            <NavigationMenuContent className={dropdownContentClassName}>
              <ul className="grid w-[300px] gap-2 p-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/copilot_dashboard" className={dropdownLinkClassName}>
                      <div className="font-avant_garde_bold text-stone-50 text-sm">Copilot Dashboard</div>
                      <div className="text-stone-400 text-xs">
                        Access your BIM tools and workspace
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/copilot_real_estate" className={dropdownLinkClassName}>
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
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className={triggerClassName}>
              Stories
            </NavigationMenuTrigger>
            <NavigationMenuContent className={dropdownContentClassName}>
              <ul className="grid w-[300px] gap-2 p-4">
                <li>
                  <NavigationMenuLink asChild>
                    <Link href="/bloghome" className={dropdownLinkClassName}>
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