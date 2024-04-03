// @ts-nocheck
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { FaAngleRight, FaArrowLeft } from "react-icons/fa";
import { HiOutlineStar } from "react-icons/hi2";
import TeamMemberCard from "../../components/TeamMemberCard";
import ProfileCard from "../../components/ProfileCard";
import HomeCards from "../../components/HomeCards";
import { BsCardList } from "react-icons/bs";
import GetAPI from "../../utilities/GetAPI";
import { BASE_URL } from "../../utilities/URL";
import { formateDate } from "../../utilities/DateTime";

export default function SalonEmployeeDetails() {
  const { data } = GetAPI(
    `admin/employee-detail/${localStorage.getItem("barberShopEmployeeID")}`
  );

  const [tab, setTab] = useState("services");

  const handleTime = (day) => {
    const temp = data?.data?.employee?.employee?.times?.find(
      (obj) => obj?.day.toLowerCase() === day.toLowerCase()
    );
    if (day === "friday") {
      console.log(temp);
      console.log(day, " ", temp?.openingTime, temp?.closingTime);
    }
    if (temp) {
      return `${temp?.openingTime} - ${temp?.closingTime}`;
    } else {
      return "Closed";
    }
  };

  return (
    <Layout
      content={
        <div className="space-y-5">
          <div className="flex items-center gap-x-2">
            <button
              className="flex justify-center items-center w-6 h-6 text-black rounded-full hover:bg-black hover:text-white duration-200"
              onClick={() => {
                window.history.back();
              }}
            >
              <FaArrowLeft />
            </button>
            <h2 className="flex items-center text-xl lg:text-2xl font-chivo font-semibold">
              <span className="flex items-center text-[#8F95B2]">
                Barbershop Details <FaAngleRight size={20} />
              </span>{" "}
              Team Member Details
            </h2>
          </div>

          <div>
            <ProfileCard
              shadow="shadow-lg"
              bgColor="bg-white"
              employeeName={`${data?.data?.employee?.firstName} ${data?.data?.employee?.lastName}`}
              coverImage={data?.data?.employee?.image}
              employeeID={data?.data?.employee?.employee?.id}
              employeeEmail={data?.data?.employee?.email}
              employeePhoneNumber={`${data?.data?.employee?.countryCode} ${data?.data?.employee?.phoneNum}`}
            />
          </div>

          <div className="bg-white shadow-lg rounded-xl py-6 space-y-5">
            <div className="py-3 bg-tabColor px-10 xl:px-20">
              <ul className="flex flex-wrap gap-x-10 gap-y-3">
                <li
                  className={`text-lg lg:text-2xl font-workSans font-medium cursor-pointer hover:text-theme ${
                    tab === "services" ? "text-theme" : "text-black"
                  }`}
                  onClick={() => {
                    setTab("services");
                  }}
                >
                  Services
                </li>
                <li
                  className={`text-lg lg:text-2xl font-workSans font-medium cursor-pointer hover:text-theme ${
                    tab === "time slots" ? "text-theme" : "text-black"
                  }`}
                  onClick={() => {
                    setTab("time slots");
                  }}
                >
                  Time Slots
                </li>
                <li
                  className={`text-lg lg:text-2xl font-workSans font-medium cursor-pointer hover:text-theme ${
                    tab === "earning methods" ? "text-theme" : "text-black"
                  }`}
                  onClick={() => {
                    setTab("earning methods");
                  }}
                >
                  Earning methods
                </li>
                <li
                  className={`text-lg lg:text-2xl font-workSans font-medium cursor-pointer hover:text-theme ${
                    tab === "reviews" ? "text-theme" : "text-black"
                  }`}
                  onClick={() => {
                    setTab("reviews");
                  }}
                >
                  Reviews
                </li>
              </ul>
            </div>

            <div className="px-10 xl:px-20 h-full">
              {tab === "services" ? (
                <div className="space-y-3">
                  <h2 className="text-2xl font-workSans font-medium">
                    Services
                  </h2>

                  <div className="space-y-4">
                    {data?.data?.employee?.employee?.employeeServices.length >
                    0 ? (
                      data?.data?.employee?.employee?.employeeServices.map(
                        (values, i) => (
                          <div className="text-white border border-theme bg-theme rounded-lg flex justify-between p-4">
                            <div className="font-workSans font-medium">
                              {/* Hair Color */}
                              {values?.service?.serviceName}
                              <span> ({values?.service?.duration} min)</span>
                            </div>
                            <div className="font-workSans font-medium">
                              ${values?.service?.price}/hr
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <p className="text-center text-xl font-bold">
                        No Services
                      </p>
                    )}
                  </div>
                </div>
              ) : tab === "reviews" ? (
                <div className="space-y-3">
                  <h2 className="text-2xl font-workSans font-medium">
                    Reviews
                  </h2>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {data?.data?.employee?.employee?.ratings.length > 0 ? (
                      data?.data?.employee?.employee?.ratings?.map(
                        (values, i) => (
                          <div
                            key={i}
                            className="bg-white rounded-lg shadow-lg p-4 space-y-3"
                          >
                            <div className="flex justify-between">
                              <div className="flex gap-x-3">
                                <img
                                  src={
                                    values?.user?.image
                                      ? `${BASE_URL}${values?.user?.image}`
                                      : `/images/defaultProfileImg.webp`
                                  }
                                  alt="salon-detail"
                                  className="w-16 h-16 rounded-full"
                                />
                                <div className="space-y-1">
                                  <h2 className="text-xl font-medium font-workSans">
                                    {/* Ehsan Shaukat */}
                                    {values?.user?.firstName}{" "}
                                    {values?.user?.firstName}
                                  </h2>
                                  <div className="flex gap-x-1 items-center">
                                    <HiOutlineStar />
                                    <HiOutlineStar />
                                    <HiOutlineStar />
                                    <HiOutlineStar />
                                    <HiOutlineStar />
                                  </div>
                                </div>
                              </div>
                              <div className="text-labelColor font-workSans font-medium">
                                {/* 27/07/2023 */}
                                {formateDate(values?.createdAt.slice(1, 10))}
                              </div>
                            </div>
                            <div className="text-labelColor font-workSans font-medium">
                              {values?.comment}
                            </div>
                          </div>
                        )
                      )
                    ) : (
                      <p className="xl:col-span-2 text-center text-xl font-bold">
                        No Reviews
                      </p>
                    )}
                  </div>
                </div>
              ) : tab === "time slots" ? (
                <div>
                  <h2 className="text-2xl font-workSans font-medium">
                    Days & hours
                  </h2>
                  <div className="grid grid-cols-2 mt-6">
                    <ul className="space-y-2">
                      <li className="text-xl font-workSans">Monday</li>
                      <li className="text-xl font-workSans">Tuesday</li>
                      <li className="text-xl font-workSans">Wednesday</li>
                      <li className="text-xl font-workSans">Thursday</li>
                      <li className="text-xl font-workSans">Friday</li>
                      <li className="text-xl font-workSans">Saturday</li>
                      <li className="text-xl font-workSans">Sunday</li>
                    </ul>

                    <ul className="space-y-2">
                      <li className="text-xl font-workSans">
                        {handleTime("monday")}
                      </li>
                      <li className="text-xl font-workSans">
                        {handleTime("tuesday")}
                      </li>
                      <li className="text-xl font-workSans">
                        {handleTime("wednesday")}
                      </li>
                      <li className="text-xl font-workSans">
                        {handleTime("thursday")}
                      </li>
                      <li className="text-xl font-workSans">
                        {handleTime("friday")}
                      </li>
                      <li className="text-xl font-workSans">
                        {handleTime("saturday")}
                      </li>
                      <li className="text-xl font-workSans">
                        {handleTime("sunday")}
                      </li>
                    </ul>
                  </div>
                </div>
              ) : tab === "team members" ? (
                <TeamMemberCard to="/barbershop-details/saloon-employee-details" />
              ) : tab === "earning methods" ? (
                <div className="space-y-3">
                  <h2 className="text-2xl font-workSans font-medium">
                    Earning method
                  </h2>
                  <p className="text-xl font-workSans font-medium text-labelColor">
                    Fixed salary
                  </p>

                  <div className="grid grid-cols-2 xl:grid-cols-4 gap-5 mt-5">
                    {data?.data?.revenue.length > 0 ? (
                      Object.entries(data?.data?.revenue).map(
                        ([key, value]) => (
                          <HomeCards
                            key={key}
                            title={key}
                            total={value}
                            Icon={BsCardList}
                            bgColor="bg-[#12466F4D]"
                            iconBg="bg-theme"
                            iconColor="white"
                          />
                        )
                      )
                    ) : (
                      <p className="text-center text-xl font-bold col-span-2 xl:col-span-4">
                        No Earnings
                      </p>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      }
    />
  );
}
