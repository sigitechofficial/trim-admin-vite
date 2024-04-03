// @ts-nocheck
import React, { useState } from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import GetAPI from "../../utilities/GetAPI";
import Loader, { MiniLoader } from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { PostAPI } from "../../utilities/PostAPI";
import { PutAPI } from "../../utilities/PutAPI";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Tooltip,
} from "@chakra-ui/react";
import { AiFillNotification } from "react-icons/ai";
import { BsExclamationCircle } from "react-icons/bs";
import { formateDate } from "../../utilities/DateTime";
import { RiNotificationBadgeFill } from "react-icons/ri";

export default function Notifications() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const { data, reFetch } = GetAPI(
    "/admin/notifications",
    "push_notifications"
  );

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await PutAPI(
      `admin/delete-notification/${JSON.parse(
        localStorage.getItem("deleteNotificationID")
      )}`,
      "push_notifications"
    );
    if (res?.data?.status === "1") {
      setLoading(false);
      reFetch();
      setModal(false);
      success_toaster("Notification deleted successfully");
      localStorage.removeItem("deleteNotificationID");
    } else {
      setLoading(false);
      error_toaster(res?.data?.message);
      localStorage.removeItem("deleteNotificationID");
    }
  };

  const handleResendNotification = async (id) => {
    setLoading2(true);
    const res = await PostAPI(
      `admin/re-send-notification/${id}`,
      "push_notifications"
    );
    if (res?.data?.status === "1") {
      setLoading2(false);
      reFetch();
      success_toaster("Notification resend successfully");
    } else {
      setLoading2(false);
      error_toaster(res?.data?.message);
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  const columns = [
    { field: "sn", header: "Sn", sort: true },
    { field: "to", header: "Send to" },
    { field: "title", header: "Title", sort: true },
    { field: "body", header: "Message", sort: true },
    { field: "at", header: "Date", sort: true },
    { field: "action", header: "Action" },
  ];

  const datas = [];
  data?.data?.map((values, i) => {
    return datas.push({
      sn: i + 1,
      to: values?.to,
      title: values?.title,
      body: values?.body,
      at: formateDate(values?.at.slice(0, 11)),
      action: (
        <div className="flex gap-x-2 items-center">
          <Tooltip label="Delete notification">
            <button className="border border-red-400 rounded-md p-2 text-red-400">
              <MdDelete
                size={24}
                onClick={() => {
                  localStorage.setItem("deleteNotificationID", values?.id);
                  setModal(true);
                }}
              />
            </button>
          </Tooltip>
          {/* <div className="border "> */}
          <Tooltip label="Resend notification">
            <button>
              <RiNotificationBadgeFill
                size={28}
                onClick={() => handleResendNotification(values?.id)}
              />
            </button>
          </Tooltip>
          {/* </div> */}
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
          <div className="w-full flex flex-col max-sm:gap-y-2 sm:flex-row sm:justify-between sm:items-center">
            <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
              All Notifications <span className="text-labelColor">(260)</span>
            </h2>
            <button
              className="text-white bg-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-transparent
           hover:text-theme duration-200 max-sm:w-60"
              onClick={() => {
                navigate("/send-notifications");
              }}
            >
              Send New Notification
            </button>
          </div>

          {loading2 ? (
            <MiniLoader />
          ) : (
            <MyDataTable
              columns={columns}
              data={datas}
              placeholder={"Search by Send to, Title, Message, date "}
            />
          )}

          <Modal onClose={closeModal} isOpen={modal} isCentered size={"lg"}>
            <ModalOverlay />
            <form onSubmit={handleDelete} className="relative">
              <ModalContent className="py-5">
                <ModalCloseButton />
                {loading ? (
                  <div className="w-[576px] h-[224px]">
                    <MiniLoader />
                  </div>
                ) : (
                  <ModalBody>
                    <div className="flex flex-col justify-center items-center p-5 space-y-4">
                      <BsExclamationCircle size={30} color="#12466F" />
                      <div className="text-center space-y-2">
                        <h2 className="text-xl font-workSans font-medium">
                          Delete Notification
                        </h2>
                        <p className="text-labelColor font-workSans font-medium">
                          Are you sure you want to delete this Notification?
                        </p>
                      </div>
                      <div className="flex gap-x-3">
                        <button
                          className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                          onClick={closeModal}
                          type="button"
                        >
                          No
                        </button>
                        <button
                          className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                          type="Submit"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </ModalBody>
                )}
              </ModalContent>
            </form>
          </Modal>
        </div>
      }
    />
  );
}
