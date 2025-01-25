'use client'

import styles from './copilot_dashboard.module.css';

import { useRouter } from "next/navigation";

import Menu from "../../components/Menu/menu";



import Subscribe_2 from "../../components/Subscribetop/subscribe_2";
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

   return (

    <>
      <Menu/>
      <Header/>
      {/*<Sides/>*/}

      <Services_1/>
      <Subscribe_2/>

      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_dashboard}>

            <div id={styles.DASHBOARD_GRID}>

                    <div id={styles.SPECKLE} class="rounded-xl ... bg-zinc-200 ..." style={{
                        gridArea: "SPECKLE",
                        position: "relative",                        
                        overflow: "hidden",  
                        height: "450px"}}>
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
                        height: "100%"}}>
                    </div>


                    <div id={styles.TITLE} class="rounded-xl ... bg-zinc-200 ..." style={{
                        gridArea: "TITLE",
                        position: "relative",                        
                        overflow: "hidden",  
                        height: "auto"}}>
                    </div>


                    <div id={styles.DOUGHNUT} class="rounded-xl ... bg-zinc-200 ..." style={{
                        gridArea: "DOUGHNUT",
                        position: "relative",                        
                        overflow: "hidden",  
                        height: "250px"}}>
                    </div>

                 
                    <div id={styles.TREE} class="rounded-xl ... bg-zinc-200 ..." style={{
                        gridArea: "TREE",
                        position: "relative",                        
                        overflow: "hidden",  
                        height: "450px"}}>
                    </div>

                    <div id={styles.BAR} class="rounded-xl ... bg-zinc-200 ..." style={{
                        gridArea: "BAR",
                        position: "relative",                        
                        overflow: "hidden",  
                        height: "100%"}}>
                    </div>


                    <div id={styles.GRID_HOLDER} class="rounded-xl ... bg-zinc-200 ..." style={{
                        gridArea: "HOLDER",
                        position: "relative",                        
                        overflow: "hidden",  
                        height: "100%"}}>
                    </div>

            </div>

        </div>
      </section>
      

      {/*<section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_main_image}>
            <div id={styles.MAIN_IMAGE_GRID_HOLDER}>

                
                <div style={{
                        position: "relative",
                        gridArea: "IMAGE",
                        overflow: "hidden", 
                        paddingRight: "40px",
                        paddingBottom: "40px",
                        paddingTop: "0px" 
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
                




                <div id={styles.CHARTS_CONTAINER} class="" style={{
                     position: "relative",
                     gridArea: "CHARTS",
                     overflow: "hidden", 
                     width: "100%",
                     height: "100%"
                     }}>

                        <div id={styles.CHARTS_1} class="" style={{
                            backgroundColor: "#171717",
                            position: "relative",
                            gridArea: "CHART_1",
                            overflow: "hidden", 
                            width: "100%",
                            height: "100%"
                            }}>
                               <Chart_1/>
                        </div>

                        <div id={styles.CHARTS_2} class="" style={{
                            backgroundColor: "#171717",
                            position: "relative",
                            gridArea: "CHART_2",
                            overflow: "hidden", 
                            width: "100%",
                            height: "100%"
                            }}>
                            <Chart_2/>
                        </div>                   
                </div>











                <div id={styles.CHARTS_3} class="" style={{
                    backgroundColor: "#171717",
                    position: "relative",
                    gridArea: "CHARTS_III",
                    overflow: "hidden", 
                    width: "100%",
                    height: "auto"
                    }}>
                    <div style={{gridArea: "HEADER",
                                    height: "auto",
                                    position: "relative",
                                }}>
                        <h3 id={styles._H3}
                            class="text-slate-50 ... font-avant_garde_bold ...">
                            Header
                        </h3>
                        <br/>
                        <br/>
                    </div>                   
                    <div style={{ gridArea: "CHARTS",
                                    height: "auto",
                                    position: "relative",
                                }}>
                    <Chart_3/>       
                    </div>                                 
                    <div style={{gridArea: "FOOTER",
                                    height: "auto",
                                    position: "relative",
                                }}>
                        <br/>
                        <br/>
                        <h3 id={styles._H3}
                            class="text-slate-50 ... font-avant_garde_bold ...">
                            Footer
                        </h3>
                    </div>


                </div>




































                <div id={styles.PROJECT_TEXT} class="" style={{
                    display: "grid",
                    backgroundColor: "#171717",
                    position: "relative",
                    gridArea: "TEXT",
                    overflow: "hidden", 
                    width: "100%",
                    height: "auto"
                    }}>

                    <div style={{gridArea:"PROJECT_TITLE"}}>
                        <h3 id={styles._H3}                   
                            class="text-slate-50 ... font-avant_garde_bold ..."
                            >Project Title:                                                  
                        </h3>
                        <br/>
                        <h2 class="text-slate-50 ... font-avant_garde_bold ..." id={styles._H2}>
                            The Lion Club
                        </h2>
                    </div>
                    
                    <div style={{gridArea:"PROJECT_LOCATION_TITLE"}}>
                        <h3 id={styles._H3}
                            class="text-slate-50 ... font-avant_garde_bold ..."
                            >Project Location: 
                        </h3>
                        <br/>
                        <h2 class="text-slate-50 ... font-avant_garde_bold ..." id={styles._H2}>
                            140 Pitfield Street, Shoreditch, <br/>
                            London, N1 6JR
                        </h2>
                    </div>

                    <div style={{gridArea:"PROJECT_BUDGET_TITLE"}}>
                        <h3 id={styles._H3}
                            class="text-slate-50 ... font-avant_garde_bold ..."
                            >Budget: 
                        </h3>
                        <br/>
                        <h2 class="text-slate-50 ... font-avant_garde_bold ..." id={styles._H2}>
                            £12,500,000
                        </h2>
                    </div>
                    
                    <div style={{gridArea:"PROJECT_CLIENT_TITLE"}}>
                        <h3 id={styles._H3}
                            class="text-slate-50 ... font-avant_garde_bold ..."
                            >Client: 
                        </h3>
                        <br/>
                        <h2 class="text-slate-50 ... font-avant_garde_bold ..." id={styles._H2}>
                            The Crown Estate 
                        </h2>
                    </div>
                   

                </div>

                

































                <div id={styles.CHARTS_4} class="" style={{
                    backgroundColor: "#171717",
                    position: "relative",
                    gridArea: "CHARTS_VI",                   
                    width: "100%",
                    height: "auto"
                    }}>

                    <div style={{gridArea: "HEADER",
                                    height: "auto",
                                    position: "relative",
                                }}>
                        <h3 id={styles._H3}
                            class="text-slate-50 ... font-avant_garde_bold ...">
                            Header 
                        </h3>
                        <br/>
                        <br/>
                    </div>                   
                    
                    <div style={{ gridArea: "CHARTS",
                                    height: "auto",
                                    position: "relative",
                                }}>
                        <Chart_4/>
                    </div>
                      
                    <div style={{ gridArea: "FOOTER",
                                    height: "auto",
                                    position: "relative",
                                }}>
                        <br/>  
                        <br/>  
                        <h3 id={styles._H3}
                            class="text-slate-50 ... font-avant_garde_bold ...">
                            Footer
                        </h3>
                    </div>
                    
                </div>




















                
            
                <div id={styles.CHARTS_CONTAINER_2}  style={{               
                    position: "relative",
                    gridArea: "CHARTS_V",
                    overflow: "hidden", 
                    width: "100%",
                    height: "auto"
                    }}>



                        <div id={styles.CHARTS_5} class="" style={{
                            backgroundColor: "#171717",
                            position: "relative",
                            gridArea: "CHARTS_5",
                            overflow: "hidden", 
                            width: "100%",
                            height: "auto"
                            }}>

                                <div style={{gridArea: "HEADER",
                                    height: "auto",
                                    position: "relative",
                                    }}>
                                    <h3 id={styles._H3}
                                        class="text-slate-50 ... font-avant_garde_bold ...">
                                        Header
                                    </h3>
                                    <br/>
                                    <br/>
                                </div>
                                
                                <div id={styles.CHARTS_5} class="" style={{
                                    backgroundColor: "#171717",
                                    position: "relative",
                                    gridArea: "CHARTS",
                                    overflow: "hidden", 
                                    width: "100%",
                                    height: "auto",                    
                                    }}>
                                        <Chart_5/>
                                </div> 
                                
                                <div style={{gridArea: "FOOTER",
                                    height: "auto",
                                    position: "relative",
                                    }}>
                                    <br/>
                                    <br/>
                                    <h3 id={styles._H3}
                                        class="text-slate-50 ... font-avant_garde_bold ...">
                                        Footer
                                    </h3>
                                </div>                            
                        </div>





                        <div id={styles.CHARTS_7} class="" style={{
                            backgroundColor: "#171717",
                            position: "relative",
                            gridArea: "CHARTS_7",
                            overflow: "hidden", 
                            width: "100%",
                            height: "auto"
                            }}>

                                <div style={{gridArea: "HEADER",
                                    height: "auto",
                                    position: "relative",
                                    }}>
                                    <h3 id={styles._H3}
                                        class="text-slate-50 ... font-avant_garde_bold ...">
                                        Header
                                    </h3>
                                    <br/>
                                    <br/>
                                </div>
                                
                                <div id={styles.CHARTS_7} class="" style={{
                                    backgroundColor: "#171717",
                                    position: "relative",
                                    gridArea: "CHARTS",
                                    overflow: "hidden", 
                                    width: "100%",
                                    height: "auto",                    
                                    }}>
                                        <Chart_7/>
                                </div> 
                                
                                <div style={{gridArea: "FOOTER",
                                    height: "auto",
                                    position: "relative",
                                    }}>
                                    <br/>
                                    <br/>
                                    <h3 id={styles._H3}
                                        class="text-slate-50 ... font-avant_garde_bold ...">
                                        Footer
                                    </h3>
                                </div>                           
                        </div>

            
                </div>

                                
            </div>
        </div>
      </section> */}


      



      

      
      <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
        <div class={styles.grid_0_dashboard}>
            <div id={styles.BOUGHT_TOGETHER_GRID}> 

                <div id={styles.PRODUCT_DESCRIPTION}>
                    <div id={styles.P_TITLE}>
                        <h2 id={styles._H3} class="text-4xl ... text-stone-400 ... font-avant_garde_bold">
                            Shop Here 
                        </h2>
                    </div>

                    <div  id={styles.P_SUBTITLE}>   
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

                    <div  id={styles.P_DESCRIPTION}>  
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
    
    <Footer/>


    </>

 );
};

export default Copilot_Dashboard;



                    

                    













