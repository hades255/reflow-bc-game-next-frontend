"use client";

import React, { FC } from "react";
import changeBG from "@/assets/images/chance-bg.svg";
import Image from "next/image";
import crown from "@/assets/icons/crown.svg";
import evaArrowUp from "@/assets/icons/eva-arrow-up.svg";
import Button from "../buttons/Button";

const Chance: FC = () => {
  return (
    <div className="mt-[28px] relative">
      <div
        className="w-[243px] h-[243px] rounded-full bg-[#1E1E1E] p-[10px] relative"
        style={{ background: "linear-gradient(#282828, #1E1E1E)" }}
      >
        <Image
          src={evaArrowUp}
          alt="icon"
          className="absolute top-[2px] left-[118px]"
        />
        <div className="w-full h-full bg-[#0a0a0a7a] dropBlack rounded-full relative flex flex-col items-center justify-center">
          <Image
            src={changeBG}
            alt="icon"
            className="absolute top-[29px] left-5"
          />
          <div className="flex flex-col items-center justify-center z-[1] gap-4">
            <p className="font-bold text-[16px] text-[#484848] leading-[17.28px]">
              CHANCE
            </p>
            <p className="text-[34px] font-semibold text-white leading-[36.72px]">
              0.00<span className="text-[#E9AE15]">%</span>
            </p>
            <p className="text-[16px] leading-[17.28px] text-[#484848]">
              1.0000 - 1.0000
            </p>
          </div>
        </div>
      </div>
      <div
        className="w-[71.28px] h-[71.28px] bg-[#1E1E1E] rounded-full absolute -top-[25px] left-[87px] -z-10"
        style={{ background: "linear-gradient(#282828, #1E1E1E)" }}
      >
        <div className="relative">
          <Image
            src={crown}
            alt="icon"
            className="absolute top-[4px] left-[23px]"
          />
        </div>
      </div>

      <div className="w-full flex justify-center mt-[41px]">
        <Button text="Upgrade"></Button>
      </div>
    </div>
  );
};

export default Chance;
