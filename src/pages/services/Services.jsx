// @ts-nocheck
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { HiDotsVertical } from "react-icons/hi";
import { BsExclamationCircle } from "react-icons/bs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import GetAPI from "../../utilities/GetAPI";
import { BASE_URL } from "../../utilities/URL";
import Loader, { MiniLoader } from "../../components/Loader";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { PostAPI } from "../../utilities/PostAPI";
import { PutAPI } from "../../utilities/PutAPI";
import { DeleteAPI } from "../../utilities/DeleteAPI";

export default function Services() {
  const [modal, setModal] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [dropDownInd, setDropDownInd] = useState();
  const { data, reFetch } = GetAPI("admin/service-type/view", "services");
  const [loader, setLoader] = useState(false);
  const [serviceId, setServiceId] = useState("");
  const [updateImg, setUpdateImg] = useState(false);
  const [addService, setAddService] = useState({
    typeName: "",
    image: "",
    imgShow: "",
  });
  const [updateService, setUpdateService] = useState({
    id: "",
    updateTypeName: "",
    updateImage: "",
    updateImgShow: "",
  });

  const handleDropDown = (index) => {
    setDropDown(!dropDown);
    setDropDownInd(index);
  };

  const openModal = (type, id) => {
    setDropDown(false);
    setModalType(type);
    setModal(true);
    setUpdateImg(false);
    setServiceId(id);
  };

  const closeModal = () => {
    setModal(false);
    setAddService({
      typeName: "",
      image: "",
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAddService({
        ...addService,
        image: file,
        imgShow: imageUrl,
      });
    }
  };

  const handleUpdateImageChange = (e) => {
    setUpdateImg(true);
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUpdateService({
        ...updateService,
        updateImage: file,
        updateImgShow: imageUrl,
      });
    }
  };

  // Add New Service
  const addNewService = async () => {
    if (addService.typeName === "") {
      info_toaster("Please Add Service Name");
    } else if (addService.image === "") {
      info_toaster("Please Add Service Image");
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append("typeName", addService.typeName);
      formData.append("image", addService.image);
      let res = await PostAPI("admin/service-type", "services", formData);
      if (res?.data?.status === "1") {
        reFetch();
        setLoader(false);
        setModal(false);
        success_toaster(res?.data?.message);
        setAddService({
          typeName: "",
          image: "",
        });
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };

  // Update Service
  const editService = async () => {
    if (updateService.updateTypeName === "") {
      info_toaster("Please Add Service Name");
    } else if (updateService.updateImage === "") {
      info_toaster("Please Add Service Image");
    } else {
      setLoader(true);
      const formData = new FormData();
      formData.append("typeName", updateService.updateTypeName);
      formData.append("image", updateService.updateImg);
      let res = await PutAPI(
        `admin/service-type/edit/${updateService.id}`,
        "services",
        formData
      );
      if (res?.data?.status === "1") {
        reFetch();
        setLoader(false);
        setModal(false);
        success_toaster(res?.data?.message);
      } else {
        setLoader(false);
        error_toaster(res?.data?.message);
      }
    }
  };

  // Delete Service
  const deleteService = async () => {
    setLoader(true);
    let res = await DeleteAPI(
      `admin/service-type/delete/${serviceId}`,
      "services"
    );
    if (res?.data?.status === "1") {
      reFetch();
      setModal(false);
      setLoader(false);
      success_toaster(res?.data?.message);
    } else {
      setLoader(false);
      error_toaster(res?.data?.message);
    }
  };

  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="space-y-5">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
              All Services
            </h2>
            <button
              className="text-white bg-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-transparent
             hover:text-theme duration-200"
              onClick={() => {
                openModal("Add New Service");
              }}
            >
              + Add New Service Type
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-10 pt-5">
            {data?.data?.map((services, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-lg shadow-textShadow flex flex-col gap-y-4 justify-center items-center relative"
              >
                <img
                  src={`${BASE_URL}${services?.image}`}
                  alt="services"
                  className="w-20 h-20 object-contain"
                />
                <p className="text-xl font-workSans font-medium capitalize">
                  {services?.typeName}
                </p>

                <button
                  className="absolute top-3 right-3 flex justify-center items-center"
                  onClick={() => handleDropDown(index)}
                >
                  <HiDotsVertical size={24} />
                </button>
                {dropDown && dropDownInd === index ? (
                  <div className="bg-white border flex flex-col absolute top-3 right-8 ">
                    <button
                      className="px-4 py-3 font-workSans font-medium hover:bg-theme hover:text-white duration-200 border-b"
                      onClick={() => {
                        openModal("Edit Service");
                        setUpdateService({
                          id: services?.id,
                          updateTypeName: services?.typeName,
                          updateImgShow: services?.image,
                        });
                      }}
                    >
                      Edit Service
                    </button>
                    <button
                      className="px-4 py-3 font-workSans font-medium hover:bg-theme hover:text-white duration-200"
                      onClick={() => {
                        openModal("Delete Service", services?.id);
                      }}
                    >
                      Delete Service
                    </button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            ))}
          </div>
          <Modal onClose={closeModal} isOpen={modal} size={"xl"} isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              {loader ? (
                <div
                  className={
                    modalType === "Delete Service"
                      ? "w-[576px] h-[224px]"
                      : "w-[576px] h-[393px]"
                  }
                >
                  <MiniLoader />
                </div>
              ) : (
                <ModalBody>
                  {modalType === "Delete Service" ? (
                    <div className="flex flex-col justify-center items-center p-5 space-y-4">
                      <BsExclamationCircle size={30} color="#12466F" />
                      <div className="text-center space-y-2">
                        <h2 className="text-xl font-workSans font-medium">
                          Delete the Service?
                        </h2>
                        <p className="text-labelColor font-workSans font-medium">
                          Are you sure you want to delete this Serivce?
                        </p>
                      </div>
                      <div className="flex gap-x-3">
                        <button
                          className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                          onClick={closeModal}
                        >
                          No
                        </button>
                        <button
                          className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                          onClick={deleteService}
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  ) : modalType === "Add New Service" ? (
                    <div className="flex flex-col justify-center items-center space-y-6 py-4">
                      <div className="text-center">
                        <h2 className="text-xl font-workSans font-medium uppercase">
                          Add New Service
                        </h2>
                      </div>

                      <div className="space-y-2 w-full">
                        <label
                          htmlFor="typeName"
                          className="font-workSans font-medium"
                        >
                          Service Name
                        </label>
                        <input
                          value={addService.typeName}
                          onChange={(e) =>
                            setAddService({
                              ...addService,
                              [e.target.name]: e.target.value,
                            })
                          }
                          type="text"
                          id="typeName"
                          name="typeName"
                          className="w-full h-12 rounded-md px-3 outline-none border font-workSans font-medium"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="image"
                          className="w-[520px] flex justify-center items-center border border-theme cursor-pointer"
                        >
                          {addService.imgShow ? (
                            <img src={addService.imgShow} alt="banner" />
                          ) : (
                            <div className="flex flex-col items-center gap-y-3 p-5">
                              <img
                                src="/images/input-img-blue.webp"
                                alt="banner"
                                className="w-12 h-10"
                              />
                              <span className="text-theme font-workSans font-medium">
                                Upload Image
                              </span>
                            </div>
                          )}
                        </label>

                        <input
                          onChange={handleImageChange}
                          type="file"
                          name="image"
                          id="image"
                          hidden
                        />
                      </div>

                      <div className="flex gap-x-3">
                        <button
                          className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                        <button
                          className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                          onClick={addNewService}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center space-y-6 py-4">
                      <div className="text-center">
                        <h2 className="text-xl font-workSans font-medium uppercase">
                          Edit Service
                        </h2>
                      </div>

                      <div className="space-y-2 w-full">
                        <label
                          htmlFor="updateTypeName"
                          className="font-workSans font-medium"
                        >
                          Service Name
                        </label>
                        <input
                          value={updateService.updateTypeName}
                          onChange={(e) =>
                            setUpdateService({
                              ...updateService,
                              [e.target.name]: e.target.value,
                            })
                          }
                          type="text"
                          id="updateTypeName"
                          name="updateTypeName"
                          className="w-full h-12 rounded-md px-3 outline-none border font-workSans font-medium"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="updateImage"
                          className="w-[520px] flex justify-center items-center border border-theme cursor-pointer"
                        >
                          <img
                            src={
                              updateImg
                                ? updateService.updateImgShow
                                : `${BASE_URL}${updateService.updateImgShow}`
                            }
                            alt="banner"
                          />
                        </label>

                        <input
                          onChange={handleUpdateImageChange}
                          type="file"
                          name="updateImage"
                          id="updateImage"
                          hidden
                        />
                      </div>

                      <div className="flex gap-x-3">
                        <button
                          className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                     hover:text-white duration-200"
                          onClick={closeModal}
                        >
                          Cancel
                        </button>
                        <button
                          className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                     hover:text-white duration-200"
                          onClick={editService}
                        >
                          Update
                        </button>
                      </div>
                    </div>
                  )}
                </ModalBody>
              )}
            </ModalContent>
          </Modal>
        </div>
      }
    />
  );
}
