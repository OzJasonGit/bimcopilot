"use client"

import styles from './services_1.module.css';


import Provider from "../../app/utils/Provider";

import Image from "next/image";








export default class Services_1 extends Component {

render() {
   
return (

  

    <Provider>

      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_bimcopilot}>
          <div id={styles.BIMCOPILOT_CONTAINER}>
            <div id={styles.BIMCOPILOT}>
              <Image id={styles.CENTER}
                  src={bimcopilot}   
                  style={{objectFit: "contain"}} 
                  quality={100}
              />  
            </div>
            

          </div>
        </div>
      </section>

    </Provider>   

);
};

}


