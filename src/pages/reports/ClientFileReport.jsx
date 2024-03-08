// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import { FaArrowLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";

export default function ClientFileReport() {
  const { data } = GetAPI('admin/reports/client-file')

  const columns = [
    { field: "sn", header: "Sn" },
    { field: "name", header: "Name" },
    { field: "averageSpent", header: "Avg. Spent" },
    { field: "completeBookingCount", header: "Complete Booking" },
    { field: "cancelBookingCount", header: "Cancel Booking" },
    { field: "noShowBookingCount", header: "No Show" },
    { field: "reScheduleCount", header: "Re-Schedule" },
  ]
 
  const datas = [];
  data?.data?.report?.map((values, index) => {
    return datas.push({
      sn: index + 1,
      name: `${values?.firstName} ${values?.lastName}`,
      averageSpent: `${values?.averageSpent ? values?.averageSpent:0}`,
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
              Client File Report
            </h2>
          </div>
          <MyDataTable columns={columns} data={datas} />
        </div>
      }
    />
  );
}
