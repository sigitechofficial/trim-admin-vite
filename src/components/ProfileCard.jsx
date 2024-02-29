import React from "react";
import { FiPhone } from "react-icons/fi";
// import { LuMapPin } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { BASE_URL } from "../utilities/URL";

export default function ProfileCard(props) {
  return (
    <div className={`${props.bgColor} ${props.shadow} rounded-2xl p-4 lg:p-6`}>
      <div className="flex gap-x-5">
        <img
          src={props?.coverImage ? `${BASE_URL}${props?.coverImage}`:'/images/defaultProfileImg.webp'}
          alt="salon-detail"
          className="w-48 h-44 object-cover"
        />
        <div className="space-y-3">
          <div className="space-y-2">
            <h2 className="text-themeLightGray text-2xl font-medium font-workSans">
              ID # {props?.employeeID}
            </h2>
            <p className="text-2xl font-medium font-workSans">
              {props?.employeeName}
            </p>
          </div>
          <ul className="space-y-2">
            <li className="flex items-center gap-x-2 text-themeLightGray font-medium font-workSans">
              <MdOutlineEmail />
              <span>{props?.employeeEmail}</span>
            </li>
            <li className="flex items-center gap-x-2 text-themeLightGray font-medium font-workSans">
              <FiPhone />
              <span>{props?.employeePhoneNumber}</span>
            </li>
            {/* <li className="flex items-center gap-x-2 text-themeLightGray font-medium font-workSans">
              <LuMapPin />
              <span>joher town, g block, lahore</span>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}
