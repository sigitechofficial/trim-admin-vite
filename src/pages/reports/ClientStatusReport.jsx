import React from "react";
import Layout from "../../components/Layout";
import { FaAngleRight, FaArrowLeft } from "react-icons/fa";
import DoughnutChart from "../../components/DoughnutChart";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";

export default function ClientStatusReport() {
  const { data } = GetAPI(
    "admin/graph/client-status-distribution-graph",
    "dashboard"
  );
  console.log(data?.data?.report);

  return data.length === 0 ? (
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
              <span className="flex items-center text-[#8F95B2] ">
                Graphs <FaAngleRight size={20} />
              </span>{" "}
              Client Status Distribution
            </h2>
          </div>

          <div className="flex items-center justify-center pt-20">
            <DoughnutChart dashboardDoughnutChartData={data?.data?.report} />
          </div>
        </div>
      }
    />
  );
}
