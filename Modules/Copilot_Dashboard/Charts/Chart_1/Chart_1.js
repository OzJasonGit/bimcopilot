import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2"; // Import Doughnut from react-chartjs-2
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

<<<<<<< HEAD

import { DoughnutController } from "chart.js";


import { Chart as 
    ChartJS,
    ArcElement,
    Tooltip,
    Legend
 } from "chart.js";
import { borderColor } from "chart.js";


 ChartJS.register(
    ArcElement,
    Tooltip,
    Legend

 );








 export default class Chart_1 extends Component {

=======
export default class Chart_1 extends Component {
>>>>>>> 2f83019d7cb552562a0612c490da6bcb4e4508e5
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
<<<<<<< HEAD

        }
=======
            responsive: true,
            plugins: {
                legend: {
                    position: 'top', // Legend at the top
                },
                tooltip: {
                    enabled: true, // Enable tooltips
                },
            },
        };

>>>>>>> 2f83019d7cb552562a0612c490da6bcb4e4508e5
        return (
            <div style={{ width: "100%", height: "100%",padding:"30px" }}>
                {/* Use the Doughnut component */}
                <h1>Placeholder</h1>
                <Doughnut data={data} options={options} /><br/>
                <h1>Footer</h1>
            </div>
        );
    }
}
