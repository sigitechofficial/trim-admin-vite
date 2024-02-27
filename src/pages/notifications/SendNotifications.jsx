// @ts-nocheck
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import Layout from "../../components/Layout";
import Select from "react-select";
import selectStyles from "../../utilities/SelectStyle";

export default function SendNotifications() {
  const [image, setImage] = useState({
    logo: "",
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage({ ...image, [e.target.name]: imageUrl });
    }
  };

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
              Send New Notifications
            </h2>
          </div>

          <div className="bg-white p-5 rounded-lg space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="send"
                    className="text-black font-workSans font-medium"
                  >
                    Send To
                  </label>
                  <Select styles={selectStyles} />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="title"
                    className="text-black font-workSans font-medium"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    placeholder="Subject"
                    className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="write"
                    className="text-black font-workSans font-medium"
                  >
                    Message
                  </label>
                  <input
                    type="text"
                    id="write"
                    placeholder="Write here.."
                    className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="img"
                  className="w-full h-48 xl:h-full flex justify-center items-center border border-dashed cursor-pointer"
                >
                  {image.logo ? (
                    <img
                      src={image.logo}
                      alt="banner"
                      className="w-[646px] xl:w-[728px] h-48 xl:h-[257px]"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-y-3">
                      <img
                        src="/images/input-img.webp"
                        alt="banner"
                        className="w-12 h-10"
                      />
                      <span className="text-[#00000066] font-workSans font-medium">
                        Upload Image
                      </span>
                    </div>
                  )}
                </label>

                <input
                  type="file"
                  name="logo"
                  id="img"
                  hidden
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div className="flex justify-end gap-x-3">
              <button
                className="text-theme font-workSans font-medium border border-theme rounded-lg px-8 py-2.5 hover:bg-theme
                         hover:text-white duration-200"
              >
                Reset
              </button>
              <button
                className="text-theme font-workSans font-medium border border-theme rounded-lg px-8 py-2.5 hover:bg-theme
                         hover:text-white duration-200"
              >
                Send Notifications
              </button>
            </div>
          </div>
        </div>
      }
    />
  );
}
