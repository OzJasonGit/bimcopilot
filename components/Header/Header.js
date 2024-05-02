"use client";

import Provider from "../../app/utils/Provider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceRelieved,
  faBasketball,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Header.module.css";
import React, { Component } from "react";

import Script from "next/script";

import logoMobile from "./Bim-copilot-logo_Mobile_3.png";
import bimcopilot_icon from "./bimcopliot-logo.png";
import Image from "next/image";
import Link from "next/link";

import Clock from "./Clock/clock";
import DateComponent from "./Date/date";



export default class Header extends Component {
  render() {
    return (
      <>
        <Provider>
          <section id={styles.SHADOW_SECTION} class={styles.center_holder}>
            <div class={styles.HEADER_HOLDER}>
              <div id={styles.header}>
                <header id={styles.FIXED_HEADER}>
                  <div class="content-center ..." id={styles.COPILOT_HOLDER}>
                    <Link
                      class="content-center ..."
                      id={styles.COPILOT}
                      href="/dashboard"
                    >
                      <Image
                        src={logoMobile}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                        style={{
                          position: "absolute",
                          width: "auto",
                          height: "100%",
                          justifyItems: "center",
                          alignItems: "center",
                          objectFit: "contain",
                        }}
                      />
                    </Link>
                  </div>

                  <div className={styles.timeAndDate} id="dateandtime">
                    <Clock />
                    <span className={styles.separator}>|</span>
                    <DateComponent />
                  </div>

                  <div class="content-center ..." id={styles.NAV_MENU}>
                    <Link
                      class="content-center ..."
                      id={styles.SERVICES}
                      href="/services"
                    >
                      <h3
                        id={styles.H_3_SERVICES}
                        class="text-center ...  text-slate-50 font-avant_garde_bold"
                        data-content="Services"
                      >
                        Services
                      </h3>
                    </Link>

                    <Link id={styles.PRODUCTS} href="/products">
                      <h3
                        id={styles.H_3_PRODUCTS}
                        class="text-center ...  text-slate-50  font-avant_garde_bold"
                        data-content="Products"
                      >
                        Products
                      </h3>
                    </Link>

                    <Link id={styles.PROJECTS} href="/projects">
                      <h3
                        id={styles.H_3_PROJECTS}
                        class="text-center ...  text-slate-50  font-avant_garde_bold"
                        data-content="Projects"
                      >
                        Projects
                      </h3>
                    </Link>

                    <Link id={styles.STORIES} href="/bloghome">
                      <h3
                        id={styles.H_3_STORIES}
                        class="text-center ...  text-slate-50 font-avant_garde_bold"
                        data-content="Stories"
                      >
                        Stories
                      </h3>
                    </Link>
                  </div>

                  <div class="content-center ..." id={styles.TIME}>
                    <div id={styles.CLOCK}>
                      <Clock />
                    </div>

                    <div class="bg-zinc-500 ..." id={styles.B1}></div>

                    <Link
                      class="content-center ..."
                      id={styles.HOME_ICON}
                      href="/dashboard"
                    >
                      <h3
                        id={styles.H_3}
                        class="text-center ...  text-slate-50  font-avant_garde_bold"
                      >
                        Sign up
                      </h3>
                    </Link>
                  </div>

                  <div id={styles.LOGO_ICON} class={styles.container}>
                    <Link id={styles.LOGO_LINK} href="/.">
                      <div class=" " id={styles.LOGO}>
                        <Image
                          src={bimcopilot_icon}
                          alt="Picture of the author"
                          width={500}
                          height={500}
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
                </header>
              </div>
            </div>
          </section>
        </Provider>
      </>
    );
  }
}
