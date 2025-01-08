
import styles from './world.module.css'
import React, { Component } from 'react';

export default class About extends Component {

  render() {
    return (

        <section id={styles.SHADOW_SECTION_WORLD} class={styles.center_holder}>
            <div class={styles.grid_0_main_world}>
                <div id={styles.PLANET_HOLDER_GRID}>               
                    <div id={styles.BACKGROUND_VIDEO_HOLDER}>
                    </div>
                </div>
            </div>
        </section>

    )
  }
}

