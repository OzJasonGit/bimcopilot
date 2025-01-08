
import styles from './blog.module.css';

import { useParams, useRouter } from "next/navigation";

import Menu from "../../components/Menu/menu";
import Sides from "../../components/Sides/sides";
import Header from "../../components/Header/Header";
import Subfooter from "../../components/Subfooter2/subfooter2";
import Footer from "../../components/Footer/Footer";
import Link from "next/link";
import Image from "next/image";
import Video from "./client/Video/video";
import Head from "next/head"


const Blogsmain = ({ stories, firstStory }) => {
  
  const params = useParams();
  const storiesToMap = stories.filter((story, i) => story._id == params.slug);
  const router = useRouter();

  

  const bullets_1 = stories.map((story, i) => story.paragraph1 );
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
                    class=" text-stone-200 ... font-avant_garde_bold"
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
                      <Link href="#PARAGRAPH_1">
                        <p
                          class="text-xs ... text-neutral-700 ... font-geist_semibold">
                          {story.paragraphtitle1}                             
                        </p>
                      </Link>                                        
                    </div>
                    <div id={styles.TITLE_2}> 
                      <Link href="#PARAGRAPH_2">
                        <p
                          class="text-xs ... text-neutral-700 ... font-geist_semibold">
                          {story.paragraphtitle2}                             
                        </p> 
                      </Link>                                         
                    </div>

                    <div id={styles.TITLE_3}> 
                      <a>
                        <Link href="#PARAGRAPH_3">
                          <p
                            class="text-xs ... text-neutral-700 ... font-geist_semibold">
                            {story.paragraphtitle6}                        
                          </p> 
                        </Link>   
                      </a>                                       
                    </div>

                    <div id={styles.TITLE_4}> 
                      <Link href="#PARAGRAPH_4">
                        <p
                          class="text-xs ... text-neutral-700 ... font-geist_semibold">
                          {story.paragraphtitle7}                            
                        </p> 
                      </Link>                                         
                    </div>
                    <div id={styles.TITLE_5}> 
                      <Link href="#PARAGRAPH_5">
                        <p
                          class="text-xs ... text-neutral-700 ... font-geist_semibold">
                          {story.paragraphtitle8}                             
                        </p>
                      </Link>                                         
                    </div>
                    <div id={styles.TITLE_6}> 
                      <Link href="PARAGRAPH_6">
                        <p
                          class="text-xs ... text-neutral-700 ... font-geist_semibold">
                          {story.paragraphtitle9}                             
                        </p>
                      </Link>                                         
                    </div>
                    <div id={styles.TITLE_7}> 
                      <Link href="PARAGRAPH_7">
                        <p
                          class="text-xs ... text-neutral-700 ... font-geist_semibold">
                          {story.paragraphtitle10}                             
                        </p>
                      </Link>                                         
                    </div>
                    
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
        <div id={styles.PARAGRAPH}>

        <h3
          class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
          id={styles._H3}>
          {story.body1}                             
        </h3>       
        <br/> 
        <p
          class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
          id={styles._H3}>
          {story.body1}                             
        </p>
        <br/>
      </div>
    </div>

  </div>

</section>
)})}


























{storiesToMap.map((story, index) => {
            return (
<section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>

  <div class={styles.grid_0_blog}>

    <div id={styles.MAIN_TEXT_HOLDER}>

      <div class="bg-transparent ... rounded-xl ..."
           style={{
                  position: "relative",
                  width: "100%",
                  height: "400px",
                  gridArea: "VIDEO",
                }}> 
        <Video/>               
      </div>
             
      <div id={styles.PARAGRAPH}>                  
        <h3
          class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
          id={styles._H3}>
          {story.body2}                              
        </h3>
        <br/>
        <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">
          {story.body2}                  
        </p>
      </div>
    </div>
    
  </div>

</section>
)})}




































{storiesToMap.map((story, index) => {
            return (
<section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>

  <div class={styles.grid_0_blog}>
    <div id={styles.MAIN_TEXT_HOLDER}>
      <div id={styles.PARAGRAPH}>                                     
        <h3
          class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
          id={styles._H3}>
          {story.body3}            
        </h3>
        <br/>
        <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">
          {story.body3}                
        </p>
      </div>

      <div id={styles.IMAGE_1} class=" rounded-xl ..."
        style={{
             position: "relative",
             width: "100%",
             height: "400px",
             gridArea: "IMAGE_2",
            }}>  
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
    </div>    
  </div>

</section>
)})}


























{storiesToMap.map((story, index) => {
            return (
<section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>

  <div class={styles.grid_0_blog}>
    <div id={styles.MAIN_TEXT_HOLDER}>

      <div id={styles.PARAGRAPH}>                           
        <h3
          class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
          id={styles._H3}>  
          {story.body4}                                                       
        </h3>

        <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">         
          {story.body4}   
          <br/> <br/>               
        </p>
      </div>

      <div id={styles.ADVERT_2} class="bg-blue-600 ... rounded-xl ...">                
      </div>

    </div>
  </div>

    

</section>
)})}


































{storiesToMap.map((story, index) => {
            return (
<section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder} >

  <div class={styles.grid_0_blog}>
    <div id={styles.MAIN_TEXT_HOLDER}>

      <div id={styles.BLOG_HOLDER_2}>

        <div id={styles.PARAGRAPH}>
          <h3
            class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
            id={styles._H3}>
            {story.body5}                                     
          </h3>
          <br/>
          <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">                                                                                          
            <br/> <br/>      
            {story.body5}          
            <br/> <br/>                    
          </p>
        </div>   
        
      </div>

    </div>
  </div>

</section>
)})}








































































{storiesToMap.map((story, index) => {
                return (
<section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>

  <div class={styles.grid_0_blog}>
    <div id={styles.MAIN_TEXT_HOLDER}>

      <div id={styles.PARAGRAPH}>
          <br/>
          <h3
            class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
              id={styles._H3}>        
              {story.body6}                                          
          </h3>
          <br/>
          <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">                                       
            {story.body6}                                                                       
          </p>
      </div>

    </div>
  </div>

</section>
)})}



























































































































































































































































{storiesToMap.map((story, index) => {
                  return (
  <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>

    <div class={styles.grid_0_blog}>
      <div id={styles.MAIN_TEXT_HOLDER}>

        <div id={styles.PARAGRAPH}>

            <br/>
            <h3
              class="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
              id={styles._H3}>                    
              {story.paragraphtitle9}              
            </h3>
            <br/>
            <p class="text-lg ... text-neutral-700 ... font-avant_garde_medium">                   
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

      </div>
    </div>

  </section>
)})}










































































{storiesToMap.map((story, index) => {
                  return (
  <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>

    <div class={styles.grid_0_blog}>
      <div id={styles.MAIN_TEXT_HOLDER}>

        <div id={styles.PARAGRAPH}>
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

  </section>
)})}











































































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
  <Subfooter/>   
  <Footer/>

</>
    

 )
}

export default Blogsmain;