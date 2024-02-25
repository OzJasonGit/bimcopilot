import Provider from "../../app/utils/Provider";


import styles from './subfooter.module.css'
import React, { Component } from 'react';


import Image from "next/image";
import Link from "next/link";



export default class Subfooter extends Component {

  render() {
    return (

    <Provider>

      <section
        id={styles.SHADOW_SECTION_ASTRONAUT}
        class={styles.center_holder}>

        <div class={styles.grid_0_image_right}>
          <div
            class="rounded-2xl ... drop-shadow-2xl ... border-solid border-2 border-slate-200..."
            id={styles.ASTRONAUT_IMAGE_2}>
          </div>
        </div>
      </section>  

    </Provider>

    

    )
  }
}

