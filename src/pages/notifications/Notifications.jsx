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
} from "@chakra-ui/react";
import { AiFillNotification } from "react-icons/ai";
import { BsExclamationCircle } from "react-icons/bs";

export default function Notifications() {
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const { data, reFetch } = GetAPI("/admin/notifications","push_notifications");

  const handleDelete = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await PutAPI(
      `admin/delete-notification/${JSON.parse(
        localStorage.getItem("deleteNotificationID")
      )}`,"push_notifications"
    );
    if (res?.data?.status === "1") {
      setLoading(false);
      reFetch();
      setModal(false);
      success_toaster(res?.data?.message);
      localStorage.removeItem("deleteNotificationID");
    } else {
      setLoading(false);
      error_toaster(res?.data?.message);
      localStorage.removeItem("deleteNotificationID");
    }
  };

  const handleResendNotification = async (id) => {
    setLoading2(true);
    const res = await PostAPI(`admin/re-send-notification/${id}`,"push_notifications");
    if (res?.data?.status === "1") {
      setLoading2(false);
      reFetch();
      success_toaster(res?.data?.message);
    } else {
      setLoading2(false);
      error_toaster(res?.data?.message);
    }
  };

  const closeModal = () => {
    setModal(false);
  };

  const columns = [
    { field: "sn", header: "Sn" },
    { field: "to", header: "Send to" },
    { field: "title", header: "Title" },
    { field: "body", header: "Message" },
    { field: "at", header: "Date" },
    { field: "action", header: "Action" },
  ];

  const datas = [];
  data?.data?.map((values, i) => {
    return datas.push({
      sn: i + 1,
      to: values?.to,
      title: values?.title,
      body: values?.body,
      at: values?.at.slice(2, 10),
      action: (
        <div className="flex gap-x-2 items-center">
          <button className="border border-red-400 rounded-md p-2 text-red-400">
            <MdDelete
              size={24}
              onClick={() => {
                localStorage.setItem("deleteNotificationID", values?.id);
                setModal(true);
              }}
            />
          </button>
          {/* <div className="border "> */}
          <button>
            <AiFillNotification
              size={28}
              onClick={() => handleResendNotification(values?.id)}
            />
          </button>
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
          <div className="w-full flex justify-between items-center">
            <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
              All Notifications <span className="text-labelColor">(260)</span>
            </h2>
            <button
              className="text-white bg-theme font-workSans font-medium border border-theme rounded-lg px-8 py-2.5 hover:bg-transparent
           hover:text-theme duration-200"
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
            <MyDataTable columns={columns} data={datas} />
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
                          Delete the Role
                        </h2>
                        <p className="text-labelColor font-workSans font-medium">
                          Are you sure you want to delete this Role?
                        </p>
                      </div>
                      <div className="flex gap-x-3">
                        <button
                          className="text-theme font-workSans font-medium border border-theme rounded-lg px-8 py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                          onClick={closeModal}
                        >
                          No
                        </button>
                        <button
                          className="text-theme font-workSans font-medium border border-theme rounded-lg px-8 py-2.5 hover:bg-theme
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
