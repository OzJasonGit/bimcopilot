'use client'

import styles from './services_2.module.css';

import { useRouter } from "next/navigation";




import React, { Component } from 'react';
import Image from "next/image";







const Services_2 = ({ stories, firstStory }) => {
const storiesToMap = stories.filter((story, i) => i != 0);
const router = useRouter();

return (

    <>

        <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_scroll}>      
            <div id={styles.PORTFOLIO_TITLE}>

              <div id={styles.IMAGE_LAYER_1}>
                <div class="rounded-xl ... drop-shadow-2xl ... shadow-black" id={styles.P_IMAGE_1}>
                  <div id={styles.IMAGE_POST}>
                    <Image
                      src={stories[0].image}
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
              
              <div id={styles.IMAGE_LAYER_2}>  

                <div class="rounded-xl ... drop-shadow-2xl ... shadow-black" id={styles.P_IMAGE_2}> 
                  <div id={styles.IMAGE_POST}>
                    <Image
                      src={stories[1].image}
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


                <div class="rounded-xl ... " id={styles.P_IMAGE_3}>  
                    <div id={styles.IMAGE_POST}>
                    <Image
                      src={stories[2].image}
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

);
};


export default Services_2;