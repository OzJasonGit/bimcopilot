'use client'

import styles from './services_5.module.css';
import Collapsed_Services from "../Collapse_Services/collapse_Services";
import Collapsed_2 from "../../components/Collapse_2/collapse_2";
import Collapsed_4 from "../../components/Collapse_4/collapse_4";
import React, { Component } from 'react';
import Link from "next/link";
import { Accordion, AccordionItem } from "@heroui/react";
import { Divider } from "@heroui/react";
import { ChevronDown } from "lucide-react";

export default class Services_5 extends Component {



render() {



 const defaultContent =
    "Lorem ipsum dolor sit amet, labore et dolore magna aliqua. Ut enim ad minim veniam, ut aliquip ex ea commodo consequat.";

 const accordionItems = [
    {
      key: "services-1",
      title: "Architecture, Design & Technology",
      subtitle: "Press to expand",
      content: defaultContent,
    },
    {
      key: "services-2",
      title: "BIM Strategy & Documentation",
      subtitle: "Press to expand key 2",
      content: defaultContent,
    },
    {
      key: "services-3",
      title: "Digital Twin Product Development",
      subtitle: "Press to expand",
      content: defaultContent,
    },
  ];

   
return (

   <>

      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_services_2}>
            <div   id={styles.SERVICES_HOLDER}>

              <div 
                  
                  style={{
                      gridArea: "SERVICES",
                      }}>

                  <div id={styles.SERVICES_PADDING}       
                      className="bg-stone-800 ... rounded-xl ... "            
                      style={{
                        height:"auto",
                        width:"100%",
                        padding: "50px",
                        overflow: "hidden"
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
                                                                                               
                          </h3>
                        </div>                        
                      </div>

                      {/*<div id={styles.SERVICE_1_HOLDER}>
                        <div id={styles.SERVICE_TITLE}>
                          <h3  class="text-left ... text-stone-200 ... font-avant_garde_bold" 
                          id={styles._H2}>Architecture, Design and Technology 
                          </h3>
                        </div>

                        <div id={styles.COLLAPSE_HOLDER}> 
                            <Collapsed_Services/>              
                        </div>
                      </div>*/}
                    </div>
                  </div>
                  <br/>
                  <br/>
                  {/*collapse_container*/}
                  <div id={styles.COLLAPSE_CONTAINER} 
                       style={{
                          height:"auto",
                          width:"100%",
                          paddingLeft: "60px",
                       }}>
                        {/*<Collapsed_4/>*/}
                        {/*<Divider />*/}
                        <div> 
                          <br/>
                            <Accordion 
                              className="w-full"
                            >
                              {accordionItems.map(({key, title, subtitle, content}) => (
                                <AccordionItem
                                  key={key}
                                  aria-label={title}
                                  title={title}
                                  subtitle={subtitle}
                                  indicator={({isOpen}) => (
                                    <ChevronDown
                                      className={`w-5 h-5 transition-transform duration-300 text-stone-600 ${
                                        isOpen ? "rotate-90" : ""
                                      }`}
                                    />
                                  )}
                                  classNames={{
                                    base: "border border-stone-200/40 rounded-xl px-6 py-4 mb-4",
                                    trigger: "px-0 flex justify-between gap-3",
                                    titleWrapper: "w-full flex flex-col items-start gap-1",
                                    title: "w-full text-left text-stone-800 font-avant_garde_bold text-lg",
                                    subtitle: "w-full text-left text-stone-500 text-sm",
                                    indicator: "text-stone-600",
                                    content: "text-left text-stone-600 pt-2"
                                  }}
                                >
                                  <p className="text-left text-stone-600 leading-relaxed">
                                    {content}
                                  </p>
                                </AccordionItem>
                              ))}
                            </Accordion>

                          <br/>
                        </div>
                  </div>

              </div>
            
            </div>
             
              


            <div id={styles.SERVICES_HOLDER_MOBILE} 
                 className="bg-stone-800 ... rounded-xl ... " >           
            </div>
          </div>
      </section>
    </>


)
};
};






