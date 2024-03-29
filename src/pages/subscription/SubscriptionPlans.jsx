// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import { FaArrowLeft } from "react-icons/fa";
import SubscriptionCard from "../../components/SubscriptionCard";
import { useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import GetAPI from "../../utilities/GetAPI";

export default function SubscriptionPlans() {
  const { data, reFetch } = GetAPI(
    "admin/AllSubscriptions",
    "all_subscription"
  ); 

  return data?.length === 0 ? (
    <Loader /> 
  ) : ( 
    <Layout
      content={
        <div className="space-y-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-x-2">
              <button
                className="flex justify-center items-center w-6 h-6 text-black rounded-full hover:bg-black hover:text-white duration-200"
                onClick={() => {
                  window.history.back();
                }}
              >
                <FaArrowLeft />
              </button>
              <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
                Subscription’s plan
              </h2>
            </div>

            {/* <button
              className="text-white bg-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-transparent
           hover:text-theme duration-200"
            onClick={() => {
              openModal("Add Employee");
            }}
            >
              + Add New Subscription
            </button> */}
          </div>

          <div className="grid grid-col-1  md:grid-cols-2 xl:grid-cols-3 gap-y-10 md:gap-x-5 lg:gap-x-10 xl:gap-x-15 2xl:gap-x-20">
            {data?.data?.listOfPlans.length > 0 ? (
              data?.data?.listOfPlans?.map((values, i) => (
                <SubscriptionCard
                  key={i}
                  Id={values?.id}
                  reFetch={reFetch}
                  bgColor={
                    values?.name.includes("Gold")
                      ? "bg-[#FADD81]"
                      : values?.name.includes("Premium")
                      ? "bg-[#EEC1FD]"
                      : "bg-[#ADEEF5]"
                  }
                  title={values?.name}
                  duration={values?.duration}
                  price={values?.price}
                  desc={values?.description}
                  valid="Valid for One Month"
                  includedFeatures={values?.features}
                />
              )) 
            ) : (
              <p className="font-bold text-2xl">No Subscription Yet</p>
            )} 
          </div> 
        </div>
      }
    />
  );
}
