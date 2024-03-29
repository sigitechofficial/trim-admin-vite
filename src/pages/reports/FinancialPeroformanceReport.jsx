// @ts-nocheck
import React, { useState } from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import { FaArrowLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";

export default function FinancialPeroformanceReport() {
  const [selectedOption, setSelectedOption] = useState({ value: 'complete', label: 'Complete' });
  
  const {data} = GetAPI(`admin/reports/financial-performance/${selectedOption?.value}`,"reports")

  const options = [
    { value: 'complete', label: 'Complete' },
    { value: 'cancel', label: 'Cancel' },
    { value: 'no-show', label: 'No Show' },
  ];

  const columns = [
    { field: "sn", header: "Sn",sort: true },
    { field: "salonName", header: "Salon Name",sort: true },
    { field: "revenue", header: "Revenue",sort: true },
    { field: "averageBookingTotal", header: "Avg. Total Bookings",sort: true },
    { field: "totalAppointments", header: "Total Appointments",sort: true },
    { field: "totalEmployees", header: "Total Employees",sort: true },
    { field: "salonAverageRating", header: "Salon Avg. Rating",sort: true },
    { field: "ratingCount", header: "Rating Count",sort: true },
  ]

  const datas = []
  data?.data?.report?.map((values,i) => {
    return datas.push({
      sn:i+1,
      salonName: values?.salonName,
      revenue:  values?.revenue,
      averageBookingTotal:  values?.averageBookingTotal,
      totalAppointments: values?.totalAppointments ,
      totalEmployees: values?.totalEmployees ,
      salonAverageRating: values?.salonAverageRating ,
      ratingCount: values?.ratingCount
    })
  })
 
  
  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="space-y-5">
          <div className="flex items-center gap-x-2">
            <button
              className="flex justify-center items-center w-6 h-6 text-black rounded-full hover:bg-black hover:text-white duration-200"
              onClick={() => {
                window.history.back();
              }}
            >
              <FaArrowLeft />
            </button>
            <h2 className="flex items-center text-xl lg:text-2xl font-chivo font-semibold">
              <span className="flex items-center text-[#8F95B2]">
                Reports <FaAngleRight size={20} />
              </span>{" "}
              Financial Peroformance Report
            </h2>
          </div>
      
          <MyDataTable columns={columns} data={datas} options={options} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
        </div>
      }
    />
  );
}
