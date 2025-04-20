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



const items = [

  {
    key: '1',
    label: <h3 style={{ color: "rgb(231 229 228)", alignItems: "end" }}
      class="font-avant_garde_bold ... "
      id={styles._H3}> BIM Optimization & Implementation
    </h3>,
    children: 
    
    <p style={{ position: "relative", left: "25px" }}
       class="font-geist_regular ... text-stone-200 ..."> 

    {text_1} 
    <br/>    
    <ul class="list-disc ... font-geist_regular ... text-stone-200 ..."
        id={styles._H3_2}
        style={{ position: "relative", left: "35px" }}>
        <li> <a class="font-geist_semibold ... text-stone-200 ...">Design Automation Tools</a> 
            Bespoke templates and families - 
            Streamlined documentation workflows - 
            Cloud coordination
        </li>

        <li> <a class="font-geist_semibold ... text-stone-200 ...">BIM & Project Management Resources</a> – Smart templates, workflows, 
                and automation tools to improve coordination and efficiency.</li>
    </ul>
    <a class="font-avant_garde_bold ... text-stone-200 ..."><Link href="/products">Learn More here!</Link></a>

    </p>
    

  },

  {
    key: '2',
    label: <h3 style={{ color: "rgb(231 229 228)", alignItems: "end" }}
      class="font-avant_garde_bold ... "
      id={styles._H3}> How can your AI-driven tools help my architecture, design
      <br/> or manufacturing business?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }} 
                 class="font-geist_regular ... text-stone-200 ..."> {text_2} </p>
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






