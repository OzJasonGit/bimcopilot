import React, { Component } from "react";
import { Line } from "react-chartjs-2"; // Import Line from react-chartjs-2
import {
    Chart as ChartJS,
    LineElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
} from "chart.js";

import styles from './Chart_3.module.css';


// Register Chart.js components
ChartJS.register(LineElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement);

export default class Chart_6 extends Component {
    render() {
        const data = {
            labels: ['January', 'February', 'March', 'April'], // X-axis labels
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [10, 20, 30, 40], // Values for each label
                    borderColor: 'rgba(75, 192, 192, 1)', // Line color
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color
                    borderWidth: 2,
                    tension: 0.4, // Smoothness of the curve (0 = sharp, 1 = very smooth)
                    pointRadius: 5, // Radius of points on the line
                    pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point color
                },
                {
                    label: 'Dataset 2',
                    data: [15, 25, 35, 45], // Another line
                    borderColor: 'rgba(255, 99, 132, 1)',
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderWidth: 2,
                    tension: 0.4,
                    pointRadius: 5,
                    pointBackgroundColor: 'rgba(255, 99, 132, 1)',
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
        };

        return (
            <div style={{ width: "100%", height: "100%", padding:"0px" }}>
                {/* Use the Line component */}                
                <Line data={data} options={options} />              
            </div>
        );
    }
}

