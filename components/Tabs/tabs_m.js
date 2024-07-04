"use client";

import React, { Component, useState } from "react";
import styles from "./tabs.module.css";

import { Tabs } from "antd";

const ref_1 = `
  A dog is a type of domesticated animal.
  Known for in many households across the world.
`;

const ref_2 = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const ref_3 = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it 
`;

const Tab = () => {
    const items = [
        {
            key: "1",
            label: (
                <div id={styles.T_TAB_HOLDER}>
                    <div
                        class="rounded-full ...   bg-indigo-500 ..."
                        id={styles.T_TAB}
                    ></div>
                </div>
            ),

            children: (
                <p>
                    {" "}
                    A dog is a type of domesticated animal. Known for its
                    loyalty and faithfulness, it can be found as a welcome guest
                    in many households across the world.
                </p>
            ),
        },
        {
            key: "2",
            label: (
                <div id={styles.T_TAB_HOLDER}>
                    <div
                        class="rounded-full ...   bg-indigo-500 ..."
                        id={styles.T_TAB}
                    ></div>
                </div>
            ),
            children: <p>{ref_2}</p>,
        },
        {
            key: "3",
            label: (
                <div id={styles.T_TAB_HOLDER}>
                    <div
                        class="rounded-full ...   bg-indigo-500 ..."
                        id={styles.T_TAB}
                    ></div>
                </div>
            ),
            children: <p>{ref_3}</p>,
        },
    ];

    const [tabPosition, setTabPosition] = useState("right");
    const changeTabPosition = (e) => {
        setTabPosition(e.target.value);
    };

    return (
        <>
            <div id={styles.T_CONTAINER}>
                <Tabs
                    style={{
                        height: "100%",
                        alignItems: "center",
                    }}
                    tabPosition={tabPosition}
                    defaultActiveKey={["1"]}
                    items={items.map((_, i) => {
                        const id = String(i + 1);

                        return {
                            label: (
                                <div id={styles.T_TAB_HOLDER}>
                                    <div
                                        class="rounded-full ...   bg-indigo-500 ..."
                                        id={styles.T_TAB}
                                    ></div>
                                </div>
                            ),
                            key: id,
                            children: (
                                <h1
                                    class="font-avant_garde_bold text-4xl ... text-slate-100 ..."
                                    id={styles._H1}
                                >
                                        
                                  {     id === 1
                                        ? ref_1
                                        : id === 2
                                        ? ref_2
                                        : ref_3}
                                </h1>
                            ),
                        };
                    })}
                />
            </div>
        </>
    );
};

export default Tab;
