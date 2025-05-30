"use client";

import React, { Component, useState } from "react";
import styles from "./collapse_services.module.css";


import { CaretRightFilled } from "@ant-design/icons";
import { Collapse } from "antd";
import Link from "next/link";
import Image from "next/image";
import perkinsWill from "./Bim-copilot-logo_Mobile_2.png";



const text_1 = `
We optimize your BIM systems for clarity, speed, and effortless collaboration.
`;

const text_2 = `
Our AI-driven tools automate design, eliminate inefficiencies, 
and enhance accuracy. 
`;

const text_3 = `
We offer both pre-made digital products for instant efficiency and custom 
solutions tailored to your needs. From AI-driven design automation 
to BIM optimization, we deliver seamless, high-impact solutions that integrate flawlessly into your business.
`;



const items = [

  {
    key: '1',
    label: <h3 style={{ color: "rgb(231 229 228)", alignItems: "end" }}
      class="font-avant_garde_bold ... "
      id={styles._H3}> BIM Optimization, Management & Implementation
    </h3>,
    children: 
    
    <p style={{ position: "relative", left: "25px" }}
      class="font-geist_regular ... text-stone-200 ..."> 

      <a class="font-geist_regular ... text-stone-200 ..."> 
        {text_1} 
      </a>
      <br/> 
      <br/> 
            
      <ul class="list-disc ..."
          id={styles._H3_2}
          style={{ position: "relative", left: "35px" }}>

          <li class="font-geist_regular ... text-stone-400 ..."> 
              <a class="font-geist_semibold ... text-stone-200 ...">Design Automation Tools - 
              </a> 
                {" "}Bespoke Revit templates and families - 
                <br/> Streamlined documentation workflows - 
                Cloud coordination - 
                Bespoke Dynamo scripting. 
          </li>

          <li class="font-geist_regular ... text-stone-400 ..."> 
              <a class="font-geist_semibold ... text-stone-200 ...">Advanced Parametric Design -
              </a> 
                {" "}Grasshopper facade and envelope Scripts - 
                Parametric design solutions -  
                Advanced parametric form finding.   
          </li>

          <li class="font-geist_regular ... text-stone-400 ..."> 
              <a class="font-geist_semibold ... text-stone-200 ...">Project and Design Management - 
              </a> 
                {" "}End-to-end project coordination (Coordination between clients,
                <br/> consultants, and contractors) - 
                QA/QC checklists tailored to your project -  
                Resolving conflicts and aligning goals early - 
                Advanced project deployment and management with Airtable 
                <a>
                  <div>
                    <Link href= "/https://www.airtable.com/lp/campaign/brand?utm_source=google&utm_medium=paidsearch&utm_extra5=kwd-98523555182&utm_extra2=17283319569&utm_extra10=135482497423&creative=719486220936&utm_extra8=c&utm_term=airtable&utm_campaign=demand_br_brand_all_uk_en&gad_source=1">
                      <Image
                      src={perkinsWill}
                      alt="Picture of the author"
                      width={500}
                      height={500}
                      style={{
                          gridArea: "MAIN",
                          position: "relative",
                          width: "150px",
                          height: "100%",
                          objectFit: "cover",
                      }}/>
                    </Link>                 
                  </div>
                </a>
                Budget tracking and resource forecasting.
          </li>

          <li class="font-geist_regular ... text-stone-400 ..."> 
              <a class="font-geist_semibold ... text-stone-200 ...">BIM Management - 
              </a> 
                {" "}AI assisted BIM Execution Plan (BEP) -
                <br/> BIM project set up and coordination, set up projects correctly 
                from the start, defining levels, grids, naming conventions, worksets, 
                <br/> shared coordinates, and collaboration workflows -
                <br/> BIM 360 / ACC Setup & Training Configure Autodesk Construction Cloud environments(Common Data Environment CDE) - 
                BIM Automation & Scripting (Dynamo, Python, Grasshopper).
          </li>
      </ul>
    </p>
    

  },

  {
    key: '2',
    label:  <h3 style={{ color: "rgb(231 229 228)", alignItems: "end" }}
              class="font-avant_garde_bold ... "
              id={styles._H3}>AI-driven Automation and Technology Application
              <br/> 
            </h3>,
    children: 

    <p style={{ position: "relative", left: "25px" }} 
        class="font-geist_regular ... text-stone-200 ...">

        <a class="font-geist_regular ... text-stone-200 ...">
          {text_2} 
        </a>
        <br/> 
        <br/> 
        <ul class="list-disc ... "
          id={styles._H3_2}
          style={{ position: "relative", left: "35px" }}>

          <li class="font-geist_regular ... text-stone-400 ..."> 
            <a class="font-geist_semibold ... text-stone-200 ...">AI workflows for the design and
              <br/>construction industry - 
            </a> 
              {" "}AI driven specification writing - AI assisted material and product optimization -
              Trained AI agents for advanced client communication - 
              <br/> AI client proposal & report writing automation -
              <br/>
             
              <a class="font-geist_regular ... text-stone-200 ...">AI assisted graphics and rendering
              </a> AI-assisted renders using <a class="font-geist_regular ... text-stone-200 ..."><Link href= "https://www.kaedim3d.com/">midjourney </Link ></a>and 
              <a class="font-geist_regular ... text-stone-200 ..."> <Link href= "https://www.midjourney.com/home">kaedim </Link></a>-
              <br/>          
          </li>  
          
          <li class="font-geist_regular ... text-stone-400 ..."> 
            <a class="font-geist_semibold ... text-stone-200 ...">Advanced parametric, AI assisted
              <br/> space planning - 
            </a> 
              {" "} Generative design exploration - Performance driven design optimization          
              <br/> Automated space layouts based on program requirements, 
              circulation logic, and spatial efficiency targets -
              <br/> <a class="font-geist_regular ... text-stone-200 ...">Client-Facing Design Portals - </a> AI-driven platforms where clients can explore design options.             
              <br/>          
          </li>  
           
                 
        </ul>
    </p>
  },

  {
    key: '3',
    label: <h3 style={{ color: "rgb(231 229 228)", alignItems: "end" }}
      class="font-avant_garde_bold ... "
      id={styles._H3}> Analytics and advanced project data visualization
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }} 
                 class="font-geist_regular ... text-stone-200 ..."> {text_3} </p>
  },

];


const Collapsed_Services = () => <Collapse style={{ display: "grid", rowGap: "0px", }}
  accordion items={items}
  expandIcon={({ isActive }) => {
    return (
      <CaretRightFilled
        style={{
          color: "rgb(231 229 228)",
        }}
        rotate={isActive ? 90 : 0}
      />
    );
  }}
  expandIconPosition="start"
  defaultActiveKey={["1"]}
  bordered={false}
  ghost={true}
/>;
export default Collapsed_Services;






