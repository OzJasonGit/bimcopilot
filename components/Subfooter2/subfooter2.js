import Provider from "../../app/utils/Provider";



import styles from './subfooter2.module.css'
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
                    class="text-7xl ... text-slate-100 ... font-avant_garde_bold">
                    {" "}
                    You're the <a class="text-red-300 ...">pilot </a>... I am your{" "}
                    <a class="text-amber-200 ...">copilot</a>.
                </h1>
                </div>
            </div>
            </div>
        </section>   

      </Provider>

         

    )
  }
}

