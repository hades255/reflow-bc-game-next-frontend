import React, { FC, useState } from "react";
import icon from "@/assets/icons/message-input.png";
import Image from "next/image";

import tip from "@/assets/icons/tip.svg";
import manage from "@/assets/icons/manage.svg";
import rule from "@/assets/icons/rule.svg";
import close from "@/assets/icons/close.svg";

const SendInput: FC = () => {
  const [showOption, setShowOption] = useState(false);

  return (
    <div className="relative">
      <input
        className="w-full h-[42px] rounded-[2px] border border-[#CDCDCD63] shadow-[0_1px_2px_-1px_#FFFFFF21,_0_0_0_1px_#FFFFFF0A] p-2 outline-none text-xs text-[#646464]"
        placeholder="Type your message here"
        style={{ background: "linear-gradient(#111111, #141414)" }}
      />
      <Image
        src={icon}
        className="absolute top-[15px] right-4 cursor-pointer"
        alt="icon"
        onClick={() => setShowOption(!showOption)}
      />
      {showOption && (
        <div className="absolute left-[0px] top-[-165px] w-[255px] h-[160px] bg-[#1E1E1E] border border-[#333541]">
          <div className="p-3 flex flex-col items-start">
            <button className="hover:bg-[#181818] text-white text-[12px] w-full text-start p-2 rounded-sm flex items-center gap-1">
              <Image src={tip} className="w-[12px] h-[12px]" alt="logo" />
              Send a tip
            </button>
            <button className="hover:bg-[#181818] text-white text-[12px] w-full text-start p-2 rounded-sm flex items-center gap-1">
              <Image src={rule} className="w-[12px] h-[12px]" alt="logo" />
              Chat rules
            </button>
            <button className="hover:bg-[#181818] text-white text-[12px] w-full text-start p-2 rounded-sm flex items-center gap-1">
              <Image src={manage} className="w-[12px] h-[12px]" alt="logo" />
              Manage blocked users
            </button>
            <button className="hover:bg-[#181818] text-white text-[12px] w-full text-start p-2 rounded-sm flex items-center gap-1">
              <Image src={close} className="w-[12px] h-[12px]" alt="logo" />
              Close chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SendInput;
