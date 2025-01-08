"use client";

import React, { Component, useState } from "react";
import styles from "./collapse_sales.module.css";

import { CaretRightFilled } from "@ant-design/icons";
import { Collapse } from "antd";


const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};

const panel_1 = () => (

    <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
        class="font-geist_semibold ... text-md ... text-stone-700 ... "
        id={styles._H3}>
        Project Management, Delivery and Consultancy
    </h3>
);

const panel_2 = () => (
    <h3 style={{ color: "rgb(68 64 60)", alignItems: "end" }}
        class="font-geist_semibold ... text-md ... text-stone-700 ... "
        id={styles._H3}>
        BIM Strategy, Execution Plan (BEP) and Documentation
    </h3>
);





const Collapsed = () => {

    return (
        <>
            <Collapse
                style={{
                    display: "grid",
                    rowGap: 20,
                    position: "relative",
                    left: "0px"
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
                    <h3 class="text-md ... text-stone-700 ... font-geist_regular"
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

                    key={"2"}
                    header={panel_2()}
                >
                    <h3 class="text-md ... text-stone-700 ... font-geist_regular"
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


            </Collapse>


        </>
    )
}


export default Collapsed;