
import React, { Component } from "react";
import { Bar } from "react-chartjs-2"; // Import Bar from react-chartjs-2
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";

import styles from './Chart_5.module.css';

// Register Chart.js components
ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

export default class Chart_3 extends Component {
    render() {
        const data = {
            labels: ['January', 'February', 'March', 'April'], // X-axis labels
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [10, 20, 30, 40], // Values for each label
                    backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar colors
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Dataset 2',
                    data: [15, 25, 35, 45], // Another dataset
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
                        color: 'rgba(245, 245, 244, 0.05)' // Change X-axis grid color
                        }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(245, 245, 244, 0.05)' // Change X-axis grid color
                        }
                },
            },
        };

        return (
            <div style={{ width: "100%", height: "600px", padding:"0px", justifyItems:"right" }}>           
                <Bar data={data} options={options} style={{ width:"100%", height:'100%', position:'relative',}}/>               
            </div>
        );
    }
}



























































