import React from 'react'
import BarChart from '../../components/BarChart'
import DoughnutChart from '../../components/DoughnutChart'

export default function Charts({ dashboardBarChartData, dashboardDoughnutChartData }) {
    const TotalRevenue = dashboardBarChartData?.datasets[0]?.data?.reduce((total, num) => total + Math.round(num))
    return (
        <main className='grid grid-cols-1 lg:grid-cols-5 lg:gap-x-5 max-lg:gap-y-4 pb-4 [&>div]:rounded-2xl [&>div]:shadow-lg [&>div]:ring-1 [&>div]:ring-gray-100'>


            {/* Bar Chart Start */}
            <div className='col-span-3 bg-white'>
                <div className='font-bold border-b-[1px] px-3 h-12 flex items-center'>
                    <p className='text-2xl'>Revenue</p>
                </div>
                <p className='font-bold text-3xl px-3 py-2'>{TotalRevenue}</p>
                <BarChart dashboardBarChartData={dashboardBarChartData} />
            </div>
            {/* Bar Chart End */}


            {/* Doughnut Chart Start */}
            <div className='col-span-2 bg-white'>
                <div className='border-b-[1px] h-12 px-3 flex flex-col justify-center'>
                    <p className='font-bold'>Subscriptions</p>
                    <p className='text-sm text-gray-600'>Customers that buy our Subscriptions</p>
                </div>
                <div className='max-h-[410px] h-full md:w-full flex items-start xl:items-center justify-center'>
                    {/* chart display start */}
                    <DoughnutChart dashboardDoughnutChartData={dashboardDoughnutChartData} />
                    {/* chart display end */}
                </div>

            </div>
            {/* Doughnut Chart End */}
        </main>
    )
}
