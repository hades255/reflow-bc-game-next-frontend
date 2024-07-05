"use client";
import { useState, useCallback, useEffect } from "react";

import Header from "@/components/coinflip/Header";
import MyGames from "@/components/coinflip/MyGames";
import LiveGames from "@/components/coinflip/LiveGames";
import { v4 as uuidv4 } from "uuid";
import { UserType, GameType } from "@/utils/types";

const user: UserType = {
  user_id: 1,
  name: "John",
  avatar: "/assets/images/default.png",
  level: 54,
};

const CoinFlip = () => {
  const [myGames, setMyGames] = useState<GameType[]>([]);

  const [liveGames, setLiveGames] = useState<GameType[]>([]);

  const createMyGames = (side: boolean, bet: number, count: number) => {
    let length = myGames.length;
    setMyGames((prev) => {
      if (length + count < 8) {
        [...Array(count)].forEach((ar, id) => {
          prev.push({
            game_id: uuidv4(),
            players: [
              {
                ...user,
                side: side,
                budget: bet,
              },
            ],
            side: null,
            bet: bet,
          });
        });
      } else {
        [...Array(8 - length)].forEach((ar, id) => {
          prev.push({
            game_id: uuidv4(),
            players: [
              {
                ...user,
                side: side,
                budget: bet,
              },
            ],
            side: null,
            bet: bet,
          });
        });
      }
      return [...prev];
    });
  };

  const updateMyGames = useCallback((game_id: string, game: GameType) => {
    setMyGames((prev) =>
      game.bet === 0
        ? prev.filter((gm) => gm.game_id !== game_id)
        : prev.map((gm) => (gm.game_id === game_id ? game : gm))
    );
  }, []);

  return (
    <div className="w-full h-full p-6">
      <Header setMyGames={createMyGames} />
      <MyGames
        games={myGames}
        setGames={updateMyGames}
        dismissAll={setMyGames}
      />
      <LiveGames />
    </div>
  );
};

export default CoinFlip;
