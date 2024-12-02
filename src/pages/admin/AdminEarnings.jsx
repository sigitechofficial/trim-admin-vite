import React from "react";
import HomeCards from "../../components/HomeCards";
import { FaShop } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import { FaChartLine } from "react-icons/fa";
import { PiUsersThreeBold } from "react-icons/pi";
import Layout from "../../components/Layout";

export default function AdminEarnings() {
  
  return (
    <Layout 
      content={
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          <HomeCards title="Total Shop’s" total="3,500" Icon={FaShop} />
          <HomeCards
            title="Total Employees"
            total="1248"
            Icon={PiUsersThreeBold}
          />
          <HomeCards title="All Time Earning" total="$3,500" Icon={GrMoney} />
          <HomeCards
            title="All Time Revenue"
            total="$37,192.00"
            Icon={FaChartLine}
          />
          <HomeCards title="Active Shop’s" total="3,500" Icon={FaShop} />
          <HomeCards
            title="Current Employees"
            total="1248"
            Icon={PiUsersThreeBold}
          />
          <HomeCards title="Current Earning" total="$3,500" Icon={GrMoney} />
          <HomeCards
            title="Current Revenue"
            total="$37,192.00"
            Icon={FaChartLine}
          />
        </div>
      }
    />
  );
}
