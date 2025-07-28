import styles from './astronaut.module.css'
import React, { Component } from 'react';


import Image from "next/image";



export default class About extends Component {
  
  render() {
    const astronaut_1 = "https://res.cloudinary.com/dbj8h56jj/image/upload/v1753610789/Portfolio/pexels-arantxa-treva-351075-959323_prenop.jpg"
    return (

      <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>
        <div class={styles.grid_0_image_left}>
          <div
            class=""
            id={styles.ASTRONAUT_IMAGE_1}>

              <div id={styles.IMAGE}>
                <Image
                  
                  src={astronaut_1}
                  alt="Astronaut Image"
                  width={500}
                  height={500}
                  
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

