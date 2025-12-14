'use client'

import styles from './collapse.module.css';
import Collapsed_Services from "../Collapse_Services/collapse_Services";
import Collapsed_2 from "../../components/Collapse_2/collapse_2";
import Collapsed_4 from "../../components/Collapse_4/collapse_4";
import React, { Component } from 'react';
import Link from "next/link";
import { Accordion, AccordionItem } from "@heroui/react";
import { Divider } from "@heroui/react";
import { ChevronDown } from "lucide-react";

export default class Collapse_FAQ extends Component {



render() {



 const defaultContent =
    "Lorem ipsum dolor sit amet, labore et dolore magna aliqua. Ut enim ad minim veniam, ut aliquip ex ea commodo consequat.";


 const Architecture_Delivery =
    <div>
      <ul className="list-disc pl-6">
        <li>Schematic Design Packages</li>
        <li>Detailed Design / Technical Design Packages</li>
        <li>Construction Documentation (GA + Detailed Drawings)</li>
        <li>Coordination with Structural & MEP Engineers</li>
        <li>RIBA Stage Documentation (0–4)</li>
        <li>Revit Model Production</li>
        <li>Drawing Standardization & QA/QC</li>
        <li>1:5 / 1:10 / 1:20 / 1:25 / 1:50 Technical Detail Packages</li>
        <li>Drafting Support (Plans, Sections, Elevations, Details)</li>
      </ul>    
    </div>;


const AI_and_Automation =
    <div>
      <ul className="list-disc pl-6">
        <li>AI-Assisted BEP Creation (Adaptive, auto-updating)</li>
        <li>Custom GPTs for Architectural Firms</li>
        <li>AI-Driven Model Audits & Reporting</li>
        <li>Parametric Facade Concepts via AI + Grasshopper</li>
        <li>AI Knowledge Base Setup for Project Teams</li>
      </ul>    
    </div>;


const BIM_Management =
    <div>
      <ul className="list-disc pl-6">
        <li>Writing something in this list item</li>
        <li></li>
        <li></li>
        <li></li>
      </ul>    
    </div>;


const Specialist_Packages =
    <div>
      <ul className="list-disc pl-6">
        <li>Writing something in this list item</li>
        <li></li>
        <li></li>
        <li></li>
      </ul>    
    </div>;



const text_1 = `
We offer a range of digital products and technical services designed to 
streamline design workflows, enhance project management and are always adding to our library. 
These optimize efficiency and our solutions include the following:
`;


const text_2 = `
Our AI-driven tools automate design, eliminate inefficiencies, 
and enhance accuracy—helping your business work smarter and faster. 
From generating complex designs to optimizing workflows, we cut manual work, 
reduce errors, and lower costs. The result? Faster project delivery, 
increased precision, and a powerful competitive edge.
`;


const text_3 = `
We offer both pre-made digital products for instant efficiency and custom 
solutions tailored to your needs. From AI-driven design automation 
to BIM optimization, we deliver seamless, high-impact solutions that integrate flawlessly into your business.
`;


const text_4 = `
Yes, our digital products are designed to integrate seamlessly into your workflow, 
enhancing BIM, parametric design, and project management without 
disruption. With intuitive interfaces and automation, they 
streamline tasks and boost efficiency with a minimal learning curve.
`;


const text_5 = `
Yes, our automation tools eliminate repetitive design tasks, 
allowing you to focus on creativity and high-value work. 
By leveraging AI, parametric design, and smart workflows, 
our solutions accelerate drafting, modeling, and data management 
with precision and efficiency. Whether automating complex geometries 
or streamlining documentation, our tools save hours while maintaining accuracy and design integrity.
`;


const text_6 = `
Rooted in architecture and design, our expertise go beyond theory. We’ve lived the challenges. 
By fusing a deep industry knowledge of project delivery with cutting-edge AI, automation, 
and a bold creative vision, We cultivate a unique and powerful 
edge which we apply to your projects.
`;


const text_7 = `
We excel at helping large businesses scale, streamline, and grow. 
But we also work with solo designers and small firms.  
Compatibility will be based on culture fit, rather than size. We tailor 
our tools to aid various workflows with our goal being the same. To sharpen precision, save time, 
and unlock new opportunities with technology.
`;


const text_8 = `
 Sustainability drives everything we do—but we go beyond green buildings. 
 As part of Plastic Free by Design, we focus on cutting plastic waste 
 and promoting organic food systems. Our digital tools optimize workflows, 
 reduce waste, and push design toward a smarter, more responsible future. 
 Technology and sustainability aren’t separate—they’re a powerful force for change.
`;


const text_9 = `
How do I get started with your services, and what are the pricing options?`;
















const accordionItems = [
  {
    key: "services-1",
    title: "Architecture, Design Delivery & Documentation Support",
    subtitle: "Press to expand",
    content: Architecture_Delivery,
  },
  {
    key: "services-2",
    title: "BIM Management Digital Delivery & Coordination",
    subtitle: "Press to expand key 2",
    content: BIM_Management,
  },
  {
    key: "services-3",
    title: "Automation & AI Enabled BIM Services",
    subtitle: "Press to expand",
    content: AI_and_Automation,
  },
  {
    key: "services-4",
    title: "Specialist Packages",
    subtitle: "Press to expand",
    content: Specialist_Packages,
  },
  {
    key: "services-5",
    title: "text_1",
    subtitle: "Press to expand",
    content: text_1,
  },
  {
    key: "services-6",
    title: "text_2",
    subtitle: "Press to expand",
    content: text_2,
  },
  {
    key: "services-7",
    title: "text_3",
    subtitle: "Press to expand",
    content: text_3,
  },
  {
    key: "services-8",
    title: "text_4",
    subtitle: "Press to expand",
    content: text_4,
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
                        padding: "60px",
                        overflow: "hidden"
                      }}>

                    <div id={styles.SERVICES_GRID}>

                      <div id={styles.COLLAPSE_TITLE_2}>
                        <h2                 
                              id={styles._H2_2}
                              class="text-left ... text-stone-200 ... font-avant_garde_bold">         
                              Frequently Asked Questions (FAQ)
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
              
                    </div>




                    </div>
                      <br/>
                      <br/>
                      {/*collapse_container*/}
                      <div id={styles.COLLAPSE_CONTAINER} 
                          style={{
                              height:"auto",
                              width:"100%",
                              paddingLeft: "30px",
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

































































