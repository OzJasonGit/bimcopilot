
import Provider from "../../app/utils/Provider";

import styles from './world.module.css'
import React, { Component } from 'react';

import Video from 'next-video';
// import myVideo from "../../videos/WIN_20221027_18_10_02_Pro.mp4";


import Image from "next/image";
import Link from "next/link";


export default class About extends Component {

  render() {
    return (

        <section id={styles.SHADOW_SECTION_WORLD} class={styles.center_holder}>
            <div class={styles.grid_0_main_world}>
                <div id={styles.PLANET_HOLDER_GRID}>               
                    <div id={styles.BACKGROUND_VIDEO_HOLDER}>
                        {/* <div class="rounded-xl ..." id={styles.BACKGROUND_VIDEO}>
                            <Video src={myVideo} autoPlay loop muted 
                                width={500}
                                height={1000}
                                style={{
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                }}
                                controls={false}/>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>

    )
  }
}

