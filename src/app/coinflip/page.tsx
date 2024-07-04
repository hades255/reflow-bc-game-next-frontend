"use client"
import { useState, useCallback } from "react";

import Header from "@/components/coinflip/Header";
import MyGames from "@/components/coinflip/MyGames";
import { PiCoinsLight } from "react-icons/pi";

import { UserType, GameType } from "@/utils/types";

const user: UserType = {
  user_id: 1,
  name: "John",
  avatar: "/assets/images/default.png",
  level: 54
} 

const CoinFlip = () => {

  const [myGames, setMyGames] = useState<GameType[]>([...Array(4)].map((x, id) => {
    return {
      game_id: id,
      players: [{
        ...user,
        side: true,
        budget: 0
      }],
      side: null,
      bet: null
    }
  }));

  const createMyGames = (side: boolean, bet: number, count: number) => {
    let arr: number[] = [];
    myGames.forEach((game, id) => {
      if (game.bet === null) arr.push(id);
    });

    if (count > arr.length) {
      for (let i = 4; i < 4 + (count - arr.length); i++) {
        arr.push(i);
      }
    }

    setMyGames((prev) => {
      arr.slice(0, count).map((i) => {
        prev[i] = {
          ...prev[i],
          players: [{
            ...user,
            side: side,
            budget: bet
          }],
          bet: bet
        }
      });
      return [...prev];
    });
  }

  const updateMyGames = useCallback((game_id: number, game: GameType) => {
    setMyGames((prev) => {
      if (game.bet === 0) {
        prev[game_id]['bet'] = null; 
      } else {
        prev[game_id] = game;
      }
      return [...prev];
    });
  }, [])

  return (
    <div className="w-full h-full p-6">
      <Header setMyGames={createMyGames} />
      {
        myGames.length !== 0 && <MyGames games={myGames} setGames={updateMyGames} dismissAll={setMyGames} />
      }
      <div className="flex w-full justify-between mt-8 mx-2">
        <div className="flex items-center text-font font-xl font-semibold gap-4">
          <span>
            <span>Live Games</span>&nbsp;<span className="text-gold">{0}</span>
          </span>
        </div>
        <div className="flex gap-1 pr-4 items-center text-[#707070]">
          {'Amount:'} 
          <div className="hs-dropdown relative inline-flex !z-30 bg-transparent rounded-sm">
            <button
              id="hs-dropdown-amount"
              type="button"
              className="px-2 text-font"
            >
              All
            </button>
            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-32 bg-main shadow-md rounded-md p-2 mt-2 !z-30"
              aria-labelledby="hs-dropdown-amount"
            >
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]"
              >
                <PiCoinsLight /> All
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]"
              >
                <PiCoinsLight /> 0.00 - 5.00
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]"
              >
                <PiCoinsLight /> 5.00 - 20.00
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]"
              >
                <PiCoinsLight /> 20.00 - 50.00
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]"
              >
                <PiCoinsLight /> 50.00 - 100.00
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]"
              >
                <PiCoinsLight /> 100.00 - 250.00
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]"
              >
                <PiCoinsLight /> 250.00 - 
              </button>
            </div>
          </div>&nbsp;&nbsp;&nbsp;
          {'Display Games:'} 
          <div className="hs-dropdown relative inline-flex !z-30 bg-transparent rounded-sm">
            <button
              id="hs-dropdown-games"
              type="button"
              className="px-2 text-font"
            >
              10
            </button>
            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-12 bg-main shadow-md rounded-md p-2 mt-2 !z-30"
              aria-labelledby="hs-dropdown-games"
            >
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
              >
                10
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
              >
                20
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
              >
                50
              </button>
            </div>
          </div>&nbsp;&nbsp;&nbsp;
          {'Sort:'}
          <div className="hs-dropdown relative inline-flex !z-30 bg-transparent rounded-sm">
            <button
              id="hs-dropdown-order"
              type="button"
              className="px-2 text-font"
            >
              Highest Amount First
            </button>
            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-12 bg-main shadow-md rounded-md p-2 mt-2 !z-30"
              aria-labelledby="hs-dropdown-order"
            >
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
              >
                Highest Amount First
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
              >
                Lowest Amount First
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinFlip;