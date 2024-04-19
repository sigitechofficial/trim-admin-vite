import React from "react";
import Layout from "../../components/Layout";
import { FaAngleRight, FaArrowLeft } from "react-icons/fa";
import BarChart from "../../components/BarChart";
import GetAPI from "../../utilities/GetAPI";

export default function TopServicesReport() {
  const { data } = GetAPI("admin/dashboard", "dashboard");
  return (
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
              <span className="flex items-center text-[#8F95B2] ">
                Graphs <FaAngleRight size={20} />
              </span>{" "}
              Top Performing Services
            </h2>
          </div>

          <div>
          <BarChart dashboardBarChartData={data?.data?.dashboardBarChartData} />
          </div>
        </div>
      }
    />
  );
}
