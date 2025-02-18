'use client'

import styles from './copilot_dashboard.module.css';

import { useRouter } from "next/navigation";

import Menu from "../../components/Menu/menu";
//import Menu_Dashboard from "../../components/Menu_Dashboard/menu_dashboard";//
import Dashboard_Right from "../../components/Dashboard_Right/dashboard_right";

import Chart_8 from './Charts/Chart_8/Chart_8';

import Subscribe_Dashboard from "../../components/Subscribetop/subscribe_dashboard";
import Sides from "../../components/Sides/sides";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Chart_1 from "./Charts/Chart_1/Chart_1";
import Chart_2 from "./Charts/Chart_2/Chart_2";
import Chart_3 from './Charts/Chart_3/Chart_3';
import Chart_4 from './Charts/Chart_4/Chart_4';
import Chart_5 from './Charts/Chart_5/Chart_5';
import Chart_6 from './Charts/Chart_6/Chart_6';
import Chart_7 from './Charts/Chart_7/Chart_7';
import Chart_9 from './Charts/Chart_9/Chart_9';

import Services_1 from "../../components/services_1/services_black";

// import Link from "next/link";
// import Image from "next/image";


// import { Button } from "@/components/ui/button"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


// import bimcopilot from './Bim-copilot-logo_Horizontal.png';


const Copilot_Dashboard = ({ stories, firstStory }) => {
    //   const storiesSolo_1 = stories.filter((story, i) => i == 3)
    //   const storiesSolo_2 = stories.filter((story, i) => i == 1)
    //   const storiesToMap = stories.filter((story, i) => i != 0);
    //   const router = useRouter();

    const data = [
        { r: 30, group: 1 },
        { r: 20, group: 2 },
        { r: 25, group: 3 },
        { r: 15, group: 4 },
    ];


    return (

        <>
            <Menu />
            {/*<Menu_Dashboard/>*/}
            <Dashboard_Right />
            <Header />
            {/*<Sides/>*/}

            {/*<Services_1/>*/}
            <Subscribe_Dashboard />

            <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
                <div class={styles.grid_0_dashboard}>

                    <div id={styles.DASHBOARD_GRID}>

                        <div id={styles.SPECKLE} class="rounded-xl ... bg-zinc-200 ..." style={{
                            gridArea: "SPECKLE",
                            position: "relative",
                            overflow: "hidden",
                            height: "450px"
                        }}>
                            <div class="rounded-xl ..." style={{
                                position: "relative",
                                overflow: "hidden",
                                height: "100%",
                            }}>
                                <iframe
                                    title='iframe'
                                    loading='lazy'
                                    style={{
                                        position: "relative",
                                        gridArea: "IMAGE",
                                        overflow: "hidden",
                                        height: "110%",
                                    }}
                                    src="https://app.speckle.systems/projects/d719234282/models/7eb698fe88#embed=%7B%22isEnabled%22%3Atrue%2C%22isTransparent%22%3Atrue%2C%22hideControls%22%3Atrue%2C%22hideSelectionInfo%22%3Atrue%7D" width="100%" frameborder="0"></iframe>
                            </div>
                        </div>

                        <div id={styles.MAP} class="rounded-xl ...  bg-zinc-200 ..." style={{
                            gridArea: "MAP",
                            position: "relative",
                            overflow: "hidden",
                            height: "100%"
                        }}>
                            <Chart_8 data={data} />
                        </div>


                        <div id={styles.TITLE} class="rounded-xl ... bg-zinc-200 ..." style={{
                            gridArea: "TITLE",
                            position: "relative",
                            overflow: "hidden",
                            height: "auto"
                        }}>
                            <Chart_9 />
                        </div>


                        <div id={styles.DOUGHNUT} class="rounded-xl ..." style={{
                            gridArea: "DOUGHNUT",
                            position: "relative",
                            overflow: "hidden",
                            height: "250px"
                        }}>

                            <div id={styles.DOUGHNUT_1} class="rounded-xl ... bg-zinc-200 ..." style={{
                                gridArea: "DOUGHNUT_1",
                                position: "relative",
                                overflow: "hidden",
                                height: "100%"
                            }}>
                            </div>

                            <div id={styles.DOUGHNUT_2} class="rounded-xl ... bg-zinc-200 ..." style={{
                                gridArea: "DOUGHNUT_2",
                                position: "relative",
                                overflow: "hidden",
                                height: "100%"
                            }}>
                            </div>



                    
                    </div>

                 
                    <div id={styles.TREE} class="rounded-xl ... bg-zinc-200 ..." style={{
                        gridArea: "TREE",
                        position: "relative",                        
                        overflow: "hidden",  
                        height: "450px"}}>

                             {/*<Chart_4/>*/}
                    </div>

                    <div id={styles.BAR} class="rounded-xl ... bg-zinc-200 ..." style={{
                        gridArea: "BAR",
                        position: "relative",                        
                        overflow: "hidden",  
                        height: "100%"}}>
                    </div>



                        <div id={styles.TREE} class="rounded-xl ... bg-zinc-200 ..." style={{
                            gridArea: "TREE",
                            position: "relative",
                            overflow: "hidden",
                            height: "450px"
                        }}>

                            <Chart_4 />
                        </div>

                        <div id={styles.BAR} class="rounded-xl ... bg-zinc-200 ..." style={{
                            gridArea: "BAR",
                            position: "relative",
                            overflow: "hidden",
                            height: "100%"
                        }}>
                                                        {/* <Chart_8  /> */}

                        </div>


                        <div id={styles.GRID_HOLDER} class="rounded-xl ..." style={{
                            gridArea: "HOLDER",
                            position: "relative",
                            overflow: "hidden",
                            height: "100%"
                        }}>

                            <div id={styles.FORCE} class="rounded-xl ... bg-zinc-200 ..." style={{
                                gridArea: "FORCE",
                                position: "relative",
                                overflow: "hidden",
                                width: "100%",
                                height: "100%"
                            }}>
                            </div>

                            <div id={styles.LINE} class="rounded-xl ... bg-zinc-200 ..." style={{
                                gridArea: "LINE",
                                position: "relative",
                                overflow: "hidden",
                                width: "100%",
                                height: "100%"
                            }}>
                                                            {/* <Chart_8  /> */}

                            </div>

                            <div id={styles.SCATTER} class="rounded-xl ... bg-zinc-200 ..." style={{
                                gridArea: "SCATTER",
                                position: "relative",
                                overflow: "hidden",
                                width: "100%",
                                height: "100%"
                            }}>


                                     {/*<Chart_7/>*/}

                            </div >

                        </div >

                    </div >

                </div >
            </section >





            <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
                <div class={styles.grid_0_dashboard}>
                    <div id={styles.BOUGHT_TOGETHER_GRID}>

                        <div id={styles.PRODUCT_DESCRIPTION}>
                            <div id={styles.P_TITLE}>
                                <h2 id={styles._H3} class="text-4xl ... text-stone-400 ... font-avant_garde_bold">
                                    Shop Here
                                </h2>
                            </div>

                            <div id={styles.P_SUBTITLE}>
                                <h3 id={styles._H3} class="text-lg ... text-stone-200 ... font-avant_garde_bold">
                                    This is the description title
                                    Delta compression using up to 12 threads
                                    Compressing objects: 100% (5/5), done.

                                    <a class="text-stone-200 ... font-avant_garde_bold"
                                    >
                                        Automated systems for Architects, Designers and Manufacturers.
                                    </a>{" "}
                                </h3>
                            </div>

                            <div id={styles.P_DESCRIPTION}>
                                <h3 id={styles._H3} class="text-md ... text-stone-200 ... font-geist_regular">
                                    Delta compression using up to 12 threads
                                    Compressing objects: 100% (5/5), done.
                                    Writing objects: 100% (5/5), 440 bytes | 440.00 KiB/s, done.
                                    Total 5 (delta 4), reused 0 (delta 0), pack-reused 0
                                    remote: Resolving deltas: 100% (4/4), completed with 4 local objects.
                                    Compressing objects: 100% (5/5), done.
                                </h3>
                            </div>

                        </div>

                    </div>
                </div>
            </section>

            <Footer />


        </>

    );
};

export default Copilot_Dashboard;



















