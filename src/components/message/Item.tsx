import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import bnbLogo from "@/assets/logos/bnb.png";

const MessageItem: FC<{ chat: any }> = ({ chat }) => {
  const [levelItem, setLevelItem] = useState(0);

  const levels = [
    { name: "bronze", color: "#DF8E44" },
    { name: "silver", color: "#9F9F9F" },
    { name: "gold", color: "#FFD375" },
    { name: "platinum", color: "#65ABCF" },
    { name: "diamond", color: "#FD91FF" },
    { name: "saphire", color: "#DCDCDC" },
    { name: "warden", color: "#07CBFF" },
    { name: "prince", color: "#B0F215" },
    { name: "monarch", color: "#FE4A45" },
  ];

  useEffect(() => {
    if (chat) {
      if (chat.user.player_level > 11) {
        setLevelItem(1);
      } else if (chat.user.player_level > 25) {
        setLevelItem(2);
      } else if (chat.user.player_level > 36) {
        setLevelItem(3);
      } else if (chat.user.player_level > 48) {
        setLevelItem(4);
      } else if (chat.user.player_level > 54) {
        setLevelItem(5);
      }
    }
  }, [chat]);

  return (
    <div className="flex gap-1 items-center">
      <div className="flex gap-[3px] bg-[#101010] min-w-[80px] rounded-[5px] py-[2px]">
        <Image
          src={chat.user.avatar}
          width={24}
          height={24}
          className="w-[24px] h-[24px] rounded-sm"
          alt="icon"
        />
        <div className="flex flex-col">
          <div className="flex flex-row gap-[2px] items-center">
            <Image src={bnbLogo} alt="bnb" />
            <span className="text-[10px] font-bold text-white overflow-hidden text-ellipsis w-[38px]">
              {chat.user.name}
            </span>
          </div>
          <div className="flex flex-row gap-[2px] items-center justify-center w-[48px] h-[12px] rounded-[2px] border-[#DF8E44] border bg-[#020202]">
            <Image
              src={`/assets/icons/${levels[levelItem].name}.png`}
              width={8}
              height={8}
              alt="cup"
            />
            <span className="text-[9px] font-bold text-[#DF8E44]">
              {chat.user.player_level}
            </span>
          </div>
        </div>
      </div>
      <div className="text-[10px] font-normal leading-[12px] max-w-[170px] text-[#ACACAC] break-words">
        {chat.message}
      </div>
    </div>
  );
};

export default MessageItem;
