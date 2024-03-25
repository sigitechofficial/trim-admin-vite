// @ts-nocheck
import React, { useEffect, useMemo, useState } from "react";
import ListHead from "./ListHead";
import { MdDashboard } from "react-icons/md";
import { BsCardList } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { GiSaloon } from "react-icons/gi";
import { BiCategory } from "react-icons/bi";
import { TbAlignBoxBottomCenter } from "react-icons/tb";
import { FaAngleDown, FaUserEdit, FaAngleUp } from "react-icons/fa";
import { RiCouponLine } from "react-icons/ri";
import { MdOutlineSubscriptions } from "react-icons/md";
import { FaRegBell } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { PiChartBar } from "react-icons/pi";
import { RiAdminLine } from "react-icons/ri";
import ListItems from "./ListItems";
import { info_toaster } from "../utilities/Toaster";
import { ImCross } from "react-icons/im";

export default function Leftbar(props) {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const isActive = useMemo(() => {
    return (
      location === "/all-bookings" ||
      location === "/completed-bookings" ||
      location === "/cancelled-bookings" ||
      location === "/noshow-bookings"
    );
  }, [location]);

  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  const handleActive = () => {
    setActive(!active);
  };

  const logoutFunc = (e) => {
    e.preventDefault();
    setTimeout(() => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("loginStatus");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("userJoinedOn");
      localStorage.removeItem("userPhoneNo");
      localStorage.removeItem("userName");
      navigate("/sign-in");
      info_toaster("Successfully Logged out!");
    }, 400);
  };

  return (
    <section
      className={`bg-white w-full sm:w-60 lg:w-72 ${
        props?.navbarVis ? "fixed" : "hidden"
      } h-full sm:py-5 sm:pl-2 mt-0 sm:mt-[94px] border-r-2 z-50`}
    >
      <div className="sm:hidden flex justify-between items-center py-3 w-11/12 mx-auto">
        <div>
          {" "}
          <img src="/images/logo2.webp" alt="logo" className="w-16" />
        </div>
        <div
          className="sm:hidden"
          onClick={() => props?.setNavbarVis(!props?.navbarVis)}
        >
          <ImCross size="25px" />
        </div>
      </div>
      <ul className="flex flex-col space-y-1 overflow-auto h-[90%]">
        <ListHead title="Dashboard" to="/" Icon={MdDashboard} />

        <ListHead
          title="Admin Earnings"
          to="/admin-earnings"
          Icon={RiAdminLine}
        />

        <ListHead
          title="Customer Management"
          to="/customers"
          Icon={FiUsers}
          active={location === "/customer-details"}
        />

        <ListHead title="Employee Management" to="/employees" Icon={FiUsers} />

        <ListHead
          title="Bookings"
          Icon={BsCardList}
          active={isActive}
          Angle={active ? FaAngleUp : FaAngleDown}
          onClick={handleActive}
        />
        {active && (
          <>
            <div className="m-2 relative space-y-1">
              <ListItems title="All Bookings" to="/all-bookings" />
              <ListItems title="Completed Bookings" to="/completed-bookings" />
              <ListItems title="Cancelled Bookings" to="/cancelled-bookings" />
              <ListItems title="No Show Bookings" to="/noshow-bookings" />
            </div>
            <hr className="w-full" />
          </>
        )}

        <ListHead
          title="Barbershops"
          to="/barbershops"
          Icon={GiSaloon}
          active={location === "/barbershop-details"}
        />

        <ListHead title="Services" to="/services" Icon={BiCategory} />

        <ListHead
          title="Earnings Management"
          to="/earnings"
          Icon={TbAlignBoxBottomCenter}
        />

        <ListHead title="Roles Management" to="/roles" Icon={FaUserEdit} />

        <ListHead
          title="Coupons"
          to="/coupons"
          Icon={RiCouponLine}
          active={location === "/coupon-details"}
        />

        {/* <ListHead
          title="Subscription"
          to="/subscription"
          Icon={MdOutlineSubscriptions}
          active={location === "/subscription-plans"}
        /> */}

        <ListHead
          title="All Subscription"
          to="/subscription-plans"
          Icon={MdOutlineSubscriptions}
          active={location === "/subscription-plans"}
        />

        <ListHead
          title="Push Notifications"
          to="/notifications"
          Icon={FaRegBell}
          active={location === "/send-notifications"}
        />

        <ListHead
          title="Reports"
          to="/reports"
          Icon={PiChartBar}
          active={
            location === "/reports/off-peak-time-report" ||
            location === "/reports/client-file-report" ||
            location === "/reports/subscription-report" ||
            location === "/reports/financial-performance-report" ||
            location === "/reports/appointment-conversion-report"
          }
        />

        <ListHead
          title="Help & support"
          to="/customer-support"
          Icon={BiSupport}
        />

        <div className="mx-2 pb-7">
          <button
            className="w-full text-sm lg:text-base font-chivo font-medium flex items-center gap-x-2 px-2 py-3 rounded-lg text-black hover:bg-black hover:text-white 
          duration-200"
            onClick={logoutFunc}
          >
            <MdLogout size={26} />
            <span>Logout</span>
          </button>
        </div>
      </ul>
    </section>
  );
}
