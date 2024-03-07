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
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay } from "@chakra-ui/react";
import { AiFillNotification } from "react-icons/ai"

export default function Notifications() {
  const navigate = useNavigate()
  const [modal, setModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { data, reFetch } = GetAPI('/admin/notifications')

  const handleDelete = async (e) => {
    e.preventDefault()
    setLoading(true)
    const res = await PutAPI(`admin/delete-notification/${JSON.parse(localStorage.getItem('deleteNotificationID'))}`)
    // console.log("🚀 ~ handleDelete ~ res:", res)
    if (res?.data?.status === "1") {
      setLoading(false)
      reFetch()
      setModal(false)
      success_toaster(res?.data?.message);
      localStorage.removeItem('deleteNotificationID')
    } else {
      setLoading(false)
      error_toaster(res?.data?.message);
      localStorage.removeItem('deleteNotificationID')
    }
  }

  const handleResendNotification = async (id) => {
    setLoading(true)
    const res = await PostAPI(`admin/re-send-notification/${id}`)
    if (res?.data?.status === "1") {
      setLoading(false)
      reFetch()
      success_toaster(res?.data?.message);
    } else {
      setLoading(false)
      error_toaster(res?.data?.message);
    }
  }

  const closeModal = () => {
    setModal(false)
  }

  const columns = [
    { field: "sn", header: "Sn" },
    { field: "to", header: "Send to" },
    { field: "title", header: "Title" },
    { field: "body", header: "Message" },
    { field: "at", header: "Date" },
    { field: "action", header: "Action" },
  ]

  const datas = []
  data?.data?.map((values, i) => {
    return datas.push({
      sn: i + 1,
      to: values?.to,
      title: values?.title,
      body: values?.body,
      at: values?.at.slice(2, 10),
      action: <div className="flex gap-x-2 items-center">
        <button className="border border-red-400 rounded-md p-2 text-red-400">
          <MdDelete size={24} onClick={() => {
            localStorage.setItem('deleteNotificationID', values?.id)
            setModal(true)
          }} />
        </button>
        {/* <div className="border "> */}
        <button>
          <AiFillNotification size={28}
            onClick={() => handleResendNotification(values?.id)}
          />
        </button>
        {/* </div> */}

      </div>
    })
  })

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
          {loading ? <MiniLoader /> : <MyDataTable columns={columns} data={datas} />}

          <Modal onClose={closeModal} isOpen={modal} isCentered size={"lg"}>
            <ModalOverlay />
            <form onSubmit={handleDelete} className="relative">
              <ModalContent>
                <ModalCloseButton />
                {loading ? <MiniLoader /> : <ModalBody>
                  <p className="text-center text-lg py-5">Are you sure you want to delete ?</p>
                </ModalBody>}
                <ModalFooter>
                  <button
                    className={`text-theme font-workSans font-medium border border-theme rounded-lg px-8 py-2.5 hover:bg-theme
                         hover:text-white duration-200 ${loading ? 'hidden' : 'block'}`}
                    type="submit"
                  >
                    Submit
                  </button>
                </ModalFooter>
              </ModalContent>
            </form>
          </Modal>
        </div>
      }
    />
  );
}
