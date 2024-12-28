
import React, { Component } from "react";
import { Radar } from "react-chartjs-2"; // Import Bar from react-chartjs-2
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";

import styles from './Chart_7.module.css';

// Register Chart.js components
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

export default class Chart_3 extends Component {
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
            <div style={{ width: "100%", height: "auto", padding:"0px", display:"grid", justifyItems:"left" }}>           
                <Radar data={data} options={options} style={{ width:"100%"}}/>               
            </div>
        );
    }
}

