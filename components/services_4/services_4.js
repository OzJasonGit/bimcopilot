'use client'

import styles from './services_4.module.css';

import { useRouter } from "next/navigation";















const Services_4 = ({ stories, firstStory }) => {
const storiesToMap = stories.filter((story, i) => i != 0);
const router = useRouter();

return (

    <>

            <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_scroll}>  
          <div id={styles.VIDEO_HOLDER}>

            <div id={styles.COPY_TAG_HOLDER}> 
              <div id={styles.COPY_TAG}>
                <h2                  
                  id={styles._H1}
                  class="text-left ... text-6xl ... text-stone-700 ... font-avant_garde_bold">          
                  We understand the value and potential of your projects.                                  
                </h2> 
              </div>                     
            </div>
            
            <div id={styles.BG_VIDEO}  class="rounded-xl ...">  
            <video autoPlay controls playsInline muted loop src="https://res.cloudinary.com/dytsuek4h/video/upload/v1718789410/2836031_jb9p48.mp4" style={{width:"100%",
          height:"100%", objectFit:"cover", borderRadius:"0.75rem"}}></video>
  
            </div>

            <div id={styles.SUBCOPY_TAG_HOLDER}> 
              <div id={styles.SUBCOPY_TAG}>
                <h3 
                id={styles._H3}
                class="text-left ... text-2xl ... text-stone-500 ... font-avant_garde_bold">
                <br/>  
                See it realized with <a class="text-stone-700 ... font-avant_garde_bold">automation</a>.
                </h3>
              </div>  

              <div id={styles.SECONDCOPY_TAG}>
                <h3
                    id={styles._H3}
                    class="text-left ... text-2xl ... text-stone-500 ... font-avant_garde_bold"
                  >

                    To much <a  class="text-stone-700 ... font-avant_garde_bold">profit</a>  is left on the table through inefficient processes. 
                    Reduce <a  class="text-stone-700 ... font-avant_garde_bold">waste</a>, reduce <a  class="text-stone-700 ... font-avant_garde_bold"> time{" "}</a>  
                     and increase{" "}<a  class="text-stone-600 ... font-avant_garde_bold">revenue</a>  through bettecr,{" "}
                    <a  class="text-stone-700 ... font-avant_garde_bold">automated systems</a>. 
                    <br/> 
                    <a class="text-stone-700 ... font-avant_garde_bold">bimcopilot.com </a>allows you and your business to focus on what you do best. 
                    {" "}
                  
                  </h3>
                
              </div>                  
            </div>


            


          </div>                    
        </div>          
      </section>
    </>

);
};


export default Services_4;