'use client'

import styles from './copilot_dashboard.module.css';

import { useRouter } from "next/navigation";

import Menu_White from "../../components/Menu_White/menu_white";
//import Menu_Dashboard from "../../components/Menu_Dashboard/menu_dashboard";//
import Dashboard_Right from "../../components/Dashboard_Right/dashboard_right";

import Chart_8 from './Charts/Chart_8/Chart_8';

import Subscribe_Dashboard from "../../components/Subscribetop/subscribe_dashboard";
import Sides from "../../components/Sides/sides";
import Header from "../../components/Header/Header";
import Header_White from "../../components/Header_White/Header_White";
import Footer from "../../components/Footer/Footer_White";
import Chart_1 from "./Charts/Chart_1/Chart_1";
import Chart_2 from "./Charts/Chart_2/Chart_2";
import Chart_3 from './Charts/Chart_3/Chart_3';
import Chart_4 from './Charts/Chart_4/Chart_4';
import Chart_5 from './Charts/Chart_5/Chart_5';
import Chart_6 from './Charts/Chart_6/Chart_6';
import Chart_7 from './Charts/Chart_7/Chart_7';
import Chart_9 from './Charts/Chart_9/Chart_9';
import Chart_10 from './Charts/Chart_10/Chart_10';

import Services_1 from "../../components/services_1/services_black";
import { treemap } from 'd3';


import MapboxLocation from "./MapboxLocation/mapboxlocation";
import OrientationCompass from "./OrientationCompass/orientationcompass";

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

    const treeMapData = {
        name: "root",
        children: [
          { name: "Category A", value: 100 },
          { name: "Category B", value: 200 },
          {
            name: "Category C",
            children: [
              { name: "Subcategory C1", value: 80 },
              { name: "Subcategory C2", value: 120 },
            ],
          },
        ],
      };
      
    

    return (

        <>
            <Menu_White />
            {/*<Menu_Dashboard/>*/}
            {/*<Dashboard_Right />*/}
            <Header_White />
            {/*<Sides/>*/}

            {/*<Services_1/>*/}
            {/*<Subscribe_Dashboard />*/}

            {/*<section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}> 
                <div class={styles.grid_0_dashboard}>
                    <div id={styles.P_TITLE}>
                        <h2 class="text-4xl ... text-red-600 ... font-avant_garde_bold">
                            Under Construction, Stay Tuned! 
                        </h2>
                    </div>
                </div>
            </section>*/}

            <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
                <div class={styles.grid_0_dashboard}>
                    <div id={styles.DASHBOARD_GRID}>

                        <div id={styles.MENU_GRID}
                             className="rounded-2xl ... border-stone-800 ... border-solid ... border-2 ... shadow-md" >
                        </div>

                        <div id={styles.COST_GRID}>
                            <div className="rounded-2xl ..."
                                 style={{
                                        gridArea: "TOTAL",
                                        position: "relative",                                      
                                        width: "100%",
                                        height: "100%",
                                        background: "#1f1f1f"
                                        }}>

                            </div >

                            <div className="rounded-2xl ..."
                                 style={{
                                        gridArea: "MATERIAL",
                                        position: "relative",                                      
                                        width: "100%",
                                        height: "100%",
                                        background: "#1f1f1f"
                                        }}>
                            </div>

                            <div className="rounded-2xl ..."
                                 style={{
                                        gridArea: "GFA",
                                        position: "relative",                                      
                                        width: "100%",
                                        height: "100%",
                                        background: "#1f1f1f"
                                        }}>

                            </div>
                        </div>

                        <div id={styles.MAP_GRID_CONTAINER}> 

                            <div className="rounded-2xl ..."
                                     style={{
                                        gridArea: "SPECKLE",
                                        position: "relative",                                      
                                        width: "100%",
                                        height: "100%",
                                        }}>

                                    <div id={styles.SPECKLE} class="rounded-xl ... border-stone-800 ... border-solid ... border-2 ..." style={{
                                      
                                        position: "relative",
                                        overflow: "hidden",
                                        height: "100%",
                                        width:"100%",
                                        background: "#f5f5f4"
                                    }}>
                                    <div class="rounded-xl ..." 
                                        style={{
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
                                            src="https://app.speckle.systems/projects/d719234282/models/7eb698fe88#embed=%7B%22isEnabled%22%3Atrue%2C%22isTransparent%22%3Atrue%2C%22hideControls%22%3Atrue%2C%22hideSelectionInfo%22%3Atrue%7D" 
                                            width="100%" 
                                            height="100%"
                                            frameborder="0">
                                        </iframe>
                                    </div>
                                </div>

                            </div>

                            <div id={styles.MAP_GRID}>                    
                                <div 
                                 id={styles.FORCE} 
                                 className="rounded-2xl ... border-stone-800 ... border-solid ... border-2 ... shadow-md" 
                                 style={{
                                        gridArea: "MAP",
                                        position: "relative",
                                        overflow: "hidden",
                                        width: "100%",
                                        height: "100%",
                                        background: "#f5f5f4"
                                        }}>

                                        <div 
                                        style={{                    
                                            position: "relative",                 
                                            width: "100%",
                                            height: "100%",                                                
                                            }}>
                                        {/*<h2 className="text-lg font-bold mb-2">Project Location</h2>*/}
                                        <MapboxLocation lat={25.2048} lng={55.2708} /> {/* Example: Dubai */}
                                        </div>
                                        {/*<div>
                                            <h2 className="text-lg font-bold mb-2">Orientation</h2>
                                            <OrientationCompass azimuth={135} /> {/* Example: facing SE 
                                        </div>*/}
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </section>





            {/*<section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
                <div class={styles.grid_0_dashboard}>
                    <div id={styles.BOUGHT_TOGETHER_GRID}>

                        <div id={styles.PRODUCT_DESCRIPTION}>
                            <div id={styles.P_TITLE}>
                                <h2 id={styles._H3} class="text-4xl ... text-stone-700 ... font-avant_garde_bold">
                                    Shop Here
                                </h2>
                            </div>

                            <div id={styles.P_SUBTITLE}>
                                <h3 id={styles._H3} class="text-lg ... text-stone-700 ... font-avant_garde_bold">
                                    This is the description title
                                    Delta compression using up to 12 threads
                                    Compressing objects: 100% (5/5), done.

                                    <a class="text-stone-700 ... font-avant_garde_bold"
                                    >
                                        Automated systems for Architects, Designers and Manufacturers.
                                    </a>{" "}
                                </h3>
                            </div>

                            <div id={styles.P_DESCRIPTION}>
                                <h3 id={styles._H3} class="text-md ... text-stone-700 ... font-geist_regular">
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
            </section>*/}

            <Footer />


        </>

    );
};

export default Copilot_Dashboard;


















