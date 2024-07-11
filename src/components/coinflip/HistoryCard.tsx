import React from "react";

import Image from "next/image";
import { PiCoinsLight } from "react-icons/pi";
import { TfiCup } from "react-icons/tfi";
import WhiteCoin from "@/utils/icons/WhiteCoin";
import BlackCoin from "@/utils/icons/BlackCoin";
import { HistoryType } from "@/utils/types";

interface Props {
  game: HistoryType;
}

const HistoryCard: React.FC<Props> = ({ game }) => {
  return (
    <div className="h-48 w-[300px] rounded-md bg-[#1E1E1E] game-card p-3 flex justify-between items-center relative">
      <div className="relative h-full w-28 flex gap-2 flex-col justify-center items-center rounded-md innerBlack bg-[#191919]">
        <div className="relative">
          <Image
            width={64}
            height={64}
            src={game["players"][0]["avatar"]}
            alt=""
            className="rounded-lg"
          />
          <div className="absolute rounded-sm w-10 h-3 left-[calc(50%-20px)] -bottom-1.5 flex justify-center items-center gap-1 px-1 bg-gold text-black font-bold text-[8px]">
            <TfiCup />
            <span className="text-[12px]">{game["players"][0]["level"]}</span>
          </div>
          <div className="absolute top-0 -right-3">
            {game["players"][0]["side"] ? (
              <WhiteCoin width={28} height={28} />
            ) : (
              <BlackCoin width={28} height={28} />
            )}
          </div>
        </div>
        <h5 className="text-center text-md text-font mt-1">
          {game["players"][0]["name"]}
        </h5>
        <div className="flex items-center justify-center px-2 py-1 gap-2 text-gold text-sm bg-[#121212] rounded-md text-bold">
          <PiCoinsLight />
          <span
            className={
              game.side === game["players"][0]["side"]
                ? "text-[#15C059]"
                : "text-[#C6363F]"
            }
          >
            {game["players"][0]["budget"].toFixed(2)}
          </span>
        </div>
        {game.side === game["players"][0]["side"] && (
          <div className="shine border-2 border-[#15C059] rounded-md inner-green"></div>
        )}
        {game.side === game["players"][1]["side"] && (
          <div className="shine border-2 border-[#C6363F] rounded-md inner-red"></div>
        )}
      </div>

      <h4 className="text-font">VS.</h4>

      <div className="h-full w-28 flex flex-col justify-center items-center gap-2 rounded-md innerBlack bg-[#191919] relative">
        <div className="relative">
          <Image
            width={64}
            height={64}
            src={game["players"][1]["avatar"]}
            alt=""
            className="rounded-lg"
          />
          {game["players"][1]["level"] !== 0 && (
            <div className="absolute rounded-sm w-10 h-3 left-[calc(50%-20px)] -bottom-1.5 flex justify-center items-center gap-1 px-1 bg-gold text-black font-bold text-[8px]">
              <TfiCup />
              <span className="text-[12px]">{game["players"][1]["level"]}</span>
            </div>
          )}
          <div className="absolute top-0 -right-3">
            {game["players"][1]["side"] ? (
              <WhiteCoin width={28} height={28} />
            ) : (
              <BlackCoin width={28} height={28} />
            )}
          </div>
        </div>
        <h5 className="text-center text-md text-font mt-1">
          {game["players"][1]["name"]}
        </h5>
        <div className="flex items-center justify-center px-2 py-1 gap-2 text-sm bg-[#121212] rounded-md text-gold">
          <PiCoinsLight />
          <span
            className={
              game.side === game["players"][1]["side"]
                ? "text-[#15C059]"
                : "text-[#C6363F]"
            }
          >
            {game["players"][1]["budget"].toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(HistoryCard);
