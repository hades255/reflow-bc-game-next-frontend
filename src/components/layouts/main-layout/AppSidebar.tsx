"use client";

import React, { FC, useState } from "react";
import Image from "next/image";

import england from "@/assets/logos/england.png";

import arrowBottom from "@/assets/icons/arrow-bottom.svg";
import MessageItem from "@/components/message/Item";
import SendInput from "@/components/message/SendInput";

const AppSidebar: FC = () => {
  const [showRooms, setShowRooms] = useState(false);

  const handleClickRoom = () => {
    setShowRooms(!showRooms);
  };

  return (
    <div className="w-[280px] bg-[#181818] h-auto fixed top-[84px] z-10">
      <div className="flex flex-col relative">
        <div
          onClick={() => setShowRooms(!showRooms)}
          className="m-[18px_12px_13px_12px] cursor-pointer bg-[#6060600D] h-[37px] w-[250px] shadow-[0_1px_3px_-1px_#0000006E,_0_2px_0_-1px_#0000003D] rounded-[2px] p-3 flex justify-between items-center"
        >
          <div className="flex items-center gap-1">
            <Image src={england} className="w-[12px] h-[12px]" alt="logo" />
            <span className="text-[12px] font-medium text-[#D1D1D1]">
              English Room
            </span>
          </div>

          <div className="flex items-center">
            <div className="flex items-center justify-center w-[10px] h-[10px] bg-[#0DC5533D] rounded-full">
              <div className="w-[6px] h-[6px] bg-[#0DC553] rounded-full"></div>
            </div>
            <span className="text-[12px] font-medium text-[#6C6C6C] ml-[2px]">
              435/999
            </span>
            <div className="ml-[6px]">
              <Image src={arrowBottom} alt="logo" />
            </div>
          </div>
        </div>

        {showRooms && (
          <div>
            <div className="absolute left-[12px] top-[60px] w-[250px] h-[500px] bg-[#1E1E1E] border border-[#333541]">
              <div className="p-3 flex flex-col items-start">
                <button
                  onClick={handleClickRoom}
                  className="hover:bg-[#181818] text-[12px] w-full text-start p-2 rounded-sm text-white"
                >
                  High Rollers Room (88)
                </button>
                <button
                  onClick={handleClickRoom}
                  className="hover:bg-[#181818] text-[12px] w-full text-start p-2 rounded-sm flex items-center text-white gap-1"
                >
                  <Image
                    src={england}
                    className="w-[12px] h-[12px]"
                    alt="logo"
                  />
                  English Room (714)
                </button>
                <button
                  onClick={handleClickRoom}
                  className="hover:bg-[#181818] text-[12px] w-full text-start p-2 rounded-sm flex items-center text-white gap-1"
                >
                  <Image
                    src={england}
                    className="w-[12px] h-[12px]"
                    alt="logo"
                  />
                  English Room (714)
                </button>
                <button
                  onClick={handleClickRoom}
                  className="hover:bg-[#181818] text-[12px] w-full text-start p-2 rounded-sm flex items-center text-white gap-1"
                >
                  <Image
                    src={england}
                    className="w-[12px] h-[12px]"
                    alt="logo"
                  />
                  English Room (714)
                </button>
              </div>
            </div>
          </div>
        )}

        <div>
          <div className="pl-3 gap-3 flex flex-col overflow-y-scroll h-[calc(100vh-220px)] message-list">
            {Array.from({ length: 100 }).map((_, index) => (
              <MessageItem key={index} />
            ))}
          </div>

          <div className="p-3">
            <SendInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
