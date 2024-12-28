import React, { Component } from "react";
import { Bubble } from "react-chartjs-2"; // Import Bubble from react-chartjs-2
import { Chart as ChartJS, BubbleController, Tooltip, Legend, PointElement } from "chart.js";

import styles from './Chart_4.module.css';
import { height, padding } from "@mui/system";

// Register Chart.js components
ChartJS.register(BubbleController, Tooltip, Legend, PointElement);

export default class Chart_4 extends Component {
    render() {
        const data = {
            datasets: [
                {
                    label: 'Sample Dataset 1',
                    data: [
                        { x: 5, y: 10, r: 15 },
                        { x: 15, y: 7, r: 10 },
                        { x: 25, y: 15, r: 20 },
                        { x: 35, y: 5, r: 25 },
                    ],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Sample Dataset 2',
                    data: [
                        { x: 10, y: 20, r: 10 },
                        { x: 20, y: 25, r: 15 },
                        { x: 30, y: 10, r: 10 },
                        { x: 40, y: 20, r: 20 },
                    ],
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                    legend: {
                        position: 'left', // Position of legend
                        labels: {
                        paddingright: 40, // Add padding between legend items
                        boxWidth: 70, // Size of the legend box
                        
                        
                    }
                },
                tooltip: {
                    enabled: true, // Enable tooltips
                },
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 99, 132, 0.2)' // Change X-axis grid color
                        }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 99, 132, 0.2)' // Change X-axis grid color
                        }
                },
            },
        };

        return (
            <div style={{ width: "100%", height: "100%", padding:"0px"}}>
                {/* Use the Bubble component */}
                <h3 id={styles._H3}
                    class="text-slate-50 ... font-avant_garde_bold ...">
                    Placeholder
                </h3>
                <br/>
                <div style={{ width: "100%", height: "600px"}}>
                 <Bubble data={data} options={options} style={{ width:"100%", height:"100%"}}/>
                </div>            
                <br/>               
                <h3 id={styles._H3}
                    class="text-slate-50 ... font-avant_garde_bold ...">
                    Placeholder
                </h3>
            </div>
        );
    }
}
