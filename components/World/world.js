
import Provider from "../../app/utils/Provider";

import styles from './world.module.css'
import React, { Component } from 'react';


import Image from "next/image";
import Link from "next/link";


export default class About extends Component {

  render() {
    return (

        <section id={styles.SHADOW_SECTION_WORLD} class={styles.center_holder}>
            <div class={styles.grid_0_main_world}>
                <div id={styles.PLANET_HOLDER_GRID}>               
                    <div id={styles.WORLD_GRID}>
                        <div
                            class="rounded-2xl ... drop-shadow-2xl ... border-solid border-2 border-slate-200..."
                            id={styles.PLANET_HOLDER}>
                        </div>
                    </div>
                    <div id={styles.BACKGROUND_GRID}>
                        <div
                            class="rounded-2xl ... drop-shadow-2xl ... border-solid border-2 border-slate-200..."
                            id={styles.PLANET_HOLDER}>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
  }
}

