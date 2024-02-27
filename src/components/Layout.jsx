// @ts-nocheck
import React from "react";
import Header from "./Header";
import Leftbar from "./Leftbar";
import MainSection from "./MainSection";

export default function Layout(props) {
  return (
    <>
      <Header />
      <Leftbar />
      <MainSection content={props.content} />
    </>
  );
}
