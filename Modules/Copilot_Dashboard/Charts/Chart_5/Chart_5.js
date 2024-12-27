import React, { Component } from "react";
import { PolarArea } from "react-chartjs-2"; // Import PolarArea from react-chartjs-2

import styles from './Chart_5.module.css';

import {
    Chart as ChartJS,
    RadialLinearScale,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(RadialLinearScale, Tooltip, Legend, ArcElement);

export default class Chart_5 extends Component {
    render() {
        const data = {
            labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'], // Categories for each sector
            datasets: [
                {
                    label: 'Dataset 1',
                    data: [15, 25, 35, 45], // Values for each category
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.6)',
                        'rgba(54, 162, 235, 0.6)',
                        'rgba(255, 206, 86, 0.6)',
                        'rgba(75, 192, 192, 0.6)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top', // Position of the legend
                },
                tooltip: {
                    enabled: true, // Enable tooltips
                },
            },
        };

        return (
            <div style={{ width: "100%", height: "100%",padding:"30px"}}>
                {/* Use the PolarArea component */}
                <h3 id={styles._H3}
                    class="text-slate-50 ... ">
                    Placeholder
                </h3>
                <br/>
                <br/>
                <PolarArea data={data} options={options} />
                <br/>
                <br/>
                <h3 id={styles._H3}
                    class="text-slate-50 ... ">
                    Placeholder
                </h3>

            </div>
        );
    }
}
