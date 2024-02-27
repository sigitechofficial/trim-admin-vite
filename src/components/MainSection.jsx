import React from "react";
import { useLocation } from "react-router-dom";

export default function MainSection(props) {
  const location = useLocation().pathname;
  return (
    <section
      className={`w-[calc(100%-240px)] lg:w-[calc(100%-288px)] float-right relative top-[94px] bg-themeGray min-h-[calc(100vh-94px)] space-y-6 ${
        location !== "/" ? "py-6 px-6 2xl:px-12" : ""
      }`}
    >
      {props.content}
    </section>
  );
}
