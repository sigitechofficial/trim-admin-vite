// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineStar } from "react-icons/hi2";
import { LuClock3 } from "react-icons/lu";
import ProfileCard from "../../components/ProfileCard";
import { FaArrowLeft } from "react-icons/fa";
import SalonProfileCard from "../../components/SalonProfileCard";
import GetAPI from "../../utilities/GetAPI";
import { BASE_URL } from "../../utilities/URL";
import Loader from "../../components/Loader";

export default function BookingDetails() {
  const { data } = GetAPI(`admin/appointment-detail/${JSON.parse(localStorage.getItem('bookingDetailsID'))}`,"bookings")

  return data?.length === 0 ? (
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
              Booking Details
            </h2>
          </div>
          <div className="bg-white p-5 rounded-lg space-y-6">
            <div className="grid xl:grid-cols-2 gap-5">
              <ProfileCard shadow="shadow-none" bgColor="bg-themeGray"
                employeeName={`${data?.data?.appointments?.user?.firstName} ${data?.data?.appointments?.user?.lastName}`}
                coverImage={data?.data?.appointments?.user?.image}
                employeeID={data?.data?.appointments?.user?.id} 
                employeeEmail={data?.data?.appointments?.user?.email}
                employeePhoneNumber={`${data?.data?.appointments?.user?.countryCode} ${data?.data?.appointments?.user?.phoneNum}`}
              />

              <SalonProfileCard shadow={false}
                coverImage={data?.data?.appointments?.salonDetail?.coverImage}
                bgColor="bg-themeGray"
                salonName={data?.data?.appointments?.salonDetail?.salonName}
                salonAverageRating={data?.data?.appointments?.salonDetail?.salonAverageRating}
                ratingCount={data?.data?.appointments?.salonDetail?.ratingCount}
                salonAddress={`${data?.data?.appointments?.salonDetail?.addressDB?.streetAddress},${data?.data?.appointments?.salonDetail?.addressDB?.district},${data?.data?.appointments?.salonDetail?.addressDB?.city},${data?.data?.appointments?.salonDetail?.addressDB?.country}`}
                socialLinks={data?.data?.socialLinks}
              />
            </div>

            <div className="bg-themeGray rounded-2xl p-4 lg:p-6 space-y-8">

              {
                data?.data?.appointments?.jobs?.map((job, i) => <div key={i}>
                  <div className="flex justify-between w-full">
                    <div className="flex gap-x-4">
                      <img
                        src={job?.employee?.user?.image ? `${BASE_URL}${job?.employee?.user?.image}` : `/images/defaultProfileImg.webp`} // agar profile ati to theek nahi to defaultProfileImg from public
                        alt="user"
                        className="w-16 h-16 object-contain"
                      />
                      <div className="space-y-2">
                        <h2 className="text-2xl font-medium font-workSans">
                          {/* Jimmy */}
                          {
                            job?.employee?.user ? `${job?.employee?.user?.firstName}  ${job?.employee?.user?.lastName}` : 'No Employee Assigned Yet'
                          }

                        </h2>
                        {/* <div className="flex gap-x-1 items-center">
                          <HiOutlineStar />
                          <HiOutlineStar />
                          <HiOutlineStar />
                          <HiOutlineStar />
                          <HiOutlineStar />
                          <span className="text-themeLightGray font-workSans font-medium">
                            (126 Clients)
                          </span>
                        </div> */}
                      </div>
                    </div>

                    {/* <div className="space-y-2">
                      <li className="flex items-center gap-x-2 text-themeLightGray font-medium font-workSans">
                        <IoCalendarOutline />
                        <span>Mon - Fri</span>
                      </li>
                      <li className="flex items-center gap-x-2 text-themeLightGray font-medium font-workSans">
                        <LuClock3 />
                        <span>11:00am - 11:00pm</span>
                      </li>
                    </div> */}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-xl font-workSans font-medium">Service</h4>
                    <div className="border border-inputBorder rounded-lg flex justify-between p-4">
                      <div className="font-workSans font-medium">
                        {job?.service?.serviceName} 
                        <span className="text-themeLightGray"> ({job?.duration} minutes)</span>
                      </div>
                      <div className="font-workSans font-medium">{job?.total} $</div>
                    </div>
                  </div>
                </div>)
              }

              {data?.data?.appointments?.jobs.length > 0 ?
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <h2 className="text-themeLightGray font-workSans font-medium">
                      Tip
                    </h2>
                    <p className="font-workSans font-medium">$ {data?.data?.appointments?.tip}</p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="text-themeLightGray font-workSans font-medium">
                      Discount
                    </h2>
                    <p className="font-workSans font-medium">$ {data?.data?.appointments?.discount}</p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="text-themeLightGray font-workSans font-medium">
                      Sub Total
                    </h2>
                    <p className="font-workSans font-medium">$ {data?.data?.appointments?.subTotal}</p>
                  </div>
                  <div className="flex justify-between">
                    <h2 className="text-themeLightGray font-workSans font-medium">
                      Grand Total
                    </h2>
                    <p className="font-workSans font-medium">$ {data?.data?.appointments?.total}</p>
                  </div>
                </div> : <div><p className="text-center font-bold text-lg">No Service Utilized Yet</p> </div>
              }
            </div>
          </div>
        </div>
      }
    />
  );
}
