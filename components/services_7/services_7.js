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
                  <br/>
                  <br/>
                  <br/>
                  <br/>
              </div>
              


              <div id={styles.WORKING_IMAGES}>  
                <div class="rounded-2xl ... content-center ..." id={styles.HOW_WE_WORK_IMAGE}>

                   <Breadcrumb>
                    <BreadcrumbList>


                      <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                              <BreadcrumbLink asChild>
                                <Link href="/docs/components">Discover
                                </Link>
                              </BreadcrumbLink>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                We begin by gathering data—project goals, site context,
                                user needs,<br/> technical constraints, and business objectives. 
                                This phase sets the foundation<br/> for a tailored, 
                                tech-forward design strategy.
                              </p>
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
                                <Link href="/docs/components">Define
                                </Link>                               
                              </BreadcrumbLink>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Using the insights collected, 
                                we clarify the problem and outline<br/> key design parameters. 
                                This is where we align with the client on<br/> scope, timelines, 
                                sustainability goals, and desired outcomes.
                              </p>
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
                                <Link href="/docs/components">Ideate
                                </Link>                               
                              </BreadcrumbLink>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                We generate and explore concepts using AI-assisted design tools,<br/> 
                                parametric workflows, and creative thinking. 
                                This is a fast-paced,<br/> iterative phase where 
                                innovation meets practicality.
                              </p>
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
                                <Link href="/docs/components">Develop
                                </Link>                               
                              </BreadcrumbLink>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                We refine selected concepts into robust, data-informed solutions.<br/>
                                BIM integration, automation, and technical 
                                detailing happen here—ensuring<br/> precision, efficiency, 
                                and real-world viability.
                              </p>
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
                                <Link href="/docs/components">Deliver
                                </Link>                               
                              </BreadcrumbLink>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>
                                Final outputs are prepared and delivered—design files, 
                                digital products,<br/> templates, and technical packages—ready 
                                for implementation.<br/> We ensure everything is optimized, 
                                scalable, and aligned with your goals.
                              </p>
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



