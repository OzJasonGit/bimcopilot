import styles from './herotitle.module.css'
import React, { Component } from 'react';


export default class Herotitle extends Component {

  render() {
    return (


        <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>
        <div class={styles.grid_0_main}>
          <div id={styles.MAIN_TEXT_HOLDER}>
            <div id={styles.SUB_TEXT_HOLDER}>
              <h1
                class="text-6xl ... text-neutral-700 ... font-avant_garde_bold"
                id={styles._H1_2}
                style={{
                          paddingBottom:"15px"                        
                        }}
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

              <h3 
                id={styles._H3}
                class="text-base ... text-neutral-700 ... font-avant_garde_medium">
                Explore our resources and systems that can help architects and designers <br/>
                streamline their processes and be more profitable  throughout their business.
              </h3>

              {/* ////////////////////////////////////////////////////////////////video-container//////////////////////////////// */}


           






            </div>

            <div id={styles.SUB_TEXT_HOLDER_MOBILE}>
              <h1
                class=" text-neutral-700 ... font-avant_garde_bold"
                id={styles._H1_2}
              >
                <a
                  id={styles.TEXT_OUTLINE}
                  class=" text-emerald-200"
                >
                  Sustainability
                </a>{" "}
                <a class=""
                   id={styles._H1_2}>
                  through exploration. We explore new frontiers in
                </a>
                <a
                  id={styles.TEXT_OUTLINE}
                  class=" text-stone-50 ... underline decoration-4 ... decoration-stone-600 ..."
                >
                  {" "}
                  architecture
                </a>
                ,
                <a
                  id={styles.TEXT_OUTLINE}
                  class=" text-stone-50 ... underline decoration-4 ... decoration-stone-600 ..."
                >
                  {" "}
                  construction{" "}
                </a>
                <a class="text-5xl ..."   
                   id={styles._H1_2}>and</a>{" "}
                <a
                  id={styles.TEXT_OUTLINE}
                  class=" text-stone-50 ... underline decoration-4 ... decoration-stone-600 ..."
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
      
    )
  }
}
