'use client'

import styles from './services_2.module.css';



import React, { Component } from 'react';
import Image from "next/image";

import Placeholder_1 from './placeholder_1.jpeg';
import Placeholder_2 from './placeholder_2.jpeg';














/*import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"


import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]*/















export default class Services_2 extends Component {

render() {
   
return (

        <>


        <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>

          <div class={styles.grid_0_scroll}>
            <div id={styles.IMAGE_LAYER_1_1}>

              <div class="rounded-xl ... drop-shadow-2xl ... shadow-black" id={styles.P_IMAGE_1}>
                  <div id={styles.IMAGE_POST}>
                    <Image
                      src={Placeholder_1}   
                      alt="Picture of the author"
                      width={500}
                      height={500}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>      
              </div>



              <div class="rounded-xl ... " id={styles.P_IMAGE_2}> 
                <div id={styles.IMAGE_POST}>
                  <Image
                    src={Placeholder_2}   
                    alt="Picture of the author"
                    width={500}
                    height={500}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      }}
                    />
                </div>   
              </div>   

           </div>
          </div>
        </section>







        {/*<section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>
          <div class={styles.grid_0_scroll}>      
            <div id={styles.PORTFOLIO_TITLE}>

              <div id={styles.IMAGE_LAYER_1}>

                <div class="rounded-xl ... drop-shadow-2xl ... shadow-black" id={styles.P_IMAGE_1}>
                  <div id={styles.IMAGE_POST}>
                    <Image
                      src={Placeholder_1}   
                      alt="Picture of the author"
                      width={500}
                      height={500}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  








                </div>
              </div>
              
              {/*<div id={styles.IMAGE_LAYER_2}>  
                <div class="rounded-xl ... drop-shadow-2xl ... shadow-black" id={styles.P_IMAGE_2}> 
                  <div id={styles.IMAGE_POST}>
                    <Image
                      src={Placeholder_2}   
                      alt="Picture of the author"
                      width={500}
                      height={500}
                      style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        }}
                      />
                  </div>   
                </div>                       
              </div>

            </div>          
          </div>
      </section> */}
    </>


      )

  };
};




