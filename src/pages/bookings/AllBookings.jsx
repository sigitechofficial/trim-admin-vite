import React from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import GetAPI from "../../utilities/GetAPI";
import formatDateFromDB, {
  formatTimeFromDB,
  formateDate,
} from "../../utilities/DateTime";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";

export default function AllBookings() {
  const navigate = useNavigate();
  const { data } = GetAPI("admin/appointments", "bookings");

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
  data?.data?.appointments?.map((values, index) => {
    return datas.push({
      sn: index + 1,
      id: values?.id,
      name: `${values?.user?.firstName} ${values?.user?.lastName}`,
      salonName: values?.salonDetail?.salonName,
      on: `${formateDate(values?.on)} ${formatTimeFromDB(values?.startTime)}`,
      createdAt: formateDate(values?.createdAt.slice(0, 10)),
      serviceCount: values?.jobs?.length,
      currentStatus: (
        <div>
          {values?.status === "complete" ? (
            <div className="w-24 bg-[#12466F14] text-theme font-semibold p-2 rounded-md flex justify-center">
              Completed
            </div>
          ) : values?.status === "no-show" ? (
            <div className="w-24 bg-[#d4fffb] text-[#01C7B8] font-semibold p-2 rounded-md flex justify-center">
              No Show
            </div>
          ) : values?.status === "cancel" ? (
            <div className="w-24 bg-red-100 text-red-500 font-semibold p-2 rounded-md flex justify-center">
              Cancel
            </div>
          ) : (
            <div className="w-24 bg-yellow-100 text-yellow-500 font-semibold p-2 rounded-md flex justify-center">
              Pending
            </div>
          )}
        </div>
      ),
      action: (
        <div className="flex gap-x-2">
          <button
            className="border border-yellow-400 rounded-md p-2 text-yellow-400"
            onClick={() => {
              navigate("/booking-details");
              localStorage.setItem("bookingDetailsID", values?.id);
            }}
          >
            <FaEye size={24} />
          </button>
          {/* <button className="border border-red-400 rounded-md p-2 text-red-400">
                        <MdDelete size={24} />
                    </button> */}
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
            All Bookings
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
