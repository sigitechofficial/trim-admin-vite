// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";

export default function EarningManagement() {
  const { data, reFetch } = GetAPI(
    "admin/salon-earnings",
    "earnings_management"
  );
  const columns = [
    { field: "sn", header: "Sn", sort: true },
    { field: "salonName", header: "Salon Name", sort: true },
    { field: "addressDB", header: "Address", sort: true },
    { field: "revenue", header: "Total Earnings", sort: true },
    { field: "totalBookings", header: "Total Bookings", sort: true },
    {
      field: "salonAverageRating",
      header: "Average Customer Rating",
      sort: true,
    },
    { field: "status", header: "Status" },
  ];

  const datas = [];
  data?.data?.salons?.map((obj, i) => {
    return datas.push({
      sn: i + 1,
      salonName: obj?.salonName,
      salonAverageRating: `${obj?.salonAverageRating} (${obj?.ratingCount})`,
      revenue: obj?.revenue,
      totalBookings: obj?.totalBookings,
      addressDB: `${obj?.addressDB?.postalCode} ${obj?.addressDB?.streetAddress} ${obj?.addressDB?.city} ${obj?.addressDB?.country}`,
      status: (
        <div>
          {obj?.status ? (
            <div className="w-24 bg-[#12466F14] text-theme font-semibold p-2 rounded-md flex justify-center">
              Active
            </div>
          ) : (
            <div className="w-24 bg-[#EE4A4A14] text-[#EE4A4A] font-semibold p-2 rounded-md flex justify-center">
              Inactive
            </div>
          )}
        </div>
      ),
    });
  });

  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
            All Earnings
          </h2>
          <MyDataTable
            columns={columns}
            data={datas}
            placeholder={"Search by Salon name, Address and bookings"}
          />
        </div>
      }
    />
  );
}
