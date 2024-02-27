// @ts-nocheck
import React from "react";
import { Link } from "react-router-dom";

export default function ReportCard(props) {
  const { Icon } = props;
  return (
    <Link
      to={props.to}
      className="bg-white flex justify-center items-center rounded-lg shadow-lg py-20"
    >
      <div className="flex items-center gap-x-4 text-xl text-theme font-chivo font-semibold">
        <Icon size={24} />
        <p>{props.title}</p>
      </div>
    </Link>
  );
}
