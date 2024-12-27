import React, { Component } from "react";
import { Bar } from "react-chartjs-2"; // Import Bar from react-chartjs-2
import { Chart as ChartJS, BarElement, Tooltip, Legend, CategoryScale, LinearScale } from "chart.js";

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
                    position: 'top', // Position of the legend
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
            <div style={{ width: "100%", height: "450px", padding:"30px", display:"grid", justifyItems:"end" }}>
                {/* Use the Bar component */}
                <h1 class="text-slate-50 ... ">
                    Placeholder
                </h1>
                <br/>
                <br/>
                <Bar data={data} options={options} style={{ width:"100%"}}/>
                <br/>
                <br/>
                <h1 class="text-slate-50 ... ">
                    Placeholder
                </h1>
            </div>
        );
    }
}
