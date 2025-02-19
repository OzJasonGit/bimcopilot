"use client";
import styles from "./video.module.css";
import React, { Component } from 'react';

const Video = () => {
  return (
    <>
    
      <div class="rounded-2xl ..." id={styles.VIDEO_CONTAINER}
          style={{
              position: "relative",
              width: "100%",
              height: "400px",
              gridArea: "VIDEO",
              display: "grid",
              justifyContent: "center",
          }}>

          <div id={styles.VIDEO}>
            <video /*autoPlay*/ controls playsInline muted loop src="https://res.cloudinary.com/dytsuek4h/video/upload/v1718789410/2836031_jb9p48.mp4" style={{  borderRadius:"0.5rem"}}>
            </video>
          </div>
       
      </div>

    
      
    </>
  )
}

export default Video;