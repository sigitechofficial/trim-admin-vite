// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import GetAPI from "../../utilities/GetAPI";
import { FaEye } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import Loader from "../../components/Loader";

export default function Subscription() {
  const navigate = useNavigate()
  const { data, reFetch } = GetAPI('admin/subscriptions')
  // console.log("🚀 ~ Subscription ~ data:", data)

  const columns = [
    { field: "sn", header: "Sn" },
    { field: "name", header: "Name" },
    { field: "price", header: "Price" },
    { field: "teamSize", header: "Team Size" },
    { field: "duration", header: "Duration" },
    { field: "subscriptionFeaturesCount", header: "Features Count" },
    {
      field: "action",
      header: "Action",
    }
  ]

  const datas = []
  data?.data?.map((values, i) => {
    return datas.push({
      sn: i + 1,
      name: values?.name, 
      price: values?.price,
      teamSize: values?.teamSize,
      duration: values?.duration,
      subscriptionFeaturesCount: values?.subscriptionFeatures.length,
      action: <button
        className="border border-yellow-400 rounded-md p-2 text-yellow-400"
        onClick={() =>
          navigate("/subscription-plans", {
            state: { data: values?.subscriptionFeatures },
          })
        }
      >
        <FaEye size={24} />
      </button>
    })
  })

  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
            Subscription
          </h2>
          <MyDataTable columns={columns} data={datas} />
        </div>
      }
    />
  );
}
