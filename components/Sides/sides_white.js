"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faYoutube, faInstagram, faSquareXTwitter, faGithub, faMedium, fa } from '@fortawesome/free-brands-svg-icons'

import styles from './sides_white.module.css'
import React, { Component } from 'react';
import Link from 'next/link'
import 'antd/dist/reset.css';



import Image from "next/image";
import pfbdImage from './pfbd_3.png';
import bimcopilotLogo from './bimcopilot_logo.svg';


export default class Sides extends Component {

    render() {
        return (


            <div class={styles.wrapper_2}>

                <div class="bg-gradient-to-t from-cyan-500  bg-transparent bg-opacity-20" id={styles.FIXED_GRADIENT}>
                </div>

                <div class={styles.fixed_center}>
                    <div class={styles.grid_0_fixed}>

                        <div id={styles.LEFT_FIXED}>
                            <div id={styles.LEFT_FIXED_STICKY}>
                                <div id={styles.ICON_SIDE_1}>
                                    <div id={styles.ICON_SIDE_2}>
                                        <div id={styles.ICON_GRID} class={styles.container}>


                                            <div class={styles.icon}
                                                style={{
                                                    gridArea: " PFBD",
                                                    display: "grid",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}>
                                                <Link id={styles.PFBD_LINK} href="/" target="_blank">
                                                    <Image id={styles.CENTER}
                                                        loading='lazy'
                                                        src={pfbdImage}
                                                        alt=''
                                                        style={{
                                                            objectFit: "contain",
                                                            gridArea: "CENTER",
                                                            height: "92.5%",
                                                            width: "92.5%"
                                                        }}
                                                        quality={100}
                                                    />
                                                </Link>
                                            </div>

                                            <div class={styles.icon}
                                                style={{
                                                    gridArea: "BIM_COPILOT",
                                                    display: "grid",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}>
                                                <Link id={styles.BIMCOPILOT_LINK} href="/" target="_blank"
                                                    style={{
                                                        position: "relative",
                                                        left: "-6px"
                                                    }}>
                                                    <Image id={styles.CENTER}
                                                        loading='lazy'
                                                        alt=''
                                                        src={bimcopilotLogo}
                                                        style={{
                                                            position: "relative",
                                                            top: "-3.5px",
                                                            left: "-1.5px",
                                                            objectFit: "contain",
                                                            gridArea: "CENTER",
                                                            height: "100%",
                                                            width: "100%"
                                                        }}
                                                        quality={100}
                                                    />
                                                </Link>
                                            </div>

                                            <div class={styles.icon}
                                                style={{
                                                    gridArea: "OZ_JASON",
                                                    display: "grid",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}>
                                                <Link id={styles.OZ_JASON_LINK} href="/" target="_blank">
                                                    <Image id={styles.CENTER}
                                                        src={pfbdImage}
                                                        loading='lazy'
                                                        alt=''
                                                        style={{
                                                            objectFit: "contain",
                                                            gridArea: "CENTER",
                                                            height: "92.5%",
                                                            width: "92.5%"
                                                        }}
                                                        quality={100}
                                                    />
                                                </Link>
                                            </div>

                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>


                        <div id={styles.RIGHT_FIXED}>
                            <div id={styles.RIGHT_FIXED_STICKY}>
                                <div id={styles.PFBD_LINKS}>
                                    <div id={styles.ICON_PLACEHOLDER} class={styles.container}>
                                        <h3 class="font-avant_garde_bold ... text-stone-700 ..." id={styles.SIDE_TEXT} >Welcome     to   <a><Link class="text-emerald-400" href="/">bimcopilot.com</Link></a> </h3>
                                    </div>
                                </div>

                                <div id={styles.PAGE_NAVIGATION}>

                                    <div class="bg-stone-700  ..." id={styles.LINE_1}>
                                    </div>

                                    <div id={styles.NAV_LINK}>

                                        <Link class="" id={styles.ANCHOR_1} href="/">
                                            <FontAwesomeIcon  id={styles.CENTER} icon={faLinkedin} size="2xs" className="cursor-pointer transition-colors duration-300 text-stone-700 hover:text-emerald-300 "   />
                                        </Link>

                                        <Link class="" id={styles.ANCHOR_2} href="/">
                                            <FontAwesomeIcon  id={styles.CENTER} icon={faInstagram} size="2xs" className="cursor-pointer transition-colors duration-300 text-stone-700 hover:text-emerald-300 "   />
                                        </Link>

                                        <Link class="" id={styles.ANCHOR_3} href="/">
                                            <FontAwesomeIcon  id={styles.CENTER} icon={faYoutube} size="2xs" className="cursor-pointer transition-colors duration-300 text-stone-700 hover:text-emerald-300 "   />
                                        </Link>

                                        <Link class="" id={styles.ANCHOR_4} href="/">
                                            <FontAwesomeIcon id={styles.CENTER} icon={faSquareXTwitter} size="2xs" className="cursor-pointer transition-colors duration-300 text-stone-700 hover:text-emerald-300 "   />
                                        </Link>

                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>





        )

    }


}
