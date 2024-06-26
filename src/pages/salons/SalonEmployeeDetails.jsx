// @ts-nocheck
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { FaAngleRight, FaArrowLeft } from "react-icons/fa";
import { HiOutlineStar } from "react-icons/hi2";
import TeamMemberCard from "../../components/TeamMemberCard";
import HomeCards from "../../components/HomeCards";
import { BsCardList } from "react-icons/bs";
import GetAPI from "../../utilities/GetAPI";
import { BASE_URL } from "../../utilities/URL";
import { formatTimeFromDB, formateDate } from "../../utilities/DateTime";
import NewProfileCard from "../../components/NewProfileCard";
import NewSalonProfileCard from "../../components/NewSalonProfileCard";
import MyDataTable from "../../components/MyDataTable";

export default function SalonEmployeeDetails() {
  const [tab, setTab] = useState("services");

  const { data } = GetAPI(
    `admin/salon-employee-detail/${localStorage.getItem(
      "barberShopEmployeeID"
    )}`
  );

  const { data: serviceHistoryData } = GetAPI(
    `admin/employee-services-history/${localStorage.getItem(
      "barberShopEmployeeID"
    )}}`
  );

  const handleTime = (day) => {
    const temp = data?.data?.employee?.employee?.times?.find(
      (obj) => obj?.day.toLowerCase() === day.toLowerCase()
    );
    if (temp) {
      return `${temp?.openingTime} - ${temp?.closingTime}`;
    } else {
      return "Closed";
    }
  };

  const handleJobs = (jobs) => {
    let serviceType = "";
    jobs?.map((values, i) =>
      i === jobs.length - 1
        ? (serviceType += values?.serviceNames)
        : (serviceType += values?.serviceNames + ", ")
    );
    return serviceType;
  };

  const columns = [
    { field: "sn", header: "Sn" },
    {
      field: "bookingID",
      header: "Booking ID",
      sort: true,
    },
    {
      field: "name",
      header: "Name",
      sort: true,
    },
    {
      field: "appointmentDate",
      header: "Appointment Date",
      sort: true,
    },
    {
      field: "createdAt",
      header: "Created At",
      sort: true,
    },
    {
      field: "serviceType",
      header: "Service Type",
      sort: true,
    },
    {
      field: "amount",
      header: "Amount",
    },
    {
      field: "status",
      header: "Status",
    },
  ];

  const datas = [];
  serviceHistoryData?.data?.history.map((values, i) =>
    datas.push({
      sn: i + 1,
      bookingID: values?.id,
      name: `${values?.user?.firstName} ${values?.user?.lastName}`,
      appointmentDate: `${formateDate(values?.on)} ${formatTimeFromDB(
        values?.startTime
      )}`,
      createdAt: formateDate(values?.createdAt.slice(0, 10)),
      serviceType: handleJobs(values?.jobs),
      amount: values?.actualCapturedAmount,
      status: (
        <div>
          {values?.status === "complete" ? (
            <div className="w-24 bg-green-100 text-green-500 font-semibold p-2 rounded-md flex justify-center">
              Completed
            </div>
          ) : values?.status === "no-show" ? (
            <div className="w-24 bg-[#d4fffb] text-[#01C7B8] font-semibold p-2 rounded-md flex justify-center">
              No Show
            </div>
          ) : values?.status === "cancelled" ? (
            <div className="w-24 bg-red-100 text-red-500 font-semibold p-2 rounded-md flex justify-center">
              Cancelled
            </div>
          ) : values?.status === "save-unpaid" ? (
            <div className="w-24 bg-[#ffe6db] text-[#EC8559] font-semibold p-2 rounded-md flex justify-center">
              Unpaid
            </div>
          ) : values?.status === "pending" || values.status === "book" ? (
            <div className="w-24 bg-yellow-100 text-yellow-500 font-semibold p-2 rounded-md flex justify-center">
              Pending
            </div>
          ) : (
            <></>
          )}
        </div>
      ),
    })
  ); 

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
              <span className="flex items-center text-[#8F95B2] ">
                Barbershop Details <FaAngleRight size={20} />
              </span>{" "}
              Team Member Details
            </h2>
          </div>

          <div className="grid grid-cols-2 bg-white p-5 rounded-2xl shadow-lg gap-5">
            <NewProfileCard
              shadow="shadow-none"
              bgColor="bg-themeGray2"
              employeeName={`${data?.data?.employee?.firstName} ${data?.data?.employee?.lastName}`}
              coverImage={data?.data?.employee?.image}
              employeeID={data?.data?.employee?.employee?.id}
              employeeEmail={data?.data?.employee?.email}
              employeePhoneNumber={`${data?.data?.employee?.countryCode} ${data?.data?.employee?.phoneNum}`}
            />

            <NewSalonProfileCard
              shadow={false}
              coverImage={data?.data?.salon?.coverImage}
              bgColor="bg-themeGray"
              salonName={data?.data?.salon?.salonName}
              salonAverageRating={data?.data?.salon?.salonAverageRating}
              ratingCount={data?.data?.salon?.ratingCount}
              salonAddress={`${data?.data?.salon?.addressDB?.streetAddress},${data?.data?.salon?.addressDB?.district},${data?.data?.salon?.addressDB?.city},${data?.data?.salon?.addressDB?.country}`}
              socialLinks={data?.data?.salon?.socialLinks}
            />
          </div>

          <div className="bg-white shadow-lg rounded-xl py-6 space-y-5">
            <div className="py-3 bg-tabColor px-10 xl:px-20">
              <ul className="flex flex-wrap gap-x-10 gap-y-3 [&>li]:p-2 [&>li]:rounded-full">
                <li
                  className={`text-lg lg:text-2xl font-workSans font-medium cursor-pointer hover:text-theme ${
                    tab === "services"
                      ? "text-theme bg-themeGray"
                      : "text-black"
                  }`}
                  onClick={() => {
                    setTab("services");
                  }}
                >
                  Services
                </li>
                <li
                  className={`text-lg lg:text-2xl font-workSans font-medium cursor-pointer hover:text-theme ${
                    tab === "time slots"
                      ? "text-theme bg-themeGray"
                      : "text-black"
                  }`}
                  onClick={() => {
                    setTab("time slots");
                  }}
                >
                  Time Slots
                </li>
                <li
                  className={`text-lg lg:text-2xl font-workSans font-medium cursor-pointer hover:text-theme ${
                    tab === "earning methods"
                      ? "text-theme bg-themeGray"
                      : "text-black"
                  }`}
                  onClick={() => {
                    setTab("earning methods");
                  }}
                >
                  Earning methods
                </li>
                <li
                  className={`text-lg lg:text-2xl font-workSans font-medium cursor-pointer hover:text-theme ${
                    tab === "reviews" ? "text-theme bg-themeGray" : "text-black"
                  }`}
                  onClick={() => {
                    setTab("reviews");
                  }}
                >
                  Reviews
                </li>
                <li
                  className={`text-lg lg:text-2xl font-workSans font-medium cursor-pointer hover:text-theme ${
                    tab === "service history"
                      ? "text-theme bg-themeGray"
                      : "text-black"
                  }`}
                  onClick={() => {
                    setTab("service history");
                  }}
                >
                  Service History
                </li>
              </ul>
            </div>

            <div className="px-5 h-full">
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
                    {
                      data?.data?.employee?.employee?.employeeWagesMethod
                        ?.wagesMethod?.methodName
                    }
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
              ) : tab === "service history" ? (
                <div className="space-y-3">
                  <h2 className="text-2xl font-workSans font-medium">
                    Service History
                  </h2>
                  <MyDataTable
                    columns={columns}
                    data={datas}
                    placeholder="Search "
                  />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      }
    />
  );
}
