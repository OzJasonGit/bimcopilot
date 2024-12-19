import Provider from "../../app/utils/Provider";



import styles from './subfooter_white.module.css'
import React, { Component } from 'react';


import Image from "next/image";
import Link from "next/link";



export default class Subfooter extends Component {

  render() {
    return (

      <Provider>

        <section id={styles.SHADOW_SECTION_TAG} class={styles.center_holder}>
            <div class={styles.grid_0_main}>
            <div id={styles.TAG_HOLDER}>
                <div id={styles.TAG}>
                <h1
                    id={styles._H1}
                    class="text-7xl ... text-stone-400 ... font-avant_garde_bold">
                    {" "}
                    You're the <a class="text-stone-200 ...">pilot </a>... We are <br/>
                    your<a class="text-emerald-200 ..."> copilot</a>.
                </h1>
                </div>
            </div>
            </div>
        </section>   

      </Provider>

         

    )
  }
}

