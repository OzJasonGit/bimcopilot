 "use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faSignOutAlt, faHeart, faUser } from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
import React, { useEffect, useState, useRef } from "react";
import bimcopilot_icon from "./bimcopilot_logo.svg";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { ShadCN_Header } from "./ShadCN_Header/shadCN_Header";
import { padding, width } from "@mui/system";





























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



          <div id={styles.HEADER}>

            <header id={styles.FIXED_HEADER_2}>

              {/* Logo & Time */}
              <div id={styles.LOGO_AND_TIME}>

                {/* Logo */}
                <div id={styles.LOGO_2}
                   styles={{
                      height:'auto',
                      padding:'12px',
                      gridArea:'LOGO',
                      justifyItems:'center',
                      width:'100%',
                      position:'relative',
                      left:'-3px'
                      }}>

                      <Link href="/."
                            styles={{height:'50px',}}>
                        <div>
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
                              left:"-7.5px"
                            }}
                          />
                        </div>
                      </Link>
                </div>

                {/* Time and Date */}
                <div className="content-center ..." id={styles.TIME}>
                  <Clock />
                  <div className="bg-zinc-500 ..." id={styles.B1}></div>
                  <DateComponent />
                </div>

              </div>
              
              



              {/* shadCN Navigation Menu */}
              <div className="content-center ..." 
                   id={styles.NAV_MENU}

                   style={{ 
                          gridArea:"MENU",                         
                          alignItems: "center", 
                          justifyContent: "center", 
                          position: "relative",
                          top: "5.5px"
                          }}>
                <ShadCN_Header/>
              </div>


              


              {/* Sign In/Sign Up or User Dropdown */}
              <div className="flex justify-end ..." id={styles.SIGNUP_CONTAINER} 
                   style={{ gridArea: "SIGNIN_AND_BASKET", position: "relative", height: "100%", width: "100%", top:"12.5px" }}>
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