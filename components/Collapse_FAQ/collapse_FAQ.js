"use client";

import React, { Component, useState } from "react";
import styles from "./collapse.module.css";


import { CaretRightFilled } from "@ant-design/icons";
import { Collapse } from "antd";
import Link from "next/link";







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
How do I get started with your services, and what are the pricing options?
`;




const items = [

  {
    key: '1',
    label: 
    <h3 style={{ alignItems: "end", }}
      class="font-avant_garde_bold"
      id={styles._H3}> What types of digital products do you offer? 
    </h3>,
    children: 
    
    <p style={{ position: "relative", left: "25px" }}
       class=""> 

    {text_1} 
    <br/>    
    <ul class="list-disc ... font-geist_regular ..."
        id={styles._H3_2}
        style={{ position: "relative", left: "35px" }}>
        <li> <a class="font-geist_semibold ... text-stone-700 ...">Design Automation Tools</a> – Grasshopper scripts and 
                AI-powered solutions to speed up complex design tasks.</li>
        <li> <a class="font-geist_semibold ... text-stone-700 ...">BIM & Project Management Resources</a> – Smart templates, workflows, 
                and automation tools to improve coordination and efficiency.</li>
        <li> <a class="font-geist_semibold ... text-stone-700 ...">Drawing & Design Templates</a> – Pre-built, intelligent templates speed up drafting 
                and ensure consistency across projects.</li>
        <li> <a class="font-geist_semibold ... text-stone-700 ...">Time Management</a> – AI-driven task planners and productivity tools eliminate inefficiencies 
                and help teams focus on high-impact work.</li>
    </ul>
    <a class="font-avant_garde_bold ... text-stone-700 ..."><Link href="/products">Learn More here!</Link></a>

    </p>
    

  },

  {
    key: '2',
    label: 
    <h3 style={{ color: "rgb(231 229 228)", alignItems: "end" }}
      class="font-avant_garde_bold"
      id={styles._H3}> How can your AI-driven tools help my architecture, design
      <br/> or manufacturing business?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }} > {text_2} </p>
  },

  {
    key: '3',
    label: <h3 style={{ color: "#44403C", alignItems: "end" }}
      class="font-avant_garde_bold"
      id={styles._H3}> Do you offer custom design solutions, or are your 
      <br/> products pre-made?
    </h3>,
    children: <p style={{ position: "relative", left: "25px", }} > {text_3} </p>
  },

  {
    key: '4',
    label: <h3 style={{ color: "rgb(231 229 228)", alignItems: "end" }}
      class="font-avant_garde_bold"
      id={styles._H3}>Are your digital products easy to integrate into 
      <br/> my existing workflow?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }} > {text_4} </p>
  },

  {
    key: '5',
    label: <h3 style={{ color: "rgb(231 229 228)", alignItems: "end" }}
      class="font-avant_garde_bold"
      id={styles._H3}> Can your automation tools help me save time on 
      <br/> repetitive design tasks?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }} > {text_5} </p>
  },

  {
    key: '6',
    label: <h3 style={{ color: "#44403C", alignItems: "end" }}
      class="font-avant_garde_bold"
      id={styles._H3}>What makes your services different from other design 
      <br/> and tech solutions?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }} > {text_6} </p>
  },

  {
    key: '7',
    label: <h3 style={{ color: "#44403C", alignItems: "end" }}
      class="font-avant_garde_bold"
      id={styles._H3}>Do you work with individual professionals, small firms, or 
      <br/> large businesses?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }} > {text_7} </p>
  },

  {
    key: '8',
    label: <h3 style={{ color: "rgb(231 229 228)", alignItems: "end", paddingBottom: "0px" }}
      class="font-avant_garde_bold"
      id={styles._H3}> How do you incorporate sustainability into your designs?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }}  > {text_8} </p>
  },

   {  key: '9',
    label: <h3 style={{ color: "rgb(231 229 228)", alignItems: "end", paddingBottom: "0px" }}
      class="font-avant_garde_bold"
      id={styles._H3}> How do I get started with your services, and what are 
      <br/> the pricing options?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }}  > {text_9} </p>
  },





];
const Collapsed_3 = () => <Collapse style={{ display: "grid", rowGap: "0px", position:"relative", left:"60px"}}
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
export default Collapsed_3;