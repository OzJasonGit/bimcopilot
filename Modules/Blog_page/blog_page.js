

// import styles from "../../../../Modules/Bloghome/bloghome.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faSquareXTwitter, faSquareFacebook, faSquareReddit  } from '@fortawesome/free-brands-svg-icons' 

import styles from "./blog_page.module.css"
import Link from "next/link";
import Video from "@/Modules/Blog/client/Video/video";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import parse from "html-react-parser";
import SkeletonLoader from "@/components/Loader/loader";
import { display } from '@mui/system';

import Subform from "./Client/subform";
import AuthorImageTest from "@/components/AuthorImageTest";

// Helper function to get HTML content for dangerouslySetInnerHTML
// Quill editor outputs HTML directly, so we return it as-is
// If HTML entities are encoded, we decode them
const getHtmlContent = (content) => {
  if (!content) return "";
  
  const contentStr = String(content);
  
  // If content already has HTML tags like <p> or <h2>, return as-is
  // If content has encoded entities like &lt; or &gt;, decode them
  if (contentStr.includes('&lt;') || contentStr.includes('&gt;') || contentStr.includes('&amp;')) {
    // Decode HTML entities
    if (typeof window !== 'undefined') {
      // Client-side: use DOM API to decode (most reliable)
      const txt = document.createElement("textarea");
      txt.innerHTML = contentStr;
      return txt.value;
    } else {
      // Server-side: decode manually
      return contentStr
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, '/');
    }
  }
  
  // Content already has HTML tags, return as-is
  return contentStr;
};

// Helper function to decode HTML entities and parse HTML content (for cases where we need React elements)
const parseHtml = (content) => {
  if (!content) return "";
  
  const contentStr = String(content);
  
  // Decode HTML entities (handles cases like &lt;p&gt; becoming <p>)
  const decodeHtml = (html) => {
    if (typeof window === 'undefined') {
      // Server-side: use a simple regex-based decoder
      return html
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&#x27;/g, "'")
        .replace(/&#x2F;/g, '/');
    } else {
      // Client-side: use DOM API (handles all entities correctly)
      const txt = document.createElement("textarea");
      txt.innerHTML = html;
      return txt.value;
    }
  };
  
  try {
    const decoded = decodeHtml(contentStr);
    return parse(decoded);
  } catch (error) {
    console.error("Error parsing HTML:", error, "Content:", contentStr);
    try {
      return parse(contentStr);
    } catch (e) {
      return contentStr;
    }
  }
};

// Simple author image function embedded directly in the component
const getAuthorImage = (authorName) => {
  if (!authorName) return 'https://res.cloudinary.com/dbj8h56jj/image/upload/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png';
  
  const cleanAuthorName = authorName.toLowerCase().trim();
  console.log("Looking for author:", cleanAuthorName);
  
  // Direct mapping for Oz Jason
  if (cleanAuthorName.includes('oz') || cleanAuthorName.includes('jason')) {
    console.log("Found match for Oz Jason");
    return 'https://res.cloudinary.com/dbj8h56jj/image/upload/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png';
  }
  
  console.log("No match found, returning default");
  return 'https://res.cloudinary.com/dbj8h56jj/image/upload/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png';
};

// Check if body section has actual content (strips HTML tags)
const hasBodyContent = (title, body) => {
  const strip = (html) => {
    if (!html || typeof html !== "string") return "";
    return String(html).replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
  };
  return !!(strip(title) || strip(body));
};

// Check if single content field has actual content
const hasContent = (html) => hasBodyContent(html, html);

const Blog_page = ({ stories: storiesProp, initialStory, relatedStories = [] }) => {
    const params = useParams();
    const slug = params?.slug;
    const [story, setStory] = useState(initialStory ?? null);
    const [loading, setLoading] = useState(!initialStory); 
    const [error, setError] = useState("");

    const stripHtml = (html) => {
        if (!html) return "";
        // Remove HTML tags using regex
        return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
    };

    useEffect(() => {
        if (initialStory && initialStory.slug === slug) {
            setStory(initialStory);
            setLoading(false);
            return;
        }
        const fetchStory = async () => {
            if (!slug) return;
            try {
                const res = await axios.get(`/api/blog/${slug}`);
                if (res.data?.story) {
                    setStory(res.data.story);
                } else {
                    setError("Story data format is invalid");
                }
            } catch (err) {
                console.error("Error fetching story:", err);
                setError("Failed to load story");
            } finally {
                setLoading(false);
            }
        };

        fetchStory();
    }, [slug, initialStory]);

    if (loading) return <SkeletonLoader />;
    if (error) return <div className="error-message">{error}</div>;
    if (!story) return <div>Story not found</div>;


    const storiesToMap = storiesProp?.data?.filter((s, i) => s._id === story._id || s.slug === story.slug) || [];
    const router = useRouter();
    return (

        < >
        <div id={styles.BACKGROUND}
             style={{
                position: "relative",
                width: "100%",
                height: "auto",
                zIndex:"0",          
                background: "#171717"
             }}>

                
        {storiesToMap?.map((story, index) => {
                return (

                    <Head>
                        <title>
                            {parseHtml(story.title || "")}
                        </title>

                        <meta
                            name={parseHtml(story.title || "")}
                            content={parseHtml(story.title || "")}
                            key={parseHtml(story.title || "")}
                        />
                    </Head>
                )
            })}


            <div 
                id={styles.MAIN_NAV}
                style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        zIndex:"3",
                        left: "-100vw",
                        background: "#171717"
                    }}>
                        <div
                            style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            background: "#171717"
                            }}>
                            <div id={styles.NAV_GRID}>  
                                <div id={styles.GRID_NAV_ADVERT}
                                    style={{
                                    position: "relative",
                                   
                                    gridArea: "MAIN_AREA",
                                    width: "100%",
                                    height: "100vh",
                                    display: "grid",                                 
                                    }}>
                                        <div 
                                            style={{
                                                position: "relative",
                                                gridArea: "NAV",
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",
                                                left:"100vw"}}>  
                                                <div id={styles.NAVIGATION_HOLDER}
                                                    style={{
                                                        position: "sticky",
                                                        top: "0px",
                                                        width: "100%",
                                                        height: "auto",                                        
                                                        }}>
                                                            <div id={styles.NAVIGATION}
                                                                 style={{
                                                                    position: "relative",                                   
                                                                    width: "100%",
                                                                    height: "100%",   
                                                                    maxHeight: "0",                                                                  
                                                                    }}>  
                                                                   
                                                                                                                                                  
                                                            </div>
                                                </div>                                         
                                        </div>






















                                        <div 
                                            style={{
                                                position: "relative",
                                                gridArea: "AFFILIATE",
                                                width: "100%",
                                                height: "100%",
                                                display: "flex",}}>
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        top: "0px",
                                                        width: "100%",
                                                        height: "100%",
                                                        left:"100vw"}}>

                                                            <div
                                                                id={styles.AFFILIATE_HOLDER}
                                                                style={{
                                                                    position: "sticky",
                                                                    top: "200px",
                                                                    width: "100%",
                                                                    height: "auto",
                                                                     }}> 

                                                                     <div id={styles.SUBSCRIBE_HOLDER}                                                                        
                                                                        style={{
                                                                            position: "relative",                                                  
                                                                            width: "100%",
                                                                            height: "auto",
                                                                            gridArea: "SUBSCRIBE"
                                                                            }}>

                                                                                <div id={styles.MAIN_TAG}
                                                                                    style={{
                                                                                        position: "relative",                                                  
                                                                                        width: "100%",
                                                                                        height: "auto",
                                                                                        gridArea: "TAG_MAIN"
                                                                                        }}>
                                                                                    <h1
                                                                                        id={styles._H1}
                                                                                        
                                                                                        class=" text-stone-200 ... font-avant_garde_bold">
                                                                                        Sustainable, Richer Architects through BIM, AI, Analytics and Automation
                                                                                    </h1>
                                                                                </div>
                                                                                <br/>
                                                                                <div id={styles.SUB_TAG}
                                                                                     style={{
                                                                                        position: "relative",                                                  
                                                                                        width: "100%",
                                                                                        height: "auto",
                                                                                        gridArea: "SUB_MAIN"
                                                                                        }}>
                                                                                    <h3
                                                                                        id={styles._H3}
                                                                                        class="text-left ... text-stone-400 ... font-avant_garde_medium"
                                                                                    >
                                                                                        {" "}
                                                                                        <a class="text-stone-200 ... font-avant_garde_bold">
                                                                                        The design revolution is here.
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
                                                                                        <h1 
                                                                                        id={styles._H1} 
                                                                                        class="text-stone-200 ... font-avant_garde_bold">
                                                                                        Join the Waiting List!
                                                                                        </h1>
                                                                                    </h3>
                                                                                </div>
                                                                                <br/>
                                                                                <Subform/>
                                                                     </div>   


                                                            </div>
                                                </div>                                          
                                        </div>


                                        <div 
                                            style={{
                                                position: "relative",
                                                gridArea: "NAV",
                                                width: "105%",
                                                height: "100%",
                                                display: "flex",}}>
                                                <div
                                                    style={{
                                                        position: "relative",
                                                        top: "0px",
                                                        width: "100%",
                                                        height: "100%",
                                                        left:"100vw"}}>

                                                            <div
                                                                id={styles.AFFILIATE_HOLDER}
                                                                style={{
                                                                    position: "sticky",
                                                                    top: "200px",
                                                                    width: "100%",
                                                                    height: "auto",
                                                                     }}> 

                                                                    
                                                                    <div id={styles.NAVIGATION}
                                                                            style={{
                                                                                position: "relative",                                   
                                                                                width: "100%",
                                                                                height: "auto",
                                                                                display: "flex",
                                                                                flexDirection: "column",
                                                                                gap: "8px"                                                                  
                                                                                }}>  
                                                                        {hasBodyContent(story.body1_title, story.body1) && (
                                                                            <a href="#body1" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body1_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body2_title, story.body2) && (
                                                                            <a href="#body2" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body2_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body3_title, story.body3) && (
                                                                            <a href="#body3" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body3_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body4_title, story.body4) && (
                                                                            <a href="#body4" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body4_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body5_title, story.body5) && (
                                                                            <a href="#body5" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body5_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body6_title, story.body6) && (
                                                                            <a href="#body6" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body6_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body7_title, story.body7) && (
                                                                            <a href="#body7" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body7_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body8_title, story.body8) && (
                                                                            <a href="#body8" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body8_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body9_title, story.body9) && (
                                                                            <a href="#body9" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body9_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body10_title, story.body10) && (
                                                                            <a href="#body10" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body10_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body11_title, story.body11) && (
                                                                            <a href="#body11" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body11_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body12_title, story.body12) && (
                                                                            <a href="#body12" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body12_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body13_title, story.body13) && (
                                                                            <a href="#body13" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body13_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body14_title, story.body14) && (
                                                                            <a href="#body14" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body14_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body15_title, story.body15) && (
                                                                            <a href="#body15" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body15_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body16_title, story.body16) && (
                                                                            <a href="#body16" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body16_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body17_title, story.body17) && (
                                                                            <a href="#body17" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body17_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {hasBodyContent(story.body18_title, story.body18) && (
                                                                            <a href="#body18" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parseHtml(story.body18_title || "")}
                                                                            </a>
                                                                        )}                           
                                                                        {hasContent(story.conclusion) && (
                                                                            <a href="#conclusion" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word",paddingTop: "100px", paddingBottom: "10px" }}>
                                                                                {parseHtml(story.conclusion || "")}
                                                                            </a>
                                                                        )}
                                                                    </div>

                                                                                                     
                                                            </div>
                                                </div>                                          
                                        </div>





























                                </div>                     
                            </div>
                        </div>

            </div>


            {/*Main Blog Hero*/}
            <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_subscribe}>
                    <div className={styles.sub_head}
                        style={{
                            
                        }}>


                        <div id={styles.SUBSCRIBE} className={"border-emerald-200"}>

                            <div id={styles.MAIN_TAG}>
                                <div
                                    id={styles._H1}
                                    className=" text-stone-200 ... font-avant_garde_bold"
                                    dangerouslySetInnerHTML={{ __html: getHtmlContent(story.title || "") }}
                                ></div>
                            </div>

                            <div id={styles.SUB_TAG}>
                                <div
                                     id={styles._H3}
                                    className="text-left ... text-xl ... text-stone-400 ... font-avant_garde_medium"
                                    dangerouslySetInnerHTML={{ __html: getHtmlContent(story.subtitle || "") }}
                                ></div>
                            </div>

                        </div>

                        <div id={styles.AUTHOR_GRID}
                            style={{
                                display: "grid",
                                position: "relative",
                            }}>

                            <div className="bg-stone-100 rounded-full overflow-hidden"
                                id={styles.AVATAR_IMAGE}
                                style={{
                                    gridArea: "AUTHOR",
                                    height: "110px",
                                    width: "110px",
                                    position: "relative",
                              
                                }}>
                                {/* Test component to verify image loading */}
                                <AuthorImageTest authorName={story.author} />
                                
                                {/* Author Image Display */}
                                <Image
                                    src={getAuthorImage(story.author)}
                                    alt={`${story.author || 'Author'} - Author`}
                                    width={110}
                                    height={110}
                                    className="w-full h-full object-cover"
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover"
                                    }}
                                    onLoad={() => console.log("✅ Author image loaded successfully for:", story.author)}
                                    onError={(e) => {
                                        console.error("❌ Author image failed to load for:", story.author, e);
                                        // Fallback to a default image if the main one fails
                                        e.target.src = 'https://res.cloudinary.com/dbj8h56jj/image/upload/v1753899322/Authors/Oz%20Jason/Oz_Jason_Trimmed_ftxf1x.png';
                                    }}
                                />
                                {!story.author && (
                                    <div style={{ 
                                        width: "100%", 
                                        height: "100%", 
                                        display: "flex", 
                                        alignItems: "center", 
                                        justifyContent: "center",
                                        color: "#666",
                                        fontSize: "12px"
                                    }}>
                                        No Author
                                    </div>
                                )}
                                {story.author && !getAuthorImage(story.author) && (
                                    <div style={{ 
                                        width: "100%", 
                                        height: "100%", 
                                        display: "flex", 
                                        alignItems: "center", 
                                        justifyContent: "center",
                                        color: "#666",
                                        fontSize: "12px"
                                    }}>
                                        No Image
                                    </div>
                                )}
                            </div>

                            <div id={styles.NUMBER_GRID}
                                style={{
                                    gridArea: "NUMBER",
                                    height: "100%",
                                    width: "100%",
                                    display: "grid",
                                    position: "relative",
                                }}>

                                <div id={styles.NUMBER} 
                                        style={{
                                            gridArea: "NUMBER",
                                            height: "100%",
                                            width: "100%",
                                            position: "relative",
                                        }}>
                                    <h3
                                        className="text-6xl ... text-stone-200 ... font-avant_garde_bold"
                                         style={{
                                         marginBottom:"0px",                 
                                        }}>
                                        {parseHtml(story.post_number || "")}
                                        
                                    </h3>                 
                                </div>   
                                <br/>
                                <div id={styles.SHARE}
                                     style={{
                                        gridArea: "SHARE",
                                        height: "AUTHOR",
                                        width: "100%",
                                        position: "relative",
                                    }}>
                                        <div id={styles.SHARE_LINK}
                                             style={{                                              
                                                gridArea: "SHARE",
                                                height: "auto",
                                                width: "100%",
                                                position: "relative",
                                             }}>  
                                             <div className=""
                                                    style={{                                                                                              
                                                        height: "100%",
                                                        width: "100%",
                                                        position: "relative",
                                                        paddingTop:"10px"
                                                     }}>
                                                <h3 
                                                    id={styles._H3}
                                                    className=" text-stone-400 ... font-avant_garde_bold ... inline-block align-middle">                                               
                                                    Share -
                                                </h3>
                                             </div>
                                                                                      
                                        </div>

                                        <div id={styles.LINKEDIN_LINK}
                                             style={{                                              
                                                gridArea: "LINKEDIN",
                                                height: "100%",
                                                width: "100%",
                                                position: "relative",
                                                padding:"6px"
                                             }}> 
                                             <Link class="" id="ANCHOR_1" href="/">                                            
                                                <FontAwesomeIcon class={styles.linkedin} id={styles.CENTER} icon={faLinkedin} size="2xs" />                                       
                                             </Link>    

                                        </div>

                                        <div id={styles.TWITTER_LINK}
                                             style={{                                              
                                                gridArea: "TWITTER",
                                                height: "100%",
                                                width: "100%",
                                                position: "relative",
                                                padding:"6px"
                                             }}>   
                                             <Link class="" id={styles.ANCHOR_2} href="/">                                            
                                                <FontAwesomeIcon class={styles.twitter} id={styles.CENTER} icon={faSquareXTwitter} size="2xs" />                                       
                                             </Link>                                        
                                        </div>

                                        <div id={styles.FACEBOOK_LINK}
                                             style={{                                              
                                                gridArea: "FACEBOOK",
                                                height: "100%",
                                                width: "100%",
                                                position: "relative",
                                                padding:"6px"
                                             }}>    
                                             <Link class="" id={styles.ANCHOR_3} href="/">                                            
                                                <FontAwesomeIcon class={styles.facebook}  id={styles.CENTER} icon={faSquareFacebook} size="2xs" />                                       
                                             </Link>                                       
                                        </div>

                                        <div id={styles.REDDIT_LINK}
                                             style={{                                              
                                                gridArea: "REDDIT",
                                                height: "100%",
                                                width: "100%",
                                                position: "relative",
                                                padding:"6px"
                                             }}>     
                                             <Link class="" id={styles.ANCHOR_4} href="/">                                            
                                                <FontAwesomeIcon class={styles.reddit}  id={styles.CENTER} icon={faSquareReddit} size="2xs" />                                       
                                             </Link>                                      
                                        </div>

                                </div>                            
                            </div>


                            <div id={styles.NAME}
                                 style={{
                                    gridArea: "NAME",
                                    height: "auto",
                                    width: "100%",
                                    left: "5px",
                                    position: "relative",
                                }}>

                                <div>
                                    <h3 
                                        id={styles._H3}
                                        className=" text-stone-400 ... font-avant_garde_bold ... text-right ...">
                                        {parseHtml(story.author || "Unknown Author")}
                                    </h3>    
                 
                                    <h3 
                                        id={styles._H3}
                                        className=" text-stone-400 ... font-avant_garde_bold ... text-right ...">
                                        {story.publishDate ? new Date(story.publishDate).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric'
                                        }) : "23rd January 2025"}
                                    </h3>   

                                                 
                                </div>

                                
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_blogimageholder}>

                    <div className="rounded-2xl ..."
                        id={styles.MAIN_IMAGE}
                        style={{
                            display: "block",
                            width: "100%",
                            gridArea: "SUB",
                            position: "relative"
                        }}>
                        <Image
                            alt="Story Image"
                            key={story._id}
                            width={500}
                            height={500}
                            src={story.image}
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
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

            {hasContent(story.introduction) && (
            <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_tag}>
                    <div className={styles.sub_head_2}>
                        <div id={styles.SUBSCRIBE} className={"border-emerald-200"}>

                            <div id={styles.SUB_ICON}>
                            </div>

                            <div id={styles.MAIN_TAG}>
                                <h1
                                    id={styles._H1}
                                    className="text-3xl ... text-stone-200 ... font-avant_garde_bold">
                                    Introduction
                                    <br /> <br />
                                </h1>
                                <p 
                                    id={styles._H3_2}
                                    className=" text-stone-400 ... font-avant_garde_bold"
                                    dangerouslySetInnerHTML={{ __html: getHtmlContent(story.introduction || "") }}
                                />
                            </div>

                        </div>
                    </div>
                </div>
            </section>
            )}

            {hasBodyContent(story.body1_title, story.body1) && (
            <div id="body1" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TOP} className={styles.center_holder} class={styles.PARAGRAPH_1}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.FIRST_TEXT_HOLDER}
                        style={{
                            position: "relative",
                            display: "grid",
                            width: "100%",
                            height: "auto",
                            gridArea: "MAIN_AREA",
                            left: "100vw",
                            zIndex: "200000"
                        }}>


                        <div id={styles.PARAGRAPH}
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TITLE",
                            }}>
                         
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body1_title || "") }}
                            />
                            <br />
                        </div>



                        <div className="bg-transparent ... rounded-md ... justify-center ..."
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "auto",
                                gridArea: "VIDEO",
                            }}>
                            <Video id={styles.VIDEO_HEIGHT} />
                        </div>



                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "auto",
                                gridArea: "TEXT",
                            }}>
                            <br /> <br />
                            <div 
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body1 || "") }}
                            />
                        </div>


                        {/*<div id="AFFILIATE_CONTAINER"
                            style={{
                                position: "relative",
                                gridArea: "AFFILIATE",
                                width: "100%",
                                height: "100%",
                                paddingLeft: "30px"
                            }}>
                            <div id="AFFILIATE"
                                class="rounded-2xl ... bg-stone-700 ..."
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}>
                            </div>
                        </div>*/}

                    </div>

                </div>

            </section>
            </div>
            )}

            {hasBodyContent(story.body2_title, story.body2) && (
            <div id="body2" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_2}
            style={{
                background: "#171717"
            }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.TEXT_HOLDER}
                        style={{
                            position: "relative",
                            display: "grid",
                            width: "100%",
                            height: "auto",
                            gridArea: "MAIN_AREA",
                        }}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TITLE",
                            }}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body2_title || "") }}
                            />
                            <br />
                        </div>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TEXT",
                            }}>

                            <div
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body2 || "") }}
                            />
                        </div>

                    </div>

                </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body3_title, story.body3) && (
            <div id="body3" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_3}
            style={{
                background: "#171717"
            }}>
                <div class={styles.grid_0_blog}>
                    <div id={styles.IMAGE_TEXT_HOLDER}
                        style={{
                            position: "relative",
                            display: "grid",
                            width: "100%",
                            height: "auto",
                            gridArea: "MAIN_AREA",
                        }}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TITLE",
                            }}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body3_title || "") }}
                            />
                            <br />
                        </div>

                        <div className="bg-transparent ... rounded-xl ... justify-center ..." 
                             id={styles.SUB_IMAGE_HEIGHT}
                             style={{
                                position: "relative",
                                width: "100%",
                              
                                gridArea: "IMAGE",
                             }}>
                            <Image
                                className=" rounded-md ... justify-center ..."
                                alt="Story Image"
                                key={story._id}
                                width={500}
                                height={500}
                                src={story.image}
                                loading="lazy"
                                placeholder="blur"
                                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }} />
                        </div>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TEXT",
                            }}>
                            <br /> <br />
                            <div
                                id={styles._H3_2}
                                className="text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body3 || "") }}
                            />
                        </div>

                    </div>
                </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body4_title, story.body4) && (
            <div id="body4" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_4}
            style={{
                background: "#171717"
            }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.TEXT_HOLDER}
                        style={{
                            position: "relative",
                            display: "grid",
                            width: "100%",
                            height: "auto",
                            gridArea: "MAIN_AREA",
                        }}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TITLE",
                            }}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body4_title || "") }}
                            />
                            <br />
                        </div>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TEXT",
                            }}>

                            <div
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body4 || "") }}
                            />
                        </div>

                    </div>

                </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body5_title, story.body5) && (
            <div id="body5" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_5}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.TEXT_HOLDER}
                        style={{
                            position: "relative",
                            display: "grid",
                            width: "100%",
                            height: "auto",
                            gridArea: "MAIN_AREA",
                        }}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TITLE",
                            }}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body5_title || "") }}
                            />
                            <br />
                        </div>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TEXT",
                            }}>

                            <div
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body5 || "") }}
                            />
                        </div>

                    </div>

                </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body6_title, story.body6) && (
            <div id="body6" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_6}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.TEXT_HOLDER}
                        style={{
                                position: "relative",
                                display: "grid",
                                width: "100%",
                                height: "auto",
                                gridArea: "MAIN_AREA",}}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TITLE",}}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body6_title || "") }}
                            />
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <div  
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body6 || "") }}
                            />                  
                        </div>

                    </div>

                </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body7_title, story.body7) && (
            <div id="body7" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_7}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.TEXT_HOLDER}
                        style={{
                                position: "relative",
                                display: "grid",
                                width: "100%",
                                height: "auto",
                                gridArea: "MAIN_AREA",}}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TITLE",}}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body7_title || "") }}
                            />
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <div  
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body7 || "") }}
                            />                  
                        </div>

                    </div>

                </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body8_title, story.body8) && (
            <div id="body8" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_8}
            style={{
                background: "#171717"
            }}>
            <div className={styles.grid_0_blog}>

                <div id={styles.TEXT_HOLDER}
                    style={{
                            position: "relative",
                            display: "grid",
                            width: "100%",
                            height: "auto",
                            gridArea: "MAIN_AREA",}}>

                    <div
                        style={{
                            position: "relative",
                            width: "100%",                     
                            gridArea: "TITLE",}}>
                        <div
                            className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                            id="_H3_2"
                            dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body8_title || "") }}
                        />
                        <br/> 
                    </div>
                
                    <div  
                        style={{
                            position: "relative",
                            width: "100%",                     
                            gridArea: "TEXT",}}> 

                        <div  
                            className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                            dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body8 || "") }}
                        />                  
                    </div>

                </div>

            </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body9_title, story.body9) && (
            <div id="body9" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_9}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.TEXT_HOLDER}
                        style={{
                                position: "relative",
                                display: "grid",
                                width: "100%",
                                height: "auto",
                                gridArea: "MAIN_AREA",}}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TITLE",}}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body9_title || "") }}
                            />
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <div  
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body9 || "") }}
                            />                  
                        </div>

                    </div>

                </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body10_title, story.body10) && (
            <div id="body10" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_10}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.TEXT_HOLDER}
                        style={{
                                position: "relative",
                                display: "grid",
                                width: "100%",
                                height: "auto",
                                gridArea: "MAIN_AREA",}}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TITLE",}}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body10_title || "") }}
                            />
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <div  
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body10 || "") }}
                            />                  
                        </div>

                    </div>

                </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body11_title, story.body11) && (
            <div id="body11" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_11}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.TEXT_HOLDER}
                        style={{
                                position: "relative",
                                display: "grid",
                                width: "100%",
                                height: "auto",
                                gridArea: "MAIN_AREA",}}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TITLE",}}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body11_title || "") }}
                            />
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <div  
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body11 || "") }}
                            />                  
                        </div>

                    </div>

                </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body12_title, story.body12) && (
            <div id="body12" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_12}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.TEXT_HOLDER}
                        style={{
                                position: "relative",
                                display: "grid",
                                width: "100%",
                                height: "auto",
                                gridArea: "MAIN_AREA",}}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TITLE",}}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body12_title || "") }}
                            />
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <div  
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body12 || "") }}
                            />                  
                        </div>

                    </div>

                </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body13_title, story.body13) && (
            <div id="body13" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_13}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.TEXT_HOLDER}
                        style={{
                                position: "relative",
                                display: "grid",
                                width: "100%",
                                height: "auto",
                                gridArea: "MAIN_AREA",}}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TITLE",}}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body13_title || "") }}
                            />
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <div  
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body13 || "") }}
                            />                  
                        </div>

                    </div>

                </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body14_title, story.body14) && (
            <div id="body14" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_14}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.TEXT_HOLDER}
                        style={{
                                position: "relative",
                                display: "grid",
                                width: "100%",
                                height: "auto",
                                gridArea: "MAIN_AREA",}}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TITLE",}}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body14_title || "") }}
                            />
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <div  
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body14 || "") }}
                            />                  
                        </div>

                    </div>

                </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body15_title, story.body15) && (
            <div id="body15" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_15}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.TEXT_HOLDER}
                        style={{
                                position: "relative",
                                display: "grid",
                                width: "100%",
                                height: "auto",
                                gridArea: "MAIN_AREA",}}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TITLE",}}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body15_title || "") }}
                            />
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <div  
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body15 || "") }}
                            />                  
                        </div>

                    </div>

                </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body16_title, story.body16) && (
            <div id="body16" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_16}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.TEXT_HOLDER}
                        style={{
                                position: "relative",
                                display: "grid",
                                width: "100%",
                                height: "auto",
                                gridArea: "MAIN_AREA",}}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TITLE",}}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body16_title || "") }}
                            />
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <div  
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body16 || "") }}
                            />                  
                        </div>

                    </div>

                </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body17_title, story.body17) && (
            <div id="body17" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_17}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.TEXT_HOLDER}
                        style={{
                                position: "relative",
                                display: "grid",
                                width: "100%",
                                height: "auto",
                                gridArea: "MAIN_AREA",}}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TITLE",}}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body17_title || "") }}
                            />
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <div  
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body17 || "") }}
                            />                  
                        </div>

                    </div>

                </div>
            </section>
            </div>
            )}

            {hasBodyContent(story.body18_title, story.body18) && (
            <div id="body18" style={{ scrollMarginTop: "1.5rem" }}>
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_18}
                style={{
                    background: "#171717"
                }}>
                <div class={styles.grid_0_blog}>

                    <div id={styles.TEXT_HOLDER}
                        style={{
                                position: "relative",
                                display: "grid",
                                width: "100%",
                                height: "auto",
                                gridArea: "MAIN_AREA",}}>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TITLE",}}>
                            <div
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body18_title || "") }}
                            />
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <div  
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium"
                                dangerouslySetInnerHTML={{ __html: getHtmlContent(story.body18 || "") }}
                            />                  
                        </div>

                    </div>

                </div>
            </section>
            </div>
            )}




            {hasContent(story.conclusion) && (
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.CONCLUSION}
            style={{
                background: "#171717"
            }}>
            <div id="conclusion" class={styles.grid_0_blog_end}>

            <div id={styles.TEXT_HOLDER}
                style={{
                        position: "relative",
                        display: "grid",
                        width: "100%",
                        height: "auto",
                        gridArea: "MAIN_AREA",}}>

                
            
                <div  
                    style={{
                        position: "relative",
                        width: "100%",                     
                        gridArea: "TEXT",}}> 

                    <h1
                        id={styles._H1}
                        className="text-3xl ... text-stone-200 ... font-avant_garde_bold">
                        Conclusion
                        <br /> <br />
                    </h1>
                    <div  
                        className="text-lg ... text-neutral-400 ... font-avant_garde_medium"
                        style={{ width: "100%" }}
                        dangerouslySetInnerHTML={{ __html: getHtmlContent(story.conclusion || "") }}
                    />                  
                </div>

            </div>

        </div>
            </section>
            )}




            {/*<div id="DISCLAIMER_HOLDER">
                <h3
                    id="_H3"
                    className="text-2xl ... text-stone-700 ... font-avant_garde_bold">
                </h3>
                <p
                    className="text-lg ... text-neutral-700 ... font-avant_garde_bold">
                    {parse(story.disclaimer || "")}
                </p>
            </div>*/}

            {Array.isArray(story.faq) && story.faq.length > 0 && (
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} style={{ background: "#171717" }} aria-labelledby="faq-heading">
                <div class={styles.grid_0_blog}>
                    <div id={styles.TEXT_HOLDER} style={{ position: "relative", display: "grid", width: "100%", height: "auto", gridArea: "MAIN_AREA" }}>
                        <h2 id="faq-heading" className={`${styles._H1} text-3xl text-stone-200 font-avant_garde_bold`} style={{ marginBottom: "1rem" }}>Frequently Asked Questions</h2>
                        <dl style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            {story.faq.map((item, idx) => (
                                <div key={idx} style={{ paddingBottom: "0.75rem", borderBottom: "1px solid rgb(64 64 64)" }}>
                                    <dt className="text-lg text-stone-200 font-avant_garde_bold" style={{ marginBottom: "0.25rem" }}>
                                        {typeof (item.question || item.q) === "string" ? (item.question || item.q).replace(/<[^>]*>/g, "").trim() : (item.question || item.q)}
                                    </dt>
                                    <dd className="text-base text-stone-400 font-avant_garde_medium" dangerouslySetInnerHTML={{ __html: getHtmlContent(item.answer || item.a || "") }} />
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </section>
            )}



                        

            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} > 
                <div class={styles.grid_0_read_next}>
                    <div class={styles.READ_NEXT}
                        style={{
                        position: "relative",
                        display: "grid",
                        width: "100%",
                        height: "auto",
                        gridArea: "MAIN_AREA"}}>
                        <div id={styles.READ_NEXT_TITLE}
                            style={{
                                position: "relative",
                                gridArea: "READ_1"
                                }}>
                                    <h2 id={styles._H1}
                                        className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                        >
                                            Read Next...
                                    </h2>
                        </div>
                        {Array.isArray(relatedStories) && relatedStories.length > 0 && (
                            <nav aria-label="Related posts" style={{ gridArea: "READ_1", marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                                {relatedStories.map((related) => (
                                    <Link
                                        key={related.slug || related._id}
                                        href={`/blog/${related.slug}`}
                                        className="text-lg text-stone-300 hover:text-emerald-400 font-avant_garde_medium transition-colors"
                                        style={{ textDecoration: "none" }}
                                    >
                                        {typeof related.title === "string" ? related.title.replace(/<[^>]*>/g, "").trim() : related.title}
                                    </Link>
                                ))}
                            </nav>
                        )}
                    </div>                    
                </div>                           
            </section>

            

                

        </div>




        

            




        </>


    )
};

export default Blog_page;