// @ts-nocheck
import React, { useState } from "react";
import Header from "./Header";
import Leftbar from "./Leftbar";
import MainSection from "./MainSection";
import { useMediaQuery } from "@chakra-ui/react";

export default function Layout(props) {
  const [navbarVis, setNavbarVis] = useState(
    window.innerWidth < 640 ? false : true
  );

  return (
    <>
      <Header navbarVis={navbarVis} setNavbarVis={setNavbarVis} />
      <Leftbar navbarVis={navbarVis} setNavbarVis={setNavbarVis} />
      <MainSection content={props.content} />
    </>
  );
}
