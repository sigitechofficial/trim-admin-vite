// @ts-nocheck
import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout";
import MyDataTable from "../../components/MyDataTable";
import { FaArrowLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa6";
import GetAPI from "../../utilities/GetAPI";
import { FaEye } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
} from "@chakra-ui/react";
import Select from "react-select";
import selectStyles from "../../utilities/SelectStyle";
import { BASE_URL } from "../../utilities/URL";
import { error_toaster, success_toaster } from "../../utilities/Toaster";

export default function OffPeakTimeReport() {
  const [modal, setModal] = useState(false)
  const [salonID, setSalonID] = useState('')
  const [salonReportData, setSalonReportData] = useState([])
  const [selectedOption, setSelectedOption] = useState({ value: 'complete', label: 'Complete' });

  const options = [
    { value: 'complete', label: 'Complete' },
    { value: 'cancel', label: 'Cancel' },
    { value: 'no-show', label: 'No Show' },
  ];

  const { data: SalonData } = GetAPI('admin/salon-view')

  const columns = [
    { field: "sn", header: "Sn" },
    { field: "salonName", header: "Salon Name" },
    { field: "employeeCount", header: "Employee Count" },
    { field: "action", header: "Action" },
  ]

  const columnsReport = [
    { field: "sn", header: "Sn" },
    { field: "day", header: "Date" },
    { field: "hd0", header: "8-9" },
    { field: "hd1", header: "9-10" },
    { field: "hd2", header: "10-11" },
    { field: "hd3", header: "11-12" },
    { field: "hd4", header: "12-13" },
    { field: "hd5", header: "13-14" },
    { field: "hd6", header: "14-15" },
    { field: "hd7", header: "15-16" },
    { field: "hd8", header: "16-17" },
    { field: "hd9", header: "17-18" },
    { field: "hd10", header: "18-19" },
    { field: "hd11", header: "19-20" },
  ]

  const closeModal = () => {
    setModal(false)
    setSelectedOption({ value: 'complete', label: 'Complete' })
  }

  const getSalonReport = async (id, val) => {
    var config = {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    };
    const res = await axios.get(BASE_URL + `admin/reports/peak-time/${val}/${id}`, config)
    if (res.status === "0") {
      if (res.errors) {
        for (let obj of res.errors) {
          error_toaster(obj.message);
        }
      } else {
        error_toaster(res.error);
      }
    } else if (res.data.status === "1") {
      setSalonReportData(res?.data?.data)
      success_toaster("Salon Off Peak Times Report");
    }
  }

  const findCount = (val, array) => {
    const temp = array?.find(obj => obj?.start === val && obj)
    if (temp) {
      return temp?.count
    }
    else {
      return 0
    }
  }

  const datas = [];
  const datasReport = []

  SalonData?.data?.map((values, index) => {
    return datas.push({
      sn: index + 1,
      salonName: values?.salonName,
      employeeCount: values?.employeeCount,
      action: (
        <button
          className="border border-yellow-400 rounded-md p-2 text-yellow-400"
          onClick={() => {
            setModal(true)
          }}
        >
          <FaEye size={24} onClick={() => {
            getSalonReport(values?.id, 'complete')
            setSalonID(values?.id)
            setSelectedOption({ value: 'complete', label: 'Complete' })
          }} />
        </button>
      )
    });
  });

  salonReportData?.report?.map((values, index) => {
    return datasReport.push({
      sn: index + 1,
      day: values?.day,
      hd0: findCount('8:00', values?.hours),
      hd1: findCount('9:00', values?.hours),
      hd2: findCount('10:00', values?.hours),
      hd3: findCount('11:00', values?.hours),
      hd4: findCount('12:00', values?.hours),
      hd5: findCount('13:00', values?.hours),
      hd6: findCount('14:00', values?.hours),
      hd7: findCount('15:00', values?.hours),
      hd8: findCount('16:00', values?.hours),
      hd9: findCount('17:00', values?.hours),
      hd10: findCount('18:00', values?.hours),
      hd11: findCount('19:00', values?.hours),
    });
  })

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
            <h2 className="flex items-center text-xl lg:text-2xl font-chivo font-semibold">
              <span className="flex items-center text-[#8F95B2]">
                Reports <FaAngleRight size={20} />
              </span>{" "}
              Off Peak Times Report
            </h2>
          </div>
          <MyDataTable columns={columns} data={datas} />


          <Modal onClose={closeModal} isOpen={modal} isCentered size={"6xl"}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <div className="space-y-2 pt-5 pb-4 relative overflow-auto ">
                  <div className="text-center">
                    <h2 className="text-xl font-workSans font-medium uppercase">
                      Report
                    </h2>
                  </div>

                  <div className="flex justify-start px-8">
                    <Select options={options}
                      defaultValue={selectedOption}
                      onChange={(val) => {
                        getSalonReport(salonID, val?.value)
                        setSelectedOption(val)
                      }}
                      styles={selectStyles} />
                  </div>

                  <div className="flex items-center gap-x-2">
                    <MyDataTable columns={columnsReport} data={datasReport} hide={true} />
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
                </div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      }
    />
  );
}
