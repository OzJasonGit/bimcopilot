'use client'

import styles from './services_2.module.css';



import React, { Component } from 'react';
import Image from "next/image";

import Placeholder_1 from './placeholder_1.jpeg';
import Placeholder_2 from './placeholder_2.jpeg';


import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
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
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} 






export default class Services_2 extends Component {

render() {
   
return (

        <>


        <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>

          <div class={styles.grid_0_scroll}>
            <div id={styles.IMAGE_LAYER_1_1}>
                             
              <div class="rounded-xl ... " id={styles.P_IMAGE_2}> 
                <div id={styles.IMAGE_POST_2}>

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



        <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>

          <div class="rounded-xl ... drop-shadow-2xl ... shadow-black" id={styles.P_IMAGE_1}>
                  <div id={styles.IMAGE_POST}>
                    <div id='cardbox' style={{width:"100%", height:"100%"}}>
                      <Card>
                        <CardHeader>
                          <CardTitle>Bar Chart - Label</CardTitle>
                          <CardDescription>January - June 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={chartConfig}
                          style={{height:"26vh",width:"100%"}}>
                            <BarChart 
                              accessibilityLayer
                              data={chartData}
                              margin={{
                                top: 20,
                              }}
                            >
                              <CartesianGrid vertical={false} />
                              <XAxis 
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                              />
                              <ChartTooltip 
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                              />
                              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8} >
                                <LabelList
                                  position="top"
                                  offset={12}
                                  className="fill-foreground"
                                  fontSize={12}
                                />
                              </Bar>
                            </BarChart>
                          </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                          <div className="flex gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                          </div>
                          <div className="leading-none text-muted-foreground">
                            Showing total visitors for the last 6 months
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                 </div>
            </div>
        
        </section>

    </>


      )

  };
};

























































{/*import styles from './services_2.module.css';



import React, { Component } from 'react';
import Image from "next/image";

import Placeholder_1 from './placeholder_1.jpeg';
import Placeholder_2 from './placeholder_2.jpeg';


import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
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
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} 






export default class Services_2 extends Component {

render() {
   
return (

        <>


        <section id={styles.SHADOW_SECTION_BLOG} class={styles.center_holder}>

          <div class={styles.grid_0_scroll}>
            <div id={styles.IMAGE_LAYER_1_1}>

              <div class="rounded-xl ... drop-shadow-2xl ... shadow-black" id={styles.P_IMAGE_1}>
                  <div id={styles.IMAGE_POST}>
                    <div style={{position: "absolute" }}>
                      <Card>
                        <CardHeader>
                          <CardTitle>Bar Chart - Label</CardTitle>
                          <CardDescription>January - June 2024</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <ChartContainer config={chartConfig}>
                            <BarChart
                              accessibilityLayer
                              data={chartData}
                              margin={{
                                top: 20,
                              }}
                            >
                              <CartesianGrid vertical={false} />
                              <XAxis
                                dataKey="month"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                              />
                              <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                              />
                              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={8}>
                                <LabelList
                                  position="top"
                                  offset={12}
                                  className="fill-foreground"
                                  fontSize={12}
                                />
                              </Bar>
                            </BarChart>
                          </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                          <div className="flex gap-2 font-medium leading-none">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                          </div>
                          <div className="leading-none text-muted-foreground">
                            Showing total visitors for the last 6 months
                          </div>
                        </CardFooter>
                      </Card>
                    </div>
                              
                  </div>      
              </div>



              <div class="rounded-xl ... " id={styles.P_IMAGE_2}> 
                <div id={styles.IMAGE_POST_2}>

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
};*/}










































