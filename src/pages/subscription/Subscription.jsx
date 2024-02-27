// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import GetAPI from "../../utilities/GetAPI";

export default function Subscription() {
  const {data, reFetch} = GetAPI('admin/subscriptions')
  // console.log("🚀 ~ Subscription ~ data:", data)

  const columns = [
    { field: "sn", header: "Sn" },
    { field: "sn", header: "Sn" },
    { field: "sn", header: "Sn" },
    { field: "sn", header: "Sn" },
    { field: "sn", header: "Sn" },
    { field: "sn", header: "Sn" },
    { field: "sn", header: "Sn" },
    { field: "sn", header: "Sn" }
  ]
 
  return (
    <Layout
      content={
        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
            Subscription
          </h2>
          <MyDataTable columns={columns} />
        </div>
      }
    />
  );
}
