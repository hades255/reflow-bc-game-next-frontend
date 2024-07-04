"use client";
import React, { useState } from "react";

import MatchCard from "./MatchCard";
import { GameType } from "@/utils/types";

interface Props {
  games: GameType[];
  dismissAll: (games: (prev: GameType[]) => GameType[]) => void;
  setGames: (game_id: number, game: GameType) => void;
}

const MyGames: React.FC<Props> = ({ games, setGames,  dismissAll}) => {
  const [isCurrent, setIsCurrent] = useState<boolean>(true);

  const changePeriod = (current: boolean) => {
    setIsCurrent(current);
  };

  const updateSide = (game_id: number, side: boolean) => {
    setGames(game_id, {
      ...games[game_id],
      side: side,
    });
  };

  const dismiss = () => {
    dismissAll((prev) => prev.map((gm) => 
      gm.players.length === 1 ? {
        ...gm,
        side: null,
        bet: null
      } : gm))
  }

  const length = games.filter((game) => game.bet !== null).length;

  return (
    <>
      <div className="flex w-full justify-between mt-8 mx-2">
        <div className="flex items-center text-font font-xl font-semibold gap-4">
          <span>
            <span>My Games</span>&nbsp;
            <span className="text-gold">{length}</span>
          </span>
          <button className="py-0.5 px-2 bg-[#252525] rounded-sm text-sm font-normal" onClick={dismiss}>
            Dismiss All
          </button>
        </div>
        <div className="flex gap-4 pr-4">
          <button
            className={isCurrent ? "text-gold" : "text-font"}
            onClick={() => changePeriod(true)}
          >
            Current
          </button>
          <button
            className={isCurrent ? "text-font" : "text-gold"}
            onClick={() => changePeriod(false)}
          >
            History
          </button>
        </div>
      </div>
      <div className="w-full mt-4 grid 2xl:grid-cols-4 grid-cols-3 justify-items-center gap-y-8">
        {games.map(
          (game, index) =>
            game.bet !== null && (
              <MatchCard
                blank={false}
                key={`Matchcard-${index}`}
                g_id={index}
                game={game}
                setGames={setGames}
              />
            )
        )}
        {length < 4 &&
          [...Array(4 - length)].map((a, index) => (
            <MatchCard
              blank={true}
              key={`Matchcard-blank-${index}`}
              g_id={4-length+index}
              game={games[0]}
              setGames={setGames}
            />
          ))}
      </div>
    </>
  );
};

export default MyGames;
