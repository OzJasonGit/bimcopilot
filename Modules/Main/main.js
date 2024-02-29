import styles from "./main.module.css";

import "antd/dist/reset.css";


import Menu from "../../components/Menu/menu";
import Header from "../../components/Header/Header";
import Sides from "../../components/Sides/sides";
import Footer from "../../components/Footer/Footer";


import Subscribetop from "../../components/Subscribetop/subscribetop";
import Astronaut from "@/components/Astronaut/astronaut";
import World from "@/components/World/world";
import Tiktoktop from "../../components/Tiktoktop/tiktoktop";
import Herotitle from "@/components/Herotitle/herotitle";
import Products from "@/components/Products/products";
import About from "@/components/About/about";
import Process from "@/components/Process/process";
import Mainvideo from "@/components/Mainvideo/mainvideo";
import Subfooter from "@/components/Subfooter/subfooter";
import Subfooter2 from "@/components/Subfooter2/subfooter2";


import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


import logoImage from "./Bim-copilot-logo_2.png";





const Main = ({ stories, firstStory }) => {
  const storiesToMap = stories.filter((story, i) => i != 0);
  const router = useRouter();

  return (
    <>

      <Menu />
      <Header />
      <Sides />
      <Subscribetop/>



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
                      top: "15px",
                      left: "-2.5px",
                    }}
                  >
                    {stories[0].post_number}
                  </h1>
                </div>
              </div>
            </div>

            <Link
              class="rounded-2xl ... drop-shadow-4xl ..."
              id={styles.LINK_HOLDER}
              href="/"
            >
              <div id={styles.IMAGE_POST}>
                <Image
                  src={stories[0].image}
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
                <h1
                  id={styles._H1}
                  class="text-5xl ... text-stone-200 ... font-avant_garde_bold"
                >
                  <Link href="/">{stories[0].title}</Link>
                </h1>
              </div>

              <div id={styles.HEAD_SUBTITLE}>
                <h3
                  id={styles._H3}
                  class="text-left ... text-xl ... text-stone-400 ... font-avant_garde_medium"
                >
                  <Link href="/">{stories[0].subtitle}</Link>
                </h3>
              </div>

              <div id={styles.AUTHOR}>
                <h3
                  id={styles._H3}
                  class="text-left ... text-sm ... text-stone-400 ... font-avant_garde_medium"
                >
                  <Link href="/">{stories[0].author}</Link>
                </h3>
              </div>

              <div id={styles.TIMESTAMP}>
                <h3
                  id={styles._H3}
                  class="text-left ... text-sm ... text-stone-400 ... font-avant_garde_medium"
                >
                  {stories[0].timestamp}
                </h3>
              </div>
            </div>

            <div id={styles.NEWS}>
              <div id={styles.ARTICLES_TITLE} styles={styles.h3}>
                <h2
                  id={styles._H2}
                  class="text-4xl ... text-stone-400 ...  text-shadow-[0_4px_8px_var(--tw-shadow-color)] shadow-indigo-500/50 font-avant_garde_bold"
                >
                  Latest Stories
                </h2>
              </div>

              <div id={styles.ARTICLES}>
                {storiesToMap.map((story, index) => {
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
                            onClick={() => router.push(`/blog/${story._id}`)}
                          >
                            <h3
                              id={styles._H3}
                              class="text-lg ... text-stone-200 ... drop-shadow-xl ... font-avant_garde_bold"
                            >
                              {story.text}
                            </h3>
                          </Link>
                        </div>
                        <div id={styles.BLOG_AUTHOR}>
                          <Link href={`/blog/${story._id}`}>
                            <h4
                              id={styles._H4}
                              class="text-sm ... text-right ... text-stone-200 ... drop-shadow-xl ... font-avant_garde_medium"
                            >
                              {story.author}
                            </h4>
                          </Link>
                        </div>
                        <div id={styles.TIMESTAMP}>
                          <h4
                            id={styles._H4}
                            class="text-sm ... text-right ... text-stone-200 ... drop-shadow-xl ... font-avant_garde_medium"
                          >
                            {story.timestamp}
                          </h4>
                        </div>

                        <div
                          class="rounded ... drop-shadow-2xl ... text-stone-400 ..."
                          id={styles.BLOG_IMAGE}
                        >
                          <Link href={`/blog/${story._id}`}>
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
                          </Link>
                        </div>
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

      <Tiktoktop/>
      <Herotitle/>
      <Products/>
      <Astronaut/>
      <World/>
      <About/>
      <Process/>
      <Mainvideo/>
      <Subfooter/>
     
      
      <Footer/>

    </>
  );
};

export default Main;
