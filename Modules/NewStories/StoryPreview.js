"use client";

import React from "react";
import Image from "next/image";
import styles from "@/Modules/Blog_page/blog_page.module.css";

const getHtmlContent = (content) => {
  if (!content) return "";
  const contentStr = String(content);
  if (contentStr.includes("&lt;") || contentStr.includes("&gt;") || contentStr.includes("&amp;")) {
    if (typeof window !== "undefined") {
      const txt = document.createElement("textarea");
      txt.innerHTML = contentStr;
      return txt.value;
    }
    return contentStr
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&#x27;/g, "'")
      .replace(/&#x2F;/g, "/");
  }
  return contentStr;
};

const getAuthorImage = (authorName) => {
  if (!authorName) return "https://res.cloudinary.com/dbj8h56jj/image/upload/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png";
  const clean = authorName.toLowerCase().trim();
  if (clean.includes("oz") || clean.includes("jason")) {
    return "https://res.cloudinary.com/dbj8h56jj/image/upload/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png";
  }
  return "https://res.cloudinary.com/dbj8h56jj/image/upload/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png";
};

const hasBodyContent = (title, body) => {
  const strip = (html) => {
    if (!html || typeof html !== "string") return "";
    return String(html).replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  };
  return !!(strip(title) || strip(body));
};

const hasContent = (html) => hasBodyContent(html, html);

const formatDate = (raw) => {
  if (!raw) return "N/A";
  const parsed = new Date(raw);
  if (Number.isNaN(parsed.getTime())) return String(raw);
  return parsed.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
};

const MAX_BODY = 18;

export default function StoryPreview({ story }) {
  if (!story) return null;

  const avatarSrc = story.avatar || getAuthorImage(story.author);

  return (
    <div style={{ background: "#171717", minHeight: "100vh" }}>
      {/* Hero: Title, Subtitle, Author, Date, Avatar */}
      <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder} style={{ background: "#171717" }}>
        <div className={styles.grid_0_subscribe}>
          <div className={styles.sub_head}>
            <div id={styles.SUBSCRIBE} className="border-emerald-200">
              <div id={styles.MAIN_TAG}>
                <div id={styles._H1} className="text-stone-200 font-avant_garde_bold" dangerouslySetInnerHTML={{ __html: getHtmlContent(story.title || "") }} />
              </div>
              <div id={styles.SUB_TAG}>
                <div id={styles._H3} className="text-left text-xl text-stone-400 font-avant_garde_medium" dangerouslySetInnerHTML={{ __html: getHtmlContent(story.subtitle || "") }} />
              </div>
            </div>
            <div id={styles.AUTHOR_GRID} style={{ display: "grid", position: "relative" }}>
              <div className="bg-stone-100 rounded-full overflow-hidden" id={styles.AVATAR_IMAGE} style={{ gridArea: "AUTHOR", height: "110px", width: "110px", position: "relative" }}>
                <Image src={avatarSrc} alt={story.author || "Author"} width={110} height={110} className="w-full h-full object-cover" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.src = "https://res.cloudinary.com/dbj8h56jj/image/upload/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png"; }} />
              </div>
              <div id={styles.NUMBER_GRID} style={{ gridArea: "NUMBER", height: "100%", width: "100%", display: "grid", position: "relative" }}>
                <div id={styles.NUMBER} style={{ gridArea: "NUMBER", height: "100%", width: "100%", position: "relative" }}>
                  <h3 className="text-6xl text-stone-200 font-avant_garde_bold" style={{ marginBottom: "0px" }}>{story.post_number || ""}</h3>
                </div>
              </div>
              <div id={styles.NAME} style={{ gridArea: "NAME", height: "auto", width: "100%", left: "5px", position: "relative" }}>
                <h3 id={styles._H3} className="text-stone-400 font-avant_garde_bold text-right">{story.author || "Unknown Author"}</h3>
                <h3 id={styles._H3} className="text-stone-400 font-avant_garde_bold text-right">{formatDate(story.date || story.timestamp || story.publishDate)}</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image */}
      {story.image && (
        <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder} style={{ background: "#171717" }}>
          <div className={styles.grid_0_blogimageholder}>
            <div className="rounded-2xl" id={styles.MAIN_IMAGE} style={{ display: "block", width: "100%", gridArea: "SUB", position: "relative" }}>
              <Image alt="Story Image" width={500} height={500} src={story.image} loading="lazy" placeholder="blur" blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==" style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </section>
      )}

      {/* Introduction */}
      {hasContent(story.introduction) && (
        <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder} style={{ background: "#171717" }}>
          <div className={styles.grid_0_tag}>
            <div className={styles.sub_head_2}>
              <div id={styles.SUBSCRIBE} className="border-emerald-200">
                <div id={styles.MAIN_TAG}>
                  <h1 id={styles._H1} className="text-3xl text-stone-200 font-avant_garde_bold">Introduction<br /><br /></h1>
                  <p id={styles._H3_2} className="text-stone-400 font-avant_garde_bold" dangerouslySetInnerHTML={{ __html: getHtmlContent(story.introduction || "") }} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Body Sections */}
      {Array.from({ length: MAX_BODY }, (_, i) => {
        const n = i + 1;
        const title = story[`body${n}_title`];
        const body = story[`body${n}`];
        if (!hasBodyContent(title, body)) return null;
        return (
          <div key={n} id={`body${n}`} style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} style={{ background: "#171717" }}>
              <div className={styles.grid_0_blog}>
                <div id={styles.TEXT_HOLDER} style={{ position: "relative", display: "grid", width: "100%", height: "auto", gridArea: "MAIN_AREA" }}>
                  <div style={{ position: "relative", width: "100%", gridArea: "TITLE" }}>
                    <div className="text-3xl text-stone-200 font-avant_garde_bold" dangerouslySetInnerHTML={{ __html: getHtmlContent(title || "") }} />
                    <br />
                  </div>
                  <div style={{ position: "relative", width: "100%", gridArea: "TEXT" }}>
                    <div className="text-lg text-stone-400 font-avant_garde_medium" dangerouslySetInnerHTML={{ __html: getHtmlContent(body || "") }} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        );
      })}

      {/* Conclusion */}
      {hasContent(story.conclusion) && (
        <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} style={{ background: "#171717" }}>
          <div id="conclusion" className={styles.grid_0_blog_end}>
            <div id={styles.TEXT_HOLDER} style={{ position: "relative", display: "grid", width: "100%", height: "auto", gridArea: "MAIN_AREA" }}>
              <div style={{ position: "relative", width: "100%", gridArea: "TEXT" }}>
                <h1 id={styles._H1} className="text-3xl text-stone-200 font-avant_garde_bold">Conclusion<br /><br /></h1>
                <div className="text-lg text-neutral-400 font-avant_garde_medium" style={{ width: "100%" }} dangerouslySetInnerHTML={{ __html: getHtmlContent(story.conclusion || "") }} />
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
