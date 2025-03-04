"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSignOutAlt, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
import React, { useEffect, useState, useRef } from "react";
import bimcopilot_icon from "./Tesseract_Logo_2.png";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

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
                  <h3 id={styles.H_3_SERVICES} className="text-center ...  text-slate-50 font-avant_garde_bold" data-content="Services">
                    Services
                  </h3>
                </Link>

                <Link id={styles.PRODUCTS} href="/products">
                  <h3 id={styles.H_3_PRODUCTS} className="text-center ...  text-slate-50  font-avant_garde_bold" data-content="Shop">
                    Shop
                  </h3>
                </Link>

                <Link id={styles.PROJECTS} href="/copilot_dashboard">
                  <h3 id={styles.H_3_PROJECTS} className="text-center ...  text-slate-50  font-avant_garde_bold" data-content="Copilot_Dashboard">
                    Copilot_Dashboard
                  </h3>
                </Link>

                <Link id={styles.STORIES} href="/bloghome">
                  <h3 id={styles.H_3_STORIES} className="text-center ...  text-slate-50 font-avant_garde_bold" data-content="Stories">
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
              <div className="content-right ..." id={styles.BASKET_CONTAINER}>
                <Link className="content-center ... align-middle ..." href="/bloghome" style={{ gridArea: "BASKET", position: "relative", top: "0.75px", left: "-30px" }}>
                  <div className="content-center ... align-middle ...">
                    <FontAwesomeIcon icon={faCartShopping} size="xs" className="text-slate-50" />
                  </div>
                </Link>

                <Link className="content-center ... align-middle ..." href="/bloghome" style={{ gridArea: "FAVOURITE", position: "relative", top: "0.5px", left: "-30px" }}>
                  <div className="content-center ... align-middle ...">
                    <FontAwesomeIcon icon={faHeart} size="2xs" className="text-slate-50" />
                  </div>
                </Link>
              </div>

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
          </div>
        </div>
      </section>
    </>
  );
}