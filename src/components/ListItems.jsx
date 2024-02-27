// @ts-nocheck
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function ListItems(props) {
  const location = useLocation().pathname;
  return (
    <Link
      className={`flex gap-x-2 items-center py-2 px-2 rounded-lg font-chivo font-medium hover:bg-black hover:text-white duration-200
    ${
      location === props.to || props.active
        ? "bg-black text-white"
        : "bg-transparent text-black"
    }`}
      to={props.to}
    >
      {props.title}
    </Link>
  );
}
