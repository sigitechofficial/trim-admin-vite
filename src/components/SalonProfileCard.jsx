// @ts-nocheck
import React from "react";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineStar } from "react-icons/hi2";
import { LuClock3 } from "react-icons/lu";
import { LuMapPin } from "react-icons/lu";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utilities/URL";
import StarRating from "../utilities/StarRating";
export default function SalonProfileCard(props) {
  console.log(props.ratingCount);
  return (
    <div
      className={`${
        props.bgColor
      } p-4 lg:p-6 rounded-xl grid grid-cols-2 gap-x-10 ${
        props.shadow === true ? "shadow-lg" : "shadow-none"
      }`}
    >
      <div className="h-64">
        <img
          src={`${BASE_URL}${props?.coverImage}`}
          alt="barbershop"
          className="object-fill h-full w-full rounded-md"
        />
      </div>

      <div className="space-y-3">
        <div className="space-y-2">
          <h2 className="text-2xl font-medium font-workSans">
            {props?.salonName}
          </h2>
          <div className="flex gap-x-1 items-center">
            {/* <HiOutlineStar className={`${}`} /> */}
            {/* <HiOutlineStar />
            <HiOutlineStar />
            <HiOutlineStar />
            <HiOutlineStar /> */}
            <StarRating rating={props.ratingCount} />

            <span className="text-themeLightGray font-workSans font-medium">
              ({props?.ratingCount} Reviews)
            </span>
          </div>
        </div>

        <ul className="space-y-2">
          {/* <li className="flex items-center gap-x-2 text-themeLightGray font-medium font-workSans">
            <IoCalendarOutline size={20} color="#12466F" />
            <span>Mon - Fri</span>
          </li>
          <li className="flex items-center gap-x-2 text-themeLightGray font-medium font-workSans">
            <LuClock3 size={20} color="#12466F" />
            <span>11:00am - 11:00pm</span>
          </li> */}
          <li className="flex items-center gap-x-2 text-themeLightGray font-medium font-workSans">
            <LuMapPin size={20} color="#12466F" />
            <span>{props?.salonAddress}</span>
          </li>
        </ul>

        <div className="flex items-center gap-x-3">
          {props?.socialLinks?.map((link, ind) => (
            <Link to={link?.url}>
              <img
                src={`/images/${link?.platform}.webp`}
                alt={link?.platform}
                className="w-8 h-8 object-contain"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
