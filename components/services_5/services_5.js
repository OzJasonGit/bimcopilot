'use client'

import styles from './services_5.module.css';
import Collapsed_Services from "../Collapse_Services/collapse_Services";
import Collapsed_2 from "../../components/Collapse_2/collapse_2";
import Collapsed_3 from "../../components/Collapse_3/collapse_3";
import React, { Component } from 'react';
import Link from "next/link";

export default class Services_5 extends Component {

render() {
   
return (

   <>

      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_services_2}>
            <div   id={styles.SERVICES_HOLDER}>

              <div id={styles.SERVICES_PADDING}
                   className="bg-stone-800 ... rounded-xl ... " 
                   style={{
                      gridArea: "SERVICES",
                      paddingLeft: "60px",
                      paddingRight: "60px",
                      paddingTop: "60px",
                      paddingBottom: "60px"
                   }}>

                    <div id={styles.SERVICES_GRID}>

                      <div id={styles.COLLAPSE_TITLE_2}>
                        <h2                 
                              id={styles._H2_2}
                              class="text-left ... text-stone-200 ... font-avant_garde_bold">         
                              Our Services
                        </h2>
                      </div>

                      <div id={styles.COLLAPSE_MESSAGE_2}>
                        <div id={styles.COLLAPSE_TAG}>
                          <h3
                            id={styles._H3}
                            class="text-left ... text-stone-400 ... font-avant_garde_medium">
                              {" "}
                              
                              We are highly experienced <a class="text-stone-200 ...">RIBA</a> and <a class="text-stone-200 ...">ARB</a> 
                              <a class="text-stone-400 ..."> registered architects
                              </a> specializing in cutting-edge <a class="text-stone-200 ...">BIM </a>
                              solutions powered by <a class="text-stone-200 ...">Artificial Intelligence</a>. 
                              <br/>We focus on tailoring <a class="text-stone-200 ...">systems</a> conceived from 
                              <a class="text-stone-200 ..."> real-world 
                              experience </a>on projects from <a class="text-stone-200 ...">concept</a>, through to 
                              <a class="text-stone-200 ..."> completion</a>.                  
                              <br/>
                              <br/>                                                                    
                          </h3>
                        </div>                        
                      </div>

                      <div id={styles.SERVICE_1_HOLDER}>
                        <div id={styles.SERVICE_TITLE}>
                          <h3  class="text-left ... text-stone-200 ... font-avant_garde_bold" 
                          id={styles._H2}>Architecture, Design and Technology 
                          </h3>
                        </div>

                        <div id={styles.COLLAPSE_HOLDER}> 
                            <Collapsed_Services/>              
                        </div>
                      </div>
                    </div>
              </div>

            </div>

            <div id={styles.SERVICES_HOLDER_MOBILE} classname="rounded-2xl bg-neutral-900 shadow-2xl shadow-black">           
            </div>
          </div>
      </section>
    </>


)
};
};






