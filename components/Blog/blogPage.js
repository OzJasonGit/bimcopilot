import styles from "./blog.module.css";
import React from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import logoImage from "./bimcopilot_logo_text_vertical_white_shadow.svg";
import parse from "html-react-parser";

const Blogpage = ({ stories, topStories }) => {
  const params = useParams();
  const router = useRouter();

  // Ensure `stories.data` exists and filter safely
  const storiesToMap =
    stories?.data?.filter((story, i) => story?.data === params.slug && i > 0) ||
    [];

  const mainStory = stories?.data?.[0] || {};

  return (
    <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder}>
      <div className={styles.grid_0_blog}>
        <div className={styles.head}>
          {/* Post Number */}
          {mainStory.post_number && (
            <div className="rounded-2xl" id={styles.IMAGE_POST_NUMBER}>
              <div
                className="rounded-full border-8 border-emerald-200"
                id={styles.POST_NUMBER_HOLDER}
              >
                <div id={styles.POST_NUMBER_HOLDER_2} className="content-center">
                  <h1
                    id={styles._H1}
                    className="text-center text-5xl text-stone-200 font-avant_garde_bold"
                  >
                    {parse(mainStory.post_number.toString() || "")}
                  </h1>
                </div>
              </div>
            </div>
          )}



























          {/* Blog Main Image */}
          {mainStory.slug && (
            <Link className="rounded-2xl drop-shadow-4xl" id={styles.LINK_HOLDER} href={`/blog/${mainStory.slug}`}>
              <div id={styles.IMAGE_POST}>
                <Image
                  src={mainStory.image || "/default-image.jpg"} // Fallback image
                  alt="Blog Post"
                  loading="lazy"
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
          )}

          {/* Logo */}
          <div id={styles.BC}>
            <Image
              id={styles.IMAGE_1}
              src={logoImage}
              style={{ objectFit: "contain" }}
              quality={100}
              alt="Bim Copilot Logo"
            />
          </div>

          {/* Blog Title & Metadata */}
          <div id={styles.IMAGE_POST_TITLE}>
            <div id={styles.HEAD_TITLE}>
              {mainStory.slug && (
                <Link href={`/blog/${mainStory.slug}`}>
                  <h2 id={styles._H2} className="text-stone-200 font-avant_garde_bold">
                    {parse(mainStory.title || "Untitled")}
                  </h2>
                </Link>
              )}
            </div>

            <div id={styles.HEAD_SUBTITLE}>
              {mainStory.slug && (
                <Link href={`/blog/${mainStory.slug}`}>
                  <h3 id={styles._H3} className="text-left text-xl text-stone-400 font-avant_garde_bold">
                    {parse(mainStory.subtitle || "")}
                  </h3>
                </Link>
              )}
            </div>

            <div id={styles.AUTHOR}>
              {mainStory.slug && (
                <Link href={`/blog/${mainStory.slug}`}>
                  <h3 id={styles._H3} className="text-left text-xl text-stone-400 font-avant_garde_bold">
                    {parse(mainStory.author || "Unknown Author")}
                  </h3>
                </Link>
              )}
            </div>
          </div>

          {/* Latest Stories Section */}
          <div id={styles.NEWS}>
            <div id={styles.ARTICLES_TITLE} className={styles.h3}>
              <h2 id={styles._H1} className="text-stone-400 font-avant_garde_bold">
                Latest Stories
              </h2>
            </div>

            <div id={styles.ARTICLES}>
              {storiesToMap.length > 0 ? (
                storiesToMap.map((story, index) => (
                  <div key={story.slug} className={styles.container} style={{ gridArea: index + 1 }}>
                    <div id={styles.BLOG_SMALL_1}>
                      <div className="rounded-full drop-shadow-2xl border-2 border-emerald-200" id={styles.BLOG_NUMBER}>
                        <div className="content-center">
                          <h5 id={styles._H5} className="text-center text-stone-200 font-avant_garde_bold">
                            {story.post_number}
                          </h5>
                        </div>
                      </div>

                      <div id={styles.BLOG_TEXT}>
                        <Link href={`/blog/${story.slug}`}>
                          <h3 id={styles._H3} className="text-lg text-stone-200 drop-shadow-xl font-avant_garde_bold">
                            {parse(story.title || "Untitled")}
                          </h3>
                        </Link>
                      </div>

                      <div id={styles.BLOG_AUTHOR}>
                        <Link href={`/blog/${story.slug}`}>
                          <h3 id={styles._H4} className="text-sm text-right text-stone-400 drop-shadow-xl font-avant_garde_bold">
                            {parse(story.author || "Unknown")}
                          </h3>
                        </Link>
                      </div>

                      <div id={styles.TIMESTAMP}>
                        <h4 id={styles._H4} className="text-sm text-right text-stone-400 drop-shadow-xl font-avant_garde_bold">
                          {parse(story.timestamp || "N/A")}
                        </h4>
                      </div>

                      <Link href={`/blog/${story.slug}`} className="rounded drop-shadow-2xl text-stone-400" id={styles.BLOG_IMAGE}>
                        <div>
                          <Image
                            alt="Blog Thumbnail"
                            width={500}
                            height={500}
                            src={story.image || "/default-image.jpg"}
                            style={{
                              position: "absolute",
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      </Link>

                      <div className="border-b border-neutral-600" id={styles.BORDER}></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-stone-400 text-center">No latest stories available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Blogpage;
