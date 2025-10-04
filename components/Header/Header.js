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
import { padding } from "@mui/system";





























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

            <header id={styles.FIXED_HEADER}>

              {/* Logo */}
              <div /*id={styles.LOGO_ICON}*/
                   className={styles.container}
                   styles={{height:'60px',
                            padding:'7.5px',
                            gridArea:'LOGO_HOLDER'}}>
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

              {/* shadCN Navigation Menu */}
              {/*<div className="content-center ..." id={styles.NAV_MENU} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ShadCN_Header/>
              </div>*/}

              {/* Time and Date */}
              <div className="content-center ..." id={styles.TIME}>
                <Clock />
                <div className="bg-zinc-500 ..." id={styles.B1}></div>
                <DateComponent />
              </div>

              {/* Basket and Favorites */}
              

              

            </header>

          </div>



        </div>
      </section>
    </>
  );
}