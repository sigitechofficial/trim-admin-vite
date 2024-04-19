import React from "react";
import Layout from "../../components/Layout";
import { FaAngleRight, FaArrowLeft } from "react-icons/fa";
import StackedChart from "../../components/StackedChart";

export default function TopSalonsReport() {
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
              Top Performing Salons
            </h2>
          </div>

          <div>
            <StackedChart />
          </div>
        </div>
      }
    />
  );
}
