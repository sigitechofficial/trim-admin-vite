import React from "react";

export default function HomeMiniCards(props) {
  const { Icon } = props;
  return (
    <div className="bg-homeCards p-2.5 2xl:p-5 shadow-textShadow rounded-2xl">
      <div className="flex justify-between items-center gap-y-4">
        <div className="flex justify-center items-center gap-x-2">
          <Icon size={24} className="text-dark" />
          <h2 className="text-dark font-rubik font-semibold 2xl:text-xl">
            {props.title}
          </h2>
        </div>
        <div className="text-theme 2xl:text-xl font-rubik font-semibold">
          {props.total}
        </div>
      </div>
    </div>
  );
}
