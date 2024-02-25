"use client";
import MuxPlayer from "@mux/mux-player-react";
import styles from "./Tiktok.module.css";
import React, { Component } from 'react';


const Tiktok = () => {
  return (
    <>
      <div class="rounded-lg ..." id={styles.VIDEO_CONTAINER}>

        <div id={styles.VIDEO}>
          <MuxPlayer 

          style={{
              display:"flex",
              position: "relative",
              height:"100%",
              top: "0px",
              width:"100%"
              }}   
                                   
          streamType="on-demand"
          playbackId="EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs"
          accentColor="#ea580c"
          metadata={{
          videoTitle: "Test VOD",
          ViewerUserId: "user-id-007",
         
          }}
        /> 
        </div>
        
      </div>
    </>
  )
}

export default Tiktok;