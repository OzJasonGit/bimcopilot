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
                        id={styles.TEXT_OUTLINE}
                        class="text-left ... text-7xl ... text-stone-50 ... font-avant_garde_bold">         
                        Services
                  </h2>
                </div>



                <div id={styles.COLLAPSE_MESSAGE_2}>
                  <div id={styles.COLLAPSE_TAG}>
                    <h3
                      id={styles._H3}
                      class="text-left ... text-lg ... text-stone-500 ... font-avant_garde_bold">
                        {" "}
                        We are registered and seasoned architects with years of experience in BIM 
                        (Building Information Modeling). We specialize in comprehensive BIM delivery 
                        across all project stages. Our expertise lie in advanced LOD350 detail and 
                        precision clash detection, ensuring seamless coordination between disciplines.

                        With BIM, we help our clients save money, build faster, and achieve 
                        sustainability goals through streamlined, efficient processes. 
                        From reducing waste to optimizing material use, our approach 
                        maximizes efficiency while minimizing costs. Let us elevate your 
                        project with precision, speed, and sustainability at its core.
                        {" "}
                        <br/>
                        <br/>


                        We're a team of seasoned architects
                        We provide services, including <a class=" text-stone-700 ... font-avant_garde_bold">data-analytics,</a> 
                        <a class=" text-stone-700 ... font-avant_garde_bold"> automation</a> and <a class=" text-stone-700 ... font-avant_garde_bold">technical-drafting</a> for construction projects. see 
                        <a class=" text-stone-700 ... font-avant_garde_bold"><Link href={"./"}> "how we work"</Link></a> to 
                        learn how we define bespoke solutions tailored to your project specific needs.              
                      <br/> 
                      <br/>                
                    </h3>
                  </div>                        
                </div>



                <div id={styles.SERVICE_1_HOLDER}>
                  <div id={styles.SERVICE_TITLE}>
                    <h3>Building Information Modelling (BIM)
                    </h3>
                  </div>

                  <div id={styles.COLLAPSE_HOLDER}> 
                     <Collapsed/>              
                  </div>
                </div>

                <div id={styles.SERVICE_2_HOLDER}>
                  <div id={styles.SERVICE_TITLE}>
                    <h3 class="font-geist_regular ... text-md ... text-right ...">Analytics and Automation
                    </h3>
                  </div> 

                  <div id={styles.COLLAPSE_HOLDER}> 
                    <Collapsed_2/>                                 
                  </div>                
                </div>

                <div id={styles.SERVICE_3_HOLDER}>
                  <div id={styles.SERVICE_TITLE}>
                    <h3>Design amd Tech
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






