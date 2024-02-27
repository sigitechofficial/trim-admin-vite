import React from 'react'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto';
 
export default function BarChart({ dashboardBarChartData }) {
    console.log("🚀 ~ BarChart ~ dashboardBarChartData:", dashboardBarChartData)
    const UpdatedData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        ,
        datasets: [
            {
                label: 'Revenue',
                backgroundColor: 'rgb(36,142,207,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 0,
                data: dashboardBarChartData?.datasets[0]?.data,
                // data: [20, 10, 12, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                borderRadius: 5,
            },
        ],
    };
    return (
        <div className='px-3 py-3 '>
            <Bar
                data={UpdatedData}
                options={{
                    scales: {
                        x: {
                            type: 'category',
                            title: {
                                display: true,
                                text: 'Month',
                            },
                            grid: {
                                display: false,
                            },
                        },
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'Revenue',
                            },
                            grid: {
                                display: false,
                            },
                        },
                    },
                    plugins: {
                        legend: {
                            display: true,
                            position: 'right',
                        },
                    },
                    responsive: true,
                }}
            />
        </div>
    )
}
