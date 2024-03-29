import React, { useState } from "react";
import { IoMdCheckboxOutline } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useMediaQuery,
} from "@chakra-ui/react";
import selectStyles from "../utilities/SelectStyle";
import Select from "react-select";
import { PostAPI } from "../utilities/PostAPI";
import {
  error_toaster,
  info_toaster,
  success_toaster,
} from "../utilities/Toaster";
import { MiniLoader } from "../components/Loader";

export default function SubscriptionCard(props) {
  const isSmScreen = useMediaQuery("(max-width: 639px)");
  const [subscriptionData, setSubscriptionData] = useState({
    name: props?.title,
    description: props?.desc,
    featureName: "",
  }); 

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    localStorage.removeItem("subscriptionProductID");
    setModal(false);
  };

  const handleChange = (e) => {
    setSubscriptionData({
      ...subscriptionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (subscriptionData?.name === "") {
      info_toaster("Subscription title cannot be empty");
    } else if (subscriptionData?.description === "") {
      info_toaster("Description cannot be empty");
    } else {
      if (subscriptionData?.featureName) {
        props?.includedFeatures.push({
          name: subscriptionData?.featureName,
        });
      }
      setLoading(true);
      const res = await PostAPI("admin/updateSubscription", {
        productId: props?.Id,
        name: subscriptionData?.name,
        description: subscriptionData?.description,
        features: subscriptionData?.featureName
          ? props?.includedFeatures
          : props?.includedFeatures,
      });
      if (res?.data?.status === "1") {
        setLoading(false);
        props?.reFetch();
        closeModal();
        success_toaster(res?.data?.message);
        setSubscriptionData({ ...subscriptionData, featureName: "" });
      } else {
        setLoading(false);
        error_toaster(res?.data?.message);
      }
    }
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg relative" key={props?.i}>
        <div
          className={`${props.bgColor} flex rounded-lg flex-col justify-center items-center py-3 sm:py-5 space-y-1 sm:space-y-2 relative`}
        >
          <h2 className="text-2xl sm:text-3xl font-chivo font-medium">{props?.title}</h2>
          <p className="text-lg sm:text-2xl font-chivo font-medium">{props?.desc}</p>
          <FaEdit
            size={26}
            color="#12466F"
            className="absolute top-1 sm:top-0 right-4 cursor-pointer"
            onClick={() => {
              localStorage.setItem("subscriptionProductID", props?.Id);
              setSubscriptionData({ ...subscriptionData, featureName: "" });
              openModal();
            }}
          />
        </div>
        <div className="py-2 sm:py-5 px-10 space-y-4 sm:space-y-8">
          <div className="flex justify-between items-center [&>div]:space-y-1 [&>div]:text-lg sm:[&>div]:text-xl">
            <div>
              <p className="font-bold">Duration</p>
              <p className="text-red-800 font-semibold">{props?.duration}</p>
            </div>
            <div className="">
              <p className="font-bold">Price</p>
              <p className="text-red-800 font-semibold text-lg">
                ${props?.price}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-xl sm:text-2xl font-chivo font-medium">
              Include Feature in Standard
            </h2>
            <ul className="mt-3 sm:mt-5 space-y-2">
              {props?.includedFeatures?.map((values, i) => (
                <li key={i} className="flex items-center gap-x-2 sm:gap-x-4">
                  <span>
                    <IoMdCheckboxOutline size={26} color="#12466F" />
                  </span>
                  <span className="text-lg sm:text-xl font-workSans font-medium">
                    {values?.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Modal onClose={closeModal} isOpen={modal} isCentered size={isSmScreen[0] ? "sm":"2xl"}>
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
                      Update Subscription
                    </h2>
                  </div>

                  <div className="w-full space-y-2">
                    <div className="space-y-1">
                      <label
                        htmlFor="name"
                        className="text-sm text-labelColor font-workSans font-medium"
                      >
                        Subscription title
                      </label>
                      <input
                        onChange={handleChange}
                        value={subscriptionData?.name}
                        type="text"
                        id="name"
                        name="name"
                        className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="description"
                        className="text-sm text-labelColor font-workSans font-medium"
                      >
                        Description
                      </label>
                      <input
                        onChange={handleChange}
                        value={subscriptionData?.description}
                        type="text"
                        id="description"
                        name="description"
                        className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                      />
                    </div>

                    <div className="space-y-1">
                      <label
                        htmlFor="featureName"
                        className="text-sm text-labelColor font-workSans font-medium"
                      >
                        Add New Feature
                      </label>
                      <input
                        onChange={handleChange}
                        value={subscriptionData?.featureName}
                        type="text"
                        id="featureName"
                        name="featureName"
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
                  onClick={closeModal}
                  type="button"
                >
                  Reset
                </button>
                <button
                  className="text-theme font-workSans font-medium border border-theme rounded-lg px-5 sm:px-8 py-1.5 sm:py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
