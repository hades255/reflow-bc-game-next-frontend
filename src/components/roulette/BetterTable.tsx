"use client";
import { FC } from "react";
import Image from "next/image";
import { LEVEL_SYSTEM } from "@/config/constants";
import { PiCoinsLight } from "react-icons/pi";
import { useUser } from "@/redux/slices/main/userSlice";

interface Props {
  type: string;
  betters: {
    user_id: number;
    level: number;
    avatar: string;
    bet: number;
    name: string;
  }[];
  bet: (val: string) => void;
  betted: string[];
  amount: number;
  start: boolean;
  win: boolean;
  show: boolean;
}

const BetterTable: FC<Props> = ({
  type,
  betters,
  bet,
  betted,
  amount,
  start,
  win,
  show,
}) => {
  const user = useUser();

  const orderedBetters = () => {
    let originBetters = [...betters];
    originBetters.sort((a, b) => b.bet - a.bet);
    if (user && originBetters.some((beter) => beter.user_id === user.id)) {
      let mine = originBetters.filter((beter) => beter.user_id === user.id);
      return mine.concat(
        originBetters.filter((beter) => beter.user_id !== user.id)
      );
    } else {
      return originBetters;
    }
  };

  return (
    <div
      className={`w-full flex flex-col gap-2 ${
        start ? (show && win ? "" : "opacity-50") : ""
      }`}
    >
      <Image
        src={"/assets/roulette/red.png?v=1"}
        width={28}
        height={28}
        alt=""
        className="hidden"
      />
      <Image
        src={"/assets/roulette/black.png?v=1"}
        width={28}
        height={28}
        alt=""
        className="hidden"
      />
      <Image
        src={"/assets/roulette/gold.png?v=1"}
        width={28}
        height={28}
        alt=""
        className="hidden"
      />
      <div
        className={`w-full text-white rounded-md h-12 p-2 px-4 shine-gray flex justify-between cursor-pointer items-center font-bold ${
          betted.includes(type)
            ? "border border-gold bg-[#161616]"
            : "bg-[#313131]"
        }`}
        onClick={() => bet(type)}
      >
        <div className="flex items-center gap-2">
          <Image
            width={28}
            height={28}
            src={`/assets/roulette/${type}.png?v=1`}
            alt=""
          />
          {betted.includes(type) ? (
            <span className="flex items-center">
              Bet Placed:&nbsp;&nbsp;
              <span className="text-gold">
                <PiCoinsLight />
              </span>
              &nbsp;{Math.round(amount * 100) / 100}
            </span>
          ) : (
            <span>Place Bet</span>
          )}
        </div>
        <span>Win {type === "gold" ? "14" : "2"}x</span>
      </div>
      <div className="w-full rounded-md bg-[#1E1E1E] game-card p-3 flex justify-between items-center relative">
        <div className="h-full w-full rounded-md innerBlack bg-[#191919]">
          <div className="h-14 w-full flex justify-between dropShadow text-font items-center px-4">
            <span>{betters.length} Bets Total</span>
            <span className="flex items-center">
              <span className="text-gold">
                <PiCoinsLight />
              </span>
              &nbsp;
              <span
                className={`text-font font-bold ${
                  show && (win ? "text-green-500" : "text-red-500")
                }`}
              >
                {show
                  ? win
                    ? `+ ${
                        Math.round(
                          type === "gold"
                            ? 14 * betters.reduce((t, n) => t + n.bet, 0) * 100
                            : 2 * betters.reduce((t, n) => t + n.bet, 0) * 100
                        ) / 100
                      }`
                    : `- ${
                        Math.round(
                          betters.reduce((t, n) => t + n.bet, 0) * 100
                        ) / 100
                      }`
                  : Math.round(betters.reduce((t, n) => t + n.bet, 0) * 100) /
                    100}
              </span>
            </span>
          </div>
          {betters.length !== 0 &&
            orderedBetters().map((better, idx) => (
              <div
                className="w-full px-4 flex justify-between items-center my-2"
                key={`betters-table-${type}-${idx}`}
              >
                <div className="flex items-center my-2 gap-2">
                  <Image
                    width={28}
                    height={28}
                    src={better.avatar}
                    alt=""
                    className="rounded-sm"
                  />
                  <div
                    className="bg-[#020202] text-xs rounded-sm h-[18px] w-12 flex justify-center items-center gap-[5px]"
                    style={{
                      color: LEVEL_SYSTEM.filter(
                        (level) =>
                          level.min <= better.level && better.level <= level.max
                      )[0].color,
                      borderWidth: 1,
                      borderColor: LEVEL_SYSTEM.filter(
                        (level) =>
                          level.min <= better.level && better.level <= level.max
                      )[0].color,
                    }}
                  >
                    <Image
                      width={12}
                      height={12}
                      className="w-3 h-3"
                      src={`/assets/icons/${
                        LEVEL_SYSTEM.filter(
                          (level) =>
                            level.min <= better.level &&
                            better.level <= level.max
                        )[0].name
                      }.png`}
                      alt=""
                    />
                    {better.level < 224 && <span>{better.level}</span>}
                  </div>
                  <span className="text-font">{better.name}</span>
                </div>
                <span
                  className={`text-font ${
                    show && (win ? "text-green-500" : "text-red-500")
                  }`}
                >
                  {show
                    ? win
                      ? `+${
                          Math.round(
                            type === "gold"
                              ? 14 * better.bet * 100
                              : 2 * better.bet * 100
                          ) / 100
                        }`
                      : `-${Math.round(better.bet * 100) / 100}`
                    : Math.round(better.bet * 100) / 100}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default BetterTable;
