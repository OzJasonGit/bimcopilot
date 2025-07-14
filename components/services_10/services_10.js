'use client'

import styles from './services_10.module.css';

import React, { Component } from 'react';
import Image from "next/image";
import Placeholder_2 from './burj.jpeg';
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
                        }}>
                  <h1
                    id={styles._H1_CENTER}
                    class="text-stone-700 ... font-avant_garde_bold ...">
                    <a class="text-left ... text-4xl">Our background and <br/>who We've helped.</a>
                  </h1>
                  <br/>            
                  <h2
                      id={styles._H2_CENTER}
                      class="text-xl ... text-stone-700 ... font-avant_garde_bold ...">
                      We're a Dubai based company, born in the UK. <br/>
                      We've helped businesses eliminate <br/>bottlenecks and unlock growth with technology.
                  </h2>
                  <br/>        
                  <p  id={styles._H3_CENTER}
                      class=" text-stone-500 ... font-avant_garde_medium ... ">
                      With expertise in <a class="text-stone-700 ...">design</a>, <a class="text-stone-700 ...">software development</a>, 
                      and <a class="text-stone-700 ...">Artificial Intelligence</a>, we've helped <a class="text-stone-700 ...">architects</a>, 
                      <a class="text-stone-700 ..."> designers</a>, <a class="text-stone-700 ...">
                      manufacturers</a>  and <a class="text-stone-700 ...">students</a>,<br/> leverage 
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
                  style={{ gridArea: "CONCLUSION",
                          }}>
                  <br/>
                
                    <p  id={styles._H3_CENTER}
                      class=" text-stone-500 ... font-avant_garde_medium ... "> 
                      Previously, we’ve worked with <a class="text-stone-700 ...">Perkins & Will</a> on several successful 
                      projects.<br/> This involved <a class="text-stone-700 ...">streamlining workflows </a> with 
                      <a class="text-stone-700 ..."> bespoke automation </a> and <a class="text-stone-700 ...">smart BIM tools</a>.
                      <br/> <br/>  
                      By introducing <a class="text-stone-700 ...">AI-assisted processes </a> and 
                      <a class="text-stone-700 ..."> parametric scripting </a>, 
                      we helped their team <a class="text-stone-700 ...">reduce manual tasks </a> and <a class="text-stone-700 ...">enhance precision </a>. 
                      This enabled them to focus on <a class="text-stone-700 ...">bold, high-impact design</a>.                                                   
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

                  <div id={styles.FAQ_PADDING}
                       className=" rounded-xl ... border-solid ... border-2 border-stone-800 ... " 
                       style={{ gridArea: "FAQ",
                                paddingLeft: "60px",
                                paddingRight: "60px",
                                paddingTop: "60px",
                                paddingBottom:"60px"}}>

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
                      class="text-stone-700 ... font-avant_garde_bold ... ">
                      <a class="text-right ... text-4xl">Is This For Me?</a>
                    </h1>  

                    <h3
                      
                      id={styles._H3_RIGHT}
                      class="text-right ... text-neutral-500 ... font-avant_garde_medium"
                    >
                      {" "}

                      If you’re an <a class="text-stone-700 ... font-avant_garde_bold">architect</a>, 
                      <a class="text-stone-700 ... font-avant_garde_bold"> designer</a>, 
                      or <a class="text-stone-700 ... font-avant_garde_bold">developer</a> ready to work 
                      <a class="text-stone-700 ... font-avant_garde_bold"> smarter</a>, 
                      move <a class="text-stone-700 ... font-avant_garde_bold">faster</a>, and deliver 
                      <a class="text-stone-700 ... font-avant_garde_bold"> better</a>. This is for you. Our tools 
                      <a class="text-stone-700 ... font-avant_garde_bold"> cut friction</a>, 
                      <a class="text-stone-700 ... font-avant_garde_bold"> boost precision</a>, and free you up to focus on what 
                      matters most, <a class="text-stone-700 ... font-avant_garde_bold">great design and big ideas</a>.
                                                       
                     <br /> <br />
                     
                     {" "}                 
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








