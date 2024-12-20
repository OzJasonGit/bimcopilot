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
    label: 'This is panel header 1',
    children: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> {text_1} 
              </h3>   
  },

   {
    key: '2',
    label: 'This is panel header 2',
    children: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> {text_2} 
              </h3>   
  },

   {
    key: '3',
    label: 'This is panel header 3',
    children: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> {text_3} 
              </h3>   
  },

   {
    key: '4',
    label: 'This is panel header 4',
    children: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> {text_4} 
              </h3>   
  },

   {
    key: '5',
    label: 'This is panel header 5',
    children: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> {text_5} 
              </h3>   
  },

   {
    key: '6',
    label: 'This is panel header 6',
    children: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> {text_6} 
              </h3>   
  },

   {
    key: '7',
    label: 'This is panel header 7',
    children: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> {text_7} 
              </h3>   
  },

  {
    key: '8',
    label: 'This is panel header 8',
    children: <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
                  class="font-avant_garde_bold"
                  id={styles._H3}> {text_8} 
              </h3>   
  },





];
const Collapsed_3 = () => <Collapse style={{display: "grid", rowGap: 10,}}                                          
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