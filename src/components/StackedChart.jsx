import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";

export default function StackedChart() {
  const options = {
    plugins: {
      title: {
        display: true,
        // text: "Chart.js Bar Chart - Stacked",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = ["Salon Hub", "Salon 2", "Salon 3", "Salon 4", "Salon 5"];

  const data = {
    labels,
    datasets: [
      {
        label: "No of Appointments",
        data: [1, 2, 3, 4, 6],
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "No of Services",
        data: [3, 2, 3, 4, 2],
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Revenue",
        data: [3, 5, 8, 3,5],
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}
