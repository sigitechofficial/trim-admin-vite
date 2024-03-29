// @ts-nocheck
import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useMediaQuery,
} from "@chakra-ui/react";
import PhoneInput from "react-phone-input-2";
import { FaEye } from "react-icons/fa";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import selectStyles from "../../utilities/SelectStyle";
import GetAPI from "../../utilities/GetAPI";
import Loader, { MiniLoader } from "../../components/Loader";
import Switch from "react-switch";
import { PutAPI } from "../../utilities/PutAPI";
import { MdDelete } from "react-icons/md";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../../utilities/Toaster";
import { BsExclamationCircle } from "react-icons/bs";
import { DeleteAPI } from "../../utilities/DeleteAPI";
import { PostAPI } from "../../utilities/PostAPI";
import { formateDate } from "../../utilities/DateTime";

export default function EmployeeManagement() {
  const isSmScreen = useMediaQuery("(max-width: 639px)");

  const [selectedOption, setSelectedOption] = useState({
    value: "",
    label: "",
  });
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addEmployee, setAddEmployee] = useState({
    firstName: "",
    lastName: "",
    email: "",
    countryCode: "",
    phoneNum: "",
    password: "",
    roleId: "",
  });

  const { data, reFetch } = GetAPI("admin/employees", "employee_management");
  const { data: rolesData } = GetAPI("admin/role-list", "employee_management");

  const openModal = (type) => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const openModal2 = () => {
    setModal2(true);
  };

  const closeModal2 = () => {
    setModal2(false);
  };

  const handleStatus = async (userId) => {
    let res = await PutAPI(
      `admin/employee-change-status/${userId}`,
      "employee_management"
    );
    if (res?.data?.status === "1") {
      success_toaster(res?.data?.message);
      reFetch();
    } else {
      error_toaster(res?.data?.message);
    }
  };

  const deleteRole = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await DeleteAPI(
      `admin/employee-delete/${JSON.parse(
        localStorage.getItem("adminEmployeeID")
      )}`,
      "employee_management"
    );

    if (res?.data?.status === "1") {
      setLoading(false);
      localStorage.removeItem("adminEmployeeID");
      closeModal2();
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

  const handleChange = (e) => {
    setAddEmployee({ ...addEmployee, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (addEmployee?.firstName === "") {
      info_toaster("Please enter first name");
    } else if (addEmployee?.lastName === "") {
      info_toaster("Please enter last name");
    } else if (addEmployee?.email === "") {
      info_toaster("Please enter email");
    } else if (addEmployee?.countryCode === "") {
      info_toaster("Please enter country code");
    } else if (addEmployee?.phoneNum === "") {
      info_toaster("Please enter phone number");
    } else if (addEmployee?.password === "") {
      info_toaster("Please enter password");
    } else if (selectedOption?.value === "") {
      info_toaster("Please select role");
    } else {
      setLoading(true);

      const res = await PostAPI("admin/employee", "employee_management", {
        firstName: addEmployee?.firstName,
        lastName: addEmployee?.lastName,
        email: addEmployee?.email,
        countryCode: addEmployee?.countryCode,
        phoneNum: addEmployee?.phoneNum,
        password: addEmployee?.password,
        roleId: selectedOption?.value,
      });
      console.log(res);
      if (res?.data?.status === "1") {
        setLoading(false);
        closeModal();
        reFetch();
        success_toaster(res?.data?.message);
        setAddEmployee({
          firstName: "",
          lastName: "",
          email: "",
          countryCode: "",
          phoneNum: "",
          password: "",
          roleId: "",
        });
      } else {
        setLoading(false);
        if (!res || !res.data) {
          error_toaster("Something went wrong");
        }
        error_toaster(res?.data?.message);
      }
    }
  };

  const columns = [
    { field: "sn", header: "Sn", sort: true },
    { field: "name", header: "Name", sort: true },
    { field: "role", header: "Role", sort: true },
    { field: "email", header: "Email", sort: true },
    { field: "phoneNum", header: "Phone No", sort: true },
    { field: "createdAt", header: "Created At", sort: true },
    {
      field: "currentStatus",
      header: "Current Status",
    },
    {
      field: "changeStatus",
      header: "Change Status",
    },
    {
      field: "action",
      header: "Action",
    },
  ];

  const datas = [];
  data?.data?.employees?.map((values, i) => {
    return datas.push({
      sn: i + 1,
      name: `${values?.firstName} ${values?.lastName}`,
      role: values?.role?.name,
      email: values?.email,
      phoneNum: `${values?.countryCode}-${values?.phoneNum}`,
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
          <button
            className="border border-red-400 rounded-md p-2 text-red-400"
            onClick={() => {
              openModal2();
              localStorage.setItem("adminEmployeeID", values?.id);
            }}
          >
            <MdDelete size={24} />
          </button>
        </div>
      ),
    });
  });

  const options = [];
  rolesData?.data?.rolesList.map((values, i) => {
    if (values?.status)
      return options.push({
        value: values?.id,
        label: values?.name,
      });
  });

  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="space-y-5">
          <div className="w-full flex flex-col gap-y-2 justify-start sm:flex-row sm:justify-between sm:items-center">
            <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
              All Employees{" "}
              <span className="text-labelColor">
                ({data?.data?.employees.length})
              </span>
            </h2>
            <button
              className="text-white bg-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-2.5 hover:bg-transparent
           hover:text-theme duration-200 max-sm:w-60"
              onClick={() => {
                openModal();
                setAddEmployee({
                  firstName: "",
                  lastName: "",
                  email: "",
                  countryCode: "",
                  phoneNum: "",
                  password: "",
                  roleId: "",
                });
              }}
            >
              + Add New Employee
            </button>
          </div>

          <MyDataTable
            columns={columns}
            data={datas}
            placeholder={"Search by Name, Contact, Email and Date"}
          />

          <Modal
            onClose={closeModal}
            isOpen={modal}
            isCentered
            size={isSmScreen[0] ? "sm" : "2xl"}
          >
            <ModalOverlay />
            <form onSubmit={handleSubmit}>
              <ModalContent>
                <ModalCloseButton />
                {loading ? (
                  <div className="w-[576px] h-[224px]">
                    <MiniLoader />
                  </div>
                ) : (
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
                            htmlFor="firstName"
                            className="text-sm text-labelColor font-workSans font-medium"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={addEmployee?.firstName}
                            onChange={handleChange}
                            className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                          />
                        </div>
                        <div className="space-y-1">
                          <label
                            htmlFor="lastName"
                            className="text-sm text-labelColor font-workSans font-medium"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={addEmployee?.lastName}
                            onChange={handleChange}
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
                            autoComplete="off"
                            id="email"
                            name="email"
                            value={addEmployee?.email}
                            onChange={handleChange}
                            className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                          />
                        </div>
                        <div className="space-y-1">
                          <label
                            htmlFor="phoneNum"
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
                              value={addEmployee?.countryCode}
                              onChange={(e) =>
                                setAddEmployee({
                                  ...addEmployee,
                                  countryCode: e,
                                })
                              }
                            />
                            <input
                              type="number"
                              id="phoneNum"
                              name="phoneNum"
                              value={addEmployee?.phoneNum}
                              onChange={handleChange}
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
                            name="password"
                            value={addEmployee?.password}
                            onChange={handleChange}
                            autoComplete="off"
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
                          <Select
                            styles={selectStyles}
                            options={options}
                            onChange={setSelectedOption}
                            value={selectedOption}
                          />
                        </div>
                      </div>
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
                      <button
                        className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                        type="submit"
                      >
                        Add
                      </button>
                    </div>
                  </ModalFooter>
                )}
              </ModalContent>
            </form>
          </Modal>

          <Modal onClose={closeModal2} isOpen={modal2} size={"md"} isCentered>
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
                          onClick={closeModal2}
                          type="button"
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
