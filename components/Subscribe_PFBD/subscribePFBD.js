import styles from './subscribePFBD.module.css'
import React, { Component } from 'react';

import Subform from "./Client/subform";

export default class Subcribe_PFBD extends Component {

  render() {
    return (

    <section id={styles.SHADOW_SECTION_PFBD} class={styles.center_holder}>
        <div class={styles.grid_0_subscribe}>
          <div class={styles.sub_head}>
            <div id={styles.SUBSCRIBE} class={"border-emerald-200"}>
             

              <div id={styles.MAIN_TAG}>
                <h1
                  id={styles._H2}
                  
                  class=" text-stone-200 ... font-avant_garde_bold">
                  Sustainable, Richer Architects through AI, Analytics and
                  Automation
                </h1>
              </div>
              <div id={styles.SUB_TAG}>
                <h3
                  id={styles._H3}
                  class="text-left ... text-stone-400 ... font-geistmono_regular"
                >
                  {" "}
                  <a class="text-stone-200 ... font-geistmono_regular">
                    The design revolution is here.
                  </a>{" "}
                  The world is changing and so is{" "}
                  <a class="text-stone-200 ... font-geistmono_regular">
                    architecture
                  </a>
                  . Discover new narratives, build better{" "}
                  <a class="text-stone-200 ... font-geistmono_regular">
                    systems
                  </a>
                  , make more{" "}
                  <a class="text-stone-200 ... font-geistmono_regular">money</a>,
                  be more{" "}
                  <a class="text-stone-200 ... font-geistmono_regular">
                    sustainable
                  </a>
                  . <br /> <br />{" "}
                  <h1 
                    id={styles._H2} 
                    class="text-stone-200 ... font-avant_garde_bold">
                    Subscribe and Save! 
                  </h1>
                </h3>
              </div>

              <Subform/>
              
            </div>
          </div>
        </div>
    </section>

    )
  }
}





