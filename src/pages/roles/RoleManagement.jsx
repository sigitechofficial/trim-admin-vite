// @ts-nocheck
import React, { useState } from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  Checkbox,
  ModalFooter,
} from "@chakra-ui/react";

export default function RoleManagement() {
  const [modal, setModal] = useState(false);

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
      name: "Role",
      selector: (row) => row.role,
    },
    {
      name: "Status",
      selector: (row) => row.status,
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
              Roles & Permissions <span className="text-labelColor">(260)</span>
            </h2>
            <button
              className="text-white bg-theme font-workSans font-medium border border-theme rounded-lg px-8 py-2.5 hover:bg-transparent
           hover:text-theme duration-200"
              onClick={() => {
                openModal("Add Employe");
              }}
            >
              + Add New Role
            </button>
          </div>
          <MyDataTable columns={columns} />

          <Modal onClose={closeModal} isOpen={modal} size="3xl" isCentered>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader paddingTop={5}>
                <div className="text-center">
                  <h2 className="text-xl font-workSans font-medium uppercase">
                    Add Role
                  </h2>
                </div>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div className="h-[540px] overflow-auto">
                  <div className="space-y-1 mb-3 pr-4">
                    <label
                      htmlFor="name"
                      className="font-workSans font-semibold"
                    >
                      Role Title
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your Role's Title"
                      className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                      text-labelColor"
                    />
                  </div>
                  <table className="w-full">
                    <thead>
                      <tr className="font-semibold text-xl">
                        <td>Name</td>
                        <td className="text-center">Create</td>
                        <td className="text-center">Read</td>
                        <td className="text-center">Update</td>
                        <td className="text-center">Delete</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="">
                        <td className="text-labelColor font-workSans font-medium">
                          Home
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                      </tr>

                      <tr className="">
                        <td className="text-labelColor font-workSans font-medium">
                          Admin Earnings
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                      </tr>

                      <tr className="">
                        <td className="text-labelColor font-workSans font-medium">
                          Customer Management
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                      </tr>


                      <tr className="">
                        <td className="text-labelColor font-workSans font-medium">
                          Bookings
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                      </tr>


                      <tr className="">
                        <td className="text-labelColor font-workSans font-medium">
                          BaberShops
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                      </tr>


                      <tr className="">
                        <td className="text-labelColor font-workSans font-medium">
                          Earning Management
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                      </tr>


                      <tr className="">
                        <td className="text-labelColor font-workSans font-medium">
                          Coupons
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                      </tr>


                      <tr className="">
                        <td className="text-labelColor font-workSans font-medium">
                          All Subscription
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                      </tr>


                      <tr className="">
                        <td className="text-labelColor font-workSans font-medium">
                          Push Notifications
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                      </tr>

                      <tr className="">
                        <td className="text-labelColor font-workSans font-medium">
                          Report
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                      </tr>

                      <tr className="">
                        <td className="text-labelColor font-workSans font-medium">
                          Help & Support
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                        <td className="text-center pt-4">
                          <Checkbox border={"#00000099"} />
                        </td>
                      </tr>

                    </tbody>
                  </table>
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
