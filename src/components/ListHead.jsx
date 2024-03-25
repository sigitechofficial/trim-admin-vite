// @ts-nocheck
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ListHead(props) {
  const { Icon, Angle } = props;
  const location = useLocation().pathname;
  return (
    <li className="mx-2">
      <Link to={props.to} className="space-y-1">
        <div
          className={`flex gap-x-2 justify-between items-center py-1.5 lg:py-3 px-2 rounded-lg  hover:bg-black hover:text-white duration-200
         ${
           location === props.to || props.active
             ? "bg-black text-white"
             : "bg-transparent text-black"
         }`}
          onClick={props.onClick}
        >
          <div className="flex gap-x-2">
            <Icon size={25} />
            <h1 className="font-chivo font-medium text-lg sm:text-sm lg:text-base">
              {props.title}
            </h1>
          </div>

          <button>{Angle && <Angle />}</button>
        </div>
        <hr className="w-full" />
      </Link>
    </li>
  );
}
