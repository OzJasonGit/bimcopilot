import Provider from "../../app/utils/Provider";


import styles from './subfooter.module.css'
import React, { Component } from 'react';


import Image from "next/image";
import Link from "next/link";
import astronaut from "./ASTRONAUT_2.png";


export default class Subfooter extends Component {

  render() {
    return (

    <Provider>

      <section
        id={styles.SHADOW_SECTION_ASTRONAUT}
        class={styles.center_holder}>

        <div class={styles.grid_0_image_right}>
          <div
            id={styles.ASTRONAUT_IMAGE_2}>

              <Image
                  src={astronaut}
                  alt="Picture of the author"
                  width={500}
                  height={500}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
          </div>
        </div>
      </section>  

    </Provider>

    

    )
  }
}

