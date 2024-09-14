import Provider from "../../app/utils/Provider";

import styles from './herotitle.module.css'
import React, { Component } from 'react';


export default class Herotitle extends Component {

  render() {
    return (

    
      <Provider>

        <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>
        <div class={styles.grid_0_main}>
          <div id={styles.MAIN_TEXT_HOLDER}>
            <div id={styles.SUB_TEXT_HOLDER}>
              <h1
                class="text-6xl ... text-neutral-700 ... font-avant_garde_bold"
                id={styles._H1_2}
              >
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-6xl ...  text-emerald-200"
                >
                  Sustainability
                </a>{" "}
                <a id={styles._H1_2}>
                  through exploration. We explore new frontiers in
                </a>
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-6xl ...  text-stone-50 ... underline decoration-4 ... decoration-stone-600 ..."
                >
                  {" "}
                  architecture
                </a>
                ,
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-6xl ... text-stone-50 ... underline decoration-4 ... decoration-stone-600 ..."
                >
                  {" "}
                  construction{" "}
                </a>
                <a class="text-6xl ...">and</a>{" "}
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-6xl ... text-stone-50 ... underline decoration-4 ... decoration-stone-600 ..."
                >
                  {" "}
                  technology
                </a>
                .
              </h1>

              {/* ////////////////////////////////////////////////////////////////video-container//////////////////////////////// */}


           






            </div>

            <div id={styles.SUB_TEXT_HOLDER_MOBILE}>
              <h1
                class="text-5xl ... text-neutral-700 ... font-avant_garde_bold"
                id={styles._H1_2}
              >
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-5xl ...  text-emerald-200"
                >
                  Sustainability
                </a>{" "}
                <a class="text-5xl ..."
                   id={styles._H1_2}>
                  through exploration. We explore new frontiers in
                </a>
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-5xl ...  text-stone-50 ... underline decoration-4 ... decoration-red-300 ..."
                >
                  {" "}
                  architecture
                </a>
                ,
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-5xl ... text-stone-50 ... underline decoration-4 ... decoration-amber-300 ..."
                >
                  {" "}
                  construction{" "}
                </a>
                <a class="text-5xl ..."   
                   id={styles._H1_2}>and</a>{" "}
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-5xl ... text-stone-50 ... underline decoration-4 ... decoration-sky-300 ..."
                >
                  {" "}
                  technology
                </a>
                .
              </h1>
            </div>
          </div>
        </div>
      </section>

      </Provider>
      
    )
  }
}
