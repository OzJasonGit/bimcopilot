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

    <h3 style={{ color: "rgb(68 64 60)" }}
        class="font-avant_garde_bold text-right ..."
        id={styles._H3}>
        Project Management, Delivery and Consultancy
    </h3>
);

const panel_2 = () => (
    <h3 style={{ color: "rgb(68 64 60)" }}
        class="font-avant_garde_bold text-right ..."
        id={styles._H3}>
        BIM Strategy, Execution Plan (BEP) and Documentation
        Digital Twin product development
    </h3>
);







const Collapsed_2 = () => {

    return (
        <>
            <Collapse
                style={{
                    display: "grid",
                    rowGap: 20,
                    position: "relative",
                    left: "58px",
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
                    <ul class="list-disc ... font-geistmono_semibold ... text-right ..."
                        id={styles._H3}
                        style={{ color: "rgb(68 64 60)", position: "relative", left: "0px" }}>
                        <li class="text-right ...">Now this is a story all about how, my life got flipped-turned upside down</li>
                        <li class="text-right ...">Now this is a story all about how, my life got flipped-turned upside down</li>

                    </ul>
                </Collapse.Panel>






            </Collapse>


        </>
    )
}


export default Collapsed_2;