"use client";
import styles from "./video.module.css";
import React, { useState } from "react";

const Video = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const handleVideoLoad = () => {
    setVideoLoaded(true);
  };

  return (
    <>
      <div className="rounded-2xl ..." id={styles.VIDEO_CONTAINER} style={{ position: "relative" }}>
        {!videoLoaded && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#151515",
              zIndex: 1,
              borderRadius: "0.5rem",
            }}
          >
            <span style={{ color: "#fff" }}>Loading video...</span>
          </div>
        )}

        <div id={styles.VIDEO}>
          <video
            autoPlay
            controls
            playsInline
            muted
            loop
            src="https://res.cloudinary.com/dytsuek4h/video/upload/v1718789410/2836031_jb9p48.mp4"
            style={{ borderRadius: "0.5rem" }}
            onLoadedData={handleVideoLoad}
          ></video>
        </div>
      </div>
    </>
  );
};

export default Video;
