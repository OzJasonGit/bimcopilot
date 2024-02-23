"use client";

import { CaretRightFilled } from "@ant-design/icons";
import { Form, Input, Button, Item } from "antd";

import { faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Tab from "../../components/Tabs/tabs";
import Tab_Horizontal from "../../components/Tabs/tabs_horizontal";
import Tab_M from "../../components/Tabs/tabs_m";
import Carousels from "../../components/Carousel/carousel";
import Infinite_Scroll from "../../components/Carousel/Infinite_Scroll";


import FontH2 from "../../components/Font_Components/Font_H2/fontH2";

import styles from "./main.module.css";

import "antd/dist/reset.css";
import Image from "next/image";
import logoImage from "./Bim-copilot-logo_2.png";

import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Link from "next/link";
import Video from "./Video/video";
import Tiktok from "../../components/Tiktok/tiktok";



import Subcribetop from "../../components/Subscribetop/subscribetop";


























import Sides from "../../components/Sides/sides";

import Menu from "../../components/Menu/menu";

import { useRouter } from "next/navigation";

const contentStyle = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};



const Main = ({ stories, firstStory }) => {
  const storiesToMap = stories.filter((story, i) => i != 0);
  const router = useRouter();

  return (
    <>
      <Menu />

      <div id={styles.main}></div>

      <Header />
      <Sides />

      <Subcribetop/>

      
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

      




















      <section id={styles.SHADOW_SECTION_TIKTOK} class={styles.center_holder}>
        <div class={styles.grid_0_main}>
          <div id={styles.MAIN_TIKTOK_HOLDER}>
            <div id={styles.ICON_HOLDER}>
              <Link
                href="/"
                id={styles.ICON_TIKTOK}
                class=" rounded-2xl ... drop-shadow-xl ... "
              >
                <FontAwesomeIcon
                  icon={faTiktok}
                  id={styles.TIKTOK_FONT}
                  class={styles.CENTER}
                />
              </Link>
            </div>
            <div id={styles.TIKTOK_HOLDER}>
              <div
                id={styles.TIKTOK}
                class="rounded-2xl ... drop-shadow-2xl ... shadow-black"
              >
                <Tiktok />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>
        <div class={styles.grid_0_main}>
          <div id={styles.MAIN_TEXT_HOLDER}>
            <div id={styles.SUB_TEXT_HOLDER}>
              <h1
                class="text-6xl ... text-neutral-700 ... font-avant_garde_bold"
                id={styles._H1}
              >
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-6xl ...  text-emerald-200"
                >
                  Sustainability
                </a>{" "}
                <a class="text-6xl ...">
                  through exploration. We explore new frontiers in
                </a>
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-6xl ...  text-stone-50 ... underline decoration-4 ... decoration-red-300 ..."
                >
                  {" "}
                  architecture
                </a>
                ,
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-6xl ... text-stone-50 ... underline decoration-4 ... decoration-amber-300 ..."
                >
                  {" "}
                  construction{" "}
                </a>
                <a class="text-6xl ...">and</a>{" "}
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-6xl ... text-stone-50 ... underline decoration-4 ... decoration-sky-300 ..."
                >
                  {" "}
                  technology
                </a>
                .
              </h1>
            </div>

            <div id={styles.SUB_TEXT_HOLDER_MOBILE}>
              <h1
                class="text-5xl ... text-neutral-700 ... font-avant_garde_bold"
                id={styles._H1}
              >
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-5xl ...  text-emerald-200"
                >
                  Sustainability
                </a>{" "}
                <a class="text-5xl ...">
                  through exploration. We explore new frontiers in
                </a>
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-5xl ...  text-stone-50 ... underline decoration-4 ... decoration-red-300 ..."
                >
                  {" "}
                  architecture
                </a>
                ,
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-5xl ... text-stone-50 ... underline decoration-4 ... decoration-amber-300 ..."
                >
                  {" "}
                  construction{" "}
                </a>
                <a class="text-5xl ...">and</a>{" "}
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-5xl ... text-stone-50 ... underline decoration-4 ... decoration-sky-300 ..."
                >
                  {" "}
                  technology
                </a>
                .
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>
        <div class={styles.grid_0_main}>
          <div
            id={styles.PRODUCTS_HOLDER_MOBILE}
            styles={{ position: "absolute" }}
          >
            <div id={styles.PRODUCTS_HORIZONTAL_MOBILE}>
              <div
                class="rounded-2xl ...  drop-shadow-2xl ..."
                id={styles.PRODUCT_CARD}
                styles={{ gridArea: "1" }}
              >
                <Link
                  href="/"
                  id={styles.PRODUCT_IMAGE}
                  class="bg-neutral-800 rounded-xl ... drop-shadow-2xl ..."
                ></Link>
                <div>
                  <Link href="/">
                    <h2
                      id={styles._H2}
                      class=" text-neutral-700 ... font-avant_garde_bold"
                    >
                      This is the product title
                    </h2>
                    <h3 class=" font-avant_garde_medium">
                      {" "}
                      This the product description
                    </h3>
                  </Link>
                </div>
              </div>
              <div
                class="rounded-2xl ... drop-shadow-2xl ..."
                id={styles.PRODUCT_CARD}
                styles={{ gridArea: "2" }}
              >
                <Link
                  href="/"
                  id={styles.PRODUCT_IMAGE}
                  class="bg-neutral-800 rounded-xl ... drop-shadow-2xl ..."
                ></Link>
                <div>
                  <Link href="/">
                    <h2
                      id={styles._H2}
                      class=" text-neutral-700 ... font-avant_garde_bold"
                    >
                      This is the product title
                    </h2>
                    <h3 class=" text-neutral-700 ... font-avant_garde_medium">
                      {" "}
                      This the product description
                    </h3>
                  </Link>
                </div>
              </div>
              <div
                class="rounded-2xl ... drop-shadow-2xl ..."
                id={styles.PRODUCT_CARD}
                styles={{ gridArea: "3" }}
              >
                <Link
                  href="/"
                  id={styles.PRODUCT_IMAGE}
                  class="bg-neutral-800 rounded-xl ... drop-shadow-2xl ..."
                ></Link>
                <div>
                  <Link href="/">
                    <h2
                      id={styles._H2}
                      class=" text-neutral-700 ... font-avant_garde_bold"
                    >
                      This is the product title
                    </h2>
                    <h3 class=" text-neutral-700 ... font-avant_garde_medium">
                      {" "}
                      This the product description
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div id={styles.PRODUCTS_HOLDER}>
            <div id={styles.PRODUCT} style={{ gridArea: "AREA_1" }}>
              <Link
                href="/"
                id={styles.PRODUCT_IMAGE}
                class="bg-neutral-900 rounded-xl ... drop-shadow-2xl ..."
              ></Link>
              {/*<div  id={styles.PRODUCT_SHADOW} class="bg-neutral-950 rounded-xl ...">                                                            
                                </div>*/}
              <div>
                <Link href="/">
                  <h2
                    id={styles._H2}
                    class=" text-neutral-700 ... font-avant_garde_bold"
                  >
                    This is the product title
                  </h2>
                  <h3 class=" text-neutral-700 ... font-avant_garde_medium">
                    {" "}
                    This the product description
                  </h3>
                </Link>
              </div>
            </div>
            <div id={styles.PRODUCT} style={{ gridArea: "AREA_2" }}>
              <Link
                id={styles.PRODUCT_IMAGE}
                href="/"
                class="bg-neutral-900 rounded-xl ... drop-shadow-2xl ..."
              ></Link>
              {/*<div  id={styles.PRODUCT_SHADOW} class="bg-neutral-950 rounded-xl ...">                                                            
                                </div>*/}
              <div>
                <Link href="/">
                  <h2
                    id={styles._H2}
                    class=" text-neutral-700 ... font-avant_garde_bold"
                  >
                    This is the product title
                  </h2>
                  <h3 class=" text-neutral-700 ... font-avant_garde_medium">
                    {" "}
                    This the product description
                  </h3>
                </Link>
              </div>
            </div>
            <div id={styles.PRODUCT} style={{ gridArea: "AREA_3" }}>
              <Link
                id={styles.PRODUCT_IMAGE}
                href="/"
                class="bg-neutral-900 rounded-xl ... drop-shadow-2xl ..."
              ></Link>
              {/*<div  id={styles.PRODUCT_SHADOW} class="bg-neutral-950 rounded-xl ...">                                                            
                                </div>*/}
              <div>
                <Link href="/">
                  <h2
                    id={styles._H2}
                    class=" text-neutral-700 ... font-avant_garde_bold"
                  >
                    This is the product title
                  </h2>
                  <h3 class=" text-neutral-700 ... font-avant_garde_medium">
                    {" "}
                    This the product description
                  </h3>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id={styles.SHADOW_SECTION_TITLE} class={styles.center_holder}>
        <div class={styles.grid_0_image_left}>
          <div
            class="rounded-2xl ... drop-shadow-2xl ... border-solid border-2 border-slate-200..."
            id={styles.ASTRONAUT_IMAGE_1}
          ></div>
        </div>
      </section>

      <section id={styles.SHADOW_SECTION_WORLD} class={styles.center_holder}>
        <div class={styles.grid_0_main_world}>
          <div id={styles.PLANET_HOLDER_GRID}>
            <div id={styles.WORLD_GRID}>
              <div
                class="rounded-2xl ... drop-shadow-2xl ... border-solid border-2 border-slate-200..."
                id={styles.PLANET_HOLDER}
              ></div>
            </div>
            <div id={styles.BACKGROUND_GRID}>
              <div
                class="rounded-2xl ... drop-shadow-2xl ... border-solid border-2 border-slate-200..."
                id={styles.PLANET_HOLDER}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <section id={styles.SHADOW_SECTION_BLACK} class={styles.center_holder}>
        <div class={styles.grid_0}>
          <div class={styles.main}>
            <div id={styles.INTRO_HOLDER}>
              <div id={styles.INTRO}>
                <h2
                  id={styles._H2}
                  class="text-4xl ... text-stone-200 ... drop-shadow-xl ...  font-avant_garde_bold"
                >
                  We help businesses harness BIM and AI for speed, profit and
                  sustainable success.
                </h2>
              </div>
              <div id={styles.INTRO_SUBTITLE}>
                <h3
                  id={styles._H3}
                  class="text-xl ... text-stone-400 ... drop-shadow-xl ... font-avant_garde_medium"
                >
                  Find out how we can help your business build{" "}
                  <a class="text-stone-200 ... font-avant_garde_bold">
                    systems
                  </a>{" "}
                  for{" "}
                  <a class="text-stone-200 ... font-avant_garde_bold">
                    automation,
                  </a>{" "}
                  <a class="text-stone-200 ... font-avant_garde_bold">
                    sustainability,
                  </a>{" "}
                  <a class="text-stone-200 ... font-avant_garde_bold">profit</a>{" "}
                  and{" "}
                  <a class="text-stone-200 ... font-avant_garde_bold">
                    growth.
                  </a>
                </h3>
              </div>
              <div class="rounded-2xl ... shadow-2xl ... " id={styles.IMAGE}>
                <Image
                  src={stories[2].image}
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
            </div>

            <div id={styles.ABOUT_HOLDER}>
              <div
                class="rounded-2xl ... bg-neutral-900 ... shadow-2xl shadow-black "
                id={styles.ABOUT_CONTAINER}
              >
                <div id={styles.ABOUT_OVERFLOW}>
                  <div class="rounded-2xl ... " id={styles.ABOUT}>
                    <div id={styles.ABOUT_TEXT_HOLDER}>
                      <div id={styles.ABOUT_TEXT}>
                        <div id={styles.ABOUT_TITLE_HOLDER}>
                          <h1
                            id={styles._H1}
                            class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold"
                          >
                            <a class="text-left ... text-6xl">About</a>
                          </h1>
                        </div>

                        <div
                          class="content-center ..."
                          id={styles.MY_FACE_HOLDER}
                        >
                          <div
                            id={styles.MY_FACE}
                            class=" border-8 border-stone-200 ... rounded-full ..."
                          >
                            <Image></Image>
                          </div>
                        </div>

                        <h3
                          id={styles._H3}
                          class="text-lg ... text-stone-200 ... drop-shadow-xl font-avant_garde_bold"
                        >
                          Hi, I'm Oz Jason. I'm a registered architect, BIM
                          manager and the founder of{" "}
                          <a class="text-yellow-200 ...">bimcopilot.com</a>.
                          <br /> However, I'm a firm believer that titles are
                          becoming less important. What matters is how I can
                          help you and your business. And I think <br /> I could
                          help you a lot.
                        </h3>
                        <br />
                        <p class="text-base ... text-stone-400 ... drop-shadow-xl font-avant_garde_medium">
                          At{" "}
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            bimcopilot.com
                          </a>{" "}
                          we use Building Information modelling
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            [BIM]
                          </a>{" "}
                          and artificial intelligence
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            [AI]
                          </a>{" "}
                          to develop{" "}
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            systems
                          </a>{" "}
                          that
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            automate
                          </a>{" "}
                          tasks,{" "}
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            50x output
                          </a>{" "}
                          and
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            eliminate human errors
                          </a>{" "}
                          that result in
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            waste.{" "}
                          </a>
                          <br />
                          <br />
                          My focus and passion has always been in preserving the
                          natural world and
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            bimcopilot.com{" "}
                          </a>
                          continues to champion these values of
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            sustainability
                          </a>{" "}
                          and
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            <br />
                            waste-reduction
                          </a>
                          . We believe that
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            bigger profits
                          </a>{" "}
                          come from
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            better systems
                          </a>
                          , that
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            save time
                          </a>
                          ,
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            reduce waste
                          </a>{" "}
                          and
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            improve accuracy
                          </a>
                          . Here, we are choosing to be unafraid to challenge
                          redundant ideas, that only hold us back.
                          <br />
                          <br />
                          The future lies somewhere between
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            low-tech
                          </a>{" "}
                          solutions and
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            advanced technology
                          </a>
                          .
                          <a class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold">
                            {" "}
                            bimcopilot.com
                          </a>
                          , aims to explore where this leads.
                          <br />
                          <br />
                          Learn more about our values from our parent company,
                          <br />
                          <br />
                          <a class="text-emerald-200 drop-shadow-xl font-avant_garde_bold text-lg ...">
                            {" "}
                            <Link href="/">plasticfreebydesign.com</Link>
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div id={styles.WHO_WE_WORK_WITH_HOLDER}>
              <div>
                <h2
                  id={styles._H2}
                  class="text-left ... text-4xl ... text-stone-400 ...  drop-shadow-xl ... font-avant_garde_bold"
                >
                  Who We Work With
                </h2>
              </div>
              <div id={styles.CAROUSEL_HOLDER}>
                <div id={styles.CAROUSEL}>
                  <Infinite_Scroll />
                </div>
              </div>
            </div>

            <div id={styles.TESTIMONIALS}>
              <div>
                <h2
                  id={styles._H2}
                  class="text-right ... text-4xl ... text-stone-400 ...  drop-shadow-xl font-avant_garde_bold"
                >
                  Testimonials
                </h2>
              </div>

              <div id={styles.TESTIMONIAL_AREA}>
                <div id={styles.T_CONTAINER}>
                  <Tab />
                  {<Tab_Horizontal />}
                  {/*<Tab_M/>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id={styles.SHADOW_SECTION_PROCESS} class={styles.center_holder}>
        <div class={styles.grid_0_main}>
          <div class={styles.process_section} styles={{ position: "relative" }}>
            <div id={styles.PROCESS_TITLE}>
              <h1
                class="text-7xl ... text-neutral-700 ... font-avant_garde_bold"
                id={styles._H1}
              >
                <a
                  id={styles.TEXT_OUTLINE}
                  class="text-6xl ... text-emerald-200 "
                >
                  How We Work
                </a>
              </h1>
            </div>

            <div id={styles.PROCESS_TEXT} styles={{ gridArea: "STEPS" }}>
              <p
                class="text-xl ... text-neutral-700 ... font-avant_garde_medium"
                id={styles._H5}
              >
                This is just some text to pass the time
              </p>
            </div>

            <div id={styles.PROCESS} styles={{ position: "absolute" }}>
              <div id={styles.PROCESS_HORIZONTAL}>
                <div
                  id={styles.PROCESS_CARD}
                  class="rounded-2xl ...  border-4 border-neutral-500 ..."
                  styles={{ gridArea: "1" }}
                >
                  <div id={styles.CARD_GRID}>
                    <div
                      id={styles.CARD_NUMBER}
                      class="border-8 border-neutral-600 ... rounded-full ... text-center "
                    >
                      <span
                        class=" inline-block align-middle ..."
                        styles={{ height: "100%" }}
                      >
                        0
                      </span>
                    </div>

                    <div
                      id={styles.CARD_TITLE}
                      class="text-stone-600 drop-shadow-xl font-avant_garde_bold text-4xl ..."
                    >
                      <h1 id={styles._H1} class="text-4xl ...">
                        Discovery Call
                      </h1>
                    </div>

                    <div
                      id={styles.CARD_SUBTITLE}
                      class="       text-stone-600 ... drop-shadow-xl font-avant_garde_bold     "
                    >
                      <h3>
                        Here's where we'll define whether bimcopilot.com is the
                        right solution for your project.
                      </h3>
                    </div>

                    <div id={styles.CARD_BULLET} class="">
                      <ul class="list-disc font-avant_garde_bold text-sm ...">
                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  id={styles.PROCESS_CARD}
                  class="rounded-2xl ... bg-zinc-900 ... drop-shadow-2xl ..."
                  styles={{ gridArea: "2" }}
                >
                  <div id={styles.CARD_GRID}>
                    <div
                      id={styles.CARD_NUMBER}
                      class="border-8 border-stone-200 ... rounded-full ... text-center"
                    >
                      <h1 styles={{ position: "relative", top: "50%" }}>1</h1>
                    </div>

                    <div id={styles.CARD_TITLE} class="">
                      <h1
                        id={styles._H1}
                        class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold text-4xl ..."
                      >
                        Strategic <br />
                        Definition
                      </h1>
                    </div>

                    <div
                      id={styles.CARD_SUBTITLE}
                      class="         text-stone-200 ... drop-shadow-xl font-avant_garde_bold     "
                    >
                      <h2>This is the subtitle</h2>
                    </div>

                    <div id={styles.CARD_BULLET} class="">
                      <ul class="list-disc    text-stone-200 ... font-avant_garde_bold   text-sm ...  ">
                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  id={styles.PROCESS_CARD}
                  class="rounded-2xl ... bg-zinc-900 ... drop-shadow-2xl ..."
                  styles={{ gridArea: "3" }}
                >
                  <div id={styles.CARD_GRID}>
                    <div
                      id={styles.CARD_NUMBER}
                      class="border-8 border-stone-200 ...  rounded-full ... text-center"
                    >
                      <h1 styles={{ textAlign: "center" }}>2</h1>
                    </div>

                    <div id={styles.CARD_TITLE} class="">
                      <h1
                        id={styles._H1}
                        class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold text-4xl ..."
                      >
                        Project Brief
                      </h1>
                    </div>

                    <div
                      id={styles.CARD_SUBTITLE}
                      class="            text-stone-200 ... drop-shadow-xl font-avant_garde_bold          "
                    >
                      <h3 className="text-3xl">This is the subtitle</h3>
                    </div>

                    <div id={styles.CARD_BULLET} class="">
                      <ul class="list-disc    text-stone-200 ... font-avant_garde_bold text-sm ...">
                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  id={styles.PROCESS_CARD}
                  class="rounded-2xl ... bg-zinc-900 ... drop-shadow-2xl ..."
                  styles={{ gridArea: "4" }}
                >
                  <div id={styles.CARD_GRID}>
                    <div
                      id={styles.CARD_NUMBER}
                      class="border-8 border-stone-200 ... rounded-full ... text-center"
                    >
                      <h1 styles={{ textAlign: "center" }}>3</h1>
                    </div>

                    <div id={styles.CARD_TITLE} class="">
                      <h1
                        id={styles._H1}
                        class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold text-4xl ..."
                      >
                        Schematic Production
                      </h1>
                    </div>

                    <div
                      id={styles.CARD_SUBTITLE}
                      class="         text-stone-200 ... drop-shadow-xl font-avant_garde_bold        "
                    >
                      <h3>This is the subtitle</h3>
                    </div>

                    <div id={styles.CARD_BULLET} class="">
                      <ul class="list-disc text-stone-200 ... font-avant_garde_bold   text-sm ...  ">
                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  id={styles.PROCESS_CARD}
                  class="rounded-2xl ... bg-zinc-900 ... drop-shadow-2xl ..."
                  styles={{ gridArea: "5" }}
                >
                  <div id={styles.CARD_GRID}>
                    <div
                      id={styles.CARD_NUMBER}
                      class="border-8 border-stone-200 ... rounded-full ... text-center"
                    >
                      <h1 styles={{ textAlign: "center" }}>4</h1>
                    </div>

                    <div id={styles.CARD_TITLE} class="">
                      <h1
                        id={styles._H1}
                        class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold text-4xl ..."
                      >
                        Technical Production
                      </h1>
                    </div>

                    <div
                      id={styles.CARD_SUBTITLE}
                      class="         text-stone-200 ... drop-shadow-xl font-avant_garde_bold       "
                    >
                      <h3>This is the subtitle</h3>
                    </div>

                    <div id={styles.CARD_BULLET} class="">
                      <ul class="list-disc   text-stone-200 ... font-avant_garde_bold   text-sm ...  ">
                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  id={styles.PROCESS_CARD}
                  class="rounded-2xl ... bg-zinc-900 ... drop-shadow-2xl ..."
                  styles={{ gridArea: "6" }}
                >
                  <div id={styles.CARD_GRID}>
                    <div
                      id={styles.CARD_NUMBER}
                      class="border-8 border-stone-200 ... rounded-full ... text-center"
                    >
                      <h1 styles={{ textAlign: "center" }}>5</h1>
                    </div>

                    <div id={styles.CARD_TITLE} class="">
                      <h1
                        id={styles._H1}
                        class="text-stone-200 ... drop-shadow-xl font-avant_garde_bold text-4xl ..."
                      >
                        This is the title
                      </h1>
                    </div>

                    <div
                      id={styles.CARD_SUBTITLE}
                      class="         text-stone-200 ... drop-shadow-xl font-avant_garde_bold       "
                    >
                      <h3>This is the subtitle</h3>
                    </div>

                    <div id={styles.CARD_BULLET} class="">
                      <ul class="list-disc   text-stone-200 ... font-avant_garde_bold   text-sm ...  ">
                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>

                        <li>These are the bullet points</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id={styles.SHADOW_SECTION} class={styles.center_holder}>
        <div class={styles.grid_0_main}>
          <div class={styles.video_section}>
            <div id={styles.VIDEO_LATEST_HOLDER}>
              <div id={styles.VIDEO_LATEST} class="rounded-xl ..."></div>

              <Video />

              <div id={styles.VIDEO_TEXT_HOLDER} class="rounded ...">
                <div id={styles.V_TITLE_HOLDER}>
                  <h2
                    id={styles._H2}
                    class="text-4xl ... text-slate-100 ... drop-shadow-xl font-avant_garde_bold"
                  >
                    {stories[0].title}
                  </h2>
                </div>
                <div id={styles.V_SUBTITLE_HOLDER}>
                  <h3
                    id={styles._H3}
                    class="text-xl ... text-stone-400 ... drop-shadow-xl font-avant_garde_medium"
                  >
                    {stories[0].subtitle}
                  </h3>
                </div>
                <div class="rounded ..." id={styles.SHARE}></div>
              </div>
            </div>

            <div class="rounded-xl ... " id={styles.GRAPHIC}></div>

            <div id={styles.SERVICES_HOLDER}>
              <div id={styles.SERVICES}>
                <div id={styles.SERVICES_TITLE}>
                  <h2
                    id={styles._H2}
                    class="text-4xl ... text-stone-400 ... drop-shadow-xl font-avant_garde_bold"
                  >
                    Services
                  </h2>
                </div>

                <div
                  class="rounded-md ..."
                  id={styles.SERVICES_COLLAPSE_HOLDER}
                >
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id={styles.SHADOW_SECTION_TAG} class={styles.center_holder}>
        <div class={styles.grid_0_main}>
          <div id={styles.TAG_HOLDER}>
            <div id={styles.TAG}>
              <h1
                id={styles._H1}
                class="text-7xl ... text-slate-100 ... font-avant_garde_bold"
              >
                {" "}
                You're the <a class="text-red-300 ...">pilot </a>... I am your{" "}
                <a class="text-amber-200 ...">copilot</a>.
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section
        id={styles.SHADOW_SECTION_ASTRONAUT}
        class={styles.center_holder}
      >
        <div class={styles.grid_0_image_right}>
          <div
            class="rounded-2xl ... drop-shadow-2xl ... border-solid border-2 border-slate-200..."
            id={styles.ASTRONAUT_IMAGE_2}
          ></div>
        </div>
      </section>
    </>
  );
};

export default Main;
