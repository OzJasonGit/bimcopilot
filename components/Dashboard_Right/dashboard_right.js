

import styles from './dashboard_right.module.css';

import Image from "next/image";
import bimcopilot from './Bim-copilot-logo_Horizontal.png';

import React, { Component } from 'react';
import { height, width } from '@mui/system';





export default class Dashboard_Right extends Component {

render() {
   
return (

  <>
    <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_bimcopilot}>
            <div id={styles.BIMCOPILOT_CONTAINER}>

              <div id={styles.BIMCOPILOT} style={{
                      background: "",
                      position: "relative",                                
                      height: "100%",
                      width: "100%",
                      gridArea: "BIMCOPILOT"}}>

                          <Image id={styles.CENTER}
                            src={bimcopilot}   
                            style={{objectFit: "contain", 
                                    width: "100%",
                                    height: "100%"
                            }} 
                            quality={100}
                          />  
              </div>
              
            </div>
          </div>
        </section>
  </>
 

);
};

}


