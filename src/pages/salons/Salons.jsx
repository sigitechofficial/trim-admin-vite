// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";
import { FaEye } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
import { PutAPI } from "../../utilities/PutAPI";
import { error_toaster, success_toaster } from "../../utilities/Toaster";
import { Tooltip } from "@chakra-ui/react";

export default function Salons() {
  const { data, reFetch } = GetAPI("admin/salon-view");
  const navigate = useNavigate();

  const handleStatus = async (userId) => {
    let res = await PutAPI(`admin/salon-change-status/${userId}`);
    if (res?.data?.status === "1") {
      success_toaster(res?.data?.message);
      reFetch();
    } else {
      error_toaster(res?.data?.message);
    }
  };

  const columns = [
    { field: "sn", header: "Sn", sort: true },
    {
      field: "shopName",
      header: "Shop Name",
      sort: true,
    },
    {
      field: "address",
      header: "Address",
      sort: true,
    },
    {
      field: "email",
      header: "Email",
      sort: true,
    },
    {
      field: "phone",
      header: "Phone",
      sort: true,
    },
    {
      field: "ownerName",
      header: "Owner name",
      sort: true,
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
      shopName: values?.salonName,
      address: `${values?.addressDB?.streetAddress}, ${values?.addressDB?.city}, ${values?.addressDB?.country}`,
      email: values?.user?.email,
      phone: `${values?.user?.countryCode}-${values?.user?.phoneNum}`,
      ownerName: `${values?.user?.firstName}-${values?.user?.lastName}`,
      currentStatus: (
        <div>
          {values?.user?.status ? (
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
              handleStatus(values?.user?.id);
            }}
            checked={values?.user?.status}
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
              onClick={() => {
                localStorage.setItem("salonID", JSON.stringify(values?.id));
                navigate("/barbershop-details");
              }}
            >
              <FaEye size={24} />
            </button>
          </Tooltip>
        </div>
      ),
    });
  });

  return data.length === 0 ? (
    <Loader />
  ) : (
    <Layout 
      content={
        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
            All Barbershops
          </h2>
          <MyDataTable
            columns={columns}
            data={datas}
            placeholder={"Search by Shop name, Address and Email"}
          />
        </div>
      }
    />
  );
}
