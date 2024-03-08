// @ts-nocheck
import React from "react";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import GetAPI from "../../utilities/GetAPI";
import Loader from "../../components/Loader";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalBody,
//   ModalCloseButton,
//   ModalFooter,
// } from "@chakra-ui/react";
// import selectStyles from "../../utilities/SelectStyle";
// import Select from "react-select";
 
export default function Coupons() {
  const navigate = useNavigate();

  const { data, reFetch } = GetAPI('admin/coupons')
  // const [modal, setModal] = useState(false);
  // //   const [modalType, setModalType] = useState(null);

  // const openModal = (type) => {
  //   // setModalType(type);
  //   setModal(true);
  // };

  // const closeModal = () => {
  //   setModal(false);
  // };


  const columns = [
    { field: "serialNo", header: "Sr" },
    // { field: "id", header: "Id" },
    {
      field: "name",
      header: "Salon Name",
    },
    {
      field: "code",
      header: "Coupon Code",
    },
    {
      field: "discount",
      header: "Discount",
    },
    {
      field: "couponType",
      header: "Coupon Type",
    },
    {
      field: "limit",
      header: "Person Limit",
    },
    {
      field: "duration",
      header: "Duration",
    },
    {
      field: "status",
      header: "Status",
    },
    {
      field: "action",
      header: "Action",
    },
  ];

  const datas = []
  data?.data?.map((obj, i) => {
    return datas.push({
      serialNo: i + 1,
      id: obj?.id,
      name: obj?.salonDetail?.salonName,
      code: obj?.promoCode,
      discount: `${obj?.value} %`,
      couponType: obj?.type,
      limit: obj?.limit,
      duration: obj?.till,
      status: <div>
        {obj?.status ? (
          <div className="bg-[#12466F14] text-theme font-semibold p-2 rounded-md flex justify-center">
            Active
          </div>
        ) : (
          <div className="bg-[#EE4A4A14] text-[#EE4A4A] font-semibold p-2 rounded-md flex justify-center">
            Inactive
          </div>
        )}
      </div>
      ,
      action: <button
        className="border border-yellow-400 rounded-md p-2 text-yellow-400"
        onClick={() =>
          navigate("/coupon-details", {
            state: { data : obj },
          })
        }
      >
        <FaEye size={24} />
      </button>
    })
  })

  return data.length === 0 ? <Loader /> : (
    <Layout
      content={
        <div className="space-y-5">
          <div className="w-full flex justify-between items-center">
            <h2 className="text-xl lg:text-2xl font-chivo font-semibold">
              All Coupons <span className="text-labelColor">(260)</span>
            </h2>
          </div>

          <MyDataTable columns={columns} data={datas} />

          {/* <Modal onClose={closeModal} isOpen={modal} isCentered size={"6xl"}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <div className="flex flex-col justify-center items-center space-y-6 pt-5 pb-4">
                  <div className="text-center">
                    <h2 className="text-xl font-workSans font-medium uppercase">
                      Add Coupon
                    </h2>
                  </div>

                  <div className="w-full grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-black font-workSans font-medium"
                      >
                        Coupon Type
                      </label>
                      <Select styles={selectStyles} />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="title"
                        className="text-black font-workSans font-medium"
                      >
                        Coupon Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="code"
                        className="text-black font-workSans font-medium"
                      >
                        Coupon Code
                      </label>
                      <input
                        type="number"
                        id="code"
                        className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="limit"
                        className="text-black font-workSans font-medium"
                      >
                        Limit for Same User
                      </label>
                      <input
                        type="number"
                        id="limit"
                        className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="discount"
                        className="text-black font-workSans font-medium"
                      >
                        Discount Type
                      </label>
                      <Select styles={selectStyles} />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="percentage"
                        className="text-black font-workSans font-medium"
                      >
                        Discount Percent
                      </label>
                      <input
                        type="number"
                        id="percentage"
                        className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="minPurchase"
                        className="text-black font-workSans font-medium"
                      >
                        Minimum Purchase
                      </label>
                      <input
                        type="number"
                        id="minPurchase"
                        className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="maxPurchase"
                        className="text-black font-workSans font-medium"
                      >
                        Maximum Discount
                      </label>
                      <input
                        type="number"
                        id="maxPurchase"
                        className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="startDate"
                        className="text-black font-workSans font-medium"
                      >
                        Start Date
                      </label>
                      <input
                        type="date"
                        id="startDate"
                        className="w-full h-[42px] rounded-md px-3 outline-none border font-workSans font-medium 
                            text-labelColor"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label
                        htmlFor="endDate"
                        className="text-black font-workSans font-medium"
                      >
                        End Date
                      </label>
                      <input
                        type="date"
                        id="endDate"
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
                    Cancel
                  </button>
                  <button
                    className="text-theme font-workSans font-medium border border-theme rounded-lg px-8 py-2.5 hover:bg-theme
                         hover:text-white duration-200"
                  >
                    Add
                  </button>
                </div>
              </ModalFooter>
            </ModalContent>
          </Modal> */}
        </div>
      }
    />
  );
}
