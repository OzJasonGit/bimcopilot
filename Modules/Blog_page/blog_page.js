"use client";

// import styles from "../../../../Modules/Bloghome/bloghome.module.css";
import styles from "./blog_page.css"
import Link from "next/link";
import Video from "@/components/Mainvideo/client/Video/video";
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
                            <div id="SUB_ICON"></div>

                            <div id="MAIN_TAG">
                                <div

                                    id="_H1"
                                    className=" text-stone-200 ... font-avant_garde_bold"
                                >
                                    {parse(story.title || "")}

                                </div>
                            </div>
                            <div id="SUB_TAG">

                                <div
                                    id="_H3"
                                    className="text-left ... text-xl ... text-stone-400 ... font-avant_garde_medium"
                                >
                                    {" "}
                                    {parse(story.subtitle || "")}

                                    . <br /> <br />{" "}

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>






            <section id="SHADOW_SECTION_BLOG" className="center_holder">
                <div className="grid_1_tag">

                    <div className="rounded-2xl ..." id="BLOGIMAGE">
                        <Image
                            alt="Story Image"
                            key={story._id}
                            width={1000}
                            height={1000}
                            src={story.image}
                            style={{
                                display: "block",
                                width: "100%",
                                height: "auto",
                                marginBottom: "20px",
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
                                    className="text-3xl ... text-stone-200 ... font-avant_garde_bold"
                                >
                                    Introduction
                                </h1>
                                <br />
                                <p className="text-xl ... text-stone-400 ... font-avant_garde_bold">
                                    {`${story.introduction_quote} ${story.introduction_quote_author}`}
                                    <br /> <br />
                                    {parse(story.introduction || "")}
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            </section>



            <section id="SHADOW_SECTION_TITLE" className="center_holder">

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

            </section>




















































































            <section id="SHADOW_SECTION_TITLE" className="center_holder">

                <div className="grid_0_blog">

                    <div id="MAIN_TEXT_HOLDER">
                        <div id="PARAGRAPH">
                            <h3
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id="_H3">
                                {parse(story.body1_title || "")}
                            </h3>
                            <br />
                            <p className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                {parse(story.body1 || "")}
                                <br />
                            </p>
                        </div>
                    </div>

                </div>

            </section>
















            <section id="SHADOW_SECTION_TITLE" className="center_holder">

                <div className="grid_0_blog">

                    <div id="MAIN_TEXT_HOLDER">

                        <div className="bg-transparent ... rounded-xl ..."
                            style={{
                                position: "relative",
                                width: "100%",
                                height: "400px",
                                gridArea: "VIDEO",
                            }}>
                            <Video />
                        </div>

                        <div id="PARAGRAPH">
                            <h3
                                className="text-3xl ... text-neutral-700 ... font-avant_garde_bold"
                                id="_H3">
                                {parse(story.body2_title || "")}
                            </h3>
                            <br />
                            <p className="text-lg ... text-neutral-700 ... font-avant_garde_medium">
                                {parse(story.body2 || "")}
                            </p>
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











































































            {/*<Other_blogs/>*/}

            <section id="SHADOW_SECTION_BLOG" className="center_holder">
                <div className="sub_head">
                    <div id="SUBSCRIBE" className="border-emerald-200">
                        <div id="SUB_ICON"></div>
                        <div id="AIN_TAG">
                            <h1 id="_H1" className="text-md text-stone-200 font-geist_semibold">
                                {parse(story.title || "")}
                            </h1>
                            <br />
                            <p className="text-md text-stone-400 font-geist_regular">
                                {parse(story.subtitle || "")}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Main Image Before Introduction */}
                    {/* <div className="w-full flex justify-center mt-6">
                        <Image
                            alt="Blog Main Image"
                            key={story._id}
                            width={100}
                            height={100}
                            src={story.image}
                            className="rounded-md shadow-lg"
                            style={{
                                width: "430px",
                                height: "auto",
                                objectFit: "cover",
                            }}
                        />
                    </div> */}

                {/* Introduction Text */}
                {/* <p className="text-md text-stone-300 font-geist_regular mt-4">
    {parse(story.introduction || "")}
  </p> */}

                {/* Blog Preview Section */}
                <div className="grid_0_tag mt-10">
                    <div className="grid_0_blogimage_foot">
                        <div id="BLOGIMAGE_HOLDER_FOOT">
                            <div id="BLOGIMAGE_FOOT" >
                                
                                <div className="rounded-md overflow-hidden w-[120px] h-[120px]">
                                        <Image
                                            alt="Blog Main Image"
                                            key={story._id}
                                            width={2000}
                                            height={2000}
                                            src={story.image}
                                            className="rounded-md shadow-lg"
                                            style={{
                                                width: "100%",
                                                height: "auto",
                                                objectFit: "cover",
                                            }}
                                        />

                                </div>
                                <div id="BLOG_TEXT_FOOT">
                                    <h2 id="_H2" className="text-stone-200 text-lg font-avant_garde_bold">
                                        {story.title}
                                    </h2>
                                    <h3 id="_H3" className="text-stone-400 font-avant_garde_bold text-sm">
                                        {story.subtitle}
                                    </h3>
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