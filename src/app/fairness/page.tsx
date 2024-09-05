"use client";

import React, { FC, useState } from "react";
import InfoPage from "@/components/fairness/info";
import RoulettePage from "@/components/fairness/roulette";
import IconInfo from "@/utils/icons/Info";
import CoinflipPage from "@/components/fairness/coinflip";
import BonusCasesPage from "@/components/fairness/bonusCases";
import UpgradePage from "@/components/fairness/upgrade";

const Fairness: FC = () => {
  const [tab, setTab] = useState<number>(1);

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex gap-1 items-center">
        <IconInfo width={18} height={18} color="#E9AE15" />
        <p className="text-[18px] text-[#D1D1D1] font-bold">Provably Fair</p>
      </div>

      <div className="flex flex-row gap-2">
        <div
          onClick={() => setTab(1)}
          className={`${
            tab === 1
              ? "border-[#E9AE15] text-[#E9AE15]"
              : "border-[#212121B2] text-[#717171]"
          } w-[90px] h-[34px] bg-[#212121B2] rounded-[5px] border flex flex-row items-center justify-center text-[12px] font-semibold cursor-pointer`}
        >
          Info
        </div>

        <div
          onClick={() => setTab(2)}
          className={`${
            tab === 2
              ? "border-[#E9AE15] text-[#E9AE15]"
              : "border-[#212121B2] text-[#717171]"
          } w-[90px] h-[34px] bg-[#212121B2] rounded-[5px] border flex flex-row items-center justify-center text-[12px] font-semibold cursor-pointer`}
        >
          Roulette
        </div>
        <div
          onClick={() => setTab(3)}
          className={`${
            tab === 3
              ? "border-[#E9AE15] text-[#E9AE15]"
              : "border-[#212121B2] text-[#717171]"
          } w-[90px] h-[34px] bg-[#212121B2] rounded-[5px] border flex flex-row items-center justify-center text-[12px] font-semibold cursor-pointer`}
        >
          Royalflip
        </div>
        <div
          onClick={() => setTab(4)}
          className={`${
            tab === 4
              ? "border-[#E9AE15] text-[#E9AE15]"
              : "border-[#212121B2] text-[#717171]"
          } w-[90px] h-[34px] bg-[#212121B2] rounded-[5px] border flex flex-row items-center justify-center text-[12px] font-semibold cursor-pointer`}
        >
          Crown & King
        </div>
        <div
          onClick={() => setTab(5)}
          className={`${
            tab === 5
              ? "border-[#E9AE15] text-[#E9AE15]"
              : "border-[#212121B2] text-[#717171]"
          } w-[90px] h-[34px] bg-[#212121B2] rounded-[5px] border flex flex-row items-center justify-center text-[12px] font-semibold cursor-pointer`}
        >
          Bonus Cases
        </div>
      </div>
      {tab === 1 && <InfoPage />}
      {tab === 2 && <RoulettePage />}
      {tab === 3 && <CoinflipPage />}
      {tab === 4 && <UpgradePage />}
      {tab === 5 && <BonusCasesPage />}
    </div>
  );
};

export default Fairness;
