// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import { useNavigate } from "react-router-dom";

export default function Notifications() {
  const navigate = useNavigate();
  const columns = [
    {
      name: "Sr",
      selector: (row) => row.serialNo,
    },
    {
      name: "Send to",
      selector: (row) => row.sendTo,
    },
    {
      name: "Title",
      selector: (row) => row.title,
    },
    {
      name: "Message",
      selector: (row) => row.message,
    },
    {
      name: "Date",
      selector: (row) => row.date,
    },
  ];
  return (
    <Layout
      content={
        <div className="space-y-5">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
              All Notifications <span className="text-labelColor">(260)</span>
            </h2>
            <button
              className="text-white bg-theme font-workSans font-medium border border-theme rounded-lg px-8 py-2.5 hover:bg-transparent
           hover:text-theme duration-200"
              onClick={() => {
                navigate("/send-notifications");
              }}
            >
              Send New Notification
            </button>
          </div>
          <MyDataTable columns={columns} />
        </div>
      }
    />
  );
}
