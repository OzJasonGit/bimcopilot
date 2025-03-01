'use client'

import styles from './services_5.module.css';
import Collapsed from "../../components/Collapse/collapse";
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
            <div  id={styles.SERVICES_HOLDER}>
              <div id={styles.SERVICES_GRID}>

                <div id={styles.COLLAPSE_TITLE_2}>
                  <h2                 
                        id={styles._H2_2}
                        class="text-left ... text-stone-700 ... font-avant_garde_bold">         
                        Services
                  </h2>
                </div>



                <div id={styles.COLLAPSE_MESSAGE_2}>
                  <div id={styles.COLLAPSE_TAG}>
                    <h3
                      id={styles._H3}
                      class="text-left ... text-stone-500 ... font-avant_garde_bold">
                        {" "}
                        
                        We are highly experienced <a class="text-stone-700 ...">RIBA</a> and <a class="text-stone-700 ...">ARB</a> 
                        <a class="text-stone-700 ...">registered architects
                        </a> specializing in cutting-edge <a class="text-stone-700 ...">BIM</a>
                        solutions powered by <a class="text-stone-700 ...">Artificial Intelligence</a>. 
                        <br/>We focus on tailoring systems conceived from real-world 
                        experience on projects from concept, through to completion. 

                        {/*From concept to completion, we deliver precise LOD350 details 
                        and AI-driven clash detection, ensuring flawless coordination across disciplines.*/}
                        {" "}
                        <br/>
                        <br/>                                                                    
                    </h3>
                  </div>                        
                </div>



                <div id={styles.SERVICE_1_HOLDER}>
                  <div id={styles.SERVICE_TITLE}>
                    <h3  class="text-left ... text-stone-700 ... font-avant_garde_bold" id={styles._H2}>Building Information Modelling (BIM)
                    </h3>
                  </div>

                  <div id={styles.COLLAPSE_HOLDER}> 
                     <Collapsed/>              
                  </div>
                </div>

                <div id={styles.SERVICE_2_HOLDER}>
                  <div id={styles.SERVICE_TITLE}>
                    <h3 class="font-avant_garde_bold ... text-stone-700 ...  text-right ..." id={styles._H2}>Analytics and Automation
                    </h3>
                  </div> 

                  <div id={styles.COLLAPSE_HOLDER}> 
                    <Collapsed_2/>                                 
                  </div>                
                </div>

                <div id={styles.SERVICE_3_HOLDER}>
                  <div id={styles.SERVICE_TITLE}>
                    <h3 class="font-avant_garde_bold ... text-stone-700 ...  text-left ..." id={styles._H2}>Design and Tech
                    </h3>  
                  </div> 

                  <div id={styles.COLLAPSE_HOLDER}> 
                     <Collapsed_3/>                  
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






