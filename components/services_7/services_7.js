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
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"



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


                      <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                              <BreadcrumbLink asChild>
                                <Link href="/docs/components">Home
                                </Link>
                              </BreadcrumbLink>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add to library</p>
                            </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>


                      <BreadcrumbSeparator/>
                          <BreadcrumbItem>
                            <BreadcrumbEllipsis/>                    
                          </BreadcrumbItem>
                      <BreadcrumbSeparator/>


                      <BreadcrumbItem>                     
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <BreadcrumbLink asChild>
                                <Link href="/docs/components">Components
                                </Link>                               
                              </BreadcrumbLink>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add to library</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>                                                                                   
                      </BreadcrumbItem>


                      <BreadcrumbSeparator/>
                          <BreadcrumbItem>
                            <BreadcrumbEllipsis/>                    
                          </BreadcrumbItem>
                      <BreadcrumbSeparator/>
              

                      <BreadcrumbItem>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <BreadcrumbLink asChild>
                                <Link href="/docs/components">Breadcrumb
                                </Link>                               
                              </BreadcrumbLink>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add to library</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </BreadcrumbItem>


                      <BreadcrumbSeparator/>
                          <BreadcrumbItem>
                            <BreadcrumbEllipsis/>                    
                          </BreadcrumbItem>
                      <BreadcrumbSeparator/>


                      <BreadcrumbItem>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <BreadcrumbLink asChild>
                                <Link href="/docs/components">This is the Sparta
                                </Link>                               
                              </BreadcrumbLink>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add to library</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </BreadcrumbItem>


                      <BreadcrumbSeparator/>
                          <BreadcrumbItem>
                            <BreadcrumbEllipsis/>                    
                          </BreadcrumbItem>
                      <BreadcrumbSeparator/>


                      <BreadcrumbItem>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <BreadcrumbLink asChild>
                                <Link href="/docs/components">Luke I am your Father
                                </Link>                               
                              </BreadcrumbLink>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Add to library</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
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



