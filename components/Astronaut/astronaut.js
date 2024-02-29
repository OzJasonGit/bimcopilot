
import Provider from "../../app/utils/Provider";

import styles from './astronaut.module.css'
import React, { Component } from 'react';


import Image from "next/image";
import Link from "next/link";


import Infinite_Scroll from "../../components/Carousel/Infinite_Scroll";
import Tab from "../../components/Tabs/tabs";
import Tab_Horizontal from "../../components/Tabs/tabs_horizontal";

import astronaut_1 from "./ASTRONAUT_1.png";

export default class About extends Component {

  render() {
    return (

      <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>
        <div class={styles.grid_0_image_left}>
          <div
            class="rounded-2xl ... drop-shadow-2xl ... border-solid border-2 border-slate-400..."
            id={styles.ASTRONAUT_IMAGE_1}>

              <Image
                  id={styles.IMAGE}
                  src={astronaut_1}
                  alt="Picture of the author"
                  width={500}
                  height={500}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
              />

          </div>
        </div>
      </section>

    )
  }
}

