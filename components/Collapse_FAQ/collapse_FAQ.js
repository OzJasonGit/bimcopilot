"use client";

import React, { Component, useState } from "react";
import styles from "./collapse.module.css";


import { CaretRightFilled } from "@ant-design/icons";
import { Collapse } from "antd";






const text_1 = `
 What tools or technology do you use for planning and visualization?   
`;

const text_2 = `
 What is your process from concept to completion?
`;

const text_3 = `
 How will you ensure the project stays on schedule?
`;

const text_4 = `
 How involved can I be in the design process?
`;

const text_5 = `
 What experience do you have with projects like mine?
`;

const text_6 = `
 How do you handle unexpected challenges during a project?
`;

const text_7 = `
 What sets you apart from others in your field?
`;

const text_8 = `
 How do you incorporate sustainability into your designs?
`;




const items = [

 {
    key: '1',
    label:    <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> What tools or technology do you use for planning and visualization?
              </h3>,  
    children: <p> {text_1} </p> 
             
  },

   {
    key: '2',
    label:    <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> What is your process from concept to completion?
              </h3>,             
    children: <p> {text_2} </p> 
  },

   {
    key: '3',
    label:    <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> How will you ensure the project stays on schedule?
              </h3>,    
    children:  <p> {text_3} </p> 
  },

   {
    key: '4',
    label:    <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> How involved can I be in the design process?
              </h3>, 
    children: <p> {text_4} </p>   
  },

   {
    key: '5',
    label:    <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> What experience do you have with projects like mine?
              </h3>, 
    children: <p> {text_5} </p>    
  },

   {
    key: '6',
    label: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> How do you handle unexpected challenges during a project?
              </h3>, 
    children: <p> {text_6} </p>   
  },

   {
    key: '7',
    label: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> What sets you apart from others in your field?
              </h3>, 
    children: <p> {text_7} </p>   
  },

  {
    key: '8',
    label: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> How do you incorporate sustainability into your designs?
              </h3>, 
    children: <p style={{position: "relative", right: "30px"}}  > {text_8} </p>   
  },





];
const Collapsed_3 = () => <Collapse style={{display: "grid", rowGap: "0px",}}                                          
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