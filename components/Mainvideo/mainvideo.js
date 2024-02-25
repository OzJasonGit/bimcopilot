import Provider from "../../app/utils/Provider";



import styles from './mainvideo.module.css'
import React, { Component } from 'react';


import Image from "next/image";
import Link from "next/link";



export default class Mainvideo extends Component {

  render() {
    return (

      <Provider>

        <section id={styles.SHADOW_SECTION} class={styles.center_holder}>
        <div class={styles.grid_0_main}>
          <div class={styles.video_section}>
            <div id={styles.VIDEO_LATEST_HOLDER}>
              <div id={styles.VIDEO_LATEST} class="rounded-xl ..."></div>

              {/*<Video />*/}

              <div id={styles.VIDEO_TEXT_HOLDER} class="rounded ...">
                <div id={styles.V_TITLE_HOLDER}>
                  <h2
                    id={styles._H2}
                    class="text-4xl ... text-slate-100 ... drop-shadow-xl font-avant_garde_bold"
                  >
                    {/*{stories[0].title}*/}
                  </h2>
                </div>
                <div id={styles.V_SUBTITLE_HOLDER}>
                  <h3
                    id={styles._H3}
                    class="text-xl ... text-stone-400 ... drop-shadow-xl font-avant_garde_medium"
                  >
                    {/*{stories[0].subtitle}*/}
                  </h3>
                </div>
                <div class="rounded ..." id={styles.SHARE}></div>
              </div>
            </div>

            <div class="rounded-xl ... " id={styles.GRAPHIC}></div>

            <div id={styles.SERVICES_HOLDER}>
              <div id={styles.SERVICES}>
                <div id={styles.SERVICES_TITLE}>
                  <h2
                    id={styles._H2}
                    class="text-4xl ... text-stone-400 ... drop-shadow-xl font-avant_garde_bold"
                  >
                    Services
                  </h2>
                </div>

                <div
                  class="rounded-md ..."
                  id={styles.SERVICES_COLLAPSE_HOLDER}
                >
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      </Provider>

        

    )
  }
}

