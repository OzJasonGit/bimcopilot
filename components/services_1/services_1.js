'use client'

import styles from './services_1.module.css';

import { useRouter } from "next/navigation";





const Services_1 = ({ stories, firstStory }) => {
const storiesToMap = stories.filter((story, i) => i != 0);
const router = useRouter();

return (

    <>
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

        
    </>

);
};


export default Services_1;