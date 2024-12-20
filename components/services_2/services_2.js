'use client'

import styles from './services_2.module.css';



import React, { Component } from 'react';
import Image from "next/image";

import Placeholder_1 from './placeholder_1.jpeg';
import Placeholder_2 from './placeholder_2.jpeg';


import { TrendingUp } from "lucide-react"
import { PolarGrid, RadialBar, RadialBarChart } from "recharts"
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
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
]
const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-1))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-3))",
  },
  edge: {
    label: "Edge",
    color: "hsl(var(--chart-4))",
  },
  other: {
    label: "Other",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig









export default class Services_2 extends Component {

render() {
   
return (

        <>


        <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>

          <div class={styles.grid_0_scroll}>
            <div id={styles.IMAGE_LAYER_1_1}>

              <div class="rounded-xl ... drop-shadow-2xl ... shadow-black" id={styles.P_IMAGE_1}>
                  <div id={styles.IMAGE_POST}>


                    <Card className="flex flex-col">
                      <CardHeader className="items-center pb-0">
                        <CardTitle>Radial Chart - Grid</CardTitle>
                        <CardDescription>January - June 2024</CardDescription>
                      </CardHeader>
                      <CardContent className="flex-1 pb-0">
                        <ChartContainer
                          config={chartConfig}
                          className="mx-auto aspect-square max-h-[250px]"
                        >
                          <RadialBarChart data={chartData} innerRadius={30} outerRadius={100}>
                            <ChartTooltip
                              cursor={false}
                              content={<ChartTooltipContent hideLabel nameKey="browser" />}
                            />
                            <PolarGrid gridType="circle" />
                            <RadialBar dataKey="visitors" />
                          </RadialBarChart>
                        </ChartContainer>
                      </CardContent>
                      <CardFooter className="flex-col gap-2 text-sm">
                        <div className="flex items-center gap-2 font-medium leading-none">
                          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="leading-none text-muted-foreground">
                          Showing total visitors for the last 6 months
                        </div>
                      </CardFooter>
                    </Card>

                               
                  </div>      
              </div>



              <div class="rounded-xl ... " id={styles.P_IMAGE_2}> 
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
          </div>
        </section>

    </>


      )

  };
};



