"use client";

import React, { Component } from "react";
import styles from "./fontH2.module.css";

import localFont from 'next/font/local'
const myFont = localFont({ src: './font.woff' })


const FontH2 = () => {   

        return (
            <>
                <a class={styles.FontH2} className={myFont.className}>

                </a>               
            </> 
        )
    }

export default FontH2;
        