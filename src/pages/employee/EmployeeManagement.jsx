// @ts-nocheck
import React, { useState } from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import {
  Modal,
  ModalOverlay,
  ModalContent, 
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Select from "react-select";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import selectStyles from "../../utilities/SelectStyle";

export default function EmployeeManagement() {
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);
  //   const [modalType, setModalType] = useState(null);

  const openModal = (type) => {
    // setModalType(type);
    setModal(true); 
  };

  const closeModal = () => {
    setModal(false);
  };

  const columns = [
    {
      name: "Sr",
      selector: (row) => row.serialNo,
    },
    {
      name: "First Name",
      selector: (row) => row.fname,
    },
    {
      name: "Last Name",
      selector: (row) => row.lname,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Current Status",
      selector: (row) => row.status,
    },
    {
      name: "Change Status",
      selector: (row) => row.changeStatus,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      minWidth: "160px",
    },
  ];

  return (
    <Layout
      content={
        <div className="space-y-5">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
              All Employees <span className="text-labelColor">(260)</span>
            </h2>
            <button
              className="text-white bg-theme font-workSans font-medium border border-theme rounded-lg px-8 py-2.5 hover:bg-transparent
           hover:text-theme duration-200"
              onClick={() => {
                openModal("Add Employe");
              }}
            >
              + Add New Employee
            </button>
          </div>

          <MyDataTable columns={columns} />

          <Modal onClose={closeModal} isOpen={modal} isCentered size={"2xl"}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <div className="flex flex-col justify-center items-center space-y-6 pt-5 pb-4">
                  <div className="text-center">
                    <h2 className="text-xl font-workSans font-medium uppercase">
                      Add employee
                    </h2>
                  </div>

                  <div className="w-full space-y-2">
                    <div className="space-y-1">
                      <label
                        htmlFor="name"
                        className="text-sm text-labelColor font-workSans font-medium"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="email"
                        className="text-sm text-labelColor font-workSans font-medium"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                      />
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="phone"
                        className="text-sm text-labelColor font-workSans font-medium"
                      >
                        Phone No.
                      </label>
                      <div className="grid grid-cols-6 gap-x-3">
                        <PhoneInput
                          inputStyle={{
                            display: "block",
                            width: "100px",
                            paddingTop: "20px",
                            paddingBottom: "20px",
                            color: "black",
                            border: "1px solid #E2E8F0",
                            borderRadius: "6px",
                          }}
                          country={"pk"}
                          className="col-span-1"
                        />

                        <input
                          type="number"
                          id="phone"
                          className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor col-span-5"
                        />
                      </div>
                    </div>
                    <div className="space-y-1 relative">
                      <label
                        htmlFor="password"
                        className="text-sm text-labelColor font-workSans font-medium"
                      >
                        Create Password
                      </label>
                      <input
                        type={visible ? "text" : "password"}
                        id="password"
                        className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                      />
                      <button
                        onClick={() => setVisible(!visible)}
                        type="button"
                        className="text-labelColor absolute right-4 top-[33px]"
                      >
                        {visible ? (
                          <AiOutlineEye size={24} />
                        ) : (
                          <AiOutlineEyeInvisible size={24} />
                        )}
                      </button>
                    </div>
                    <div className="space-y-1">
                      <label
                        htmlFor="password"
                        className="text-sm text-labelColor font-workSans font-medium"
                      >
                        Role
                      </label>
                      <Select styles={selectStyles} />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <div className="flex gap-x-3">
                  <button
                    className="text-theme font-workSans font-medium border border-theme rounded-lg px-8 py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-theme font-workSans font-medium border border-theme rounded-lg px-8 py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                  >
                    Add
                  </button>
                </div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      }
    />
  );
}
