// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";
import formatDateFromDB, {
  formatTimeFromDB,
  formateDate,
} from "../../utilities/DateTime";
import { Tooltip } from "@chakra-ui/react";

export default function CancelledBookings() {
  const navigate = useNavigate();
  const { data } = GetAPI("admin/appointments", "bookings");

  let i = 0;
  const handleIndexValue = () => {
    return (i = i + 1);
  };

  const columns = [
    { field: "sn", header: "Sn", sort: true },
    { field: "id", header: "Booking Id", sort: true },
    { field: "name", header: "Name", sort: true },
    { field: "salonName", header: "Salon", sort: true },
    { field: "on", header: "Schedule Date", sort: true },
    { field: "createdAt", header: "Booking Date", sort: true },
    { field: "serviceCount", header: "Service Count", sort: true },
    { field: "currentStatus", header: "Booking Status" },
    { field: "action", header: "Action" },
  ];

  const datas = [];
  data?.data?.appointments?.filter((values, index) => {
    return (
      values?.status === "cancel" &&
      datas.push({
        sn: handleIndexValue(),
        id: values?.id,
        name: `${values?.user?.firstName} ${values?.user?.lastName}`,
        salonName: values?.salonDetail?.salonName,
        on: `${formateDate(values?.on)} ${formatTimeFromDB(values?.startTime)}`,
        createdAt: formateDate(values?.createdAt.slice(0, 10)),
        serviceCount: values?.jobs?.length,
        currentStatus: (
          <div className="w-24 bg-red-100 text-red-500 font-semibold p-2 rounded-md flex justify-center">
            Cancelled
          </div>
        ),
        action: (
          <div className="flex gap-x-2">
            <Tooltip label="View detail">
              <button
                className="border border-yellow-400 rounded-md p-2 text-yellow-400"
                onClick={() => {
                  navigate("/booking-details");
                  localStorage.setItem("bookingDetailsID", values?.id);
                }}
              >
                <FaEye size={24} />
              </button>
            </Tooltip>
            {/* <button className="border border-red-400 rounded-md p-2 text-red-400">
                    <MdDelete size={24} />
                </button> */}
          </div>
        ),
      })
    );
  });

  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
            Cancelled Bookings
          </h2>
          <MyDataTable
            columns={columns}
            data={datas}
            placeholder={"Search by Booking ID, Name, Salon and Date"}
          />
        </div>
      }
    />
  );
}
