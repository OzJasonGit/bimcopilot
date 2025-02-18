"use client"

import ChartInteractive from "@/Modules/Copilot_Dashboard/Charts/Chart_9/Chart_9"
import Chart_8 from "@/Modules/Copilot_Dashboard/Charts/Chart_8/Chart_8"
import Chart_10 from "@/Modules/Copilot_Dashboard/Charts/Chart_10/Chart_10"
export default function test(){

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
      
return(
    // <Chart_8/>
    // <ChartInteractive/>
    <Chart_10 data={treeMapData}/>
)
}