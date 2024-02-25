"use client";


import Provider from "../../app/utils/Provider";

import { Drawer } from "antd";
import React, { useState } from "react";
import styles from './Menu.module.css'

import Script from 'next/script'

// import 'antd/dist/reset.css';
import Link from 'next/link';
//import Date from '../Date/date'; 



const Menu = () => {


  const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };

    return (  
    <> 

    <Provider>

      <section id={styles.SHADOW_SECTION_DRAWER} class={styles.center_holder}>  

          <Drawer
          id={styles.DRAWER_LEFT}
          title="complicaTED  Drawer"
          placement="left"
          onClose={onClose}
          open={open}>  
                      
          </Drawer> 


        


          <div class={styles.HEADER_HOLDER}>
             <div id={styles.header}>   
                
                <header id={styles.FIXED_HEADER}> 
                    <div id={styles.BUTTON_HOLDER_RIGHT} class={styles.container}>
                        <div id={styles.HEADER_MENU_2}>   
                            <div id={styles.BURGER_HOLDER} class={styles.container_right}>



                             <div id={styles.BUTTON_HOLDER_RIGHT} class={styles.container}>
                              <div id={styles.HEADER_MENU_2}>   
                                <div id={styles.BURGER_HOLDER} class={styles.container_right}>
                                  <a id={styles.BURGER} onClick={showDrawer}>
                                    <i id={styles.BURGER_2}>Menu</i>
                                  </a>
                                </div>   
                              </div>
                            </div> 

                          </div>   
                        </div>
                    </div> 
                </header>
              
              </div>           
            </div>        
      </section> 

    </Provider>
      
    </>
        )
    };



export default Menu;









