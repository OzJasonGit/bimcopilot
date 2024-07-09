"use client";

import React, { useState } from "react";
import styles from "./tabs.module.css";

import Image from "next/image";

import man3 from  "./3542.jpg"
import Pedro from "./1527083980338.jpeg";
import man2 from "./1623052727307.jpg";
import { Tabs } from "antd";

const Tab = () => {
  const testimonialsArr = [
    {
      key: `1`,
      src: Pedro,
      text: (
        <h1>
          <a>
            <h3 class="text-stone-400 ... font-avant_garde_bold ... text-sm ...">
              Known for its loyalty and faithfulness,
            </h3>
          </a>
          <br />
          ` A dog is a type of domesticated animal. Known for its loyalty and
          faithfulness.`
        </h1>
      ),
      label: (
        <div id={styles.T_TAB_HOLDER}>
          <div class="rounded-full ... bg-indigo-500 ..." id={styles.T_TAB}></div>
        </div>
      ),
    },
    {
      key: `2`,
      src: man2,
      text: (
        <h1>
          <a>
            <h3 class="text-stone-400 ... font-avant_garde_bold  text-sm ...">
              Known for its loyalty and faithfulness,
            </h3>
          </a>
          <br />
          ` Known for its loyalty and faithfulness, it can be found as a welcome
          guest in many households across the world.`
        </h1>
      ),
      label: (
        <div id={styles.T_TAB_HOLDER}>
          <div class="rounded-full ... bg-indigo-500 ..." id={styles.T_TAB}></div>
        </div>
      ),
    },
    {
      key: `3`,
      src: man3,
      text: (
        <h1>
          <a>
            <h3 class="text-stone-400 ... font-avant_garde_bold  text-sm ...">
              Known for its loyalty and faithfulness,
            </h3>
          </a>
          <br />
          ` it can be found as a welcome guest in many households across the
          world.`
        </h1>
      ),
      label: (
        <div id={styles.T_TAB_HOLDER}>
          <div class="rounded-full ... bg-indigo-500 ..." id={styles.T_TAB}></div>
        </div>
      ),
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
          items={testimonialsArr.map((testimonial, i) => {
            const id = String(i + 1);

            return {
              label: (
                <div id={styles.T_TAB_HOLDER}>
                  <Image
                    id={styles.T_TAB}
                    src={testimonial.src}
                    alt="Picture of the author"
                    width={250}
                    height={250}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    class="rounded-full ..."
                  />
                </div>
              ),
              key: id,
              children: (
                <h2
                  class="font-avant_garde_bold text-2xl ... text-slate-100 ..."
                  style={{
                    position: "relative",
                    left: "0px",
                    paddingRight: "200px",
                  }}
                >
                  {testimonial.text}
                </h2>
              ),
            };
          })}
        />
      </div>
    </>
  );
};

export default Tab;
