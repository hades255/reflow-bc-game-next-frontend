"use client";

import React, { FC, useState } from "react";
import IconCoin from "@/utils/icons/Coin";

const BetAmount: FC = () => {
  const [value, setValue] = useState<number>(0);
  const [btnTab, setBtnTab] = useState<number>(0);

  return (
    <div
      className="w-[342px] h-[350px] bg-[#1E1E1E] rounded-[5px] p-3"
      style={{ background: "linear-gradient(#282828, #1E1E1E)" }}
    >
      <div className="w-full h-full bg-[#1212127A] dropBlack rounded-[5px] flex flex-col gap-6  justify-center items-center px-[6.5px]">
        <p className="uppercase text-[#838383] text-[12px] font-medium">
          Use your balance to upgrade
        </p>
        <div className="relative">
          <div className="absolute top-[10px] left-[10px]">
            <IconCoin width={16} height={17} color="#E9AE15" />
          </div>

          <input
            type="text"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="bg-[#1212127A] w-[253px] py-[6px] pl-[34px] rounded-[5px] dropBlack text-[14px] font-semibold text-[#D1D1D1] outline-none"
          />
        </div>

        <div className="dropBlack bg-[#121212] w-[253px] h-[10px] px-[6px] rounded-[15px] flex items-center">
          <input
            type="range"
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
            className="w-full h-[3px] appearance-none rounded-[15px] range-input"
            style={{
              background: `linear-gradient(to right, #E9AE15 ${value}%, #121212 0%)`,
            }}
          />
        </div>

        <div className="flex flex-row w-[253px] gap-3">
          <button
            className="w-full h-[25px] text-[12px] font-semibold rounded-[5px]"
            style={{
              background:
                btnTab === 1 ? "linear-gradient(#F1B31A, #E48F0F)" : "#2F2F2F",
              color: btnTab === 1 ? "#121212" : "#8D8D8D",
            }}
            onClick={() => {
              setBtnTab(1);
              setValue(10);
            }}
          >
            10%
          </button>
          <button
            className="w-full h-[25px] text-[12px] font-semibold rounded-[5px]"
            style={{
              background:
                btnTab === 2 ? "linear-gradient(#F1B31A, #E48F0F)" : "#2F2F2F",
              color: btnTab === 2 ? "#121212" : "#8D8D8D",
            }}
            onClick={() => {
              setBtnTab(2);
              setValue(25);
            }}
          >
            25%
          </button>
          <button
            className="w-full h-[25px] text-[12px] font-semibold rounded-[5px]"
            style={{
              background:
                btnTab === 3 ? "linear-gradient(#F1B31A, #E48F0F)" : "#2F2F2F",
              color: btnTab === 3 ? "#121212" : "#8D8D8D",
            }}
            onClick={() => {
              setBtnTab(3);
              setValue(50);
            }}
          >
            50%
          </button>
          <button
            className="w-full h-[25px] text-[12px] font-semibold rounded-[5px]"
            style={{
              background:
                btnTab === 4 ? "linear-gradient(#F1B31A, #E48F0F)" : "#2F2F2F",
              color: btnTab === 4 ? "#121212" : "#8D8D8D",
            }}
            onClick={() => {
              setBtnTab(4);
              setValue(100);
            }}
          >
            Max
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetAmount;
