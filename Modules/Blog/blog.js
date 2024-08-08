'use client'

import styles from './blog.module.css';

import { useParams, useRouter } from "next/navigation";

import Menu from "../../components/Menu/menu";
import Sides from "../../components/Sides/sides";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Subscribetop from "../../components/Subscribetop/subscribetop";

import Link from "next/link";
import Image from "next/image";

import logoImage from "./Bim-copilot-logo_2.png";


const Blogsmain = ({ stories, firstStory }) => {
  const params = useParams();
  const storiesToMap = stories.filter((story, i) => story._id == params.slug);
  const router = useRouter();

  console.log("this is stories",stories)


   return (

    <>

      
      <Menu/>
      <Header/>
      <Sides/>
      {/*<Subscribetop/>*/}


      {storiesToMap.map((story, index) => {
                  return (
        <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_subscribe}>
            <div class={styles.sub_head}>
              <div id={styles.SUBSCRIBE} class={"border-emerald-200"}>
                <div id={styles.SUB_ICON}></div>

                <div id={styles.MAIN_TAG}>
                  <h1
                   
                    id={styles._H1}
                    class="text-6xl ... text-stone-200 ... font-avant_garde_bold"
                  >
                    {story.title}
                    Sustainable, Richer Architects through Automation
                  </h1>
                </div>
                <div id={styles.SUB_TAG}>
                  <h3
                    id={styles._H3}
                    class="text-left ... text-xl ... text-stone-400 ... font-avant_garde_medium"
                  >
                    {" "}
                    {story.subtitle}
                    <a class="text-stone-200 ... font-avant_garde_bold">
                      Join the design revolution!
                    </a>{" "}
                    The world is changing and so is{" "}
                    <a class="text-stone-200 ... font-avant_garde_bold">
                      architecture
                    </a>
                    . Discover new narratives, build better{" "}
                    <a class="text-stone-200 ... font-avant_garde_bold">
                      systems
                    </a>
                    , make more{" "}
                    <a class="text-stone-200 ... font-avant_garde_bold">money</a>,
                    be more{" "}
                    <a class="text-stone-200 ... font-avant_garde_bold">
                      sustainable
                    </a>
                    . <br /> <br />{" "}
                  
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>
        )})}












                
      {storiesToMap.map((story, index) => {
                  return (
          <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
            <div class={styles.grid_0_blogimage}>

                      <div class="rounded-2xl ..." id={styles.BLOGIMAGE}> 
                        <Image
                        alt="Picture of the author"
                        key={story._id}
                        width={500}
                        height={500}
                        src={story.image}
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                        />
                      </div>          
            </div>
          </section>
        )})}




























      {storiesToMap.map((story, index) => {
        return (
        <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>
          <div class={styles.grid_0_tag}>
            <div class={styles.sub_head}>
              <div id={styles.SUBSCRIBE} class={"border-emerald-200"}>
                <div id={styles.SUB_ICON}>
                  
                </div>

          
          
                <div id={styles.MAIN_TAG}>
                  <h1
                    id={styles._H1}
                    class="text-6xl ... text-stone-200 ... font-avant_garde_bold"
                  >
                  {story.title}
                    Sustainable, Richer Architects through Technology and
                    Automation
                  </h1>
                  <br/>
                  <p class="text-xl ... text-stone-400 ... font-avant_garde_bold">
                  {story.subtitle}
                    This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor. 
                  </p>
                </div>                   
                    
              
              </div>
            </div>
          </div>
        </section>  
        )})};






















    {storiesToMap.map((story, index) => {
        return (
        <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_tag}>
            <div class={styles.sub_head}>
              <div id={styles.SUBSCRIBE} class={"border-emerald-200"}>
                <div id={styles.SUB_ICON}>
                  
                </div>

          
          
                <div id={styles.MAIN_TAG}>
                  <h1
                    id={styles._H1}
                    class="text-6xl ... text-stone-200 ... font-avant_garde_bold"
                  >
                  {story.title}
                    Sustainable, Richer Architects through Technology and
                    Automation
                  </h1>
                  <br/>
                  <p class="text-xl ... text-stone-400 ... font-avant_garde_bold">
                  {story.subtitle}
                    This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                    sed do eiusmod tempor. 
                  </p>
                </div>                   
                    
              
              </div>
            </div>
          </div>
        </section>  
        )})};



























    {storiesToMap.map((story, index) => {
          return (
          <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
            <div class={styles.grid_0_tag}>
              <div class={styles.sub_head}>
                <div id={styles.SUBSCRIBE} class={"border-emerald-200"}>
                  <div id={styles.SUB_ICON}>
                    
                  </div>

            
            
                  <div id={styles.MAIN_TAG}>
                    <h1
                      id={styles._H1}
                      class="text-6xl ... text-stone-200 ... font-avant_garde_bold"
                    >
                    {story.title}
                      Sustainable, Richer Architects through Technology and
                      Automation
                    </h1>
                    <br/>
                    <p class="text-xl ... text-stone-400 ... font-avant_garde_bold">
                    {story.subtitle}
                      This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                      sed do eiusmod tempor. 
                    </p>
                  </div>                   
                      
                
                </div>
              </div>
            </div>
          </section>  
          )})};



















    {storiesToMap.map((story, index) => {
    return (
    <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
      <div class={styles.grid_0_tag}>
        <div class={styles.sub_head}>
          <div id={styles.SUBSCRIBE} class={"border-emerald-200"}>
            <div id={styles.SUB_ICON}>
              
            </div>

      
      
            <div id={styles.MAIN_TAG}>
              <h1
                id={styles._H1}
                class="text-6xl ... text-stone-200 ... font-avant_garde_bold"
              >
              {story.title}
                Sustainable, Richer Architects through Technology and
                Automation
              </h1>
              <br/>
              <p class="text-xl ... text-stone-400 ... font-avant_garde_bold">
              {story.subtitle}
                This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor. 
              </p>
            </div>                   
                
          
          </div>
        </div>
      </div>
    </section>  
    )})};

 
    <Footer/>

  </>
    

 );
};

export default Blogsmain;