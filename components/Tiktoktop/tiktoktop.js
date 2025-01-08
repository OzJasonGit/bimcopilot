import styles from './tiktoktop.module.css';

import React, { Component } from 'react';
import Link from "next/link";
import Image from "next/image";
import tiktoklogo from "./Tiktok_Logo_4.png";
import tiktoklogo_dark from "./Tiktok_Logo_(Black).png";
import "./client/Tiktok/tiktok";
const Tiktok = React.lazy(() => import("./client/Tiktok/tiktok"));

export default class Tiktoktop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoLoaded: false,
    };
  }

  handleVideoLoad = () => {
    this.setState({ videoLoaded: true });
  };

  render() {
    const { videoLoaded } = this.state;
    return (
      <section id={styles.SHADOW_SECTION_TIKTOK} className={styles.center_holder}>
        <div className={styles.grid_0_main}>
          <div id={styles.MAIN_TIKTOK_HOLDER}>
            <div id={styles.ICON_HOLDER}>
              <Link href="https://www.tiktok.com/@pfbd_" id={styles.ICON_TIKTOK}>
                <div id={styles.ICON_TIKTOK_2}>
                  <Image
                    src={tiktoklogo}
                    alt="TikTok Logo"
                    width={500}
                    height={500}
                    style={{
                      position: "absolute",
                      width: "auto",
                      height: "100%",
                      justifyItems: "center",
                      alignItems: "center",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div id={styles.ICON_TIKTOK_3}>
                  <Image
                    src={tiktoklogo_dark}
                    alt="TikTok Logo Dark"
                    width={500}
                    height={500}
                    loading="lazy"
                    style={{
                      position: "absolute",
                      width: "auto",
                      height: "100%",
                      justifyItems: "center",
                      alignItems: "center",
                      objectFit: "contain",
                    }}
                  />
                </div>
              </Link>
            </div>

            <div id={styles.TIKTOK_HOLDER}>
              <div
                id={styles.TIKTOK}
                className="rounded-2xl drop-shadow-2xl shadow-black"
              >
                <Tiktok />
                <div className="tiktok-video" style={{ position: "relative" }}>
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
                      }}
                    >
                      <span style={{ color: "#fff" }}>Loading video...</span>
                    </div>
                  )}
                  <video
                    autoPlay
                    controls
                    playsInline
                    preload="metadata"
                    muted
                    loop
                    src="https://res.cloudinary.com/dytsuek4h/video/upload/v1712935614/ad4f40818468b4acb07956069ae103e3_cqoozt.mp4"
                    style={{ width: "100%", height: "100%" }}
                    onLoadedData={this.handleVideoLoad}
                  ></video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
