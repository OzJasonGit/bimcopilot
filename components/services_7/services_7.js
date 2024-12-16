'use client'

import styles from './services_7.module.css';
import React, { Component } from 'react';
import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
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
                    class="text-left ... text-4xl ... text-stone-700 ... font-avant_garde_bold"
                  >         
                    How we Work
                  </h2>
              </div>


              <div id={styles.WORKING_IMAGES}>  
                <div class="rounded-2xl ... content-center ..." id={styles.HOW_WE_WORK_IMAGE}>

                   <Breadcrumb>
                    <BreadcrumbList>
                      
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link href="/">Home</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>


                      <BreadcrumbSeparator/>
                      <BreadcrumbItem>
                        <BreadcrumbEllipsis/>
                      
                      </BreadcrumbItem>
                      <BreadcrumbSeparator/>
                      <BreadcrumbItem>
                      
                        <BreadcrumbLink asChild>
                          <Link href="/docs/components">Components</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                      </BreadcrumbItem>
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


