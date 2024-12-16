'use client'

import styles from './services_7.module.css';
import React, { Component } from 'react';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbList, 
} from "@/components/ui/breadcrumb"



export default class Services_6 extends Component {

    render() {
      
    return (

      <>

       <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_how_we_work}>   
           
              <div id={styles.HOW_WE_WORK_TAG}>
                  <h2                
                    id={styles._H2_7XL}
                    class="text-center ... text-4xl ... text-stone-700 ... font-avant_garde_bold"
                  >         
                    How we Work
                  </h2>
              </div>


              <div id={styles.WORKING_IMAGES}>  
                <div class="border-2 border-stone-600 ... rounded-2xl ..." id={styles.HOW_WE_WORK_IMAGE}>

                  <Breadcrumb>
                    <BreadcrumbList>
                      {/* ... */}
                      <BreadcrumbItem>
                        <BreadcrumbEllipsis />
                      </BreadcrumbItem>
                      {/* ... */}
                    </BreadcrumbList>
                  </Breadcrumb>
                </div>                 
              </div> 
                   
          </div>
      </section>
    </>

    )
  };
};


