import React from "react";

export default function SwiperCard() {
  return (
    <div className="w-60 m-auto text-center space-y-2">
      <img
        src="/images/barber.webp"
        alt="barber"
        className="w-full h-32 object-contain"
      />
      <h2 className="text-2xl font-workSans font-medium">Hair Specialist</h2>
      <p className="font-workSans font-medium">Muhammad Ali</p>
    </div>
  );
}
