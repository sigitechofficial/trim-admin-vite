// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import { FaAngleRight, FaArrowLeft } from "react-icons/fa";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";

export default function AppointmentReport() {
 
  const { data } = GetAPI('admin/reports/appointment-conversion',"reports")

  const columns = [
    { field: "sn", header: "Sn" ,sort: true},
    { field: "salonName", header: "Salon Name",sort: true },
    { field: "totalAppointments", header: "No. of bookings",sort: true },
    { field: "revenue", header: "Revenue" ,sort: true},
    { field: "totalEmployees", header: "Total Employees",sort: true },
    { field: "completeBookingCount", header: "Complete Bookings",sort: true },
    { field: "cancelBookingCount", header: "Cancel Bookings",sort: true },
    { field: "noShowBookingCount", header: "No Show",sort: true },
    { field: "reScheduleCount", header: "Re-Schedule",sort: true },
  ]

  const datas = [];
  data?.data?.report?.map((values, index) => {
    return datas.push({
      sn: index + 1,
      salonName: values?.salonName,
      totalAppointments: values?.totalAppointments,
      revenue: `$${values?.revenue ? values?.revenue:0}`,
      totalEmployees: values?.totalEmployees,
      completeBookingCount: values?.completeBookingCount,
      cancelBookingCount: values?.cancelBookingCount,
      noShowBookingCount: values?.noShowBookingCount,
      reScheduleCount: values?.reScheduleCount,
    });
  });

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
              Appointment Conversion Report
            </h2>
          </div>
          <MyDataTable columns={columns} data={datas} placeholder={"Search by Salon name "} />
        </div>
      }
    />
  );
}
