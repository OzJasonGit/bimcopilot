"use client";
import MuxPlayer from "@mux/mux-player-react";
import styles from "./Tiktok.module.css";
import React, { Component } from 'react';

import Video from 'next-video';
// import myVideo from "../../../../videos/WIN_20221027_18_10_02_Pro.mp4";



const Tiktok = () => {
  return (
    <>
      <div class="rounded-lg ..." id={styles.VIDEO_CONTAINER}>

        {/* <div id={styles.VIDEO}  class="w-full h-full">
          <Video src={myVideo} autoPlay loop muted 
                                height={620}
                                fill={true}
                                style={{
                                position: "absolute",                               
                                objectFit: "cover",
                                }}
                                controls={true}/>   
        </div> */}

      
        
      </div>
    </>
  )
}

export default Tiktok;