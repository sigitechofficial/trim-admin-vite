// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import { FaArrowLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";

export default function SubscriptionReport() {
  const columns = [
    {
      name: "Sr",
      selector: (row) => row.serialNo,
    },
    {
      name: "All Salons",
      selector: (row) => row.allSalon,
    },
    {
      name: "Total Employees",
      selector: (row) => row.totalEmployees,
    },
    {
      name: "New Subscription",
      selector: (row) => row.newSubscription,
    },
    {
      name: "Total Subscription",
      selector: (row) => row.totalSubscription,
    },
    {
      name: "Total Revenue",
      selector: (row) => row.totalRevenue,
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];
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
              <span className="flex items-center text-[#8F95B2]">
                Reports <FaAngleRight size={20} />
              </span>{" "}
              SubscriptionReport
            </h2>
          </div>
          <MyDataTable
            columns={columns}
            placeholder={"Search by Salon name "}
          />
        </div>
      }
    />
  );
}
