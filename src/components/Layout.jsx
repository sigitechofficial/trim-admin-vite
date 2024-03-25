// @ts-nocheck
import React, { useState } from "react";
import Header from "./Header";
import Leftbar from "./Leftbar";
import MainSection from "./MainSection";

export default function Layout(props) {
  const [navbarVis, setNavbarVis] = useState(false);

  return (
    <>
      <Header navbarVis={navbarVis} setNavbarVis={setNavbarVis} />
      <Leftbar navbarVis={navbarVis} setNavbarVis={setNavbarVis} />
      <MainSection content={props.content} />
    </>
  );
}
