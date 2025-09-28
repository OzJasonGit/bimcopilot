"use client";

import React, { Component, useState } from "react";
import styles from "./collapse.module.css";


import {Accordion, AccordionItem} from "@heroui/react";


const contentStyle = {
    height: "160px",
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
};

const panel_1 = () => (

    <h3 style={{ alignItems: "end" }}
        class="font-avant_garde_bold text-stone-500 ..."
        id={styles._H3}>
        Project Management, Delivery and Consultancy
    </h3>
);

const panel_2 = () => (
    <h3 style={{ alignItems: "end" }}
        class="font-avant_garde_bold text-stone-500 ..."
        id={styles._H3}>
        BIM Strategy, Execution Plan (BEP) and Documentation
        Digital Twin product development
    </h3>
);


const defaultContent =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";







const Collapsed_4 = () => {

    return (
        <>
        <Accordion variant="light">
            <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
                {defaultContent}
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
                {defaultContent}
            </AccordionItem>
            <AccordionItem key="3" aria-label="Accordion 3" title="Accordion 3">
                {defaultContent}
            </AccordionItem>
        </Accordion>
           


        </>
    )
}


export default Collapsed_4;











