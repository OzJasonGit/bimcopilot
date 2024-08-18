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
import Video from "./client/Video/video";
import Head from "next/head"

import Other_blogs from "./other_blogs/other_blogs";


import logoImage from "./Bim-copilot-logo_2.png";


const Blogsmain = ({ stories, firstStory }) => {
  const params = useParams();
  const storiesToMap = stories.filter((story, i) => story._id == params.slug);
  const router = useRouter();

  console.log("this is stories",stories)


   return (

    <>

      <Head>
        <title>
          iPhone 12 XS Max For Sale in Colorado - Big Discounts | Apple
        </title>

        <meta
          name="description"
          content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
          key="desc"
        />
      </Head>

      
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
          <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>

            <div class={styles.grid_0_blog}>

              <div id={styles.MAIN_TEXT_HOLDER}>

                <div id={styles.DISCLAIMER_HOLDER}>
                  <p
                    class="text-xl ... text-neutral-700 ... font-avant_garde_bold">
                    {story.title}                             
                  </p>
                </div>






                <div id={styles.SIDE_NAV_HOLDER}>
                  <div id={styles.SIDE_NAV} >

                    <div id={styles.TITLE_1} >  
                      <Link href="/dashboard">
                        <p
                          class="text-sm ... text-neutral-700 ... font-avant_garde_bold">
                          {story.title}                             
                        </p>
                      </Link>                                        
                    </div>
                    <div id={styles.TITLE_2}> 
                      <Link href="/dashboard">
                        <p
                          class="text-sm ... text-neutral-700 ... font-avant_garde_bold">
                          {story.title}                             
                        </p> 
                      </Link>                                         
                    </div>
                    <div id={styles.TITLE_3}> 
                      <Link href="/dashboard">
                        <p
                          class="text-sm ... text-neutral-700 ... font-avant_garde_bold">
                          {story.title}                             
                        </p> 
                      </Link>                    
                    </div>
                    <div id={styles.TITLE_4}> 
                      <Link href="/dashboard">
                        <p
                          class="text-sm ... text-neutral-700 ... font-avant_garde_bold">
                          {story.title}                             
                        </p> 
                      </Link>                                         
                    </div>
                    <div id={styles.TITLE_5}> 
                      <Link href="/dashboard">
                        <p
                          class="text-sm ... text-neutral-700 ... font-avant_garde_bold">
                          {story.title}                             
                        </p>
                      </Link>                                         
                    </div>

                  </div>
                </div>








                <div id={styles.BLOG_HOLDER}>
                  <div id={styles.PARAGRAPH_1}>
                    <h3
                      class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>
                      {story.subtitle}                             
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                      {story.title}
                      This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>

                  <div class="bg-transparent ... rounded-xl ..."> 
                    <Video />               
                  </div>
             
                  <div id={styles.PARAGRAPH_2}>
                    <br/>
                    <br/>
                    <h3
                      class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>
                      {story.title}
                      This is the title section Lorem ipsum dolor sit amet, consectetur              
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                      {story.title}
                      This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>



                  <div id={styles.PARAGRAPH_3}>
                    <br/>
                    <br/>
                    <h3
                      class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>
                      {story.title}
                      This is the title section Lorem ipsum dolor sit amet, consectetur              
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                      {story.title}
                      This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>



                  <div id={styles.ADVERT_1} class="bg-yellow-300 ... rounded-xl ...">                
                  </div>




                  <div id={styles.PARAGRAPH_4}>
                    <br/>
                    <br/>
                    <h3
                      class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>
                      {story.title}
                      This is the title section Lorem ipsum dolor sit amet, consectetur              
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                      {story.title}
                      This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>


                  <div id={styles.ADVERT_2} class="bg-blue-600 ... rounded-xl ...">                
                  </div>


                </div>
              
          </div>
          </div>

          </section>
      )})};































  {storiesToMap.map((story, index) => {
        return (

          <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>

            <div class={styles.grid_0_blog}>

              <div id={styles.SECOND_TEXT_HOLDER}>
        
                <div id={styles.BLOG_HOLDER_2}>


                  <div id={styles.PARAGRAPH_1}>
                    <h3
                      class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>
                      {story.subtitle}                             
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                      {story.title}
                      This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>   


                  <div id={styles.PARAGRAPH_2}>
                    <br/>
                    <h3
                      class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}
                    >
                    
                      This is the title section Lorem ipsum dolor sit amet, consectetur              
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                    
                      This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                      sed do eiusmod. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>



                  <div id={styles.PARAGRAPH_3}>
                    <br/>
                    <h3
                      class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}
                    >
                    
                      This is the title section Lorem ipsum dolor sit amet, consectetur              
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                    
                      This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                      sed do eiusmod. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>


                  <div id={styles.ADVERT_1} class="bg-pink-300 ... rounded-xl ...">                
                  </div>




                </div>
              
              </div>

            </div>

          </section>
        
        )})};































 {storiesToMap.map((story, index) => {
        return (

          <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>

            <div class={styles.grid_0_blog}>

              <div id={styles.SECOND_TEXT_HOLDER}>
        
                <div id={styles.BLOG_HOLDER_2}>


                  <div id={styles.PARAGRAPH_1}>
                    <h3
                      class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>
                      {story.subtitle}                             
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                      {story.title}
                      This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>   


                  <div id={styles.PARAGRAPH_2}>
                    <br/>
                    <h3
                      class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}
                    >
                    
                      This is the title section Lorem ipsum dolor sit amet, consectetur              
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                    
                      This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                      sed do eiusmod. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>



                  <div id={styles.PARAGRAPH_3}>
                    <br/>
                    <h3
                      class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}
                    >
                    
                      This is the title section Lorem ipsum dolor sit amet, consectetur              
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                    
                      This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                      sed do eiusmod. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>




                </div>
              
              </div>

            </div>

          </section>
        
        )})};




{storiesToMap.map((story, index) => {
        return (

          <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>

            <div class={styles.grid_0_blog}>

              <div id={styles.SECOND_TEXT_HOLDER}>
        
                <div id={styles.BLOG_HOLDER_2}>


                  <div id={styles.PARAGRAPH_1}>
                    <h3
                      class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>
                      Conclusion.
                      {story.subtitle}                             
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                      {story.title}
                      This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                      ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                      sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                  </div>   

                </div>
              
              </div>

            </div>

          </section>
        
        )})};





















{/*<Other_blogs/>*/}

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



              <div class={styles.grid_0_blogimage_foot}>
                      <div id={styles.BLOGIMAGE_HOLDER_FOOT}>
                       
                        <div id={styles.BLOGIMAGE_FOOT}>

                          <div class="rounded-md ..." id={styles.B_IMAGE_FOOT}> 
                            <Link href="/services">
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
                              }}/>
                            </Link>                                                                                
                          </div> 

                          <div id={styles.BLOG_TEXT_FOOT}> 
                            <h2 id={styles._H2} class="text-stone-700 ...  text-xl ... font-avant_garde_bold">
                              {story.title}
                            </h2>                                             
                            <h3 id={styles._H3} class="text-stone-400 ... font-avant_garde_bold">
                              {story.subtitle}
                            </h3>
                          </div>
                                    
                    </div>  
                  </div>              
                </div>

            </div>
          </div>
        </section>  
        )})}

























































      {/*{storiesToMap.map((story, index) => {
                  return (
      <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>

        <div class={styles.grid_0_main}>
          <div id={styles.MAIN_TEXT_HOLDER}>



            <div id={styles.SIDE_NAV_HOLDER}>
              <div id={styles.SIDE_NAV} class="bg-cyan-500 ...">
              </div>
            </div>
            
            <div id={styles.DISCLAIMER_HOLDER}>
              <p
                class="text-xl ... text-neutral-700 ... font-avant_garde_bold">
                {story.title}                             
              </p>
            </div>


            <div id={styles.BLOG_HOLDER}>

              <div id={styles.PARAGRAPH_1}>
                <h3
                  class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                  id={styles._H3}>
                  {story.subtitle}                             
                </h3>
                <br/>
                <p class="text-xl ... text-neutral-700 ... font-avant_garde_bold">
                  {story.title}
                  This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                  ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>

              <div class="bg-stone-900 ... rounded-xl ...">                
              </div>
             
              <div id={styles.PARAGRAPH_2}>
                <br/>
                <br/>
                <h3
                  class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                  id={styles._H3}>
                  This is the title section Lorem ipsum dolor sit amet, consectetur              
                </h3>
                <br/>
                <p class="text-xl ... text-neutral-700 ... font-avant_garde_bold">
               
                  This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                  ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>
            
            

      </section>
     )})};

















              <div id={styles.PARAGRAPH_3}>
                <br/>
                <h3
                  class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                  id={styles._H3}
                >
                 
                  This is the title section Lorem ipsum dolor sit amet, consectetur              
                </h3>
                <br/>
                <p class="text-xl ... text-neutral-700 ... font-avant_garde_bold">
                
                  This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
                  ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
              </div>


              <div id={styles.ADVERT_1} class="bg-yellow-300 ... rounded-xl ...">                
              </div>


              <div id={styles.PARAGRAPH_4}>
                <br/>
                <br/>
                <h3
                  class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                  id={styles._H3}
                >
                
                  This is the title section Lorem ipsum dolor sit amet, consectetur              
                </h3>
                <br/>
                <p class="text-xl ... text-neutral-700 ... font-avant_garde_bold">
                
                  This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                </p>
              </div>

              <div id={styles.ADVERT_2} class="bg-blue-600 ... rounded-xl ...">                
              </div>


              <div id={styles.PARAGRAPH_5}>
                <br/>
                <br/>
                <h3
                  class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                  id={styles._H3}
                >
         
                  This is the title section Lorem ipsum dolor sit amet, consectetur              
                </h3>
                <br/>
                <p class="text-xl ... text-neutral-700 ... font-avant_garde_bold">
              
                  This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                </p>
              </div>


              <div id={styles.CONCLUSION}>
                <br/>
                <h3
                  class="text-4xl ... text-neutral-700 ... font-avant_garde_bold"
                  id={styles._H3}
                >
            
                  This is the title section Lorem ipsum dolor sit amet, consectetur              
                </h3>
                <br/>
                <p class="text-xl ... text-neutral-700 ... font-avant_garde_bold">
           
                  This is the paragraph Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                  et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                </p>
              </div>

            </div>;          
          </div>
    

        )})};*/}





 
    <Footer/>

  </>
    

 )
}

export default Blogsmain;