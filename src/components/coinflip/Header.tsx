"use client";
import React, { useState } from "react";

import Button from "../buttons/Button";
import BlackCoin from "@/utils/icons/BlackCoin";
import WhiteCoin from "@/utils/icons/WhiteCoin";
import { PiCoinsLight } from "react-icons/pi";
import { FaChevronDown } from "react-icons/fa6";

interface Props {
  setMyGames: (side: boolean, bet: number, count: number) => void;
}

const Header: React.FC<Props> = ({ setMyGames }) => {
  const [isUp, setIsUp] = useState<boolean>(true);

  const [bet, setBet] = useState<number>(1.0);

  const [counts, setCounts] = useState<number>(1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBet(parseFloat(e.target.value));
  };

  const handleCounts = (count: number) => {
    setCounts(count);
  };

  const handleCreate = () => {
    setMyGames(isUp, bet, counts);
  };

  return (
    <div className="w-full h-12 rounded-md innerBlack relative !z-30">
      <div className="shine dropBlack z-0"></div>
      <div className="w-full h-full flex justify-between items-center px-4">
        <span className="font-semibold text-xl text-font">Royal Flip</span>
        <div className="flex gap-4 items-center py-1 z-10">
          <div className="flex items-center gap-2">
            <span className="text-[#d1d1d1]">{"Side:"}</span>
            <button
              className={
                isUp
                  ? "border-[2px] border-white rounded-full small-coin"
                  : "small-coin"
              }
              onClick={() => !isUp && setIsUp((prev) => !prev)}
            >
              <WhiteCoin width={24} height={24} />
            </button>
            <button
              className={
                isUp
                  ? "small-coin"
                  : "border-[2px] border-[#707070] rounded-full small-coin"
              }
              onClick={() => isUp && setIsUp((prev) => !prev)}
            >
              <BlackCoin width={24} height={24} />
            </button>
          </div>
          <div className="flex gap-2 items-center rounded-sm border border-[#252525] text-gold z-10 py-1 px-2">
            <PiCoinsLight />
            <input
              type="number"
              value={bet}
              className="bg-transparent w-24 black-input"
              onChange={handleChange}
            />
            <div className="flex gap-1">
              <button className="small-btn" onClick={() => setBet(0.0)}>
                CLEAR
              </button>
              <button
                className="small-btn"
                onClick={() => setBet((prev) => prev + 0.5)}
              >
                +0.5
              </button>
              <button
                className="small-btn"
                onClick={() => setBet((prev) => prev + 1)}
              >
                +1
              </button>
              <button
                className="small-btn"
                onClick={() => setBet((prev) => prev + 10)}
              >
                +10
              </button>
              <button
                className="small-btn"
                onClick={() => setBet((prev) => prev + 100)}
              >
                +100
              </button>
              <button
                className="small-btn"
                onClick={() => setBet((prev) => prev / 2)}
              >
                1/2
              </button>
              <button
                className="small-btn"
                onClick={() => setBet((prev) => prev * 2)}
              >
                2X
              </button>
              <button className="small-btn" onClick={() => setBet(500)}>
                MAX
              </button>
            </div>
          </div>

          <div className="hs-dropdown relative inline-flex !z-30 bg-transparent rounded-sm border border-[#252525]">
            <button
              id="hs-dropdown-default"
              type="button"
              className="py-[6px] px-2 text-[#707070] flex items-center gap-2"
            >
              <span>{counts}x</span>
              <FaChevronDown className="s-dropdown-open:rotate-180" />
            </button>

            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-32 bg-main shadow-md rounded-md p-2 mt-2 !z-30"
              aria-labelledby="hs-dropdown-default"
            >
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                onClick={() => handleCounts(1)}
              >
                1x Game
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                onClick={() => handleCounts(2)}
              >
                2x Games
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                onClick={() => handleCounts(3)}
              >
                3x Games
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                onClick={() => handleCounts(4)}
              >
                4x Games
              </button>
            </div>
          </div>
          <Button
            text={`Create ${counts} game${counts === 1 ? "" : "s"}`}
            disabled={false}
            clicked={handleCreate}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
