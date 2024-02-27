// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import { FaArrowLeft } from "react-icons/fa";
import SubscriptionCard from "../../components/SubscriptionCard";

export default function SubscriptionPlans() {
  return (
    <Layout
      content={
        <div className="space-y-5">
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

          <div className="grid grid-col-1 xl:grid-cols-2 2xl:grid-cols-3 gap-y-10 gap-x-20">
            <SubscriptionCard
              bgColor="bg-themePink"
              title="Trim Standard"
              staff="0-5 Staff"
              valid="Valid for One Month"
            />
          </div>
        </div>
      }
    />
  );
}
