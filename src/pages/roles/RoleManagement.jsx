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
  useMediaQuery,
  Tooltip,
} from "@chakra-ui/react";
import Switch from "react-switch";
import { PostAPI } from "../../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import GetAPI from "../../utilities/GetAPI";
import Loader, { MiniLoader } from "../../components/Loader";
import { FaEdit, FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { BASE_URL } from "../../utilities/URL";
import { PutAPI } from "../../utilities/PutAPI";
import { BsExclamationCircle } from "react-icons/bs";
import { DeleteAPI } from "../../utilities/DeleteAPI";
import formatDateFromDB, { formateDate } from "../../utilities/DateTime";

export default function RoleManagement() {
  const isSmScreen = useMediaQuery("(max-width: 639px)");
  const { data, reFetch } = GetAPI("admin/role-list", "roles_management");
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checboxDisability, setCheckboxDisability] = useState({
    name: false,
    other: false,
  });

  const [mode, setMode] = useState({
    name: "",
  });

  const [addRoleData, setAddRoleData] = useState({
    name: "",
    permissionRole: [
      {
        id: 1,
        title: "Dashboard",
        permissions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      },
      {
        id: 2,
        title: "Admin Earnings",
        permissions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      },
      {
        id: 3,
        title: "Customer Management",
        permissions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      },
      {
        id: 4,
        title: "Bookings",
        permissions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      },
      {
        id: 5,
        title: "Barbershops",
        permissions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      },
      {
        id: 6,
        title: "Earnings Management",
        permissions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      },
      {
        id: 7,
        title: "Coupons",
        permissions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      },
      {
        id: 8,
        title: "All Subscription",
        permissions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      },
      {
        id: 9,
        title: "Push Notifications",
        permissions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      },
      {
        id: 10,
        title: "Reports",
        permissions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      },
      {
        id: 11,
        title: "Help & Support",
        permissions: {
          create: false,
          read: false,
          update: false,
          delete: false,
        },
      },
    ],
  });

  const listRolesManagement = [
    "Home",
    "Admin Earnings",
    "Customer Management",
    "Bookings",
    "BaberShops",
    "Earning Management",
    "Coupons",
    "All Subscriptions",
    "Push Notifications",
    "Report",
    "Help & Support",
  ];

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    clearData();
  };

  const openModal2 = () => {
    setModal2(true);
  };

  const closeModal2 = () => {
    setModal2(false);
  };

  const handleRoleChange = (i, k) => {
    setAddRoleData((prevState) => {
      const updatedPermissionRole = [...prevState.permissionRole];
      const updatedRole = { ...updatedPermissionRole[i] };
      updatedRole.permissions = {
        ...updatedRole.permissions,
        [k]: !updatedRole.permissions[k],
      };
      updatedPermissionRole[i] = updatedRole;
      return { ...prevState, permissionRole: updatedPermissionRole };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (mode.name === "Edit Role") {
      if (!checboxDisability.name && checboxDisability.other) {
        setLoading(true);
        const res = await PutAPI(
          `admin/update-role-name/${JSON.parse(
            localStorage.getItem("adminRoleID")
          )}`,
          "roles_management",
          {
            name: addRoleData?.name,
          }
        );
        if (res?.data?.status === "1") {
          setLoading(false);
          closeModal();
          reFetch();
          success_toaster(res?.data?.message);
          localStorage.removeItem("adminRoleID");
          clearData();
        } else {
          setLoading(false);
          if (!res || !res.data) {
            error_toaster("Something went wrong");
          }
          error_toaster(res?.data?.message);
        }
      } else {
        setLoading(true);
        const res = await PutAPI(
          `admin/update-role-permisiions/${JSON.parse(
            localStorage.getItem("adminRoleID")
          )}`,
          "roles_management",
          {
            permissionRole: addRoleData?.permissionRole,
          }
        );
        if (res?.data?.status === "1") {
          setLoading(false);
          closeModal();
          reFetch();
          localStorage.removeItem("adminRoleID");
          success_toaster(res?.data?.message);
          clearData();
        } else {
          setLoading(false);
          if (!res || !res.data) {
            error_toaster("Something went wrong");
          }
          error_toaster(res?.data?.message);
        }
      }
    } else {
      if (addRoleData.name === "") {
        info_toaster("Enter your Role Title");
      } else {
        setLoading(true);
        const res = await PostAPI(
          "admin/add-role",
          "roles_management",
          addRoleData
        );
        if (res?.data?.status === "1") {
          setLoading(false);
          closeModal();
          reFetch();
          success_toaster(res?.data?.message);
          clearData();
        } else {
          setLoading(false);
          if (!res || !res.data) {
            error_toaster("Something went wrong");
          }
          error_toaster(res?.data?.message);
        }
      }
    }
  };

  const handleView = async (id) => {
    setMode({ ...mode, name: "View Role" });
    let config = {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };
    setLoading(true);
    const res = await axios.get(BASE_URL + `admin/role-detail/${id}`, config);
    if (res?.data?.status === "1") {
      setLoading(false);
      setAddRoleData(res?.data?.data);
      setCheckboxDisability({
        name: true,
        other: true,
      });
      openModal();
      success_toaster(res?.data?.message);
    } else {
      setLoading(false);
      if (!res || !res.data) {
        error_toaster("Something went wrong");
      }
      error_toaster(res?.data?.message);
    }
  };

  const handleEdit = async (values) => {
    setMode({ ...mode, name: "Edit Role" });
    setCheckboxDisability({ name: true, other: false });
    localStorage.setItem("adminRoleID", values?.id);
    let config = {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };
    setLoading(true);
    const res = await axios.get(
      BASE_URL + `admin/role-detail/${values?.id}`,
      config
    );
    if (res?.data?.status === "1") {
      setLoading(false);
      setAddRoleData(res?.data?.data);
      openModal();
      success_toaster(res?.data?.message);
    } else {
      setLoading(false);
      if (!res || !res.data) {
        error_toaster("Something went wrong");
      }
      error_toaster(res?.data?.message);
    }
  };

  const deleteRole = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await DeleteAPI(
      `admin/role-delete/${JSON.parse(localStorage.getItem("adminRoleID"))}`,
      "roles_management"
    );

    if (res?.data?.status === "1") {
      setLoading(false);
      localStorage.removeItem("adminRoleID");
      closeModal2();
      reFetch();
      success_toaster("Role deleted successfully");
    } else {
      setLoading(false);
      if (!res || !res.data) {
        error_toaster("Something went wrong");
      }
      error_toaster(res?.data?.message);
    }
  };

  const handleStatus = async (id) => {
    const res = await PutAPI(
      `admin/role-change-status/${id}`,
      "roles_management"
    );
    if (res?.data?.status === "1") {
      reFetch();
      success_toaster(res?.data?.message);
    } else {
      setLoading(false);
      if (!res || !res.data) {
        error_toaster("Something went wrong");
      }
      error_toaster(res?.data?.message);
    }
  };

  const clearData = () => {
    setAddRoleData({
      name: "",
      permissionRole: [
        {
          id: 1,
          title: "Dashboard",
          permissions: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        },
        {
          id: 2,
          title: "Admin Earnings",
          permissions: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        },
        {
          id: 3,
          title: "Customer Management",
          permissions: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        },
        {
          id: 4,
          title: "Bookings",
          permissions: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        },
        {
          id: 5,
          title: "Barbershops",
          permissions: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        },
        {
          id: 6,
          title: "Earnings Management",
          permissions: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        },
        {
          id: 7,
          title: "Coupons",
          permissions: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        },
        {
          id: 8,
          title: "All Subscription",
          permissions: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        },
        {
          id: 9,
          title: "Push Notifications",
          permissions: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        },
        {
          id: 10,
          title: "Reports",
          permissions: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        },
        {
          id: 11,
          title: "Help & Support",
          permissions: {
            create: false,
            read: false,
            update: false,
            delete: false,
          },
        },
      ],
    });
  };

  const columns = [
    { field: "sn", header: "Sn", sort: true },
    { field: "name", header: "Name", sort: true },
    { field: "createdAt", header: "Created At", sort: true },
    { field: "currentStatus", header: "Current Status" },
    {
      field: "changeStatus",
      header: "Change Status",
    },
    { field: "action", header: "Action" },
  ];

  const datas = [];
  data?.data?.rolesList?.map((values, index) => {
    return datas.push({
      sn: index + 1,
      name: values?.name,
      createdAt: formateDate(values?.createdAt.slice(0, 10)),
      currentStatus: (
        <div>
          {values?.status ? (
            <div className="w-24 bg-[#12466F14] text-theme font-semibold p-2 rounded-md flex justify-center">
              Active
            </div>
          ) : (
            <div className="w-24 bg-[#EE4A4A14] text-[#EE4A4A] font-semibold p-2 rounded-md flex justify-center">
              Inactive
            </div>
          )}
        </div>
      ),
      changeStatus: (
        <label>
          <Switch
            onChange={() => {
              handleStatus(values?.id);
            }}
            checked={values?.status}
            uncheckedIcon={false}
            checkedIcon={false}
            onColor="#12466F"
            onHandleColor="#fff"
            className="react-switch"
            boxShadow="none"
          />
        </label>
      ),
      action: (
        <div className="flex gap-x-2">
          <Tooltip label="View detail">
            <button
              className="border border-yellow-400 rounded-md p-2 text-yellow-400"
              onClick={() => handleView(values?.id)}
            >
              <FaEye size={24} />
            </button>
          </Tooltip>
          <Tooltip label="Edit role">
            <button
              className="border border-theme rounded-md p-2 text-theme"
              onClick={() => handleEdit(values)}
            >
              <FaEdit size={24} />
            </button>
          </Tooltip>
          <Tooltip label="Delete role">
            <button
              className="border border-red-400 rounded-md p-2 text-red-400"
              onClick={() => {
                openModal2();
                localStorage.setItem("adminRoleID", values?.id);
              }}
            >
              <MdDelete size={24} />
            </button>
          </Tooltip>
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
              Roles & Permissions
            </h2>
            <button
              className="text-white bg-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-transparent
           hover:text-theme duration-200"
              onClick={() => {
                openModal("Add Employe");
                setMode({ ...mode, name: "Add Role" });
                clearData();
                setCheckboxDisability({
                  name: false,
                  other: false,
                });
              }}
            >
              + Add New Role
            </button>
          </div>

          <MyDataTable
            columns={columns}
            data={datas}
            placeholder={"Search by name, date "}
          />

          <Modal
            onClose={closeModal}
            isOpen={modal}
            size={isSmScreen[0] ? "sm" : "3xl"}
            isCentered
          >
            <ModalOverlay />
            <form onSubmit={handleSubmit}>
              <ModalContent>
                <ModalHeader paddingTop={5}>
                  <div className="text-center">
                    <h2 className="text-xl font-workSans font-medium uppercase">
                      {/* {loading ? "Adding Role" : "Add Role"} */}
                      {!loading && mode?.name}
                    </h2>
                  </div>
                </ModalHeader>
                <ModalCloseButton />
                {loading ? (
                  <div className="w-[576px] h-[224px]">
                    <MiniLoader />
                  </div>
                ) : (
                  <ModalBody>
                    <div className="h-[540px] overflow-auto">
                      <div className="space-y-1 mb-3 pr-4">
                        <label
                          htmlFor="name"
                          className="font-workSans font-semibold"
                        >
                          Role Title
                        </label>
                        <div className="relative flex flex-col items-start justify-center">
                          <input
                            type="text"
                            name="name"
                            id="name"
                            disabled={checboxDisability?.name}
                            value={addRoleData?.name}
                            onChange={(e) =>
                              setAddRoleData({
                                ...addRoleData,
                                name: e.target.value,
                              })
                            }
                            placeholder="Enter your Role's Title"
                            className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                      text-labelColor"
                          />
                          <div
                            className={`absolute right-2 h-full top-0  items-center ${
                              mode.name === "Edit Role" ? "flex" : "hidden"
                            }`}
                            onClick={() => {
                              setCheckboxDisability({
                                name: !checboxDisability.name,
                                other: !checboxDisability.other,
                              });
                              if (
                                checboxDisability.name &&
                                !checboxDisability.other
                              ) {
                                info_toaster("Edit Role Title");
                              } else {
                                info_toaster("Edit Role Permissons");
                              }
                            }}
                          >
                            <FaEdit size={22} />
                          </div>
                        </div>
                      </div>
                      <table className="w-full">
                        <thead>
                          <tr className="font-semibold sm:text-xl">
                            <td>Name</td>
                            <td className="text-center">Create</td>
                            <td className="text-center">Read</td>
                            <td className="text-center">Update</td>
                            <td className="text-center">Delete</td>
                          </tr>
                        </thead>
                        <tbody>
                          {listRolesManagement.map((val, index) => (
                            <tr className="">
                              <td
                                className="text-labelColor font-workSans font-medium"
                                key={index}
                              >
                                {val}
                              </td>
                              {["create", "read", "update", "delete"].map(
                                (val, i) => (
                                  <td className="text-center pt-4" key={i}>
                                    <Checkbox
                                      disabled={checboxDisability?.other}
                                      isChecked={
                                        addRoleData.permissionRole[index]
                                          .permissions[val]
                                      }
                                      border={"#00000099"}
                                      onChange={() =>
                                        handleRoleChange(index, val)
                                      }
                                    />
                                  </td>
                                )
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </ModalBody>
                )}
                {!loading && (
                  <ModalFooter>
                    <div className="flex gap-x-3">
                      <button
                        className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                        onClick={closeModal}
                        type="button"
                      >
                        Cancel
                      </button>
                      {(mode?.name === "Add Role" ||
                        mode?.name === "Edit Role") && (
                        <button
                          className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                          type="submit"
                        >
                          {mode?.name === "Add Role" ? "Add" : "Update"}
                        </button>
                      )}
                    </div>
                  </ModalFooter>
                )}
              </ModalContent>
            </form>
          </Modal>

          <Modal
            onClose={closeModal2}
            isOpen={modal2}
            size={isSmScreen[0] ? "sm" : "xl"}
            isCentered
          >
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              {loading ? (
                <div className="w-[576px] h-[224px]">
                  <MiniLoader />
                </div>
              ) : (
                <form onSubmit={deleteRole}>
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
                          className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                          type="button"
                          onClick={closeModal2}
                        >
                          No
                        </button>
                        <button
                          className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                          type="submit"
                        >
                          Yes
                        </button>
                      </div>
                    </div>
                  </ModalBody>
                </form>
              )}
            </ModalContent>
          </Modal>
        </div>
      }
    />
  );
}
