"use client";

// import styles from "../../../../Modules/Bloghome/bloghome.module.css";
import styles from "./blog_page.css"
import Link from "next/link";
import Video from "@/Modules/Blog/client/Video/video";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import parse from "html-react-parser";
import SkeletonLoader from "@/components/Loader/loader";

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





            <section id="SHADOW_SECTION_BLOG" className="center_holder">
                <div className="grid_0_subscribe">
                    <div className="sub_head"
                        style={{
                            paddingTop: "80px"
                        }}>


                        <div id="SUBSCRIBE" className={"border-emerald-200"}>

                            <div id="MAIN_TAG">
                                <div
                                    id="_H1"
                                    className=" text-stone-200 ... font-avant_garde_bold">
                                    {parse(story.title || "")}
                                </div>
                            </div>

                            <div id="SUB_TAG">
                                <div
                                    id="_H3"
                                    className="text-left ... text-xl ... text-stone-400 ... font-avant_garde_medium">
                                    {parse(story.subtitle || "")}
                                </div>
                            </div>

                        </div>

                        <div id="AUTHOR_GRID"
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
                        </div>

                        <div id="NUMBER_GRID"
                            style={{
                                gridArea: "NUMBER",
                                height: "100%",
                                width: "100%",
                                display: "grid",
                                position: "relative",
                            }}>


                        </div>

                    </div>
                </div>
            </section>

            <section id="SHADOW_SECTION_BLOG" className="center_holder">
                <div className="grid_0_blogimageholder">

                    <div className="rounded-2xl ..."
                        id="MAIN_IMAGE"
                        style={{
                            display: "block",
                            width: "100%",
                            height: "600px",
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

            <section id="SHADOW_SECTION_BLOG" className="center_holder">
                <div className="grid_0_tag">
                    <div className="sub_head_2">
                        <div id="SUBSCRIBE" className={"border-emerald-200"}>

                            <div id="SUB_ICON">
                            </div>

                            <div id="MAIN_TAG">
                                <h1
                                    id="_H1"
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






            <section id="SHADOW_SECTION_TOP" className="center_holder"
                style={{
                    left: "-100vw",
                }}>

                <div className="grid_0_blog">

                    <div id="FIRST_TEXT_HOLDER"
                        style={{
                            position: "relative",
                            display: "grid",
                            width: "100%",
                            height: "auto",
                            gridArea: "MAIN_AREA",
                            left: "100vw",
                            zIndex: "200000"
                        }}>


                        <div id="PARAGRAPH"
                            style={{
                                position: "relative",
                                width: "100%",
                                gridArea: "TITLE",
                            }}>
                            <br /> <br />
                            <h3
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id="_H3_2">
                                {parse(story.body1_title || "")}
                                consectetur adipiscing elit, sed do eiusmod tempor
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                            </h3>
                            <br />
                        </div>



                        <div className="bg-transparent ... rounded-xl ... justify-center ..."
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "auto",
                                gridArea: "VIDEO",
                            }}>
                            <Video />
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


                        <div id="AFFILIATE_CONTAINER"
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
                        </div>

                    </div>

                </div>

            </section>








            {/*<section id="SHADOW_SECTION_SIDE" className={styles.center_holder}>

        <div className="grid_0_blog">

            <div id="SIDE_TEXT_HOLDER"
                style={{
                        position: "relative",
                        gridArea: "MAIN_AREA",
                        position: "sticky"}}>









                <div id="SIDE_NAV_HOLDER"> 
                    <div id="SIDE_NAV" >

                        <div id="TITLE_1" >
                            <Link href="#PARAGRAPH_1">
                                <p
                                    className="text-xs ... text-neutral-700 ... font-geist_semibold">
                                    {parse(story.body1_title || "")}
                                </p>
                            </Link>
                        </div>
                        <div id="TITLE_2">
                            <Link href="#PARAGRAPH_2">
                                <p
                                    className="text-xs ... text-neutral-700 ... font-geist_semibold">
                                    {parse(story.body2_title || "")}
                                </p>
                            </Link>
                        </div>

                        <div id="TITLE_3">
                            <a>
                                <Link href="#PARAGRAPH_3">
                                    <p
                                        className="text-xs ... text-neutral-700 ... font-geist_semibold">
                                        {parse(story.body3_title || "")}
                                    </p>
                                </Link>
                            </a>
                        </div>

                        <div id="TITLE_4">
                            <Link href="#PARAGRAPH_4">
                                <p
                                    className="text-xs ... text-neutral-700 ... font-geist_semibold">
                                    {parse(story.body4_title || "")}
                                </p>
                            </Link>
                        </div>
                        <div id="TITLE_5">
                            <Link href="#PARAGRAPH_5">
                                <p
                                    className="text-xs ... text-neutral-700 ... font-geist_semibold">
                                    {parse(story.body5_title || "")}
                                </p>
                            </Link>
                        </div>
                        <div id="TITLE_6">
                            <Link href="PARAGRAPH_6">
                                <p
                                    className="text-xs ... text-neutral-700 ... font-geist_semibold">
                                    {parse(story.body6_title || "")}
                                </p>
                            </Link>
                        </div>
                        <div id="TITLE_7">
                            <Link href="PARAGRAPH_7">
                                <p
                                    className="text-xs ... text-neutral-700 ... font-geist_semibold">
                                    {parse(story.body7_title || "")}
                                </p>
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    </section>*/}



















            <section id="SHADOW_SECTION_TITLE" className="center_holder">
                <div className="grid_0_blog">

                    <div id="TEXT_HOLDER"
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


            <section id="SHADOW_SECTION_TITLE" className="center_holder">
                <div className="grid_0_blog">
                    <div id="IMAGE_TEXT_HOLDER"
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
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "350px",
                                gridArea: "IMAGE",
                            }}>
                            <Image
                                className=" rounded-xl ... justify-center ..."
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


            <section id="SHADOW_SECTION_TITLE" className="center_holder">
                <div className="grid_0_blog">

                    <div id="TEXT_HOLDER"
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


            <section id="SHADOW_SECTION_TITLE" className="center_holder">
                <div className="grid_0_blog">

                    <div id="TEXT_HOLDER"
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


            {/*<section id="SHADOW_SECTION_TITLE" className={styles.center_holder}>
        <div className="grid_0_blog">

            <div id="TEXT_HOLDER"
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
    </section>*/}


            {/*<section id="SHADOW_SECTION_TITLE" className={styles.center_holder}>
        <div className="grid_0_blog">

            <div id="TEXT_HOLDER"
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
    </section>*/}


            {/*<section id="SHADOW_SECTION_TITLE" className={styles.center_holder}>
            <div className="grid_0_blog">

                <div id="TEXT_HOLDER"
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
    </section>*/}


            {/*<section id="SHADOW_SECTION_TITLE" className={styles.center_holder}>
        <div className="grid_0_blog">

            <div id="TEXT_HOLDER"
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
    </section>*/}


            {/*<section id="SHADOW_SECTION_TITLE" className={styles.center_holder}>
        <div className="grid_0_blog_end">

            <div id="TEXT_HOLDER"
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
                        id="_H1"
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
    </section>*/}























            {/* 
      {storiesToMap.map((story, index) => {
        return (
          <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder}>

            <div className={styles.grid_0_blog}>
              <div id={styles.MAIN_TEXT_HOLDER}>

                <div id={styles.PARAGRAPH}>
                  <h3
                    className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                    id={styles._H3}>
                    Conclusion
                  </h3>
                  <br />
                  <p className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                    {parse(story.conclusion || "")}                  
                  </p>
                </div>

              </div>
            </div>

          </section>
        )
      })} */}


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




        </>


    )
};

export default Blog_page;