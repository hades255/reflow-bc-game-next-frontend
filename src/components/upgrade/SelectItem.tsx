import React, { FC } from "react";
import Image from "next/image";
import selectCrown from "@/assets/images/upgrade-select.svg";
import IconCoin from "@/utils/icons/Coin";

interface Props {
  allAmount?: number;
  imgUrl?: string;
  title?: string;
  onClick?: () => void;
}

const SelectItem: FC<Props> = ({ allAmount, imgUrl, title, onClick }) => {
  return (
    <div
      className="h-[350px] w-[342px] bg-[#1E1E1E] rounded-[5px] p-3 flex flex-col gap-6 cursor-pointer"
      style={{ background: "linear-gradient(#28282894, #1E1E1E" }}
      onClick={onClick}
    >
      <div
        className="w-full h-[232px] relative flex items-center justify-center border border-[#EAA62580] rounded-[5px] overflow-hidden bg-[#1212127A]"
        style={{ background: "linear-gradient(#191A1900, #EAA62580)" }}
      >
        <div className="absolute top-[17px] left-[34px]">
          {imgUrl ? "" : <Image src={selectCrown} alt="logo" />}
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        <img src={imgUrl} alt="" className="h-[160px]" />
      </div>

      <div className="w-full flex flex-col gap-1 bg-[#1212127A] dropBlack rounded-[5px] p-3">
        <div className="flex justify-between">
          <p className="text-[16px] font-semibold text-white">{title}</p>
          {/* <p className="text-[14px] font-semibold text-[#6D6D6D]">Human Bean</p> */}
        </div>
        <div className="flex gap-[5px] items-center">
          <IconCoin width={30} height={30} color="#E9AE15" />
          <p className="text-[16px] font-semibold text-[#E9AE15] leading-[17.28px]">
            {allAmount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SelectItem;
