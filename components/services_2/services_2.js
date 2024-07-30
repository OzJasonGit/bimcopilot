'use client'

import styles from './services_2.module.css';



import bimcopilot from './Bim-copilot-logo_Horizontal.png';

import bimcopilot from './Bim-copilot-logo_Horizontal.png';


import React, { Component } from 'react';
import Image from "next/image";










export default class Services_2 extends Component {

render() {
   
return (

        <>

        <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_scroll}>      
            <div id={styles.PORTFOLIO_TITLE}>

              <div id={styles.IMAGE_LAYER_1}>
                <div class="rounded-xl ... drop-shadow-2xl ... shadow-black" id={styles.P_IMAGE_1}>
                  <div id={styles.IMAGE_POST}>
                    <Image
                      src={bimcopilot}   
                      alt="Picture of the author"
                      width={500}
                      height={500}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <div id={styles.IMAGE_LAYER_3}>  

                <div class="rounded-xl ... drop-shadow-2xl ... shadow-black" id={styles.P_IMAGE_2}> 
                  <div id={styles.IMAGE_POST}>
                    <Image
                      src={bimcopilot}   
                      alt="Picture of the author"
                      width={500}
                      height={500}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        }}
                      />
                  </div>   
                </div>


                        
              </div>

            </div>          
          </div>
      </section>
    </>


      )

  };
};




