import React, { Component } from "react";
import { Bubble } from "react-chartjs-2"; // Import Bubble from react-chartjs-2
import { Chart as ChartJS, BubbleController, Tooltip, Legend, PointElement } from "chart.js";

// Register Chart.js components
ChartJS.register(BubbleController, Tooltip, Legend, PointElement);

export default class Chart_1 extends Component {
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
                    position: 'top', // Position of legend
                },
                tooltip: {
                    enabled: true, // Enable tooltips
                },
            },
            scales: {
                x: {
                    beginAtZero: true,
                },
                y: {
                    beginAtZero: true,
                },
            },
        };

        return (
            <div style={{ width: "100%", height: "100%", padding:"30px"}}>
                {/* Use the Bubble component */}
                <h1>Placeholder</h1>
                <Bubble data={data} options={options} style={{ width:"100%"}}/><br/>
                <h1>Placeholder</h1>

            </div>
        );
    }
}
