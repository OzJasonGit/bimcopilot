"use client";

import React, { useState } from 'react';
import { Tabs } from 'antd';

import styles from "./tabs.module.css";
import Image from "next/image";
import logoMobile from "./Bim-copilot-logo_Mobile_3.png";




const Tab_Horizontal = () => {
  const [tabPosition, setTabPosition] = useState('top');
  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  return (
    <>
     

      <Tabs
        id={styles.T_MOBILE}
        style={{
            height: "100%",
            width: "100%",
            alignItems:"center",
            
        }}
        tabPosition={tabPosition}
        items={new Array(3).fill(null).map(( i) => {
          const id = String(i + 1);
          return {
            label: <div id={styles.T_TAB_HOLDER_MOBILE}>
                    <Image
                    id={styles.T_TAB}
                    src={logoMobile}                             
                    alt="Picture of the author"
                    width={200}
                    height={200}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                    }}
                    class="rounded-full ..."/>
                  </div>,
            key: id,
            children: `Content of Tab ${id}`,
          };
        })}/>
    </>
  );
};
export default Tab_Horizontal;