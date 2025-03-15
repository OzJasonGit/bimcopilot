"use client";

import React, { Component, useState } from "react";
import styles from "./collapse.module.css";


import { CaretRightFilled } from "@ant-design/icons";
import { Collapse } from "antd";






const text_1 = `
What types of digital products do you offer? 
`;

const text_2 = `
How can your AI-driven tools help my architecture, design or manufacturing business?
`;

const text_3 = `
Do you offer custom design solutions, or are your products pre-made?
`;

const text_4 = `
Are your digital products easy to integrate into my existing workflow?
`;

const text_5 = `
Can your automation tools help me save time on repetitive design tasks?
`;

const text_6 = `
What makes your services different from other design and tech solutions?
`;

const text_7 = `
Do you work with individual professionals, small firms, or large businesses?
`;

const text_8 = `
 How do you incorporate sustainability into your designs?
`;

const text_9 = `
How do I get started with your services, and what are the pricing options?
`;




const items = [

  {
    key: '1',
    label: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
      class="font-avant_garde_bold"
      id={styles._H3}> What tools or technology do you use for planning and visualization?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }} > {text_1} </p>

  },

  {
    key: '2',
    label: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
      class="font-avant_garde_bold"
      id={styles._H3}> What is your process from concept to completion?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }} > {text_2} </p>
  },

  {
    key: '3',
    label: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
      class="font-avant_garde_bold"
      id={styles._H3}> How will you ensure the project stays on schedule?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }} > {text_3} </p>
  },

  {
    key: '4',
    label: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
      class="font-avant_garde_bold"
      id={styles._H3}> How involved can I be in the design process?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }} > {text_4} </p>
  },

  {
    key: '5',
    label: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
      class="font-avant_garde_bold"
      id={styles._H3}> What experience do you have with projects like mine?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }} > {text_5} </p>
  },

  {
    key: '6',
    label: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
      class="font-avant_garde_bold"
      id={styles._H3}> How do you handle unexpected challenges during a project?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }} > {text_6} </p>
  },

  {
    key: '7',
    label: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
      class="font-avant_garde_bold"
      id={styles._H3}> What sets you apart from others in your field?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }} > {text_7} </p>
  },

  {
    key: '8',
    label: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end", paddingBottom: "0px" }}
      class="font-avant_garde_bold"
      id={styles._H3}> How do you incorporate sustainability into your designs?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }}  > {text_8} </p>
  },

   {  key: '9',
    label: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end", paddingBottom: "0px" }}
      class="font-avant_garde_bold"
      id={styles._H3}> How do you incorporate sustainability into your designs?
    </h3>,
    children: <p style={{ position: "relative", left: "25px" }}  > {text_8} </p>
  },





];
const Collapsed_3 = () => <Collapse style={{ display: "grid", rowGap: "0px", }}
  accordion items={items}
  expandIcon={({ isActive }) => {
    return (
      <CaretRightFilled
        style={{
          color: "rgb(68 64 60)",
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