import styles from './astronaut.module.css'
import React, { Component } from 'react';


import Image from "next/image";
import astronaut_1 from "./ASTRONAUT_1_(6).png";

export default class About extends Component {

  render() {
    return (

      <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>
        <div class={styles.grid_0_image_left}>
          <div
            class=""
            id={styles.ASTRONAUT_IMAGE_1}>

              <div id={styles.IMAGE}>
                <Image
                  
                  src={astronaut_1}
                  alt="Picture of the author"
                  width={500}
                  
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
              />

              </div>

              

          </div>
        </div>
      </section>

    )
  }
}

