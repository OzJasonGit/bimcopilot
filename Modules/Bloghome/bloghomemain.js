"use client";

import styles from "./bloghome.module.css";
import Menu from "../../components/Menu/menu";
import Sides from "../../components/Sides/sides";
import Header from "../../components/Header/Header";
import Subfooter from "../../components/Subfooter2/subfooter2";
import Footer from "../../components/Footer/Footer";
import Subscribetop from "../../components/Subscribetop/subscribetop";

import logo from "./bimcopilot_logo_white.svg";
import text_logo from "./bimcopilot_logo_text_horizontal_white.svg";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import parse from "html-react-parser";

const renderHtml = (content) => {
  if (content === null || content === undefined) return null;

  const value = typeof content === "string" ? content : String(content);

  try {
    return parse(value);
  } catch (error) {
    console.error("Failed to parse HTML content:", error);
    return value;
  }
};

const Bloghomemain = ({ stories, currentPage = 1, totalPages = 1 }) => {
  const pathname = usePathname();
  const storiesToMap = Array.isArray(stories) ? stories : [];

  const buildPageHref = (page) => {
    const safeTotalPages = Math.max(1, totalPages || 1);
    const clampedPage = Math.max(1, Math.min(page, safeTotalPages));

    if (!pathname) return "#";

    if (clampedPage === 1) {
      return pathname;
    }

    const searchParams = new URLSearchParams();
    searchParams.set("page", String(clampedPage));
    return `${pathname}?${searchParams.toString()}`;
  };

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
            <div className={styles.blogGridMain}>
            {totalPages >= 1 && storiesToMap.length > 0 && (
              <div className={`${styles.pagination} ${styles.paginationTop}`} aria-label="Blog pagination (top)">
                {currentPage > 1 ? (
                  <Link
                    href={buildPageHref(currentPage - 1)}
                    className={styles.paginationBtn}
                    aria-label="Previous page"
                    rel="prev"
                  >
                    Prev
                  </Link>
                ) : (
                  <span className={styles.paginationBtn} aria-disabled="true">
                    Prev
                  </span>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={`top-${page}`}
                    href={buildPageHref(page)}
                    className={
                      currentPage === page
                        ? `${styles.paginationBtn} ${styles.paginationPageActive}`
                        : styles.paginationBtn
                    }
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </Link>
                ))}
                {currentPage < totalPages ? (
                  <Link
                    href={buildPageHref(currentPage + 1)}
                    className={styles.paginationBtn}
                    aria-label="Next page"
                    rel="next"
                  >
                    Next
                  </Link>
                ) : (
                  <span className={styles.paginationBtn} aria-disabled="true">
                    Next
                  </span>
                )}
              </div>
            )}
            <div id={styles.BLOGIMAGE_HOLDER}>
              {storiesToMap.map((story, index) => {
                return (

                  <div id={styles.BLOGIMAGE}>

                    <div class="rounded-2xl ..." id={styles.B_IMAGE}>
                      <Link
                       href={`/blog/${story.slug}`}
                       className="group overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 shadow-none hover:shadow-xl"
                       style={{ position: "relative", width: "100%", height: "auto" }}>

                        <div className="relative w-full h-full transition-transform duration-500 ease-in-out transform-gpu origin-center scale-110 group-hover:scale-100 ">
                          <Image
                          alt={story.title ? String(story.title).replace(/<[^>]*>/g, "").slice(0, 60) : "Blog"}
                          key={story.slug}
                          loading="lazy"
                          width={500}
                          height={500}
                          src={story.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 500 500'%3E%3Crect fill='%23222' width='500' height='500'/%3E%3Ctext fill='%23666' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16'%3ENo image%3C/text%3E%3C/svg%3E"}
                          unoptimized={typeof story.image === "string" && (story.image.includes(".gif") || story.image.includes("cloudinary.com"))}
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='500' height='500' viewBox='0 0 500 500'%3E%3Crect fill='%23222' width='500' height='500'/%3E%3Ctext fill='%23666' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='16'%3ENo image%3C/text%3E%3C/svg%3E";
                          }}
                          />
                        </div>

                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100 " />

                        {/* Icons */}
                        <div id={styles.PRODUCT_OVERLAY_GRID} style={{ position: "absolute", width: "100%", height: "100%",  left: "0px", top:"0px", zIndex:"30"}}>
                          <div style={{ gridArea: "LOGO", position: "relative", zIndex: 100}} className=" opacity-0 -translate-x-10 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
                            <Image src={logo} alt="Logo" fill style={{ objectFit: "cover" }} quality={100} loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                          </div>
                          <div style={{ gridArea: "TEXT", position: "relative", zIndex: 100}} className=" opacity-0  translate-x-10 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" >
                            <Image src={text_logo} alt="Logo Text" fill style={{ objectFit: "cover" }} quality={100} loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" />
                          </div> 
                          <div style={{ gridArea: "TITLE", position: "relative", zIndex: 100}}>
                            <h3  id={styles._H2}  className="text-center text-stone-50 font-avant_garde_bold opacity-0 translate-y-10 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                              {renderHtml(story.title)}
                            </h3>
                          </div>   
                        </div>
                        
                      </Link>

                    </div>

                    <div id={styles.BLOG_TEXT}>
                      <h3 id={styles._H2} class=" text-stone-200 ... font-avant_garde_bold ...">
                        {renderHtml(story.title)}
                      </h3>

                      <br />

                      <h4 id={styles._H3} class="text-stone-400 ... font-avant_garde_bold ...">
                        {renderHtml(story.subtitle)}
                      </h4>
                    </div>

                  </div>



                )
              })}
            </div>
            {totalPages >= 1 && storiesToMap.length > 0 && (
              <div className={styles.pagination} aria-label="Blog pagination">
                {currentPage > 1 ? (
                  <Link
                    href={buildPageHref(currentPage - 1)}
                    className={styles.paginationBtn}
                    aria-label="Previous page"
                    rel="prev"
                  >
                    Prev
                  </Link>
                ) : (
                  <span className={styles.paginationBtn} aria-disabled="true">
                    Prev
                  </span>
                )}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={buildPageHref(page)}
                    className={
                      currentPage === page
                        ? `${styles.paginationBtn} ${styles.paginationPageActive}`
                        : styles.paginationBtn
                    }
                    aria-label={`Page ${page}`}
                    aria-current={currentPage === page ? "page" : undefined}
                  >
                    {page}
                  </Link>
                ))}
                {currentPage < totalPages ? (
                  <Link
                    href={buildPageHref(currentPage + 1)}
                    className={styles.paginationBtn}
                    aria-label="Next page"
                    rel="next"
                  >
                    Next
                  </Link>
                ) : (
                  <span className={styles.paginationBtn} aria-disabled="true">
                    Next
                  </span>
                )}
              </div>
            )}
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
