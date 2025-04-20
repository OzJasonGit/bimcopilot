"use client";

import React, { Component, useState } from "react";
import styles from "./collapse_services.module.css";


import { CaretRightFilled } from "@ant-design/icons";
import { Collapse } from "antd";
import Link from "next/link";



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

      {text_1} 
      <br/>    
      <ul class="list-disc ... font-geist_regular ... text-stone-200 ..."
          id={styles._H3_2}
          style={{ position: "relative", left: "35px" }}>
          <li> <a class="font-geist_semibold ... text-stone-200 ...">Design Automation Tools - </a> 
              Bespoke Revit templates and families - 
              <br/> Streamlined documentation workflows - 
              Cloud coordination - 
              Bespoke Dynamo scripting. 
          </li>

          <li> <a class="font-geist_semibold ... text-stone-200 ...">Advanced Parametric Design – </a> 
              Grasshopper facade and envelope Scripts - 
              Parametric design solutions -  
              Advanced parametric form finding.   
          </li>

          <li> <a class="font-geist_semibold ... text-stone-200 ...">Project and Design Management – </a> 
              End-to-end project coordination (Coordination between clients,
              <br/> consultants, and contractors) - 
              QA/QC checklists tailored to your project -  
              Resolving conflicts and aligning goals early -  
              <br/> Budget tracking and resource forecasting.
          </li>
      </ul>
    </p>
    

  },

  {
    key: '2',
    label:  <h3 style={{ color: "rgb(231 229 228)", alignItems: "end" }}
              class="font-avant_garde_bold ... "
              id={styles._H3}>AI-driven Automation and Tech Application
              <br/> 
            </h3>,
    children: 

    <p style={{ position: "relative", left: "25px" }} 
        class="font-geist_regular ... text-stone-200 ..."> 
        {text_2} 
        <br/> 
        <ul class="list-disc ... font-geist_regular ... text-stone-200 ..."
          id={styles._H3_2}
          style={{ position: "relative", left: "35px" }}>
          
          <li> <a class="font-geist_semibold ... text-stone-200 ...">Design Automation Tools - </a> 
              Bespoke Revit templates and families - 
              <br/> Streamlined documentation workflows - 
              Cloud coordination - 
              Bespoke Dynamo scripting. 
          </li>  
                 
        </ul>
    </p>
  },

  {
    key: '3',
    label: <h3 style={{ color: "rgb(231 229 228)", alignItems: "end" }}
      class="font-avant_garde_bold ... "
      id={styles._H3}> Do you offer custom design solutions, or are your 
      <br/> products pre-made?
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






