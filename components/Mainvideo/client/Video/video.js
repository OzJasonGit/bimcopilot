"use client";
import MuxPlayer from "@mux/mux-player-react"; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceRelieved, faBasketball } from '@fortawesome/free-solid-svg-icons'
import styles from "./video.module.css";
import React, { Component } from 'react';
import Provider from "../../../../app/utils/Provider";

import Script from 'next/script'

// import 'antd/dist/reset.css';
import Link from 'next/link';
//import Date from '../Date/date'; 





const Video = () => {
  return (
    <>
    
      <div class="rounded-2xl ..." id={styles.VIDEO_CONTAINER}>

        <div id={styles.VIDEO}>
          {/* <MuxPlayer       
          style={{
              display:"flex",
              position: "absolute",
              height:"100%",
              objectFit: "cover",
              top: "0px",
              width:"100%"}}                                   
          streamType="on-demand"
          playbackId="EcHgOK9coz5K4rjSwOkoE7Y7O01201YMIC200RI6lNxnhs"
          accentColor="#ea580c"
          metadata={{
          videoTitle: "Test VOD",
          ViewerUserId: "user-id-007"
          }}
        />  */}
<video autoPlay controls playsInline muted loop src="https://res.cloudinary.com/dytsuek4h/video/upload/v1718789410/2836031_jb9p48.mp4" style={{width:"100%",
 height:"100%"}}></video>
        </div>




        
        
      </div>

    
      
    </>
  )
}

export default Video;