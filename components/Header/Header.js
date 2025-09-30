 "use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSignOutAlt, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
import React, { useEffect, useState, useRef } from "react";
import bimcopilot_icon from "./bimcopilot_logo.svg";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import shadCN_HEADER from "../ShadCN_Header/shadCN_Header";





import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";


const components = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description: "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];






















const Clock = dynamic(() => import("./Clock/clock"), { ssr: false });
const DateComponent = dynamic(() => import("./Clock/date"), { ssr: false });

export default function Header() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown menu

  // Fetch authentication status and user data
  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const response = await fetch("/api/header_route", {
          credentials: "include", // Include cookies
        });

        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.isAuthenticated);
          if (data.isAuthenticated) {
            setUser(data.user);
          }
        } else {
          console.error("Failed to fetch header data");
        }
      } catch (error) {
        console.error("Error fetching header data:", error);
      }
    };

    fetchHeaderData();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/header_route", {
        method: "POST",
        credentials: "include", // Include cookies
      });

      if (response.ok) {
        setIsAuthenticated(false);
        setUser(null);
        setIsDropdownOpen(false); // Close the dropdown after logout
        console.log("Logout successful");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <section id={styles.SHADOW_SECTION} className={styles.center_holder}>
        <div className={styles.HEADER_HOLDER}>
          <div id={styles.header}>
            <header id={styles.FIXED_HEADER}>
              {/* Logo */}
              <div id={styles.LOGO_ICON} className={styles.container}>
                <Link id={styles.LOGO_LINK} href="/.">
                  <div className="" id={styles.LOGO}>
                    <Image
                      className="w-16 h-16 fill-current text-stone-50 hover:text-emerald-400 transition-colors duration-300"
                      src={bimcopilot_icon}
                      alt="Picture of the author"
                      width={100}
                      height={100}
                      loading="lazy"
                      style={{
                        position: "relative",
                        width: "auto",
                        height: "100%",
                        justifyItems: "center",
                        alignItems: "center",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </Link>
              </div>

              {/* Navigation Menu */}
              <div className="content-center ..." id={styles.NAV_MENU}>
                <Link className="content-center ..." id={styles.SERVICES} href="/services">
                  <h3 id={styles.H_3_SERVICES} className="text-center ...  text-stone-50 font-avant_garde_bold" data-content="Services">
                    Services
                  </h3>
                </Link>

                <Link id={styles.PRODUCTS} href="/products">
                  <h3 id={styles.H_3_PRODUCTS} className="text-center ...  text-stone-50  font-avant_garde_bold" data-content="Shop">
                    Shop
                  </h3>
                </Link>

                <Link id={styles.PROJECTS} href="/copilot_dashboard">
                  <h3 id={styles.H_3_PROJECTS} className="text-center ...  text-stone-50  font-avant_garde_bold" data-content="Copilot_Dashboard">
                    Copilot_Dashboard
                  </h3>
                </Link>

                <Link id={styles.STORIES} href="/bloghome">
                  <h3 id={styles.H_3_STORIES} className="text-center ...  text-stone-50 font-avant_garde_bold" data-content="Stories">
                    Stories
                  </h3>
                </Link>
              </div>

              {/* Time and Date */}
              <div className="content-center ..." id={styles.TIME}>
                <Clock />
                <div className="bg-zinc-500 ..." id={styles.B1}></div>
                <DateComponent />
              </div>

              {/* Basket and Favorites */}
              

              {/* Sign In/Sign Up or User Dropdown */}
              <div className="flex justify-end ..." id={styles.SIGNUP_CONTAINER} style={{ gridArea: "SIGN", position: "relative", height: "100%", width: "100%" }}>
                <div className="flex justify-end ..." id={styles.SIGNUP_RIGHT} style={{ gridArea: "SIGN", position: "relative", height: "100%", width: "200px", left: "4.5px" }}>
                  {isAuthenticated ? (
                    <div className="relative left-[8px]" ref={dropdownRef}>
                      {/* User Icon Button */}
                      <div className="flex items-center gap-5">

                      <span className="text-slate-50 font-medium">Hi, {user.name}</span>

                      <button
                        onClick={toggleDropdown}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-gray-100/10 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                        aria-haspopup="true"
                        aria-expanded={isDropdownOpen}
                        >
                        <FontAwesomeIcon
                          icon={faUser}
                          className="text-slate-50 w-6 h-6 hover:text-gray-300 transition-colors duration-200"
                          />
                      </button>
                          </div>

                      {/* Dropdown Menu */}
                      {isDropdownOpen && (
                        <div
                          className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
                          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the dropdown
                        >
                          {/* Profile Link */}
                          {/* <Link
                            href="/profile"
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                          >
                            <span className="flex items-center">
                              <FontAwesomeIcon icon={faUser} className="mr-2 w-4 h-4" />
                              Profile
                            </span>
                          </Link> */}

                          {/* Logout Button */}
                          <button
                            onClick={handleLogout}
                            className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-200"
                          >
                            <span className="flex items-center">
                              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 w-4 h-4" />
                              Logout
                            </span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="content-center ..." id={styles.SIGNUP_GRID}>
                      <Link id={styles.STORIES} href="/signup" style={{ gridArea: "SIGNUP", position: "relative", height: "100%", width: "100%", textAlign: "center", left: "-15.5px" }}>
                        <h3 id={styles.H_3_STORIES} className="text-center ...  text-slate-50 font-avant_garde_bold" data-content="Signup">
                          Signup
                        </h3>
                      </Link>
                      <div className="bg-zinc-500 ..." id={styles.B1}></div>
                      <Link id={styles.SIGNUP} href="/signin" style={{ gridArea: "LOGIN", position: "relative", height: "100%", width: "100%", textAlign: "center", left: "-15px" }}>
                        <h3 id={styles.H_3_STORIES} className="text-center ...  text-slate-50 font-avant_garde_bold" data-content="Login">
                          Login
                        </h3>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </header>
            <header id={styles.shadCN_HEADER}
                    style={{
                    gridArea:"SECOND_AREA",}}>  

                    <NavigationMenu viewport={false}>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger>Home</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                              <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                  <a
                                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                                    href="/"
                                  >
                                    <div className="mt-4 mb-2 text-lg font-medium">
                                      shadcn/ui
                                    </div>
                                    <p className="text-muted-foreground text-sm leading-tight">
                                      Beautifully designed components built with Tailwind CSS.
                                    </p>
                                  </a>
                                </NavigationMenuLink>
                              </li>
                              <ListItem href="/docs" title="Introduction">
                                Re-usable components built using Radix UI and Tailwind CSS.
                              </ListItem>
                              <ListItem href="/docs/installation" title="Installation">
                                How to install dependencies and structure your app.
                              </ListItem>
                              <ListItem href="/docs/primitives/typography" title="Typography">
                                Styles for headings, paragraphs, lists...etc
                              </ListItem>
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                              {components.map((component) => (
                                <ListItem
                                  key={component.title}
                                  title={component.title}
                                  href={component.href}
                                >
                                  {component.description}
                                </ListItem>
                              ))}
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                            <Link href="/docs">Docs</Link>
                          </NavigationMenuLink>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                          <NavigationMenuTrigger>List</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[300px] gap-4">
                              <li>
                                <NavigationMenuLink asChild>
                                  <Link href="#">
                                    <div className="font-medium">Components</div>
                                    <div className="text-muted-foreground">
                                      Browse all components in the library.
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                  <Link href="#">
                                    <div className="font-medium">Documentation</div>
                                    <div className="text-muted-foreground">
                                      Learn how to use the library.
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                  <Link href="#">
                                    <div className="font-medium">Blog</div>
                                    <div className="text-muted-foreground">
                                      Read our latest blog posts.
                                    </div>
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                          <NavigationMenuTrigger>Simple</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-4">
                              <li>
                                <NavigationMenuLink asChild>
                                  <Link href="#">Components</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                  <Link href="#">Documentation</Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                  <Link href="#">Blocks</Link>
                                </NavigationMenuLink>
                              </li>
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>

                        <NavigationMenuItem>
                          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid w-[200px] gap-4">
                              <li>
                                <NavigationMenuLink asChild>
                                  <Link href="#" className="flex-row items-center gap-2">
                                    <CircleHelpIcon />
                                    Backlog
                                  </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                  <Link href="#" className="flex-row items-center gap-2">
                                    <CircleIcon />
                                    To Do
                                  </Link>
                                </NavigationMenuLink>
                                <NavigationMenuLink asChild>
                                  <Link href="#" className="flex-row items-center gap-2">
                                    <CircleCheckIcon />
                                    Done
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu> 










            </header>
          </div>
        </div>
      </section>
    </>
  );
}