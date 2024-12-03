import Provider from "../../app/utils/Provider";

import styles from './blog.module.css'
import React, { Component } from 'react';
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useNavigate } from "next/navigation";

import logoImage from "./Bim-copilot-logo_2.png";


const Blogpage = ({ stories, topStories }) => {
  const params = useParams();
  const storiesToMap = stories.data.filter((story, i) => story.data == params.slug && i > (0) )
  const router = useRouter();

 
console.log("================================", stories.data )


// console.log("stories",storiesToMap)
// console.log("topStories",topStories)
// console.log("params",params.slug)
// console.log("stories.data", stories.data)
// console.log("stories.topStories", stories.topStories)
let story_id;
story_id = params.slug
//  const currentStory=() => {
//    router.push(`blog/${story_id}`);
//   }


    return (

       <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_blog}>
          <div class={styles.head}>

            
                  
            <div class="rounded-2xl ..." id={styles.IMAGE_POST_NUMBER}>
              <div
                class={"rounded-full ...  border-8 ...  border-emerald-200"}
                id={styles.POST_NUMBER_HOLDER}
              >
                <div
                  id={styles.POST_NUMBER_HOLDER_2}
                  class="content-center ..."
                >
                  <h1
                    id={styles._H1}
                    class="text-center text-5xl ... text-stone-200 ... font-avant_garde_bold"
                    style={{
                      position: "relative",
                      top: "5px",
                      left: "0px",
                    }}
                  >
                    {stories.data[0].post_number}
                  </h1>
                </div>
              </div>
            </div>
           

            <Link
              class="rounded-2xl ... drop-shadow-4xl ..."
              id={styles.LINK_HOLDER}
              href={`/blog/${stories.data[0]._id}`}
              >
              <div id={styles.IMAGE_POST}>
                <Image
                  href={`/blog/${stories.data[0]._id}`}
                  src={stories.data[0].image}

                  alt="Picture of the author"
                  width={500}
                  height={500}
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            </Link>

            <div id={styles.BC}>
              <Image
                id={styles.IMAGE_1}
                src={logoImage}
                style={{ objectFit: "contain" }}
                quality={100}
                //object-fit="cover"
                alt=""
              />
            </div>

            <div id={styles.IMAGE_POST_TITLE}>
              <div id={styles.HEAD_TITLE}>
                <Link href={`/blog/${stories.data[0]._id}`}>
                <h2
                  id={styles._H2}
                  class=" text-stone-200 ... font-avant_garde_bold"
                >
                  {stories.data[0].title}
                </h2>
                </Link>
              </div>

              <div id={styles.HEAD_SUBTITLE}>
              <Link href={`/blog/${stories.data[0]._id}`}>
                <h3
                  id={styles._H3}
                  class="text-left ... text-xl ... text-stone-400 ... font-avant_garde_bold"
                >
                  {stories.data[0].subtitle}
                </h3>
                </Link>
              </div>

              <div id={styles.AUTHOR}>
              <Link href={`/blog/${stories.data[0]._id}`}>
                <h3
                  id={styles._H3}
                  class="text-left ... text-xl ... text-stone-400 ... font-avant_garde_bold">
                  {stories.data[0].author}
                </h3>
                </Link>
              </div>

              {/*<div id={styles.TIMESTAMP}>
                <h3
                  id={styles._H3}
                  class="text-left ... text-xl ... text-stone-400 ... font-avant_garde_bold"
                >
                  {stories.data[0].timestamp}
                </h3>
              </div>*/}
            </div>

            <div id={styles.NEWS}>
              <div id={styles.ARTICLES_TITLE} styles={styles.h3}>
                <h2
                  id={styles._H2}
                  class="text-4xl ... text-stone-200 ...  text-shadow-[0_4px_8px_var(--tw-shadow-color)] shadow-indigo-500/50 font-avant_garde_bold"
                >
                  Latest Stories
                </h2>
              </div>

              <div id={styles.ARTICLES}>

           {storiesToMap.map((story, index) => {
                  // console.log("story " , story)
                  return (

                    <div
                      key={story._id}
                      class={styles.container}
                      style={{ gridArea: index + 1 }}
                    >
                      <div id={styles.BLOG_SMALL_1}>
                        <div
                          class="rounded-full ... drop-shadow-2xl ... border-2 ... border-emerald-200"
                          id={styles.BLOG_NUMBER}
                        >
                          <div class="content-center ...">
                            <h5
                              id={styles._H5}
                              class="text-center ... text-stone-200 ... font-avant_garde_bold"
                            >
                              {story.post_number}
                            </h5>
                          </div>
                        </div>

                        <div id={styles.BLOG_TEXT}>
                          <Link
                            href={`/blog/${story._id}`}

                            // onClick={`/blog/${story._id}`}
                            >
                              {console.log("story.data._id", story._id)}

                            <h3
                              id={styles._H3}
                              class="text-lg ... text-stone-200 ... drop-shadow-xl ... font-avant_garde_bold"
                            >
                              {story.title}
                            </h3>
                          </Link>
                        </div>

                        <div id={styles.BLOG_AUTHOR}>
                          <Link href={`/blog/${story._id}`}>
                            <h3
                              id={styles._H4}
                              class="text-sm ... text-right ... text-stone-400 ... drop-shadow-xl ... font-avant_garde_bold"
                            >
                              {story.author}
                            </h3>
                          </Link>
                        </div>
                        <div id={styles.TIMESTAMP}>
                          <h4
                            id={styles._H4}
                            class="text-sm ... text-right ... text-stone-400 ... drop-shadow-xl ... font-avant_garde_bold"
                          >
                            {story.timestamp}
                          </h4>
                        </div>

                        <Link
                          href={`/blog/${story._id}`}
                          class="rounded ... drop-shadow-2xl ... text-stone-400 ..."
                          id={styles.BLOG_IMAGE}
                        >
                          <div >
                            <Image
                              alt="Picture of the author"
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
                        </Link>



                        <div
                          class="border-b border-neutral-600"
                          id={styles.BORDER}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      
    )
  }

export default Blogpage;

