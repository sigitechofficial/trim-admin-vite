import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { FaEdit } from "react-icons/fa";
import GetAPI from "../../utilities/GetAPI";
import { PutAPI } from "../../utilities/PutAPI";
import PhoneInput from "react-phone-input-2";
import { Input } from "@chakra-ui/react";
import Loader, { MiniLoader } from "../../components/Loader";
import { error_toaster, success_toaster } from "../../utilities/Toaster";

export default function HelpAndSupport() {
  const { data, reFetch } = GetAPI("admin/help-support", "help_&_support");
  const [loading, setLoading] = useState(false);
  const [inputDisability, setInputDisability] = useState({
    email: true,
    countryCode: true,
    phone: true,
    address: true,
  });

  const [inputData, setInputData] = useState({
    id: "",
    address: "",
    email: "",
    countryCode: "",
    phoneNum: "",
  });

  const handleReset = () => {
    setInputData({
      address: "",
      email: "",
      countryCode: "",
      phoneNum: "",
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await PutAPI(
      `admin/help-support/${inputData?.id}`,
      "help_&_support",
      {
        email: inputData?.email,
        countryCode: inputData?.countryCode,
        phoneNum: inputData?.phoneNum,
        address: inputData?.address,
      }
    );
    if (res?.data?.status === "1") {
      success_toaster(res?.data?.message);
      setLoading(false);
      reFetch();
      setInputDisability({
        email: true,
        countryCode: true,
        phone: true,
        address: true,
      });
      setInputData({
        id: "",
        address: "",
        email: "",
        countryCode: "",
        phoneNum: "",
      });
    } else {
      setLoading(false);
      error_toaster(res?.data?.message);
    }
  };

  useEffect(() => {
    setInputData({
      id: data?.data?.id,
      address: data?.data?.address,
      countryCode: data?.data?.countryCode,
      email: data?.data?.email,
      phoneNum: data?.data?.phoneNum,
    });
  }, [data]);

  return data?.length === 0 ? (
    <Loader />
  ) : (
    <Layout
      content={
        <div className="space-y-5">
          <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
            Help & Support
          </h2>

          {loading ? (
            <MiniLoader />
          ) : (
            <form onSubmit={handleSave}>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-white p-5 xl:p-10 rounded-lg">
                  <div className="space-y-6">
                    <div className="space-y-1 relative">
                      <label
                        htmlFor="email"
                        className="text-sm text-labelColor font-workSans font-medium"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={inputData?.email}
                        disabled={inputDisability?.email}
                        className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                        onChange={(e) =>
                          setInputData({ ...inputData, email: e.target.value })
                        }
                      />
                      <FaEdit
                        size={24}
                        color="#12466F"
                        className="absolute top-8 right-3 cursor-pointer"
                        onClick={() =>
                          setInputDisability({
                            ...inputDisability,
                            email: !inputDisability?.email,
                          })
                        }
                      />
                    </div>

                    <div className="space-y-1 relative">
                      <label
                        htmlFor="phone"
                        className="text-sm text-labelColor font-workSans font-medium "
                      >
                        Phone
                      </label>
                      {/* <input
                      type="text"
                      id="phone"
                      value={inputData?.phoneNum}
                      disabled={inputDisability?.phone}
                      className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor col-span-5"
                    /> */}
                      <div className="flex items-center gap-x-2">
                        <PhoneInput
                          focusBorderColor="none"
                          borderWidth="none"
                          className="chakra_input"
                          inputStyle={{
                            width: "100px",
                            height: "40px",
                          }}
                          country={"pk"}
                          disabled={inputDisability?.countryCode}
                          value={inputData?.countryCode}
                          onChange={(phone) =>
                            setInputData({ ...inputData, countryCode: phone })
                          }
                        />
                        <input
                          className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                        text-labelColor"
                          disabled={inputDisability?.phone}
                          focusBorderColor="none"
                          borderWidth="none"
                          type="text"
                          name="phoneNum"
                          value={inputData?.phoneNum}
                          placeholder="Phone number"
                          onChange={(e) =>
                            setInputData({
                              ...inputData,
                              phoneNum: e.target.value,
                            })
                          }
                        />
                        <FaEdit
                          size={24}
                          color="#12466F"
                          className="absolute z-10 right-3 cursor-pointer"
                          onClick={() =>
                            setInputDisability({
                              ...inputDisability,
                              phone: !inputDisability?.phone,
                              countryCode: !inputDisability?.countryCode,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-1 relative">
                      <label
                        htmlFor="address"
                        className="text-sm text-labelColor font-workSans font-medium"
                      >
                        Address
                      </label>
                      <input
                        type="text"
                        id="address"
                        value={inputData?.address}
                        disabled={inputDisability?.address}
                        onChange={(e) =>
                          setInputData({
                            ...inputData,
                            address: e.target.value,
                          })
                        }
                        className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor col-span-5"
                      />
                      <FaEdit
                        size={24}
                        color="#12466F"
                        className="absolute top-8 right-3 cursor-pointer"
                        onClick={() =>
                          setInputDisability({
                            ...inputDisability,
                            address: !inputDisability?.address,
                          })
                        }
                      />
                    </div>

                    <div className="flex justify-end gap-x-3 pt-10">
                      <button
                        onClick={handleReset}
                        className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                        type="button"
                      >
                        Reset
                      </button>
                      <button
                        type="submit"
                        className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      }
    />
  );
}
