import React from "react";
import { PiUserBold } from "react-icons/pi";
import { FaRegBell } from "react-icons/fa";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header(props) {
  return (
    <header className="w-full bg-white fixed border-b-2 z-50">
      <nav className="flex justify-between items-center py-3 w-11/12 mx-auto">
        <Link to="/">
          <img src="/images/logo2.webp" alt="logo" className="w-16" />
        </Link>

        <div className="flex items-center gap-x-3 max-sm:hidden">
          <div>
            <FaRegBell size={26} />
          </div>
          <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
            <PiUserBold size={28} color="white" />
          </div>
          <div>
            <h2 className="font-rubik font-semibold">
              {localStorage.getItem("userName")}
            </h2>
            <p className="text-lightGray text-sm font-normal font-workSans">
              Admin
            </p>
          </div>
        </div>
        <div
          className="sm:hidden"
          onClick={() => props?.setNavbarVis(!props?.navbarVis)}
        >
          <GiHamburgerMenu size="25px" />
        </div>
      </nav>
    </header>
  );
}
