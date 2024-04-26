import React from "react";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { grid } from "@chakra-ui/react";

export default function StackedChart(props) {
  const options = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        grid: {
          display: false,
        },
      },
      y: {
        stacked: true,
        grid: {
          display: false,

        },
      },
    },
    
  };

  const labels = props?.graphData?.labels;

  const data = {
    labels,
    datasets: [
      {
        label: props?.graphData?.datasets[1]?.label,
        data: props?.graphData?.datasets[1]?.data,
        backgroundColor: props?.graphData?.datasets[1]?.backgroundColor,
      },
      {
        label: props?.graphData?.datasets[2]?.label,
        data: props?.graphData?.datasets[2]?.data,
        backgroundColor: props?.graphData?.datasets[2]?.backgroundColor,
      },
      {
        label: props?.graphData?.datasets[0]?.label,
        data: props?.graphData?.datasets[0]?.data,
        backgroundColor: props?.graphData?.datasets[0]?.backgroundColor,
      },
    ],
  };

  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}
