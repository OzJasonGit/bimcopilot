import React, { Component } from "react";
import { Radar } from "react-chartjs-2"; // Import Line from react-chartjs-2
import {
    Chart as ChartJS,
    LineElement,
    Tooltip,
    Legend,
    RadialLinearScale,
    PointElement,
} from "chart.js";

import styles from './Chart_7.module.css';

// Register Chart.js components
ChartJS.register(LineElement, PointElement, Tooltip, Legend, RadialLinearScale, PointElement);

export default class Chart_7 extends Component {
    render() {


        const data = {
            labels: [
                'Eating',
                'Drinking',
                'Sleeping',
                'Designing',
                'Coding',
                'Cycling',
                'Running'
            ],
    
           datasets: [{
                label: 'My First Dataset',
                data: [65, 59, 90, 81, 56, 55, 40],
                fill: true,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)',
                pointBackgroundColor: 'rgb(255, 99, 132)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 99, 132)'
            }, {
                label: 'My Second Dataset',
                data: [28, 48, 40, 19, 96, 27, 100],
                fill: true,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgb(54, 162, 235)',
                pointBackgroundColor: 'rgb(54, 162, 235)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(54, 162, 235)'
            }]


      

        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'left', // Position of the legend
                    labels: {
                        padding: '100px', // Add padding between legend items
                        boxWidth: '150px',}
               
                },
                tooltip: {
                    enabled: true, // Enable tooltips
                },
            },
            scales: {
                x: {
                    beginAtZero: true, // X-axis starts at zero
                    grid: {
                        color: 'rgba(255, 99, 132, 0.2)' // Change X-axis grid color
                        }
                },
                y: {
                    beginAtZero: true, // Y-axis starts at zero
                    grid: {
                        color: 'rgba(255, 99, 132, 0.2)' // Change X-axis grid color
                        }
                },
            },

            layout: {
                    padding: {
                    left: '100px' // Add padding around the chart content to avoid overlap with legend
                }
            }
        };

        return (
            <div style={{ width: "100%", height: "auto", padding:"0px" }}>              
                <Radar data={data} options={options} />              
            </div>
        );
    }
}
