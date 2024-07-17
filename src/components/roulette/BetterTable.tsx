"use client";
import { FC } from "react";
import Image from "next/image";
import { PiCoinsLight } from "react-icons/pi";

interface Props {
  type: number;
  betters: {
    user_id: number;
    level: number;
    avatar: string;
    bet: number;
    name: string;
  }[];
}

const BetterTable: FC<Props> = ({ type, betters }) => {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full bg-[#313131] rounded-md h-12 p-2 px-4 shine-gray flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            width={28}
            height={28}
            src={`/assets/roulette/${
              type === 1 ? "red" : type === 2 ? "black" : "gold"
            }.png`}
            alt=""
          />
          {"Place Bet"}
        </div>
        <span>{type === 3 ? "14" : "2"}x</span>
      </div>
      <div className="w-full rounded-md bg-[#1E1E1E] game-card p-3 flex justify-between items-center relative">
        <div className="h-full w-full rounded-md innerBlack bg-[#191919]">
          <div className="h-14 w-full flex justify-between dropShadow text-font items-center px-4">
            <span>{betters.length} Bets Total</span>
            <span className="flex items-center">
              <span className="text-gold">
                <PiCoinsLight />
              </span>
              &nbsp;{betters.reduce((t, n) => t + n.bet, 0)}
            </span>
          </div>
          {betters.map((better, idx) => (
            <div className="w-full px-4 flex justify-between items-center my-2" key={`betters-table-${type}-${idx}`}>
              <div className="flex items-center my-2 gap-2">
                <Image
                  width={28}
                  height={28}
                  src={better.avatar}
                  alt=""
                  className="rounded-sm"
                />
                <div className="bg-[#020202] border border-[#F08A48] text-[#F08A48] text-xs rounded-sm h-[18px] w-12 flex justify-center items-center gap-[5px]">
                  <Image
                    width={8}
                    height={8}
                    className="w-3 h-3"
                    src={"/assets/icons/bronze.png"}
                    alt=""
                  />
                  <span>{better.level}</span>
                </div>
                <span className="text-font">{better.name}</span>
              </div>
              <span className="text-font">{better.bet}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BetterTable;
