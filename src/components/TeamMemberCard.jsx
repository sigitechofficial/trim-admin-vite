// @ts-nocheck
import React from "react";
import { MdOutlineStar } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utilities/URL";

export default function TeamMemberCard(props) {
  const navigate = useNavigate()

  const handleBarberShopDetail = (employee) => {
    localStorage.setItem('barbershopDetailsID', employee?.user?.id)
    navigate('/barbershop-details/saloon-employee-details')
  }

  return (
    // <Link to={props.to}>
    <>
      <h2 className="text-2xl font-workSans font-medium">Team Members</h2>
      <div>
        <div className="mt-6 grid grid-cols-3 lg:grid-cols-4  xl:grid-cols-6 2xl:grid-cols-8">
          {props?.employees?.map((employee, i) => <div key={i} onClick={() => handleBarberShopDetail(employee)} className="relative">
            <img
              src={employee?.user?.image ? `${BASE_URL}${employee?.user?.image}`:'/images/defaultProfileImg.webp'} 
              alt="team member"
              className="w-28 h-28 mx-auto object-fill object-center rounded-full"
            />

            <div
              className="bg-white border w-16 shadow-md rounded-xl flex justify-center gap-x-2 items-center font-workSans
         font-medium absolute top-24 left-14"
            >
              {/* 4.0 */}
              {employee?.employeeAverageRating}
              <MdOutlineStar size={20} />
            </div>

            <div className="text-center mt-4">
              <h2 className="text-2xl font-workSans font-semibold">{employee?.user?.firstName} {employee?.user?.lastName}</h2>
              <p className="text-sm font-workSans">{employee?.position}</p>
            </div>
          </div>)}
        </div>
      </div>
    </>
    // </Link>
  );
}
