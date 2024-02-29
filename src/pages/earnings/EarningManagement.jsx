// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";

export default function EarningManagement() {
  const { data, reFetch } = GetAPI('admin/salon-earnings')
  // console.log("🚀 ~ EarningManagement ~ data:", data)
  const columns = [
    { field: "sn", header: "Sn" },
    { field: "salonName", header: "Salon Name" },
    { field: "addressDB", header: "Address" },
    { field: "revenue", header: "Total Earnings" },
    { field: "totalBookings", header: "Total Bookings" },
    { field: "salonAverageRating", header: "Average Customer Rating" },
    { field: "status", header: "Status" },
  ]

  const datas = []
  data?.data?.salons?.map((obj, i) => {
    return datas.push({
      sn: i + 1,
      salonName: obj?.salonName,
      salonAverageRating: `${obj?.salonAverageRating} (${obj?.ratingCount})`,
      revenue: obj?.revenue,
      totalBookings: obj?.totalBookings,
      addressDB: `${obj?.addressDB?.postalCode} ${obj?.addressDB?.streetAddress} ${obj?.addressDB?.city} ${obj?.addressDB?.country}`,
      status: <div>
        {obj?.status ? (
          <div className="bg-[#12466F14] text-theme font-semibold p-2 rounded-md flex justify-center">
            Active
          </div>
        ) : (
          <div className="bg-[#EE4A4A14] text-[#EE4A4A] font-semibold p-2 rounded-md flex justify-center">
            Inactive
          </div>
        )}
      </div>
    })
  })


  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
            All Earnings
          </h2>
          <MyDataTable columns={columns} data={datas} />
        </div>
      }
    />
  );
}
