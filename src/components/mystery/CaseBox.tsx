"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import lock from "@/assets/icons/lock.svg";
import Button from "../buttons/Button";

import caseLeft from "@/assets/icons/case-arrow-left.svg";
import caseRight from "@/assets/icons/case-arrow-right.svg";

const boxList = [
  { title: "Bronze", level: 1 },
  { title: "Silver", level: 10 },
  { title: "Gold", level: 100 },
];

const CaseBox: FC = () => {
  const [current, setCurrent] = useState(1);

  return (
    <div
      className="w-full h-[222px] bg-[#1E1E1E] py-6 px-12 rounded-[5px] flex flex-row items-center justify-between"
      style={{ background: "linear-gradient(#28282894, #1E1E1E" }}
    >
      <div className="flex flex-col">
        <p className="capitalize text-white text-[21px] font-bold">
          {boxList[current].title} Crate
        </p>
        <div className="flex flex-row gap-[6px] mt-[8px]">
          <Image src={lock} alt="logo" />
          <p className="text-[14px] font-normal">
            Unlocks at{" "}
            <span className="font-medium">Level {boxList[current].level}</span>
          </p>
        </div>

        <div className="flex flex-row items-center gap-3 mt-6">
          <div
            className="w-[52px] h-[29px] dropBlack flex flex-row items-center justify-center gap-1"
            style={{ background: "linear-gradient(#11111147, #14141447)" }}
          >
            <Image
              src={`/assets/icons/${boxList[current].title}-key.png`}
              alt="icon"
              width={21}
              height={21}
            />
            <p className="text-[12px] font-medium text-[#D1D1D1]">2</p>
          </div>
          <p className="text-[12px] font-semibold text-[#484848]">Key Needed</p>
        </div>

        <div className="w-[120px] mt-6">
          <Button text="Open Case" />
        </div>
      </div>

      <div className="flex flex-row items-center gap-0">
        <Image
          src={caseLeft}
          alt="icon"
          className="cursor-pointer"
          onClick={() => {
            if (current > 0) {
              setCurrent(current - 1);
            }
          }}
        />
        <Image
          width={400}
          height={180}
          src={`/assets/images/${boxList[current].title}.png`}
          alt="image"
        />
        <Image
          src={caseRight}
          alt="icon"
          className="cursor-pointer"
          onClick={() => {
            if (current < boxList.length - 1) {
              setCurrent(current + 1);
            }
          }}
        />
      </div>
    </div>
  );
};

export default CaseBox;
