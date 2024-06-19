import Provider from "../../app/utils/Provider";



import styles from './tiktoktop.module.css'

import React, { Component } from 'react';
import Link from "next/link";
import Image from "next/image";

import Tiktok from "./client/Tiktok/tiktok";
import tiktoklogo from "./Tiktok_Logo_4.png";






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
              >
                <div 
                  id={styles.ICON_TIKTOK_2}>

                  <Image
                        src={tiktoklogo}
                        alt="Picture of the author"
                        width={500}
                        height={500}
                        style={{
                          position: "absolute",
                          width: "auto",
                          height: "100%",
                          justifyItems: "center",
                          alignItems: "center",
                          objectFit: "contain",
                        }}
                      />

                </div>
                
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



