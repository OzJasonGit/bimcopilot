

import styles from './dashboard_right.module.css';

import Image from "next/image";
import bimcopilot from './Bim-copilot-logo_Horizontal.png';

import React, { Component } from 'react';





export default class Dashboard_Right extends Component {

render() {
   
return (

  <>
    <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_bimcopilot}>
            <div id={styles.BIMCOPILOT_CONTAINER}>

              <div id={styles.BIMCOPILOT} style={{
                      position: "relative",                                
                      height: "100%",
                      width: "100%",
                      gridArea: "BIMCOPILOT"}}>

                          <Image id={styles.CENTER}
                            src={bimcopilot}   
                            style={{objectFit: "contain"}} 
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


