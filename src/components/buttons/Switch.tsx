import React from "react";
import { IoMdCheckmark } from "react-icons/io";

interface Props {
  status: boolean;
  onClick: () => void;
}

const Switch: React.FC<Props> = ({ status, onClick }) =>
  status ? (
    <div
      className="w-8 h-4 rounded-full bg-innerBlack switch dropBlack flex justify-end items-center relative cursor-pointer"
      onClick={onClick}
    >
      <div className="shine rounded-full innerBlack"></div>
      <div className="w-3 h-3 rounded-full bg-gold dropGold flex justify-center items-center relative mr-[2px]">
        <div className="shine rounded-full innerGold "></div>
        <IoMdCheckmark className="text-font w-2" />
      </div>
    </div>
  ) : (
    <div
      className="w-8 h-4 rounded-full bg-innerBlack switch dropBlack flex justify-start items-center relative cursor-pointer"
      onClick={onClick}
    >
      <div className="shine rounded-full innerBlack"></div>
      <div className="w-3 h-3 rounded-full bg-disabled dropDis flex justify-center items-center relative ml-[2px]">
        <div className="shine rounded-full innerDis"></div>
      </div>
    </div>
  );

export default Switch;
