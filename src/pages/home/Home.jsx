// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import HomeCards from "../../components/HomeCards";
import { BsCardList } from "react-icons/bs";
import { FaChartLine } from "react-icons/fa6";
import { PiUsersThreeBold, PiHandbagFill } from "react-icons/pi";
import { } from "react-icons/pi";
import HomeMiniCards from "../../components/HomeMiniCards";
import { LuPackageCheck, LuPackageX } from "react-icons/lu";
import { FiBox } from "react-icons/fi";
import GetAPI from "../../utilities/GetAPI";
import Charts from "./Charts";
import Loader from "../../components/Loader";

export default function Home() {
  const { data } = GetAPI('admin/dashboard')
  // console.log("🚀 ~ Home ~ data:", data)
  
  return data?.length === 0 ? (
    <Loader />
  ) :(
    <Layout
      content={
        <div className="bg-homeGradient w-full h-44 relative before:absolute before:bg-texture before:w-full before:h-44 before:bg-contain">
          <div className="relative z-30 py-5 px-6 2xl:px-12">
            <div>
              <h1 className="text-white text-xl lg:text-3xl font-rubik font-semibold">
                Welcome, {localStorage.getItem("userName")}.
              </h1>
              <p className="text-white font-workSans">
                Monitor your business analytics and statistics
              </p>
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mt-5">
              <HomeCards
                title="Total Bookings"
                total={data?.data?.totalAppointments}
                Icon={BsCardList}
                bgColor="bg-homeCards"
                iconBg="bg-white"
              />
              <HomeCards
                title="Total Revenue"
                total={data?.data?.revenue}
                Icon={FaChartLine}
                bgColor="bg-homeCards"
                iconBg="bg-white"
              />
              <HomeCards
                title="Total Customer"
                total={data?.data?.totalCustomers}
                Icon={PiUsersThreeBold}
                bgColor="bg-homeCards"
                iconBg="bg-white"
              />
              <HomeCards
                title="Total Shops"
                total={data?.data?.totalSalon}
                Icon={PiHandbagFill}
                bgColor="bg-homeCards"
                iconBg="bg-white"
              />
            </div>

            <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mt-12">
              <HomeMiniCards
                title="Upcoming Bookings"
                total={data?.data?.upcommingConfirmAppointments}
                Icon={FiBox}
              />
              <HomeMiniCards
                title="Completed Bookings"
                total={data?.data?.completeAppointments}
                Icon={LuPackageCheck}
              />
              <HomeMiniCards
                title="Cancelled Bookings"
                total={data?.data?.cancelAppointments}
                Icon={LuPackageX}
              />
              <HomeMiniCards
                title="Reschedule Bookings"
                total={data?.data?.unAssignedAppointments}
                Icon={FiBox}
              />
            </div>

            <div className="mt-12">
              <Charts dashboardBarChartData={data?.data?.dashboardBarChartData} dashboardDoughnutChartData={data?.data?.dashboardDoughnutChartData} />
            </div>
          </div>
        </div>
      }
    />
  );
}
