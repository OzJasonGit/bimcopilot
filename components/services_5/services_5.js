'use client'

import styles from './services_5.module.css';
import Collapsed from "../../components/Collapse/collapse";
import React, { Component } from 'react';
import Link from "next/link";

export default class Services_5 extends Component {

render() {
   
return (

   <>

     <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_services}>

            <div id={styles.COLLAPSE_TITLE}>
              <h1                 
                    id={styles._H2_7XL}
                    class="text-left ... text-6xl ... text-stone-700 ... font-avant_garde_bold">         
                    Services
              </h1>
            </div>

            <div id={styles.COLLAPSE_MESSAGE}>
              <div id={styles.COLLAPSE_TAG}>
                  <h3
                    id={styles._H3}
                    class="text-left ... text-2xl ... text-stone-500 ... font-avant_garde_bold">
                    {" "}
                      We provide services, including <a class=" text-stone-700 ... font-avant_garde_bold">data-analytics,</a> 
                      <a class=" text-stone-700 ... font-avant_garde_bold"> automation</a> and <a class=" text-stone-700 ... font-avant_garde_bold">technical-drafting</a> for construction projects. see 
                      <a class=" text-stone-700 ... font-avant_garde_bold"><Link href={"./"}> "how we work"</Link></a> to 
                      learn how we define bespoke solutions tailored to your project specific needs.              
                    <br/> 
                    <br/>                
                  </h3>
                </div>                        
              </div>

              <div id={styles.COLLAPSE_HOLDER}>
                <Collapsed />
              </div>
              
            </div>
      </section>
    </>


)
};
};






