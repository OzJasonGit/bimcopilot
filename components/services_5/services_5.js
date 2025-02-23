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
                        
                        We are expert architects specializing in cutting-edge BIM solutions powered by AI. 
                        From concept to completion, we deliver precise LOD350 details 
                        and AI-driven clash detection, ensuring flawless coordination across disciplines.
                        {" "}
                        <br/>
                        <br/>                                                                    
                    </h3>
                  </div>                        
                </div>



                <div id={styles.SERVICE_1_HOLDER}>
                  <div id={styles.SERVICE_TITLE}>
                    <h3 id={styles._H2}>Building Information Modelling (BIM)
                    </h3>
                  </div>

                  <div id={styles.COLLAPSE_HOLDER}> 
                     <Collapsed/>              
                  </div>
                </div>

                <div id={styles.SERVICE_2_HOLDER}>
                  <div id={styles.SERVICE_TITLE}>
                    <h3 id={styles._H2} class="font-geist_regular ... text-md ... text-right ...">Analytics and Automation
                    </h3>
                  </div> 

                  <div id={styles.COLLAPSE_HOLDER}> 
                    <Collapsed_2/>                                 
                  </div>                
                </div>

                <div id={styles.SERVICE_3_HOLDER}>
                  <div id={styles.SERVICE_TITLE}>
                    <h3 id={styles._H2}>Design amd Tech
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






