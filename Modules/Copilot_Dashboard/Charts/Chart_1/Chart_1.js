import React, { Component, useState } from "react";
import styles from "./Chart_1.module.css";



import { DoughnutController } from "chart.js";


import { Chart as 
    ChartJS,
    ArcElement,
    Tooltip,
    Legend
 } from "chart.js";


 ChartJS.register(
    ArcElement,
    Tooltip,
    Legend

 );








 export default class Chart_1 extends Component {

    render() {
        return (

            <div style={{ width: "100%", height: "100%" }}>

                <DoughnutController
                        data = {data}
                        options = {options}
                >                                   
                </DoughnutController>

            </div>

        )
    }


 }