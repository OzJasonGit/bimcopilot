import Provider from "../../app/utils/Provider";


import styles from './subscribe_2.module.css'
import React, { Component } from 'react';

import Subform from "./Client/subform";






export default class Subcribe_2 extends Component {

  render() {
    return (
      
      <div class={styles.sub_head}>
            <div id={styles.SUBSCRIBE} class={"border-emerald-200"}>
              <div id={styles.SUB_ICON}></div>

              <div id={styles.MAIN_TAG}>
                <h1
                  id={styles._H1}
                  
                  class="text-4xl ... text-stone-200 ... font-avant_garde_bold">
                  Sustainable, Richer Architects through AI, Analytics and
                  Automation 
                </h1>
              </div>
              <div id={styles.SUB_TAG}>
                <h3
                  id={styles._H3}
                  class="text-left ... text-lg ... text-stone-400 ... font-avant_garde_medium"
                >
                  {" "}
                  <a class="text-stone-200 ... font-avant_garde_bold">
                    Join the design revolution!
                  </a>{" "}
                  The world is changing and so is{" "}
                  <a class="text-stone-200 ... font-avant_garde_bold">
                    architecture
                  </a>
                  . Discover new narratives, build better{" "}
                  <a class="text-stone-200 ... font-avant_garde_bold">
                    systems
                  </a>
                  , make more{" "}
                  <a class="text-stone-200 ... font-avant_garde_bold">money</a>,
                  be more{" "}
                  <a class="text-stone-200 ... font-avant_garde_bold">
                    sustainable
                  </a>
                  . <br /> <br />{" "}
                  <a 
                    id={styles._H2} 
                    class="text-stone-200 ... font-avant_garde_bold text-3xl">
                    Join the Waiting List!
                  </a>
                </h3>
              </div>

              <Subform/>
              
            </div>
          </div>

    )
  }
}





