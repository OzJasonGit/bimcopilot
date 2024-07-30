'use client'

import styles from './services_3.module.css';


import React, { Component } from 'react';

import Infinite_Scroll_2 from "../../components/Carousel/Infinite_Scroll_Services";





export default class Services_2 extends Component {

render() {
   
return (
        <>

            <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_scroll}>   
            <div id={styles.CAROUSEL_HOLDER}>
                <div id={styles.CAROUSEL}>
                  <Infinite_Scroll_2 />
                </div>
              </div>            
          </div>
      </section>
    </>

      )
    };
  };



