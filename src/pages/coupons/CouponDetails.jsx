import React from "react";
import Layout from "../../components/Layout";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { formateDate } from "../../utilities/DateTime";

export default function CouponDetails() {
  const location = useLocation();
  const couponDetail = location.state.data;
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
              Coupon Details
            </h2>
          </div>

          <div className="bg-white px-6 py-5 rounded-lg ">
            <div className="bg-themeGray rounded-lg p-4 lg:p-6 space-y-3">
              <div className="flex justify-between">
                <h2 className="text-2xl text-themeLightGray font-workSans font-medium">
                  {/* Coupon code #687980 */}
                  Coupon code {couponDetail?.promoCode}
                </h2>
                <p className="bg-themeLightGreen text-themeGreen font-workSans font-medium p-2 rounded-md">
                  {/* Active */}
                  {couponDetail?.status}
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-workSans font-medium">
                  {/* Salon Hub */}
                  {couponDetail?.salonDetail?.salonName}
                </h2>
              </div>

              <div>
                <h2 className="font-workSans font-medium">Duration</h2>
                <p className="font-workSans font-medium text-labelColor">
                  {/* 20 Jul,2023 - 10 Aug, 2023 */}
                  {formateDate(couponDetail?.from)} -{" "}
                  {formateDate(couponDetail?.till)}
                </p>
              </div>

              <div>
                <h2 className="font-workSans font-medium">Coupon type</h2>
                <p className="font-workSans font-medium text-labelColor">
                  {couponDetail?.type}
                </p>
              </div>

              <div>
                <h2 className="font-workSans font-medium">Discount</h2>
                <p className="font-workSans font-medium text-labelColor">
                  {" "}
                  {couponDetail?.value} %
                </p>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
}
