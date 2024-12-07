"use client";

import React, { useState, useEffect } from "react";
import styles from "./tabs.module.css";
import Image from "next/image";
import Raj_Deb from "./Raj.png";
import Pedro from "./1527083980338.jpeg";
import Stas_Louca from "./3542.jpg";
import { Tabs } from "antd";

const Tab = () => {
  const testimonialsArr = [
    {
      key: "1",
      src: Pedro ,
      text: (
        <h2 
          id={styles._H2}>
          <a>
            <h3 className="text-stone-400 font-avant_garde_bold text-sm">
              Pedro Sanchez Reche, Foster and Partners, London, UK
            </h3>
          </a>
          <br />
            " ... Oz's deep industry knowledge allows him to quickly 
            identify problems and deliver actionable strategies. " 
        </h2>
      ),
    },
    
    {
      key: "2",
      src: Stas_Louca,
      text: (
        <h2
          id={styles._H2}>
          <a>
            <h3 className="text-stone-400 font-avant_garde_bold text-sm">
              Stas Louca, H + A Architects, Dubai, UAE                         
            </h3>
          </a>
          <br />
          " We worked with Bimcopilot in early 2024, on a project involving sensitive 
          design requirements. 
          <br/> <br/> 
          Bimcopilot excels in streamlining workflows, resolving bottleknecks and 
          fostering collaboratgion amongst teams. "
        </h2>
      ),
    },

    {
      key: "3",
      src:  Raj_Deb ,
      text: (
        <h2
          id={styles._H2}>        
          <a>
            <h3 className="text-stone-400 font-avant_garde_bold text-sm">
              Raj Deb, Perkins + Will, London, UK                 
            </h3>
          </a>
          <br/>
          " Working with Oz Jason and Bimcopilot.com has been a game-changer for our projects...
          <br/> <br/> 
          His understanding of BIM, cutting-edge technologies and applying it to real-world scenarios
          has allowed us to turn complex challenges into efficient, practical solutions. "
        </h2>
      ),
    },

  ];

  const [tabPosition, setTabPosition] = useState("right");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTabPosition("top");
      } else {
        setTabPosition("right");
      }
    };

    handleResize(); // Check initial window size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div id={styles.T_CONTAINER}>
      <Tabs
        style={{ height: "100%", alignItems: "center" }}
        tabPosition={tabPosition}
        defaultActiveKey="1"
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
                  style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }}
                  className="rounded-full"
                />
              </div>
            ),
            key: id,
            children: (
              <h2
                className="font-avant_garde_bold text-2xl text-slate-100"
                style={{ position: "relative", left: "0px", top: "100%", paddingRight: "200px" }}
              >
                {testimonial.text}
              </h2>
            ),
          };
        })}
      />
    </div>
  );
};

export default Tab;
