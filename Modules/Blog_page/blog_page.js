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












            <section id="SHADOW_SECTION_BLOG" className={styles.center_holder}>
                <div className="grid_0_subscribe">
                    <div className="sub_head">


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
                                gridArea: "SUB"
                                
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
                    <div className="sub_head">
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






















           {/* <section id="SHADOW_SECTION_TITLE" className="center_holder">

                <div className="grid_0_blog">

                    <div id="MAIN_TEXT_HOLDER">

                        <div id="DISCLAIMER_HOLDER">
                            <h3
                                id="_H3"
                                className="text-2xl ... text-stone-700 ... font-avant_garde_bold"
                            >

                            </h3>
                            <p
                                className="text-lg ... text-neutral-700 ... font-avant_garde_bold">
                                {parse(story.disclaimer || "")}
                            </p>
                        </div>


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

            </section> */}



























    <section id="SHADOW_SECTION_TITLE" className="center_holder">

        <div className="grid_0_blog">

            <div id="FIRST_TEXT_HOLDER"
                style={{
                    position: "relative",
                    display: "grid",
                    width: "100%",
                    height: "auto",
                    gridArea: "MAIN_AREA",}}>


                    <div id="PARAGRAPH"
                            style={{
                            position: "relative",
                            width: "100%",                     
                            gridArea: "TITLE",}}>
                        <br/> <br/>
                        <h3
                            className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                            id="_H3_2">
                            {parse(story.body1_title || "")}
                            consectetur adipiscing elit, sed do eiusmod tempor 
                            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                        </h3>
                        <br/> 
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
                        <br/> <br/>
                        <p className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                            {parse(story.body1 || "")}                               
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
                        gridArea: "MAIN_AREA",}}>

                <div
                    style={{
                        position: "relative",
                        width: "100%",                     
                        gridArea: "TITLE",}}>
                    <h3
                        className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                        id="_H3_2">
                        {parse(story.body2_title || "")}
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
                        gridArea: "MAIN_AREA",}}>

                <div
                    style={{
                        position: "relative",
                        width: "100%",                     
                        gridArea: "TITLE",}}>
                    <h3
                        className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                        id="_H3_2">
                        {parse(story.body3_title || "")}
                        consectetur adipiscing elit, sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                    </h3>
                    <br/> 
                </div>

                <div className="bg-transparent ... rounded-xl ... justify-center ..."
                    style={{
                        position: "relative",
                        width: "100%",
                        height: "320px",
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
                    }}/>                    
                </div>          
           
                <div  
                    style={{
                        position: "relative",
                        width: "100%",                     
                        gridArea: "TEXT",}}> 
                    <br/> <br/>
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
                        gridArea: "MAIN_AREA",}}>

                <div
                    style={{
                        position: "relative",
                        width: "100%",                     
                        gridArea: "TITLE",}}>
                    <h3
                        className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                        id="_H3_2">
                        {parse(story.body4_title || "")}
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
                        gridArea: "MAIN_AREA",}}>

                <div
                    style={{
                        position: "relative",
                        width: "100%",                     
                        gridArea: "TITLE",}}>
                    <h3
                        className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                        id="_H3_2">
                        {parse(story.body5_title || "")}
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




























    <section id="SHADOW_SECTION_TITLE" className="center_holder">
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
    </section>

























    <section id="SHADOW_SECTION_TITLE" className="center_holder">
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
    </section>










    <section id="SHADOW_SECTION_TITLE" className="center_holder">
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
    </section>









    <section id="SHADOW_SECTION_TITLE" className="center_holder">
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
    </section>








    <section id="SHADOW_SECTION_TITLE" className="center_holder">
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
                        {parse(story.body10_title || "")}
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
                        {parse(story.bod10 || "")}                  
                    </p>                  
                </div>

            </div>

        </div>
    </section>










 <section id="SHADOW_SECTION_TITLE" className="center_holder">
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
                    </p>                  
                </div>

            </div>

        </div>
    </section>


    
































































































            {/*<section id="SHADOW_SECTION_TITLE" className="center_holder">

                <div className="grid_0_blog">
                    <div id="MAIN_TEXT_HOLDER">

                        <div id="PARAGRAPH">
                            <h3
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id="_H3">
                                {parse(story.body3_title || "")}
                            </h3>
                            <br />
                            <p className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                {parse(story.body3 || "")}
                            </p>
                        </div>

                        <div id="IMAGE_1" className=" rounded-xl ..."
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "400px",
                                gridArea: "IMAGE_2",
                            }}>
                            <Image
                                alt="Picture of the author"
                                key={story._id}
                                width={500}
                                height={500}
                                src={story.image2}
                                style={{
                                    position: "absolute",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }} />
                        </div>
                    </div>
                </div>

            </section>



















            <section id="SHADOW_SECTION_TITLE" className="center_holder">

                <div className="grid_0_blog">
                    <div id="MAIN_TEXT_HOLDER">

                        <div id="PARAGRAPH">
                            <h3
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id="_H3">
                                {parse(story.body4_title || "")}
                            </h3>

                            <p className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                <br /> <br />
                                {parse(story.body4 || "")}
                            </p>
                        </div>

                        <div id="ADVERT_2" className="bg-blue-600 ... rounded-xl ...">
                        </div>

                    </div>
                </div>

            </section>




















            <section id="SHADOW_SECTION_TITLE" className="center_holder" >

                <div className="grid_0_blog">
                    <div id="MAIN_TEXT_HOLDER">

                        <div id="BLOG_HOLDER_2">


                            <div id="PARAGRAPH">
                                <h3
                                    className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                    id="_H3">
                                    {parse(story.body5_title || "")}
                                </h3>
                                <br />
                                <p className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                    {parse(story.body5 || "")}
                                </p>
                            </div>

                        </div>

                    </div>
                </div>

            </section>






            <section id="SHADOW_SECTION_TITLE" className="center_holder">

                <div className="grid_0_blog">
                    <div id="MAIN_TEXT_HOLDER">

                        <div id="PARAGRAPH">
                            <br />
                            <h3
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id="_H3">
                                {parse(story.body6_title || "")}
                            </h3>
                            <br />
                            <p className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                {parse(story.body6 || "")}
                            </p>
                        </div>

                    </div>
                </div>

            </section>















            <section id="SHADOW_SECTION_TITLE" className="center_holder">

                <div className={styles.grid_0_blog}>
                    <div id={styles.MAIN_TEXT_HOLDER}>

                        <div id={styles.PARAGRAPH}>
                            <br />
                            <h3
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id={styles._H3}>
                                {parse(story.body7_title || "")}
                            </h3>
                            <br />
                            <p className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                {parse(story.body7 || "")}
                            </p>
                        </div>

                        <div id={styles.ADVERT_1} className="bg-pink-300 ... rounded-xl ..."
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "300px",
                                gridArea: "IMAGE",
                            }}>
                        </div>

                    </div>
                </div>

            </section>
















            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder}>

                <div className={styles.grid_0_blog}>
                    <div id={styles.MAIN_TEXT_HOLDER}>

                        <div id={styles.PARAGRAPH}>

                            <h3
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id={styles._H3}>
                                {parse(story.body8_title || "")}
                            </h3>
                            <br />
                            <p className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                {parse(story.body8 || "")}
                            </p>

                        </div>

                    </div>
                </div>

            </section>

















            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder}>

                <div className={styles.grid_0_blog}>
                    <div id={styles.MAIN_TEXT_HOLDER}>

                        <div id={styles.PARAGRAPH}>
                            <br />
                            <h3
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id={styles._H3}>
                                {parse(story.body9_title || "")}
                            </h3>
                            <br />
                            <p className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                {parse(story.body9 || "")}
                            </p>
                        </div>

                    </div>
                </div>

            </section>
















            <section id={styles.SHADOW_SECTION_TITLE} className={styles.center_holder}>

                <div className={styles.grid_0_blog}>
                    <div id={styles.MAIN_TEXT_HOLDER}>


                        <div id={styles.PARAGRAPH}>
                            <br />
                            <h3
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id={styles._H3}>
                                {parse(story.body10_title || "")}
                            </h3>
                            <br />
                            <p className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                {parse(story.body10 || "")}
                            </p>
                        </div>

                    </div>
                </div>

            </section>













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




        </>


    )
};

export default Blog_page;