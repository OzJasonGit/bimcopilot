'use client'

import styles from './services_10.module.css';

import React, { Component } from 'react';
import Image from "next/image";
import Placeholder_2 from './placeholder_2.jpeg';
import Collapsed_FAQ from "../../components/Collapse_FAQ/collapse_FAQ";






export default class Services_10 extends Component {

render() {
   
return (

      <>


      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_who_weve_helped}>
          <div id={styles.WE_HELPED_GRID}
               style={{  }}>

                <div id={styles.TITLE}
                  style={{ gridArea: "TITLE",
                           paddingLeft: "30px",
                           paddingRight: "30px"
                   }}>
                  <h1
                    id={styles._H1_RIGHT}
                    class="text-stone-700 ... font-avant_garde_bold ...">
                    <a class="text-left ... text-4xl">Our background and <br/>who We've helped.</a>
                  </h1>
                  <br/>            
                  <h2
                      id={styles._H2_RIGHT}
                      class="text-xl ... text-stone-700 ... font-avant_garde_bold ...">
                      We've helped businesses eliminate <br/>bottlenecks and unlock growth with technology.
                  </h2>
                  <br/>        
                  <p  id={styles._H3_RIGHT}
                      class=" text-stone-500 ... font-avant_garde_bold ... ">
                      With expertise in <a class="text-stone-700 ...">design</a>, <a class="text-stone-700 ...">software development</a>, 
                      and <a class="text-stone-700 ...">Artificial Intelligence</a>, we've helped <a class="text-stone-700 ...">architects</a>, 
                      <a class="text-stone-700 ..."> designers</a>, <a class="text-stone-700 ...">
                      manufacturers</a> and <a class="text-stone-700 ...">students</a>, leverage 
                      technology to streamline projects.                                                                                    
                  </p>
                  <br/>
                  
                </div>

                <br/>

                <div id={styles.IMAGE}
                    className="bg-transparent ... rounded-xl ..."
                    style={{ gridArea: "IMAGE", overflow: "hidden" }}>                  
                    <div class="rounded-2xl ..." 
                            style={{
                            position: "relative",
                            width: "100%",
                            height: "350px",                                                                       
                            }}>
                            <Image
                              alt="Picture of the author"                                    
                              width={500}
                              height={500}
                              src={Placeholder_2}
                              style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                              }}
                            />                                                          
                    </div>  
                </div>


                <div id={styles.CONCLUSION}
                  style={{ gridArea: "CONCLUSION" }}>
                  <br/>
                
                    <p  id={styles._H3_CENTER}
                      class=" text-stone-500 ... font-avant_garde_bold ... ">          
                      Our digital products and technical services streamline workflows, automate branding, 
                      and accelerate client acquisition—saving you time while maximizing profitability. 
                      Whether you need a powerful online presence, automated lead generation, or AI-driven 
                      business growth, our solutions are designed for real impact. Backed by industry experience, 
                      our tools don’t just support your work—they transform it, giving you a competitive edge 
                      in an evolving market.                                                       
                    </p>               
                </div>
                <br/>
                <br/>
          </div>
        </div>
      </section>




      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_faq}>
             
              <div id={styles.FAQ_BLOCK}>   

                <div  id={styles.FAQ}>                
                  <div class=" rounded-xl ..."
                       id={styles.FAQ_TEXT}>
                    <h1
                      style={{ paddingBottom: "20px" }}
                      id={styles._H1}
                      class="text-stone-700 ... font-avant_garde_bold ...">
                      <a class="text-left ... text-4xl">Frequently Asked <br/> Questions (FAQ) </a>
                    </h1> 
                    <Collapsed_FAQ/>                                      
                  </div>
                  
                </div>  

              </div> 
     
          </div>
      </section>



      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_is_this_for_me}>

              <div id={styles.IS_THIS_FOR_ME_BLOCK}>   
                <div  id={styles.IS_THIS_FOR_ME}
                      style={{ paddingTop: "40px", paddingBottom: "80px" }}>
                  <div class=" rounded-xl ..." id={styles.IS_THIS_FOR_ME_TEXT}>   
                    <h1
                      id={styles._H1}
                      style={{ paddingBottom: "20px" }}
                      class="text-stone-700 ... font-avant_garde_bold ... text-right ... ">
                      <a class="text-right ... text-4xl">Is This For Me?</a>
                    </h1>  

                    <h3
                      
                      id={styles._H3}
                      class="text-right ... text-neutral-500 ... font-avant_garde_bold"
                    >
                      {" "}
                  
                      <a class="text-stone-700 ... font-avant_garde_bold"
                        >
                        Automated systems for Architects, Designers and Manufacturers.
                      </a>{" "}
                      Gain valuable insights, streamline your business, be more{" "} 
                      <a class="text-stone-700 ... font-avant_garde_bold"
                        >
                        profitable 
                      </a>, be more{" "}
                      <a class="text-stone-700 ... font-avant_garde_bold"
                        >
                        sustainable
                      </a>                  
                      . <br /> <br />{" "}                 
                    </h3>
                                                     
                  </div>
                </div>                  
              </div> 
     
          </div>
      </section>
    </>

    )
  };
};








