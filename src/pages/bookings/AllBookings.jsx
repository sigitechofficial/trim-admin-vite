import React from 'react'
import Layout from '../../components/Layout'
import MyDataTable from '../../components/MyDataTable'
import GetAPI from '../../utilities/GetAPI'
import formatDateFromDB from '../../utilities/DateTime'
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AllBookings() {
    const navigate = useNavigate()
    const { data } = GetAPI('admin/appointments')
    // console.log("🚀 ~ AllBookings ~ data:", data?.data?.appointments)

    const columns = [
        { field: "sn", header: "Sn" },
        { field: "id", header: "Booking Id" },
        { field: "name", header: "Name" },
        { field: "salonName", header: "Salon" },
        { field: "on", header: "Schedule Date" },
        { field: "createdAt", header: "Booking Date" },
        { field: "serviceCount", header: "Service Count" },
        { field: "currentStatus", header: "Booking Status" },
        { field: "action", header: "Action" }
    ]

    const datas = [];
    data?.data?.appointments?.map((values, index) => {
        return datas.push({
            sn: index + 1,
            id: values?.id,
            name: `${values?.user?.firstName} ${values?.user?.lastName}`,
            salonName: values?.salonDetail?.salonName,
            on: `${values?.on} ${values?.startTime}`,
            createdAt: values?.createdAt.slice(0, 10),
            serviceCount: values?.jobs?.length,
            currentStatus: (
                <div>
                    {values?.status === "complete" ? (
                        <div className="bg-themeGreen text-white font-semibold p-2 rounded-md flex justify-center">
                            Active
                        </div>
                    ) : values?.status === "no-show" ? (
                        <div className="bg-themeLightGray text-white font-semibold p-2 rounded-md flex justify-center">
                            No Show
                        </div>
                    ) : values?.status === "cancel" ? <div className="bg-red-600 text-white font-semibold p-2 rounded-md flex justify-center">
                        Cancel
                    </div> : <div className="bg-themeYellow text-white font-semibold p-2 rounded-md flex justify-center">
                        Pending
                    </div>}
                </div>
            ),
            action: (
                <div className="flex gap-x-2">
                    <button
                        className="border border-yellow-400 rounded-md p-2 text-yellow-400"
                        onClick={() => {
                            navigate("/booking-details")
                            localStorage.setItem('bookingDetailsID', values?.id)
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

    return (
        <Layout
            content={
                <div className="space-y-5">
                    <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
                        All Bookings
                    </h2>
                    <MyDataTable columns={columns} data={datas} />
                </div>
            }
        />
    )
}
