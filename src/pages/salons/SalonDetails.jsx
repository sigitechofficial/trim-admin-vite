// @ts-nocheck
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { FaArrowLeft } from "react-icons/fa";
import SalonProfileCard from "../../components/SalonProfileCard";
import { HiOutlineStar } from "react-icons/hi2";
import TeamMemberCard from "../../components/TeamMemberCard";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";
import { BASE_URL } from "../../utilities/URL";
import { Accordion, AccordionTab } from 'primereact/accordion';

export default function SalonDetails() {
  const [tab, setTab] = useState("about");
  const { data } = GetAPI(`admin/salon-detail/${JSON.parse(localStorage.getItem('salonID'))}`);

  const handleTime = (day) => {
    const temp = data?.data?.detail?.times?.find(obj => obj?.day.toLowerCase() === day.toLowerCase())
    if (temp) {
      return `${temp?.openingTime} - ${temp?.closingTime}`
    }
    else {
      return 'Closed'
    }
  }

  return data.length === 0 ? (
    <Loader />
  ) : (
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
            <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
              Barbershop Details
            </h2>
          </div>

          <div>
            <SalonProfileCard
              shadow={true}
              coverImage={data?.data?.detail?.coverImage}
              bgColor="bg-white"
              salonName={data?.data?.detail?.salonName}
              salonAverageRating={data?.data?.detail?.salonAverageRating}
              ratingCount={data?.data?.detail?.ratingCount}
              salonAddress={`${data?.data?.detail?.addressDB?.streetAddress},${data?.data?.detail?.addressDB?.district},${data?.data?.detail?.addressDB?.city},${data?.data?.detail?.addressDB?.country}`}
              socialLinks={data?.data?.socialLinks}
            />
          </div>

          <div className="bg-white shadow-lg rounded-xl py-6 space-y-5">
            <div className="py-3 bg-tabColor px-10 xl:px-20">
              <ul className="flex flex-wrap gap-x-10 gap-y-3">
                <li
                  className={`text-lg lg:text-2xl font-workSans font-medium cursor-pointer hover:text-theme ${tab === "about" ? "text-theme" : "text-black"
                    }`}
                  onClick={() => {
                    setTab("about");
                  }}
                >
                  About
                </li>
                <li
                  className={`text-lg lg:text-2xl font-workSans font-medium cursor-pointer hover:text-theme ${tab === "gallery" ? "text-theme" : "text-black"
                    }`}
                  onClick={() => {
                    setTab("gallery");
                  }}
                >
                  Gallery
                </li>
                <li
                  className={`text-lg lg:text-2xl font-workSans font-medium cursor-pointer hover:text-theme ${tab === "services" ? "text-theme" : "text-black"
                    }`}
                  onClick={() => {
                    setTab("services");
                  }}
                >
                  Services
                </li>
                <li
                  className={`text-lg lg:text-2xl font-workSans font-medium cursor-pointer hover:text-theme ${tab === "reviews" ? "text-theme" : "text-black"
                    }`}
                  onClick={() => {
                    setTab("reviews");
                  }}
                >
                  Reviews
                </li>
                <li
                  className={`text-lg lg:text-2xl font-workSans font-medium cursor-pointer hover:text-theme ${tab === "days & hours" ? "text-theme" : "text-black"
                    }`}
                  onClick={() => {
                    setTab("days & hours");
                  }}
                >
                  Days & hours
                </li>
                <li
                  className={`text-lg lg:text-2xl font-workSans font-medium cursor-pointer hover:text-theme ${tab === "team members" ? "text-theme" : "text-black"
                    }`}
                  onClick={() => {
                    setTab("team members");
                  }}
                >
                  Team Members
                </li>
              </ul>
            </div>

            <div className="px-10 xl:px-20 h-full">
              {tab === "about" ? (
                <div className="space-y-3">
                  <h2 className="text-2xl font-workSans font-medium">About</h2>
                  <p className="text-themeLightGray font-workSans font-medium">
                    {data?.data?.detail?.description}
                  </p>
                </div>
              ) : tab === "gallery" ? (
                <div className="grid grid-cols-6 gap-x-4">
                  {data?.data?.detail?.salonImages?.map((obj, i) => {
                    return <div key={i} className="w-full">
                      <img
                        src={`${BASE_URL}${obj?.imageUrl}`}
                        alt=""
                        className="rounded-xl w-full h-full object-fill"
                      />
                    </div>
                  })}
                  {/* <div className="grid grid-rows-3 gap-y-4">
                    <div className="row-span-2">
                      <img
                        src="/images/barber.webp"
                        alt=""
                        className="rounded-xl w-full h-full object-cover"
                      />
                    </div>
                    <div className="row-span-1">
                      <img
                        src="/images/barber.webp"
                        alt=""
                        className="rounded-xl w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="grid grid-rows-3 gap-y-4">
                    <div className="row-span-3">
                      <img
                        src="/images/salon-detail-img.webp"
                        alt=""
                        className="rounded-xl w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="grid grid-rows-3 gap-y-4">
                    <div className="row-span-1">
                      <img
                        src="/images/barber.webp"
                        alt=""
                        className="rounded-xl w-full h-full object-cover"
                      />
                    </div>
                    <div className="row-span-2">
                      <img
                        src="/images/barber.webp"
                        alt=""
                        className="rounded-xl w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="grid grid-rows-4 gap-y-4">
                    <div className="row-span-2">
                      <img
                        src="/images/barber.webp"
                        alt=""
                        className="rounded-xl w-full h-full object-cover"
                      />
                    </div>
                    <div className="row-span-2">
                      <img
                        src="/images/barber.webp"
                        alt=""
                        className="rounded-xl w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="grid grid-rows-3 gap-y-4">
                    <div className="row-span-3">
                      <img
                        src="/images/salon-detail-img.webp"
                        alt=""
                        className="rounded-xl w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="grid grid-rows-3 gap-y-4">
                    <div className="row-span-1">
                      <img
                        src="/images/barber.webp"
                        alt=""
                        className="rounded-xl w-full h-full object-cover"
                      />
                    </div>
                    <div className="row-span-2">
                      <img
                        src="/images/barber.webp"
                        alt=""
                        className="rounded-xl w-full h-full object-cover"
                      />
                    </div>
                  </div> */}
                </div>
              ) : tab === "services" ? (
                <div className="space-y-3">
                  <Accordion className="!rounded-t-lg">
                    {data?.data?.detail?.categories?.map(obj => <AccordionTab header={obj?.categoryName} className="bg-theme text-white  overflow-hidden">
                      {
                        obj?.services?.map((service, j) => <div>
                          <div className={`text-white border border-theme bg-theme flex justify-between px-4 py-2 m-0`}>
                            <div className="flex flex-col">
                              <div className="font-workSans font-medium">
                                {service?.serviceName}
                              </div>
                              <p className="text-sm rounded">{service?.duration} min</p>
                            </div>
                            <div className="font-workSans font-medium">${service?.price}/hr</div>
                          </div>
                        </div>)
                      }
                    </AccordionTab>)}
                  </Accordion>
                </div>
              ) : tab === "reviews" ? (
                <div className="space-y-3">
                  <h2 className="text-2xl font-workSans font-medium">
                    Reviews
                  </h2>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                    {data?.data?.detail?.ratings?.map(obj => <div className="bg-white rounded-lg shadow-lg p-4 space-y-3">
                      <div className="flex justify-between">
                        <div className="flex gap-x-3">
                          <img
                            src={`${BASE_URL}${obj?.user?.image}`}
                            alt="salon-detail"
                            className="w-16 h-16 rounded-full"
                          />
                          <div className="space-y-1">
                            <h2 className="text-xl font-medium font-workSans">
                              {/* Ehsan Shaukat */}
                              {obj?.user?.firstName} {obj?.user?.lastName}
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
                          {obj?.createdAt.slice(0, 10)}
                        </div>
                      </div>
                      <div className="text-labelColor font-workSans font-medium">
                        {/* Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id es Excepteur
                        sint occaecat cupidatat non proident, sunt in culpa qui
                        officia deserunt mollit anim id es */}
                        {obj?.comment}
                      </div>
                    </div>)}
                  </div>
                </div>
              ) : tab === "days & hours" ? (
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
                      <li className="text-xl font-workSans">{handleTime('monday')}</li>
                      <li className="text-xl font-workSans">{handleTime('tuesday')}</li>
                      <li className="text-xl font-workSans">{handleTime('wednesday')}</li>
                      <li className="text-xl font-workSans">{handleTime('thursday')}</li>
                      <li className="text-xl font-workSans">{handleTime('friday')}</li>
                      <li className="text-xl font-workSans">{handleTime('saturday')}</li>
                      <li className="text-xl font-workSans">{handleTime('sunday')}</li>
                    </ul>
                  </div>
                </div>
              ) : tab === "team members" ? (

                <TeamMemberCard employees={data?.data?.detail?.employees} />

              ) : null}
            </div>
          </div>
        </div>
      }
    />
  );
}
