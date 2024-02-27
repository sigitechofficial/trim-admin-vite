import React from 'react'
import { Doughnut } from 'react-chartjs-2'

export default function DoughnutChart({ dashboardDoughnutChartData }) {

    const updatedData = {
        labels: dashboardDoughnutChartData?.labels,
        datasets: [
            {
                data: dashboardDoughnutChartData?.datasets[0]?.data,
                backgroundColor: ['rgba(76, 115, 255, 0.8)', 'rgba(158, 198, 0, 0.8)'],
            },
        ],
    };


    const totalSubscriptions = dashboardDoughnutChartData?.datasets[0]?.data?.reduce((total, num) => total + Math.round(num))


    const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: true,
            position: 'right',
        },
        plugins: {
            annotation: {
                annotations: [
                    {
                        type: 'text',
                        text: `${totalSubscriptions} Subscriptions`,
                        fontColor: 'rgba(0, 0, 0, 0.7)',
                        fontSize: 16,
                        position: 'center',
                    },
                ],
            },
        },
    };

    return (
        <div className='py-3 md:h-40 lg:h-60 xl:h-72 md:w-44 lg:w-52 flex items-center justify-center'>
            <Doughnut data={updatedData} options={options} />
        </div>
    )
}
