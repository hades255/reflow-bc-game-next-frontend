import React, { FC } from "react";
import Image from "next/image";
import avatar from "@/assets/images/avatar-1.png";
import bnbLogo from "@/assets/logos/bnb.png";
import cup from "@/assets/icons/cup.svg";

const MessageItem: FC = () => {
  return (
    <div className="flex flex-row gap-1 items-center">
      <div className="flex flex-row gap-[3px] bg-[#101010] w-[90px] rounded-[5px] p-[2px]">
        <Image
          src={avatar}
          className="w-[24px] h-[24px] rounded-sm"
          alt="icon"
        />
        <div className="flex flex-col">
          <div className="flex flex-row gap-[2px] items-center">
            <Image src={bnbLogo} alt="bnb" />
            <span className="text-[8px] font-bold text-white">Michael</span>
          </div>
          <div
            className="flex flex-row gap-[2px] items-center w-[48px] h-[11px] pl-1 rounded-[2px]"
            style={{
              background: "linear-gradient(#F1B31A, #EDA61D)",
            }}
          >
            <Image src={cup} className="w-[7.18px] h-[6.44px]" alt="cup" />
            <span className="text-[9px] font-bold text-[#101010]">68</span>
          </div>
        </div>
      </div>
      <div className="text-[10px] font-normal leading-[12px] text-[#ACACAC]">
        Why withdrawal not working... It`s Annoying
      </div>
    </div>
  );
};

export default MessageItem;
