import React from "react";

import Image from "next/image";
import { PiCoinsLight } from "react-icons/pi";
import { LEVEL_SYSTEM } from "@/config/constants";
import WhiteCoin from "@/utils/icons/WhiteCoin";
import BlackCoin from "@/utils/icons/BlackCoin";
import { HistoryType } from "@/utils/types";

interface Props {
  game: HistoryType;
}

const HistoryCard: React.FC<Props> = ({ game }) => {
  const [showFairness, setShowFairness] = React.useState(false);

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
          <div
            className={`absolute rounded-sm w-11 h-4 left-[calc(50%-22px)] -bottom-1.5 flex justify-center items-center gap-1.5 bg-black px-1 font-bold`}
            style={{
              color: LEVEL_SYSTEM.filter(
                (level) =>
                  level.min <= game["players"][0]["level"] &&
                  game["players"][0]["level"] <= level.max
              )[0].color,
              borderWidth: 1,
              borderColor: LEVEL_SYSTEM.filter(
                (level) =>
                  level.min <= game["players"][0]["level"] &&
                  game["players"][0]["level"] <= level.max
              )[0].color,
            }}
          >
            <Image
              src={`/assets/icons/${
                LEVEL_SYSTEM.filter(
                  (level) =>
                    level.min <= game["players"][0]["level"] &&
                    game["players"][0]["level"] <= level.max
                )[0].name
              }.png`}
              alt=""
              width={10}
              height={10}
            />
            {game["players"][0]["level"] < 224 && (
              <span className={`text-[10px]`}>
                {game["players"][0]["level"]}
              </span>
            )}
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
            <div
              className={`absolute rounded-sm w-11 h-4 left-[calc(50%-22px)] -bottom-1.5 flex justify-center items-center gap-1.5 bg-black px-1 font-bold`}
              style={{
                color: LEVEL_SYSTEM.filter(
                  (level) =>
                    level.min <= game["players"][1]["level"] &&
                    game["players"][1]["level"] <= level.max
                )[0].color,
                borderWidth: 1,
                borderColor: LEVEL_SYSTEM.filter(
                  (level) =>
                    level.min <= game["players"][1]["level"] &&
                    game["players"][1]["level"] <= level.max
                )[0].color,
              }}
            >
              <Image
                src={`/assets/icons/${
                  LEVEL_SYSTEM.filter(
                    (level) =>
                      level.min <= game["players"][1]["level"] &&
                      game["players"][1]["level"] <= level.max
                  )[0].name
                }.png`}
                alt=""
                width={10}
                height={10}
              />
              {game["players"][1]["level"] < 224 && (
                <span className={`text-[10px] align-middle`}>
                  {game["players"][1]["level"]}
                </span>
              )}
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
      {showFairness ? (
          <div className="absolute w-full h-full bg-opacity-70 bg-[#191919] mr-[42px] top-0 left-0 z-50">
            <div className=" w-3 border-2 top-3 right-3 text-font border-solid absolute cursor-pointer" onClick={() => setShowFairness(false)}>
            </div>
            <div className="w-full h-full p-6 text-center flex-nowrap flex justify-center flex-col">
              {game.privateSeedHash && <p className="text-font text-[12px] break-words">Private Seed Hash : {game.privateSeedHash}</p>}
              {game.serverSeed && <p className="text-font text-[12px] break-words">Private Seed : {game.serverSeed}</p>}
              {game.publicSeed && <p className="text-font text-[12px] break-words">Public Seed : {game.publicSeed}</p>}
              {game.round && <p className="text-font text-[12px] break-words">Round Id : {game.round}</p>}
            </div>
          </div>
        ) : (
          <p
            className=" absolute bottom-3 text-font text-center text-[10px] cursor-pointer w-full pr-[22px] z-50"
            onClick={() => setShowFairness(true)}
          >
            Fairness
          </p>
        )}
    </div>
  );
};

export default React.memo(HistoryCard);
