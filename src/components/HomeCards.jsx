import React from "react";

export default function HomeCards(props) {
  const { Icon } = props;
  return (
    <div className={`${props.bgColor} p-3 2xl:p-5 shadow-textShadow rounded-2xl`}>
      <div className="flex flex-col gap-y-4">
        <div className={`flex justify-center items-center ${props.iconBg} h-12 w-12 rounded-xl`}>
          <Icon size={24} color={props.iconColor}/>
        </div>
        <h2 className="text-secondary font-workSans">{props.title}</h2>
        <p className="text-dark text-xl 2xl:text-3xl font-rubik font-semibold">
          {props.total}
        </p>
      </div>
    </div>
  );
}
