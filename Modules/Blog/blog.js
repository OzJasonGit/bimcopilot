

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

{/*import Other_blogs from "./other_blogs/other_blogs";*/}


import logoImage from "./Bim-copilot-logo_2.png";


const Blogsmain = ({ stories, firstStory }) => {
  const params = useParams();
  const storiesToMap = stories.filter((story, i) => story._id == params.slug);
  const router = useRouter();

  console.log("this is stories",stories)


   return (

    <>

    {storiesToMap.map((story, index) => {
      return (

        <Head>
          <title>
            {story.title}
          </title>

          <meta
            name={story.title}
            content= {story.title}
            key={story.title}
          />
        </Head>
      )})} 

      

      
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
                 
                  </h1>
                </div>
                <div id={styles.SUB_TAG}>
                  <h3
                    id={styles._H3}
                    class="text-left ... text-xl ... text-stone-400 ... font-avant_garde_medium"
                  >
                    {" "}
                    {story.subtitle}
                    
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
                      class="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                    >
                      Introduction
                    </h1>
                    <br/>
                    <p class="text-xl ... text-stone-400 ... font-avant_garde_bold">
                    {`${story.introduction_quote} ${story.introduction_quote_author}`}
                    <br/> <br/> 
                    {story.introduction}
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
                  <h3
                      id={styles._H3}
                      class="text-2xl ... text-stone-700 ... font-avant_garde_bold"
                    >
                      
                  </h3>
                  <p
                    class="text-lg ... text-neutral-700 ... font-avant_garde_bold">
                    {story.disclaimer}                             
                  </p>
                </div>






                <div id={styles.SIDE_NAV_HOLDER}>
                  <div id={styles.SIDE_NAV} >

                    <div id={styles.TITLE_1} >  
                      <Link href="/dashboard">
                        <p
                          class="text-xs ... text-neutral-700 ... font-geist_semibold">
                          {story.paragraphtitle1}                             
                        </p>
                      </Link>                                        
                    </div>
                    <div id={styles.TITLE_2}> 
                      <Link href="/dashboard">
                        <p
                          class="text-xs ... text-neutral-700 ... font-geist_semibold">
                          {story.paragraphtitle2}                             
                        </p> 
                      </Link>                                         
                    </div>

                    <div id={styles.TITLE_3}> 
                      <a>
                        <Link href="/dashboard">
                          <p
                            class="text-xs ... text-neutral-700 ... font-geist_semibold">
                            {story.paragraphtitle6}                        
                          </p> 
                        </Link>   
                      </a>                                       
                    </div>

                    <div id={styles.TITLE_4}> 
                      <Link href="/dashboard">
                        <p
                          class="text-xs ... text-neutral-700 ... font-geist_semibold">
                          {story.paragraphtitle7}                            
                        </p> 
                      </Link>                                         
                    </div>
                    <div id={styles.TITLE_5}> 
                      <Link href="/dashboard">
                        <p
                          class="text-xs ... text-neutral-700 ... font-geist_semibold">
                          {story.paragraphtitle8}                             
                        </p>
                      </Link>                                         
                    </div>
                    <div id={styles.TITLE_6}> 
                      <Link href="/dashboard">
                        <p
                          class="text-xs ... text-neutral-700 ... font-geist_semibold">
                          {story.paragraphtitle9}                             
                        </p>
                      </Link>                                         
                    </div>
                    <div id={styles.TITLE_7}> 
                      <Link href="/dashboard">
                        <p
                          class="text-xs ... text-neutral-700 ... font-geist_semibold">
                          {story.paragraphtitle10}                             
                        </p>
                      </Link>                                         
                    </div>
                    

                  </div>
                </div>








                <div id={styles.BLOG_HOLDER}>
                  <div id={styles.PARAGRAPH_1}>
                    <h3
                      class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>
                      {story.paragraphtitle1}                             
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_bold">
                      {story.paragraph1[0]}<br/> <br/>{story.paragraph1[1]}<br/> <br/>
                      

                      <ul class="list-inside ...">

                        <li>
                          {story.paragraph1[2]}  
                        </li>                                                      
                        <br/> 
                        <li>
                          {story.paragraph1[3]} 
                        </li>                       
                        <br/> 
                        <li>
                          {story.paragraph1[4]} 
                        </li>                       
                        <br/> 
                        <li>
                          {story.paragraph1[4]} 
                        </li>                      
                        <br/> 
                        <li>
                          {story.paragraph1[5]}
                        </li>
                        <li>
                          {story.paragraph1[6]}    
                        </li>                                      
                        <br/> 
                        <li>
                          {story.paragraph1[7]} 
                        </li>                        
                        <br/> 
                        <li>
                          {story.paragraph1[8]}  
                        </li>
                         
                      </ul>
                               
                      <br/> <br/> 
                      {story.paragraph1[9]}
                      
                    </p>
                  </div>

                  <div class="bg-transparent ... rounded-xl ..."> 
                    <Video />               
                  </div>
             
                  <div id={styles.PARAGRAPH_2}>                  
                    <h3
                      class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>
                      {story.paragraphtitle2}                              
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_bold">
                      {story.paragraph2[0]}  
                      <br/> <br/>  
                      {story.paragraph2[1]}                  
                    </p>
                  </div>

                  <div id={styles.PARAGRAPH_3}>                                     
                    <h3
                      class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>
                      {story.paragraphtitle3}            
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_bold">
                      {story.paragraph3[0]}
                      <br/> <br/>  
                      {story.paragraph3[1]}
                      <br/> <br/>  
                      {story.paragraph3[2]}
                      <br/> <br/>  
                      {story.paragraph3[3]}
                      <br/> <br/>  
                      {story.paragraph3[4]}   
                      <br/> <br/>  
                      {story.paragraph3[5]}                    
                    </p>
                  </div>



                  <div id={styles.IMAGE_1} class=" rounded-xl ...">  
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
                  </div>




                  <div id={styles.PARAGRAPH_4}>
                                  
                    <h3
                      class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>                                                     
                    </h3>
              
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_bold">
               
                      <br/> <br/>
                      {story.paragraph4[0]}   
                      <br/> <br/>   
                      {story.paragraph4[1]}   
                      <br/>  
                      {story.paragraph4[2]}   
                      <br/>  
                      {story.paragraph4[3]}   
                      <br/>    
                      {story.paragraph4[4]}   
                      <br/> <br/>   
                      {story.paragraph4[5]}   
                      <br/> <br/>  
                      {story.paragraph4[6]}   
                      <br/> <br/>  
                      {story.paragraph4[7]}   
                      <br/> <br/>     
                      {story.paragraph4[8]}   
                      <br/> <br/>  
                      {story.paragraph4[9]}   
                      <br/> <br/>               
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
                      class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>
                                           
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_bold">                                        
                      {story.paragraph5[0]} 
                      <br/> <br/>      
                      {story.paragraph5[1]} 
                      <br/> <br/>      
                      {story.paragraph5[2]} 
                      <br/> <br/>      
                      {story.paragraph5[3]} 
                      <br/> <br/>      
                      {story.paragraph5[4]} 
                      <br/> <br/>      
                      {story.paragraph5[5]} 
                      <br/> <br/>      
                      {story.paragraph5[6]} 
                      <br/> <br/>      
                      {story.paragraph5[7]} 
                      <br/> <br/>      
                      {story.paragraph5[8]} 
                      <br/> <br/>      
                      {story.paragraph5[9]} 
                      <br/> <br/>      
                      {story.paragraph5[10]} 
                      <br/> <br/>      
                      {story.paragraph5[11]} 
                      <br/> <br/>      
                      {story.paragraph5[12]} 
                      <br/> <br/>      
                      {story.paragraph5[13]} 
                      <br/> <br/>  
                      {story.paragraph5[14]} 
                      <br/> <br/>      
                      {story.paragraph5[15]} 
                      <br/> <br/>      
                      {story.paragraph5[16]} 
                      <br/> <br/>                    
                    </p>
                  </div>   


                  <div id={styles.PARAGRAPH_2}>
                    <br/>
                    <h3
                      class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                        id={styles._H3}>        
                       {story.paragraphtitle6}                                          
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_bold">               
                       <br/> <br/>      
                      {story.paragraph6[0]} 
                      <br/> <br/>      
                      {story.paragraph6[1]} 
                      <br/> <br/>      
                      {story.paragraph6[2]} 
                      <br/> <br/>      
                      {story.paragraph6[3]} 
                      <br/> <br/>      
                      {story.paragraph6[4]} 
                      <br/> <br/>      
                      {story.paragraph6[5]} 
                      <br/> <br/>      
                      {story.paragraph6[6]} 
                      <br/> <br/>      
                      {story.paragraph6[7]} 
                      <br/> <br/>      
                      {story.paragraph6[8]} 
                      <br/> <br/>      
                      {story.paragraph6[9]} 
                                                              
                    </p>
                  </div>



                  <div id={styles.PARAGRAPH_3}>
                    <br/>
                    <h3
                      class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>                   
                      {story.paragraphtitle7}             
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_bold">                   
                      {story.paragraph7[0]}
                      <br/> <br/> 
                      {story.paragraph7[1]}
                      <br/> <br/>   
                      {story.paragraph7[2]}
                      <br/> <br/>   
                      {story.paragraph7[3]}
                      <br/> <br/>   
                      {story.paragraph7[4]}
                      <br/> <br/>   
                      {story.paragraph7[5]}
                      <br/> <br/>   
                      {story.paragraph7[6]}
                      <br/> <br/>    
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
                      class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>
                      {story.paragraphtitle8}                             
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_bold">
                      {story.paragraph8[0]} 
                      <br/> <br/>   
                      {story.paragraph8[1]} 
                      <br/> <br/>  
                      {story.paragraph8[2]} 
                      <br/> <br/>  
                      {story.paragraph8[3]} 
                      <br/> <br/>  
                      {story.paragraph8[4]}  
                      <br/> <br/>     
                      {story.paragraph8[5]}                 
                    </p>
                  </div>   




                  <div id={styles.PARAGRAPH_2}>
                    <br/>
                    <h3
                      class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>                    
                      {story.paragraphtitle9}              
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_bold">                   
                      {story.paragraph9[0]} 
                      <br/> <br/>   
                      {story.paragraph9[1]} 
                      <br/> <br/>  
                      {story.paragraph9[2]} 
                      <br/> <br/>  
                      {story.paragraph9[3]} 
                      <br/> <br/>  
                      {story.paragraph9[4]}  
                      <br/> <br/>     
                      {story.paragraph9[5]}   
                    </p>
                  </div>



                  <div id={styles.PARAGRAPH_3}>
                    <br/>
                    <h3
                      class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>                   
                      {story.paragraphtitle10}              
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_bold">                   
                      {story.paragraph10}  
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
                      class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                      id={styles._H3}>
                      Conclusion                                                
                    </h3>
                    <br/>
                    <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                      {story.paragraph11[0]}  
                      <br/> <br/> 
                      {story.paragraph11[1]} 
                      <br/> <br/> 
                      {story.paragraph11[2]}  
                      <br/> <br/> 
                      {story.paragraph11[3]} 
               
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



            <div class={styles.sub_head}>
              <div id={styles.SUBSCRIBE} class={"border-emerald-200"}>

                <div id={styles.SUB_ICON}>                 
                </div>
         
                <div id={styles.MAIN_TAG}>
                  <h1
                    id={styles._H1}
                    class="text-md... text-stone-200 ... font-geist_semibold"
                  >
                  {story.title}
                   
                  </h1>
                  <br/>
                  <p class="text-md ... text-stone-400 ... font-geist_regular">
                  {story.subtitle}
                   
                  </p>
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