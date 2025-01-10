"use client";

import styles from './bloghome.module.css';
import { useRouter } from "next/navigation";
import { useParams, useNavigate } from "next/navigation";

import Menu from "../../components/Menu/menu";
import Sides from "../../components/Sides/sides";
import Header from "../../components/Header/Header";
import Subfooter from "../../components/Subfooter2/subfooter2";
import Footer from "../../components/Footer/Footer";
import Subscribetop from "../../components/Subscribetop/subscribetop";

import Link from "next/link";
import Image from "next/image";

import parse from "html-react-parser";




const Bloghomemain = ({ stories, firstStory }) => {
  const params = useParams();
  const storiesToMap = stories.filter((story, i) => i != 0);
  const router = useRouter();
  let story_id;
  story_id = params.slug

  return (

    <>
      <Menu />
      <div id={styles.main}></div>
      <Header />
      <Sides />

      <Subscribetop />




      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_blogimageholder}>
          <div class={styles.grid_0_blogimage}>
            <div id={styles.BLOGIMAGE_HOLDER}>
              {storiesToMap.map((story, index) => {
                return (

                  <div id={styles.BLOGIMAGE}>

                    <div class="rounded-md ..." id={styles.B_IMAGE}>
                      <Link
                        href="/services">

                        <Image
                          alt="Picture of the author"
                          key={story._id}
                          loading='lazy'
                          width={500}
                          height={500}
                          src={story.image}
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }} />
                      </Link>

                    </div>

                    <div id={styles.BLOG_TEXT}>
                      <h3 id={styles._H2} class=" text-stone-200 ... font-avant_garde_bold ...">
                        {parse(story.title)}
                      </h3>

                      <br />

                      <h4 id={styles._H3} class="text-stone-400 ... font-avant_garde_bold ...">
                        {parse(story.subtitle)}
                      </h4>
                    </div>

                  </div>



                )
              })}
            </div>
          </div>
        </div>
      </section>


      <Subfooter />
      <Footer />

    </>



  );
};

export default Bloghomemain;
