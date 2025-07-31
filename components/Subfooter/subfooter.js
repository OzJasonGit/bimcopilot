import Provider from "../../app/utils/Provider";


import styles from './subfooter.module.css'
import React, { Component } from 'react';


import Image from "next/image";
// import astronaut from "./ASTRONAUT_6.png";
const astronaut = "https://res.cloudinary.com/dbj8h56jj/image/upload/v1753971297/Portfolio/ASTRONAUT_6_sjyur9.png"


export default class Subfooter extends Component {

  render() {
    return (

    <Provider>

   

      <section
        id={styles.SHADOW_SECTION_ASTRONAUT}
        class={styles.center_holder}
      >
        <div class={styles.grid_0}>

          <div
            id={styles.ASTRONAUT_HOLDER}
          >
            <div id={styles.ASTRONAUT_3}>
              <Image
                  src={astronaut}
                  alt="Picture of the author"
                  width={500}
                  height={500}
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              
            </div>
            
          </div>

        </div>

      </section>

    </Provider>

    

    )
  }
}

