"use client";

import Provider from "../../app/utils/Provider";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaceRelieved,
  faBasketball,
  faBasketShopping,
  faCartShopping,
  faHeart


} from "@fortawesome/free-solid-svg-icons";
import styles from "./Header_White.module.css";
import React, { Component } from "react";

import Script from "next/script";

import logoMobile from "./Bim-copilot-logo_Mobile_3.png";
import bimcopilot_icon from "./Tesseract_Logo_Black.png";
import Image from "next/image";
import Link from "next/link";

import Clock from "./Clock/clock";
import DateComponent from "./Clock/date";



export default class Header extends Component {
  render() {
    return (
      <>
        <Provider>
          <section id={styles.SHADOW_SECTION} class={styles.center_holder}>
            <div class={styles.HEADER_HOLDER}>
              <div id={styles.header}>





                <header id={styles.FIXED_HEADER}>


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



                 

                  




                  <div class="content-center ..." id={styles.NAV_MENU}>
                    <Link
                      class="content-center ..."
                      id={styles.SERVICES}
                      href="/services">
                      <h3
                        id={styles.H_3_SERVICES}
                        class="text-center ...  text-stone-700 font-avant_garde_bold"
                        data-content="Services">
                        Services
                      </h3>
                    </Link>

                    <Link id={styles.PRODUCTS} href="/products">
                      <h3
                        id={styles.H_3_PRODUCTS}
                        class="text-center ...  text-stone-700 font-avant_garde_bold"
                        data-content="Shop">
                        Shop
                      </h3>
                    </Link>

                    <Link id={styles.PROJECTS} href="/projects">
                      <h3
                        id={styles.H_3_PROJECTS}
                        class="text-center ...  text-stone-700  font-avant_garde_bold"
                        data-content="Projects">
                        Projects
                      </h3>
                    </Link>

                    <Link id={styles.STORIES} href="/bloghome">
                      <h3
                        id={styles.H_3_STORIES}
                        class="text-center ...  text-stone-700 font-avant_garde_bold"
                        data-content="Stories">
                        Stories
                      </h3>
                    </Link>
                  </div>






                  <div class="content-center ..." id={styles.TIME}>
                    <Clock />                   
                    <div class="bg-stone-700-500 ..." id={styles.B1}>
                    </div>
                    <DateComponent />                              
                  </div>




                  <div class="content-right ..." id={styles.BASKET_CONTAINER}>

                    <div class="content-center ... align-middle ..."
                         style={{gridArea:"BASKET", position:"relative", top:"0.75px", left:"-30px"}}>
                      {/*<FontAwesomeIcon icon={faHeart}  size="xs"
                      class="text-slate-50"/>*/}



                      <FontAwesomeIcon icon={faCartShopping} size="xs"
                      class="text-stone-700" />
                    </div>

                    <div class="content-center ... align-middle ..."
                         style={{gridArea:"FAVOURITE", position:"relative", top:"0.5px", left:"-30px"}}>
                      <FontAwesomeIcon icon={faHeart}  size="2xs"
                      class="text-stone-700"/>
                    </div>

                    <div class="content-center ... align-middle ...">
                    </div>

                  </div>



                  <div class="flex justify-end ..." id={styles.SIGNUP_CONTAINER}
                      style={{
                              gridArea: "SIGN",
                              position: "relative",                          
                              height: "100%",
                              width: "100%"}}>
              
                      <div class="flex justify-end ..." id={styles.SIGNUP_RIGHT}                          
                          style={{
                                  gridArea: "SIGN",
                                  position: "relative",                         
                                  height: "100%",
                                  width: "200px",
                                  left:"4.5px"}}>

                            <div class="content-center ..." id={styles.SIGNUP_GRID}>
                                <Link id={styles.STORIES} href="/signup" 
                                    style={{
                                        gridArea: "SIGNUP",
                                        position: "relative",                         
                                        height: "100%",
                                        width: "100%",
                                        textAlign: "center",
                                        left: "-15.5px"}}>
                                    <h3
                                      id={styles.H_3_STORIES}
                                      class="text-center ...  text-slate-50 font-avant_garde_bold"
                                      data-content="Signup">
                                      Signup
                                    </h3>
                                </Link>                  
                            <div class="bg-zinc-500 ..." id={styles.B1}>
                            </div>
                                <Link id={styles.SIGNUP} href="/signin" 
                                    style={{
                                            gridArea: "LOGIN",
                                            position: "relative",                        
                                            height: "100%",
                                            width: "100%",
                                            textAlign: "center",
                                            left: "-15px"}}>
                                    <h3
                                      id={styles.H_3_STORIES}
                                      class="text-center ...  text-slate-50 font-avant_garde_bold"
                                      data-content="Login">
                                      Login
                                    </h3>
                                </Link>                           
                            </div>
                  
                      </div>                                                         
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
