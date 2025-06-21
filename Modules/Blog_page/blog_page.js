

// import styles from "../../../../Modules/Bloghome/bloghome.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faSquareXTwitter, faSquareFacebook, faSquareReddit } from '@fortawesome/free-brands-svg-icons' 

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

const Blog_page = (stories) => {
    const params = useParams();
    const slug = params?.slug;
    const [story, setStory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchStory = async () => {
            if (!slug) return;
            try {
                const res = await axios.get(`/api/blog/${slug}`);
                if (res.data?.story) {
                    setStory(res.data.story);
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

        <>

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
                        left: "-100vw"
                    }}>
                        <div
                            style={{
                            position: "absolute",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
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
                                                        top: "200px",
                                                        width: "100%",
                                                        height: "500px",                                        
                                                        }}>
                                                            <div id={styles.NAVIGATION}
                                                                 style={{
                                                                    position: "relative",                                   
                                                                    width: "100%",
                                                                    height: "100%",   
                                                                    maxHeight: "0"                                      
                                                                    }}>  
                                                                    <div className={styles.PARAGRAPH_1}
                                                                            style={{
                                                                            position: "relative",                                   
                                                                            width: "100%",
                                                                            height: "auto",
                                                                            gridArea: "1"                                                                            
                                                                            }}>
                                                                        <p
                                                                            id={styles._H4}
                                                                            className="text-xs ... text-neutral-700 ... font-avant_garde_bold">
                                                                            {parse(story.body1_title || "")}
                                                                            testing some text 1 
                                                                        </p>
                                                                    </div>  

                                                                    <div className={styles.PARAGRAPH_2}
                                                                            style={{
                                                                            position: "relative",                                   
                                                                            width: "100%",
                                                                            height: "auto",
                                                                            gridArea: "2"                                                                            
                                                                            }}>
                                                                        <p
                                                                            id={styles._H4}
                                                                            className="text-xs ... text-neutral-700 ... font-avant_garde_bold">
                                                                            {parse(story.body1_title || "")}
                                                                            testing some text 2
                                                                        </p>
                                                                    </div>   

                                                                    <div className={styles.PARAGRAPH_3}
                                                                            style={{
                                                                            position: "relative",                                   
                                                                            width: "100%",
                                                                            height: "auto",
                                                                            gridArea: "3"                                                                            
                                                                            }}>
                                                                        <p
                                                                            id={styles._H4}
                                                                            className="text-xs ... text-neutral-700 ... font-avant_garde_bold">
                                                                            {parse(story.body1_title || "")}
                                                                            testing some text 3
                                                                        </p>
                                                                    </div>  

                                                                    <div className={styles.PARAGRAPH_4}
                                                                            style={{
                                                                            position: "relative",                                   
                                                                            width: "100%",
                                                                            height: "auto",
                                                                            gridArea: "4"                                                                            
                                                                            }}>
                                                                        <p
                                                                            id={styles._H4}
                                                                            className="text-xs ... text-neutral-700 ... font-avant_garde_bold">
                                                                            {parse(story.body1_title || "")}
                                                                            testing some text 4
                                                                        </p>
                                                                    </div>     

                                                                    <div className={styles.PARAGRAPH_5}
                                                                            style={{
                                                                            position: "relative",                                   
                                                                            width: "100%",
                                                                            height: "auto",
                                                                            gridArea: "5"                                                                            
                                                                            }}>
                                                                        <p
                                                                            id={styles._H4}
                                                                            className="text-xs ... text-neutral-700 ... font-avant_garde_bold">
                                                                            {parse(story.body1_title || "")}
                                                                            testing some text 5
                                                                        </p>
                                                                    </div>   

                                                                    <div className={styles.PARAGRAPH_6}
                                                                            style={{
                                                                            position: "relative",                                   
                                                                            width: "100%",
                                                                            height: "auto",
                                                                            gridArea: "6"                                                                            
                                                                            }}>
                                                                        <p
                                                                            id={styles._H4}
                                                                            className="text-xs ... text-neutral-700 ... font-avant_garde_bold">
                                                                            {parse(story.body1_title || "")}
                                                                            testing some text 6
                                                                        </p>
                                                                    </div>   

                                                                    <div className={styles.PARAGRAPH_7}
                                                                            style={{
                                                                            position: "relative",                                   
                                                                            width: "100%",
                                                                            height: "auto",
                                                                            gridArea: "7"                                                                            
                                                                            }}>
                                                                        <p
                                                                            id={styles._H4}
                                                                            className="text-xs ... text-neutral-700 ... font-avant_garde_bold">
                                                                            {parse(story.body1_title || "")}
                                                                            testing some text 7
                                                                        </p>
                                                                    </div>      

                                                                     <div className={styles.PARAGRAPH_8}
                                                                            style={{
                                                                            position: "relative",                                   
                                                                            width: "100%",
                                                                            height: "auto",
                                                                            gridArea: "8"                                                                            
                                                                            }}>
                                                                        <p
                                                                            id={styles._H4}
                                                                            className="text-xs ... text-neutral-700 ... font-avant_garde_bold">
                                                                            {parse(story.body1_title || "")}
                                                                            testing some text 8
                                                                        </p>
                                                                    </div>    

                                                                     <div className={styles.PARAGRAPH_9}
                                                                            style={{
                                                                            position: "relative",                                   
                                                                            width: "100%",
                                                                            height: "auto",
                                                                            gridArea: "9"                                                                            
                                                                            }}>
                                                                        <p
                                                                            id={styles._H4}
                                                                            className="text-xs ... text-neutral-700 ... font-avant_garde_bold">
                                                                            {parse(story.body1_title || "")}
                                                                            testing some text 9
                                                                        </p>
                                                                    </div>  

                                                                     <div className={styles.PARAGRAPH_10}
                                                                            style={{
                                                                            position: "relative",                                   
                                                                            width: "100%",
                                                                            height: "auto",
                                                                            gridArea: "10"                                                                            
                                                                            }}>
                                                                        <p
                                                                            id={styles._H4}
                                                                            className="text-xs ... text-neutral-700 ... font-avant_garde_bold">
                                                                            {parse(story.body1_title || "")}
                                                                            testing some text 10
                                                                        </p>
                                                                    </div>                        
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
                                                                    height: "700px",
                                                                     }}> 

                                                                     {/*<div id={styles.SUBSCRIBE_HOLDER}                                                                        
                                                                        style={{
                                                                            position: "relative",                                                  
                                                                            width: "100%",
                                                                            height: "auto",
                                                                            gridArea: "SUBSCRIBE"
                                                                            }}>
                                                                     </div>   */}


                                                                     <div id={styles.AFFILIATE}                                     
                                                                            style={{
                                                                            position: "relative",                                                  
                                                                            width: "100%",
                                                                            height: "100%",
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
                                </div>                     
                            </div>
                        </div>

            </div>



            <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder}>
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

                            <div className="bg-stone-100 rounded-full"
                                style={{
                                    gridArea: "AUTHOR",
                                    height: "100%",
                                    width: "100%",
                                    position: "relative",
                                    right: "-15px"
                                }}>
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
                                        {parse(story.Author || "")}
                                        Oz Jason
                                    </h3>    
                                    <br/>
                                    <h3 
                                        id={styles._H3}
                                        className=" text-stone-400 ... font-avant_garde_bold ... text-right ...">
                                        {parse(story.Author || "")}
                                        23rd January 2025
                                    </h3>   

                                                 
                                </div>

                                
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder}>
                <div className={styles.grid_0_blogimageholder}>

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

            <section id={styles.SHADOW_SECTION_BLOG} className={styles.center_holder}>
                <div className={styles.grid_0_tag}>
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
                    left: "-100vw",
                }}>

                <div className={styles.grid_0_blog}>

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
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id={styles._H3_2}>
                                {parse(story.body1_title || "")}
                                consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
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
                            <p className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                {parse(story.body1 || "")}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur.
                            </p>
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

            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_2}>
                <div className={styles.grid_0_blog}>

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
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id={styles._H3_2}>
                                {parse(story.body2_title || "")}
                                consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            </h3>
                            <br />
                        </div>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TEXT",
                            }}>

                            <p
                                className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                {parse(story.body2 || "")}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_3}>
                <div className={styles.grid_0_blog}>
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
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id="_H3_2">
                                {parse(story.body3_title || "")}
                                consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
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
                            <p
                                className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                {parse(story.body3 || "")}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_4}>
                <div className={styles.grid_0_blog}>

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
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id="_H3_2">
                                {parse(story.body4_title || "")}
                                consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            </h3>
                            <br />
                        </div>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TEXT",
                            }}>

                            <p
                                className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                {parse(story.body4 || "")}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_5}>
                <div className={styles.grid_0_blog}>

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
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id="_H3_2">
                                {parse(story.body5_title || "")}
                                consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            </h3>
                            <br />
                        </div>

                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TEXT",
                            }}>

                            <p
                                className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                {parse(story.body5 || "")}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                                fugiat nulla pariatur.
                            </p>
                        </div>

                    </div>

                </div>
            </section>

            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_6}>
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
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id="_H3_2">
                                {parse(story.body6_title || "")}
                                consectetur adipiscing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            </h3>
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <p  
                                className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                {parse(story.body6 || "")}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                                fugiat nulla pariatur. 
                            </p>                  
                        </div>

                    </div>

                </div>
            </section>

            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_7}>
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
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id="_H3_2">
                                {parse(story.body7_title || "")}
                                consectetur adipiscing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            </h3>
                            <br/> 
                        </div>
                    
                        <div  
                            style={{
                                position: "relative",
                                width: "100%",                     
                                gridArea: "TEXT",}}> 

                            <p  
                                className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                {parse(story.body7 || "")}
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                                fugiat nulla pariatur. 
                            </p>                  
                        </div>

                    </div>

                </div>
            </section>

            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_8}>
            <div className={"grid_0_blog"}>

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
                            className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
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

                        <p  
                            className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                            {parse(story.body8 || "")}                        
                        </p>                  
                    </div>

                </div>

            </div>
            </section>
 
            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_9}>
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
                        className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
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

                    <p  
                        className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                        {parse(story.body9 || "")}                    
                    </p>                  
                </div>

            </div>

        </div>
            </section>

            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_10}>
        <div className={styles.grid_0_blog_end}>

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
                        className="text-3xl ... text-stone-700 ... font-avant_garde_bold">
                        Conclusion
                        <br /> <br />
                    </h1>
                    <p  
                        className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                        {parse(story.Conclusion || "")}   
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
                        fugiat nulla pariatur.                
                    </p>                  
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
                                        className="text-3xl ... text-stone-700 ... font-avant_garde_bold"
                                        >
                                            Read Next...
                                    </h1>
                        </div>
                    </div>                    
                </div>                           
            </section>

            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder} class={styles.PARAGRAPH_10}>
                <div className={styles.grid_0_blog_end}>

                    <div id={styles.READ_NEXT_HOLDER}
                        style={{
                                position: "relative",
                                display: "grid",
                                width: "100%",
                                height: "auto",
                                gridArea: "MAIN_AREA",
                               }}>

                        
                    
                                <div class={styles.READ_NEXT_SCROLL}
                                    style={{
                                        position: "relative",
                                        display: "grid",
                                        width: "100%",
                                        height: "auto"}}>
                                            
                                        <div id={styles.READ_SCROLL}>
                                            <div id={styles.READ_HOLDER}>

                                                <div id={styles.READ_1} class={styles.read_container}
                                                    style={{
                                                        position: "relative",
                                                        gridArea: "READ_1"
                                                        }}> 
                                                            <div id={styles.READ_IMAGE}
                                                                style={{
                                                                position: "relative",
                                                                gridArea: "IMAGE"
                                                                }}>
                                                                    <Image
                                                                        className=" rounded-md ... justify-center ..."
                                                                        alt="Story Image"
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

                                                            <div id={styles._H3} class={styles.READ_TEXT} className=" text-stone-700 ... font-avant_garde_bold"
                                                                style={{
                                                                position: "relative",
                                                                gridArea: "TEXT"
                                                                }}>
                                                                    {parse(story.title || "")}
                                                            </div>                               
                                                </div>

                                                <div id={styles.READ_2} class={styles.read_container}
                                                    style={{
                                                        position: "relative",
                                                        gridArea: "READ_2"
                                                        }}>    
                                                            <div id={styles.READ_IMAGE}
                                                                style={{
                                                                position: "relative",
                                                                gridArea: "IMAGE"
                                                                }}>
                                                                <Image
                                                                    className=" rounded-md ... justify-center ..."
                                                                    alt="Story Image"
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

                                                            <div id={styles._H3} class={styles.READ_TEXT}  className=" text-stone-700 ... font-avant_garde_bold"
                                                                style={{
                                                                position: "relative",
                                                                gridArea: "TEXT"
                                                                }}>
                                                                {parse(story.title || "")}                                                                                                                       </div>                               
                                                </div>  

                                                <div id={styles.READ_3} class={styles.read_container}
                                                    style={{
                                                        position: "relative",
                                                        gridArea: "READ_3"
                                                        }}>    
                                                            <div id={styles.READ_IMAGE}
                                                                style={{
                                                                position: "relative",
                                                                gridArea: "IMAGE"
                                                                }}>
                                                                <Image
                                                                    className=" rounded-md ... justify-center ..."
                                                                    alt="Story Image"
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

                                                            <div id={styles._H3} class={styles.READ_TEXT}  className=" text-stone-700 ... font-avant_garde_bold"
                                                                style={{
                                                                position: "relative",
                                                                gridArea: "TEXT"
                                                                }}>
                                                                {parse(story.title || "")}                                                                                                                       </div>                               
                                                </div> 

                                            </div>
                                        </div>
                                        
                                </div>

                    </div>

                </div>
            </section>




        </>


    )
};

export default Blog_page;