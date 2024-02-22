"use client";

import React, { Component, useState } from "react";
import styles from "./collapse.module.css";


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
    
    <h2 style={{ alignItems: "end" }}
        class="font-avant_garde_bold text-4xl text-stone-600 ..."
        id={styles.TEXT_OUTLINE_2}>
        BIM strategic consulting      
    </h2>
);

const panel_2 = () => (
    <h2 style={{ alignItems: "end" }}
        class="font-avant_garde_bold text-4xl text-stone-600 ..."
        id={styles.TEXT_OUTLINE_2}> 
        Project data capture and live dashboard development 
    </h2>
);

const panel_3 = () => (
    <h2 style={{ alignItems: "end" }}
        class="font-avant_garde_bold text-4xl text-stone-600 ..."
        id={styles.TEXT_OUTLINE_2}> 
        Digital twin product development 
    </h2>
);


const panel_4 = () => (
    <h2 style={{ alignItems: "end" }}
        class="font-avant_garde_bold text-4xl text-stone-600 ..."
        id={styles.TEXT_OUTLINE_2}> 
        Project technical drafting 
    </h2>
);



const panel_5 = () => (
    <h2 style={{ alignItems: "end" }}
        class="font-avant_garde_bold text-4xl text-stone-600 ..."
        id={styles.TEXT_OUTLINE_2}> 
        Revit Training 
    </h2>
);




const Collapsed = () => {
    
        return (
            <>
                <Collapse
                                        style={{
                                            display: "grid",
                                            rowGap: 25,
                                        }}
                                        accordion={true}
                                        expandIcon={({ isActive }) => {
                                            return (
                                                <CaretRightFilled
                                                    style={{
                                                        color: "#f1f1f1",
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
                                            <h3 class="font-avant_garde_bold text-xl ... text-stone-500 ..."
                                                style={{ position: "relative", left: "25px" }}
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
                                            <h3 class="font-avant_garde_bold text-xl ... text-stone-500 ..."
                                                style={{ position: "relative", left: "25px" }}
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
                                            <h3 class="font-avant_garde_bold text-xl ... text-stone-500 ..."
                                                style={{ position: "relative", left: "25px" }}
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
                                            <h3 class="font-avant_garde_bold text-2xl ... text-stone-500 ..."
                                                style={{ position: "relative", left: "25px" }}
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
                                            key={"5"}
                                            header={panel_5()}
                                        >
                                            <h3 class="font-avant_garde_medium text-xl ..."
                                                style={{ color: "#f1f1f1", position: "relative", left: "25px" }}
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