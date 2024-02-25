import Provider from "../../app/utils/Provider";



import styles from './tiktoktop.module.css'

import React, { Component } from 'react';
import Link from "next/link";

import Tiktok from "./client/Tiktok/tiktok";







import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok } from "@fortawesome/free-brands-svg-icons";






export default class Tiktoktop extends Component {

  render() {
    return (


    <Provider>

      <section id={styles.SHADOW_SECTION_TIKTOK} class={styles.center_holder}>
        <div class={styles.grid_0_main}>
          <div id={styles.MAIN_TIKTOK_HOLDER}>
            <div id={styles.ICON_HOLDER}>
              <Link
                href="/"
                id={styles.ICON_TIKTOK}
                class=" rounded-2xl ... drop-shadow-xl ... "
              >
                <FontAwesomeIcon
                  icon={faTiktok}
                  id={styles.TIKTOK_FONT}
                  class={styles.CENTER}
                />
              </Link>
            </div>
            <div id={styles.TIKTOK_HOLDER}>
              <div
                id={styles.TIKTOK}
                class="rounded-2xl ... drop-shadow-2xl ... shadow-black"
              >
                <Tiktok />
              </div>
            </div>
          </div>
        </div>
      </section>

    </Provider>


    


    )
  }
};



