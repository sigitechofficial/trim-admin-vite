// @ts-nocheck 
import React from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import GetAPI from "../../utilities/GetAPI";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Switch from "react-switch";
import { useNavigate } from "react-router-dom";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import { PutAPI } from "../../utilities/PutAPI";
import formatDateFromDB from "../../utilities/DateTime";
import Loader from "../../components/Loader";

export default function Customers() {
  const { data, reFetch } = GetAPI("admin/customer");
  const navigate = useNavigate();

  const handleStatus = async (customerId) => {
    let res = await PutAPI(`admin/customer-change-status/${customerId}`);
    if (res?.data?.status === "1") {
      success_toaster(res?.data?.message);
      reFetch();
    } else {
      error_toaster(res?.data?.message); 
    }
  };

  const columns = [
    { field: "sn", header: "Sn" },
    { field: "id", header: "Id" },
    {
      field: "name",
      header: "Name",
    },
    {
      field: "contact",
      header: "Contact",
    },
    {
      field: "email",
      header: "Email",
    },
    {
      field: "dateTime",
      header: "Date & Time",
    },
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

  data?.data?.map((values, index) => {
    return datas.push({
      sn: index + 1,
      id: values?.id,
      name: `${values?.firstName} ${values?.lastName}`,
      contact: `${values?.countryCode}-${values?.phoneNum}`,
      email: values?.email,
      dateTime: formatDateFromDB(values?.verifiedAt),
      currentStatus: (
        <div>
          {values?.status ? (
            <div className="bg-[#12466F14] text-theme font-semibold p-2 rounded-md flex justify-center">
              Active
            </div>
          ) : (
            <div className="bg-[#EE4A4A14] text-[#EE4A4A] font-semibold p-2 rounded-md flex justify-center">
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
            className="border border-yellow-400 rounded-md p-2 text-yellow-400"
            onClick={() =>
              navigate("/customer-details", {
                state: { customerId: values?.id },
              })
            }
          >
            <FaEye size={24} />
          </button>
          <button className="border border-red-400 rounded-md p-2 text-red-400">
            <MdDelete size={24} />
          </button>
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
          <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
            All Customers
          </h2>
          <MyDataTable columns={columns} data={datas} />
        </div>
      }
    />
  );
}
