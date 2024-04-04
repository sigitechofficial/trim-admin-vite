// @ts-nocheck
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Loader from "../../components/Loader";
import ProfileCard from "../../components/ProfileCard";
import MyDataTable from "../../components/MyDataTable";

import GetAPI from "../../utilities/GetAPI";
import formatDateFromDB, {
  formatTimeFromDB,
  formateDate,
  formateDateDayName,
} from "../../utilities/DateTime";
import { FaArrowLeft, FaEye, FaUser } from "react-icons/fa";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from "@chakra-ui/react";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";

export default function CustomerDetails() {
  const { data } = GetAPI(
    `admin/customer-detail/${localStorage.getItem("customerID")}`,
    "customer_management"
  );

  const [modal, setModal] = useState(false);
  const [bookingData, setBookingData] = useState("");

  const openModal = (data) => {
    setBookingData(data);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const columns = [
    { field: "sn", header: "Sn" },
    // { field: "id", header: "Id" },
    {
      field: "salonName",
      header: "Salon name",
      sort: true,
    },
    {
      field: "services",
      header: "Services",
      sort: true,
    },
    {
      field: "scheduleDate",
      header: "Schedule Date",
      sort: true,
    },
    {
      field: "scheduleTime",
      header: "Schedule Time",
      sort: true,
    },
    {
      field: "createdAt",
      header: "Created At",
      sort: true,
    },
    {
      field: "price",
      header: "Price",
      sort: true,
    },
    {
      field: "status",
      header: "Status",
    },
    {
      field: "action",
      header: "Action",
    },
  ];

  const datas = [];
  data?.data?.bookings?.map((values, index) => {
    return datas.push({
      sn: index + 1,
      // id: values?.id,
      salonName: values?.salonDetail?.salonName,
      services: values?.jobs
        ?.map((dat, ind) => dat?.service?.serviceName)
        .join(", "),
      scheduleDate: formateDate(values?.on),
      scheduleTime: `${formatTimeFromDB(
        values?.startTime
      )} to ${formatTimeFromDB(values?.endTime)}`,

      createdAt: formatDateFromDB(values?.createdAt),
      price: values?.total,
      status: (
        <>
          {values?.status === "complete" ? (
            <div className="bg-[#21965314] text-themeGreen font-semibold p-2 rounded-md flex justify-center">
              Completed
            </div>
          ) : values?.status === "pending" ? (
            <div className="bg-[#EC855914] text-[#EC8559] font-semibold p-2 rounded-md flex justify-center">
              Pending
            </div>
          ) : values?.status === "book" ? (
            <div className="bg-[#12466F14] text-theme font-semibold p-2 rounded-md flex justify-center">
              Booked
            </div>
          ) : (
            <div className="bg-[#EE4A4A14] text-[#EE4A4A] font-semibold p-2 rounded-md flex justify-center">
              Cancelled
            </div>
          )}
        </>
      ),

      action: (
        <button
          className="border border-yellow-400 rounded-md p-2 text-yellow-400"
          onClick={() => {
            openModal(values);
          }}
        >
          <FaEye size={24} />
        </button>
      ),
    });
  });

  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div>
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
                Customer Profile
              </h2>
            </div>
            <div className="bg-white p-6 rounded-lg space-y-6 grid grid-cols-1 xl:grid-cols-2">
              <ProfileCard
                bgColor="bg-themeGray"
                shadow="shadow-none"
                employeeName={`${data?.data?.firstName} ${data?.data?.lastName}`}
                coverImage={data?.data?.image}
                employeeID={data?.data?.id}
                employeeEmail={data?.data?.email}
                employeePhoneNumber={`${data?.data?.countryCode}-${data?.data?.phoneNum}`}
              />
            </div>
          </div>

          <div className="py-5 space-y-5">
            <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
              Customer Details
            </h2>

            <MyDataTable columns={columns} data={datas} />

            <Modal onClose={closeModal} isOpen={modal} isCentered size={"xl"}>
              <ModalOverlay />
              <ModalContent>
                <ModalCloseButton />
                <ModalBody>
                  <div className="py-10 space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="text-[#323F4B]">
                        <h4 className="font-chivo">
                          {formateDateDayName(bookingData?.on)}
                        </h4>
                        <p className="text-lg font-semibold font-chivo">
                          {`${formatTimeFromDB(
                            bookingData?.startTime
                          )} - ${formatTimeFromDB(bookingData?.endTime)}`}
                        </p>
                      </div>

                      {bookingData?.status === "complete" ? (
                        <div className="bg-[#21965314] text-themeGreen font-semibold p-2 rounded-md flex justify-center">
                          Completed
                        </div>
                      ) : bookingData?.status === "pending" ? (
                        <div className="bg-[#EC855914] text-[#EC8559] font-semibold p-2 rounded-md flex justify-center">
                          Pending
                        </div>
                      ) : bookingData?.status === "book" ? (
                        <div className="bg-[#12466F14] text-theme font-semibold p-2 rounded-md flex justify-center">
                          Booked
                        </div>
                      ) : (
                        <div className="bg-[#EE4A4A14] text-[#EE4A4A] font-semibold p-2 rounded-md flex justify-center">
                          Cancelled
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-theme text-xl font-workSans font-medium">
                        Customer Details
                      </h2>
                      <ul>
                        <li className="flex items-center gap-x-2 font-medium font-workSans">
                          <FaUser />
                          <span>{`${data?.data?.firstName} ${data?.data?.lastName}`}</span>
                        </li>
                        <li className="flex items-center gap-x-2 font-medium font-workSans">
                          <MdOutlineEmail />
                          <span>{data?.data?.email}</span>
                        </li>
                        <li className="flex items-center gap-x-2 font-medium font-workSans">
                          <FiPhone />
                          <span>{`${data?.data?.countryCode}-${data?.data?.phoneNum}`}</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex justify-between">
                      <h2 className="text-theme text-xl font-workSans font-medium">
                        Salon
                      </h2>
                      <p className="text-[#323F4B] font-workSans font-medium">
                        {bookingData?.salonDetail?.salonName}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h2 className="text-theme text-xl font-workSans font-medium">
                        Services list
                      </h2>
                      {bookingData?.jobs?.map((job, ind) => (
                        <div className="flex justify-between items-center capitalize">
                          <div className="text-[#323F4B] font-workSans font-medium">
                            {job?.service?.serviceName}
                          </div>
                          <div className="text-[#323F4B99] font-workSans font-medium">
                            By {job?.employee?.user?.firstName}
                          </div>
                          <div className="text-[#323F4B] font-workSans font-medium">
                            {job?.total}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between">
                      <h2 className="text-[#323F4B] text-xl font-chivo font-semibold">
                        Total
                      </h2>
                      <p className="text-[#323F4B] text-xl font-workSans font-semibold">
                        {bookingData?.total}
                      </p>
                    </div>
                  </div>
                </ModalBody>
              </ModalContent>
            </Modal>
          </div>
        </div>
      }
    />
  );
}
