'use client'

import styles from './services_10.module.css';

import React, { Component } from 'react';
import Image from "next/image";







export default class Services_10 extends Component {

render() {
   
return (

      <>

      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_who_weve_helped}>
             
              

              <div id={styles.HOW_WE_WORK_BLOCK}>   
                <div  id={styles.WHO_WEVE_HELPED}>
                  <div class="rounded-xl ..."id={styles.WHO_WEVE_HELPED_TEXT}> 

                      <div id={styles.WHO_WEVE_HELPED_HOLDER}>


                        <div id={styles.WE_HELPED_TEXT}>

                          <div id={styles.ABOUT_TITLE_HOLDER}>
                            <h1
                              id={styles._H1}
                              class="text-stone-700 ... font-avant_garde_bold ...">
                              <a class="text-left ... text-4xl">My background and who <br/> I've helped.</a>
                            </h1>
                          </div>
                                         
                          <div
                            class="content-center ..."
                            id={styles.MY_FACE_HOLDER}>  

                            <div>
                              <h2
                                  id={styles._H2}
                                  class="text-xl ... text-stone-700 ... font-avant_garde_bold ...">
                                  Hi, I'm Oz Jason. I'm a registered architect, BIM
                                  manager and the founder of{" "}
                                  <a class="text-yellow-200 ...">bimcopilot.com</a>.
                                  <br/> However, I'm a firm believer that titles are
                                  becoming less important. What matters is how I can
                                  help you and your business. 
                              </h2>
                              <br/>
                              <p
                                  class="text-xl ... text-stone-700 ... font-avant_garde_bold ...">
                                  Hi, I'm Oz Jason. I'm a registered architect, BIM
                                  manager and the founder of{" "}
                                  <a class="text-yellow-200 ...">bimcopilot.com</a>.                                  
                              </p>
                            </div>
                          
                            <div id={styles.MY_FACE} class=" border-8 border-stone-200 ... rounded-full ...">
                              <Image></Image>
                            </div>

                          </div>
                      
                        </div>                       
                      </div>
                                                                                    
                  </div>
                </div>                  
              </div> 
     
          </div>
      </section>











      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_faq}>
             
              <div id={styles.FAQ_BLOCK}>   

                <div  id={styles.FAQ}>                
                  <div class="border-2 border-stone-600 ... rounded-xl ..."id={styles.FAQ_TEXT}>                                        
                  </div>
                </div>  

              </div> 
     
          </div>
      </section>









      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_is_this_for_me}>

              <div id={styles.IS_THIS_FOR_ME_BLOCK}>   
                <div  id={styles.IS_THIS_FOR_ME}>
                  <div class="border-2 border-stone-600 ... rounded-xl ..."id={styles.IS_THIS_FOR_ME_TEXT}>   
                    <div class="bg-white rounded-xl ..."id={styles.IS_THIS_FOR_ME_HOLDER}>
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








