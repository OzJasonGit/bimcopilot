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
  const directLinkClassName =
    "relative inline-flex h-9 items-center rounded-md px-3 text-[14px] text-stone-50 " +
    "font-avant_garde_medium transition-all duration-300 ease-out hover:-translate-y-[1px] focus:outline-none";

  const directLinkTextClassName =
    "relative inline-block leading-none " +
    "after:content-[attr(data-text)] after:absolute after:inset-0 after:w-0 after:overflow-hidden " +
    "after:whitespace-nowrap after:text-emerald-300 after:transition-[width] after:duration-300 after:ease-out " +
    "hover:after:w-full focus-visible:after:w-full";

  const triggerClassName =
    "relative h-9 rounded-md border-none bg-transparent px-3 text-[14px] text-stone-50 shadow-none " +
    "font-avant_garde_medium transition-all duration-300 ease-out " +
    "hover:-translate-y-[1px] hover:bg-white/85 hover:text-black " +
    "focus:bg-white/85 focus:text-black focus:outline-none " +
    "data-[state=open]:bg-white/85 data-[state=open]:text-black";

  const dropdownContentClassName =
    "w-[300px] min-h-[110px] rounded-sm border border-white/20 bg-stone-900/95 shadow-[0_12px_40px_rgba(0,0,0,0.45)] backdrop-blur-md";

  const dropdownLinkClassName =
    "group flex flex-col items-start gap-1 rounded-md p-2 " +
    "transition-all duration-200 ease-out hover:bg-stone-800/60";

  return (
    <div className="dark-theme-nav mt-5" style={{ color: '#f5f5f4' }}>
      <NavigationMenu>
        <NavigationMenuList className="bg-transparent">
          {/* Shop Link (No Dropdown) */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/products" className={directLinkClassName}>
                <span className={directLinkTextClassName} data-text="Shop">
                  Shop
                </span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Services Menu */}
          <NavigationMenuItem>
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

          {/* Copilot Dashboard Menu */}
          <NavigationMenuItem>
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

          {/* Stories Link (No Dropdown) */}
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link href="/bloghome" className={directLinkClassName}>
                <span className={directLinkTextClassName} data-text="Stories">
                  Stories
                </span>
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}