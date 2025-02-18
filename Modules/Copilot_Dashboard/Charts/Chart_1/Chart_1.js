import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2"; // Import Doughnut from react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";


// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);






 export default class Chart_1 extends Component {

    render() {
        const data = {
            labels: ['Yes', 'No', 'Maybe', 'Other'], // Adjust labels to match dataset
            datasets: [
                {
                    label: 'Poll',
                    data: [3, 6, 12, 9], // Adjust data to match labels
                    backgroundColor: ['black', 'red', 'green', 'blue'],
                    borderColor: ['black', 'red', 'green', 'blue'],
                    borderWidth: 1,
                }
            ]
        };

        const options = {
           
            responsive: true,

            plugins: {
                legend: {
                    position: 'left', // Legend at the top
                },
                tooltip: {
                    enabled: true, // Enable tooltips
                },
            },
            
            scales: {
                x: {
                    beginAtZero: true, // X-axis starts at zero
                    grid: {
                        color: 'rgba(245, 245, 244, 0.05)' // Change X-axis grid color
                        }
                },
                y: {
                    beginAtZero: true, // Y-axis starts at zero
                    grid: {
                        color: 'rgba(245, 245, 244, 0.05)' // Change X-axis grid color
                        }
                },
            },

            layout: {
                    padding: {
                    left: 30 // Add padding around the chart content to avoid overlap with legend
                }
            }
        };

        return (
            <div style={{ width: "100%", height: "100%",padding:"0px" }}>                          
                <Doughnut data={data} options={options} />              
            </div>
        );
    }
}
