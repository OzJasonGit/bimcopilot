"use client";

import React, { Component, useState } from "react";
import styles from "./collapse_sales.module.css";


import { CaretRightFilled } from "@ant-design/icons";
import { Collapse, Typography } from "antd";


const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};

const panel_1 = () => (
    
    <h2 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
        class="font-avant_garde_bold text-2xl"
        id={styles._H2}>
        Project Management, Delivery and Consultancy        
    </h2>
);

const panel_2 = () => (
    <h2 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
        class="font-avant_garde_bold text-2xl"
        id={styles._H2}> 
        BIM Strategy, Execution Plan (BEP) and Documentation 
    </h2>
);

const panel_3 = () => (
    <h2 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
        class="font-avant_garde_bold text-2xl"
        id={styles._H2}> 
        Digital Twin product development 
    </h2>
);

const panel_4 = () => (
    <h2 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
        class="font-avant_garde_bold text-2xl"
        id={styles._H2}> 
        Revit Training 
    </h2>
);




const Collapsed = () => {
    
        return (
            <>
                <Collapse
                                        style={{
                                            display: "grid",
                                            rowGap: 20,
                                            position: "relative",
                                            left: "-50px"
                                        }}
                                        accordion={true}
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
                                    >
                                        <Collapse.Panel
                                            key={"1"}
                                            header={panel_1()}
                                        >
                                            <h3 class="font-avant_garde_bold text-lg ..."
                                                style={{ color: "rgb(120 113 108)", position: "relative", left: "25px" }}
                                                id={styles._H3}
                                            >
                                                A dog is a type of domesticated
                                                animal. Known for its loyalty
                                                and faithfulness, it can be
                                                found as a welcome guest in many
                                                households across the world.
                                            </h3>
                                        </Collapse.Panel>

                                        <Collapse.Panel
                                            style={{ color: "#f1f1f1" }}
                                            key={"2"}
                                            header={panel_2()}
                                        >
                                            <h3 class="font-avant_garde_bold text-lg ..."
                                                style={{ color: "rgb(120 113 108)", position: "relative", left: "25px" }}
                                                id={styles._H3}
                                            >
                                                A dog is a type of domesticated
                                                animal. Known for its loyalty
                                                and faithfulness, it can be
                                                found as a welcome guest in many
                                                households across the world.
                                            </h3>
                                        </Collapse.Panel>

                                        <Collapse.Panel
                                            key={"3"}
                                            header={panel_3()}
                                        >
                                            <h3 class="font-avant_garde_bold text-lg ..."
                                                style={{ color: "rgb(120 113 108)", position: "relative", left: "25px" }}
                                                id={styles._H3}
                                            >
                                                A dog is a type of domesticated
                                                animal. Known for its loyalty
                                                and faithfulness, it can be
                                                found as a welcome guest in many
                                                households across the world.
                                            </h3>
                                        </Collapse.Panel>

                                        <Collapse.Panel
                                            key={"4"}
                                            header={panel_4()}
                                        >
                                            <h3 class="font-avant_garde_bold text-lg ..."
                                                style={{ color: "rgb(120 113 108)", position: "relative", left: "25px" }}
                                                id={styles._H3}
                                            >
                                                A dog is a type of domesticated
                                                animal. Known for its loyalty
                                                and faithfulness, it can be
                                                found as a welcome guest in many
                                                households across the world.
                                            </h3>
                                        </Collapse.Panel>
                                    </Collapse>
              
                
            </> 
        )
    }


export default Collapsed;