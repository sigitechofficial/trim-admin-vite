import React, { useState } from "react";
import Layout from "../../components/Layout";
import { FaAngleRight, FaArrowLeft } from "react-icons/fa";
import DoughnutChart from "../../components/DoughnutChart";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";
import { Button } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useMediaQuery,
} from "@chakra-ui/react";
import { MiniLoader } from "../../components/Loader";
import { info_toaster } from "../../utilities/Toaster";

export default function ClientStatusReport() {
  const isSmScreen = useMediaQuery("(max-width: 639px)");
  const [activeButton, setActiveButton] = useState("current week");
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [disbale, setDisbale] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: "",
  });

  const { data } = GetAPI(
    "admin/graph/client-status-distribution-graph",
    "dashboard"
  );
  
  const handleButton = (buttonState) => {
    if (buttonState === "custom date") {
      setModal(true);
      setActiveButton(buttonState);
    } else {
      setActiveButton(buttonState);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setDateRange({ ...dateRange, [e.target.name]: e.target.value });
  };

  const closeModal = () => {
    setModal(false);
  };

  const handleReset = () => {
    if (dateRange?.startDate === "" && dateRange?.endDate === "") {
      info_toaster("Please sselect date first");
    } else {
      setDateRange({
        startDate: "",
        endDate: "",
      });
    }
  };

  return data.length === 0 ? (
    <Loader />
  ) : (
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
            <h2 className="flex items-center text-xl lg:text-2xl font-chivo font-semibold">
              <span className="flex items-center text-[#8F95B2] ">
                Graphs <FaAngleRight size={20} />
              </span>{" "}
              Client Status Distribution
            </h2>
          </div>

          <div className="flex justify-end">
            <div className="space-x-2">
              <Button
                className={`${
                  activeButton === "current year"
                    ? "!bg-black !text-white"
                    : "!bg-gray text-gray-300y"
                }`}
                onClick={() => handleButton("current year")}
              >
                Current Year
              </Button>

              <Button
                className={`${
                  activeButton === "current month"
                    ? "!bg-black !text-white"
                    : "!bg-gray text-gray-300y"
                }`}
                onClick={() => handleButton("current month")}
              >
                Current Month
              </Button>

              <Button
                className={`${
                  activeButton === "current week"
                    ? "!bg-black !text-white"
                    : "!bg-gray text-gray-300y"
                }`}
                onClick={() => handleButton("current week")}
              >
                Current Week
              </Button>

              <Button
                className={`${
                  activeButton === "custom date"
                    ? "!bg-black !text-white"
                    : "!bg-gray text-gray-300y"
                }`}
                onClick={() => handleButton("custom date")}
              >
                Custom Date
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center pt-20">
            <DoughnutChart dashboardDoughnutChartData={data?.data?.report} />
          </div>

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
                    <div className="relative h-full w-full flex flex-col justify-center items-center space-y-6 pt-5 pb-4">
                      <div className="text-center">
                        <h2 className="text-xl font-workSans font-medium uppercase">
                          Custom Date
                        </h2>
                      </div>

                      <div className="w-full space-y-2">
                        <div className="space-y-1">
                          <label
                            htmlFor="startDate"
                            className="text-sm text-labelColor font-workSans font-medium"
                          >
                            Start Date
                          </label>
                          <input
                            onChange={handleChange}
                            value={dateRange?.startDate}
                            type="date"
                            id="startDate"
                            name="startDate"
                            className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                          />
                        </div>

                        <div className="space-y-1">
                          <label
                            htmlFor="endDate"
                            className="text-sm text-labelColor font-workSans font-medium"
                          >
                            End Date
                          </label>
                          <input
                            onChange={handleChange}
                            value={dateRange?.endDate}
                            type="date"
                            id="endDate"
                            name="endDate"
                            className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                          />
                        </div>
                      </div>
                    </div>
                  </ModalBody>
                )}
                <ModalFooter>
                  <div className={`${loading ? "hidden" : "flex"} gap-x-3`}>
                    <button
                      className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                      onClick={handleReset}
                      type="button"
                    >
                      Reset
                    </button>
                    <button
                      className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                      type="submit"
                      disabled={disbale}
                    >
                      Submit
                    </button>
                  </div>
                </ModalFooter>
              </ModalContent>
            </form>
          </Modal>
        </div>
      }
    />
  );
}
