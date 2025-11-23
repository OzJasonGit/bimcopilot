

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

const Blog_page = (stories) => {
    const params = useParams();
    const slug = params?.slug;
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const stripHtml = (html) => {
        if (!html) return "";
        // Remove HTML tags using regex
        return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
    };

    useEffect(() => {
        const fetchStory = async () => {
            if (!slug) return;
            try {
                const res = await axios.get(`/api/blog/${slug}`);
                if (res.data?.story) {
                    setStory(res.data.story);
                    // Debug: Log the story data to see what fields are available
                    console.log("Story data:", res.data.story);
                    console.log("Author field:", res.data.story.author);
                } else {
                    setError("Story data format is invalid");
                }
            } catch (error) {
                console.error("Error fetching story:", error);
                setError("Failed to load story");
            } finally {
                setLoading(false);
            }
        };

        fetchStory();
    }, [slug]);

    if (loading) return <SkeletonLoader />;
    if (error) return <div className="error-message">{error}</div>;
    if (!story) return <div>Story not found</div>;


    const storiesToMap = stories?.data?.filter((story, i) => story._id == params.slug) || [];
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
                            {parse(story.title || "")}
                        </title>

                        <meta
                            name={parse(story.title || "")}
                            content={parse(story.title || "")}
                            key={parse(story.title || "")}
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
                                    height: "320vh",
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
                                                                                        Sustainable, Richer Architects through AI, Analytics and
                                                                                        Automation
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














                                                                     <div id={styles.AFFILIATE}                                     
                                                                            style={{
                                                                            position: "relative",                                                  
                                                                            width: "100%",
                                                                            height: "500px",
                                                                            gridArea: "AFFILIATE"
                                                                            }}>
                                                                                <div class={styles.PARAGRAPH_10}
                                                                                      style={{
                                                                                        position: "relative",                                                  
                                                                                        width: "100%",
                                                                                        height: "100%",
                                                                                        display: "block"
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
                                                                                        }}/>
                                                                                </div>
                                                                     </div>     

                                                                     <div id={styles.PFBD}                                     
                                                                            style={{
                                                                            position: "relative",                                                  
                                                                            width: "100%",
                                                                            height: "400px",
                                                                            gridArea: "PFBD"
                                                                            }}>
                                                                            <div class={styles.PARAGRAPH_10}
                                                                                    style={{
                                                                                    position: "relative",                                                  
                                                                                    width: "100%",
                                                                                    height: "100%",
                                                                                    display: "block"
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
                                                                                    }}/>
                                                                            </div>
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
                                                                        {story.body1_title && (
                                                                            <a href="#body1" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parse(story.body1_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {story.body2_title && (
                                                                            <a href="#body2" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parse(story.body2_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {story.body3_title && (
                                                                            <a href="#body3" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parse(story.body3_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {story.body4_title && (
                                                                            <a href="#body4" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parse(story.body4_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {story.body5_title && (
                                                                            <a href="#body5" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parse(story.body5_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {story.body6_title && (
                                                                            <a href="#body6" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parse(story.body6_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {story.body7_title && (
                                                                            <a href="#body7" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parse(story.body7_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {story.body8_title && (
                                                                            <a href="#body8" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parse(story.body8_title || "")}
                                                                            </a>
                                                                        )}
                                                                        {story.body9_title && (
                                                                            <a href="#body9" style={{ fontSize: "0.75rem", color: "#a3a3a3", textDecoration: "none", display: "block", lineHeight: "1.5", wordBreak: "break-word", paddingBottom: "4px" }}>
                                                                                {parse(story.body9_title || "")}
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
                                    className=" text-stone-200 ... font-avant_garde_bold">
                                    {parse(story.title || "")}
                                </div>
                            </div>

                            <div id={styles.SUB_TAG}>
                                <div
                                     id={styles._H3}
                                    className="text-left ... text-xl ... text-stone-400 ... font-avant_garde_medium">
                                    {parse(story.subtitle || "")}
                                </div>
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
                                        {parse(story.post_number || "")}
                                        001
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
                                        {parse(story.author || "Unknown Author")}
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
                                <p className="text-xl ... text-stone-400 ... font-avant_garde_bold">
                                    {parse(story.Slug || "")} {parse(story.Slug || "")}
                                    <br />
                                    {parse(story.introduction || "")}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

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
                         
                            <h3
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id={styles._H3_2}>
                                {parse(story.body1_title || "")}
                            </h3>
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
                            <div className="text-lg ... text-stone-400 ... font-avant_garde_medium">
                                {parse(story.body1 || "")}
                            </div>
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
                            <h3
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id={styles._H3_2}>
                                {parse(story.body2_title || "")}
                            </h3>
                            <br />
                        </div>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TEXT",
                            }}>

                            <div
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium">
                                {parse(story.body2 || "")}
                            </div>
                        </div>

                    </div>

                </div>
            </section>

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
                            <h3
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2">
                                {parse(story.body3_title || "")}
                            </h3>
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
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium">
                                {parse(story.body3 || "")}
                            </div>
                        </div>

                    </div>
                </div>
            </section>

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
                            <h3
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2">
                                {parse(story.body4_title || "")}
                            </h3>
                            <br />
                        </div>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TEXT",
                            }}>

                            <div
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium">
                                {parse(story.body4 || "")}
                            </div>
                        </div>

                    </div>

                </div>
            </section>

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
                            <h3
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2">
                                {parse(story.body5_title || "")}
                            </h3>
                            <br />
                        </div>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TEXT",
                            }}>

                            <div
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium">
                                {parse(story.body5 || "")}
                            </div>
                        </div>

                    </div>

                </div>
            </section>

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
                            <h3
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2">
                                {parse(story.body6_title || "")}
                            </h3>
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <div  
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium">
                                {parse(story.body6 || "")}
                            </div>                  
                        </div>

                    </div>

                </div>
            </section>

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
                            <h3
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2">
                                {parse(story.body7_title || "")}
                            </h3>
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <div  
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium">
                                {parse(story.body7 || "")}
                            </div>                  
                        </div>

                    </div>

                </div>
            </section>

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
                        <h3
                            className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                            id="_H3_2">
                            {parse(story.body8_title || "")}                         
                        </h3>
                        <br/> 
                    </div>
                
                    <div  
                        style={{
                            position: "relative",
                            width: "100%",                     
                            gridArea: "TEXT",}}> 

                        <div  
                            className="text-lg ... text-stone-400 ... font-avant_garde_medium">
                            {parse(story.body8 || "")}                        
                        </div>                  
                    </div>

                </div>

            </div>
            </section>
 
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
                            <h3
                                className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                id="_H3_2">
                                {parse(story.body9_title || "")}                        
                            </h3>
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <div  
                                className="text-lg ... text-stone-400 ... font-avant_garde_medium">
                                {parse(story.body9 || "")}                    
                            </div>                  
                        </div>

                    </div>

                </div>
            </section>

            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_10}
            style={{
                background: "#171717"
            }}>
            <div class={styles.grid_0_blog_end}>

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
                        style={{ width: "100%" }}>
                        {parse(story.conclusion || "")}                
                    </div>                  
                </div>

            </div>

        </div>
            </section>




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



                        

            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} > 
                <div class={styles.grid_0_blog}>
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
                                    <h1 id={styles._H1}
                                        className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                        >
                                            Read Next...
                                    </h1>
                        </div>
                    </div>                    
                </div>                           
            </section>

            

                

        </div>




        

            




        </>


    )
};

export default Blog_page;