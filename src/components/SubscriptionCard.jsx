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
} from "@chakra-ui/react";
import selectStyles from "../utilities/SelectStyle";
import Select from "react-select";

export default function SubscriptionCard(props) {
  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      <div className="bg-white shadow-md rounded-lg" key={props?.i}>
        <div
          className={`${props.bgColor} flex rounded-lg flex-col justify-center items-center py-5 space-y-2 relative`}
        >
          <h2 className="text-3xl font-chivo font-medium">{props?.title}</h2>
          <p className="text-2xl font-chivo font-medium">{props?.desc}</p>
          <FaEdit
            size={26}
            color="#12466F"
            className="absolute top-0 right-4 cursor-pointer"
            onClick={openModal}
          />
        </div>


        <div className="py-5 px-10 space-y-8">
          <div className="flex justify-between items-center [&>div]:space-y-1  [&>div]:text-xl">
            <div>
              <p className="font-bold">Duration</p>
              <p className="text-red-800 font-semibold">{props?.duration}</p>
            </div>
            <div className="">
              <p className="font-bold">Price</p>
              <p className="text-red-800 font-semibold text-lg">${props?.price}</p>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-chivo font-medium">
              Include Feature in Standard
            </h2>
            <ul className="mt-5 space-y-2">
              {props?.includedFeatures?.map((values, i) => <li key={i} className="flex items-center gap-x-4">
                <span><IoMdCheckboxOutline size={26} color="#12466F" /></span>
                <span className="text-2xl font-workSans font-medium">
                  {values?.name}
                </span>
              </li>)}

            </ul>
          </div>
        </div>
      </div>

      <Modal onClose={closeModal} isOpen={modal} isCentered size={"2xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <div className="flex flex-col justify-center items-center space-y-6 pt-5 pb-4">
              <div className="text-center">
                <h2 className="text-xl font-workSans font-medium uppercase">
                  Update Subscription
                </h2>
              </div>

              <div className="w-full space-y-2">
                <div className="space-y-1">
                  <label
                    htmlFor="title"
                    className="text-sm text-labelColor font-workSans font-medium"
                  >
                    Subscription title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                  />
                </div>

                <div className="grid grid-cols-2 gap-x-5">
                  <div className="space-y-1 ">
                    <label
                      htmlFor="staff"
                      className="text-sm text-labelColor font-workSans font-medium"
                    >
                      Staff
                    </label>
                    <Select styles={selectStyles} />
                  </div>
                  <div className="space-y-1 ">
                    <label
                      htmlFor="price"
                      className="text-sm text-labelColor font-workSans font-medium"
                    >
                      Price
                    </label>
                    <input
                      type="number"
                      id="price"
                      className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                    />
                    <p className="text-xs text-theme font-workSans font-semibold text-end">$100 per person</p>
                  </div>
                </div>

                <div className="space-y-1 ">
                  <label
                    htmlFor="duration"
                    className="text-sm text-labelColor font-workSans font-medium"
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                  />
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex gap-x-3">
              <button
                className="text-theme font-workSans font-medium border border-theme rounded-lg px-8 py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                onClick={closeModal}
              >
                Reset
              </button>
              <button
                className="text-theme font-workSans font-medium border border-theme rounded-lg px-8 py-2.5 hover:bg-theme
                         hover:text-white duration-200"
              >
                Save
              </button>
            </div>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
