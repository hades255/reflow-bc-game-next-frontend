"use client";
import React, { useState } from "react";

import MatchCard from "./MatchCard";
import BlankCard from "./BlankCard";
import { GameType } from "@/utils/types";

interface Props {
  games: GameType[];
  dismissAll: (games: (prev: GameType[]) => GameType[]) => void;
  setGames: (game_id: string, game: GameType) => void;
}

const MyGames: React.FC<Props> = ({ games, setGames, dismissAll }) => {
  const [isCurrent, setIsCurrent] = useState<boolean>(true);

  const changePeriod = (current: boolean) => {
    setIsCurrent(current);
  };

  const updateSide = (game_id: string, side: boolean) => {
    setGames(game_id, {
      ...games.filter((gm) => gm.game_id === game_id)[0],
      side: side,
    });
  };

  const dismiss = () => {
    dismissAll((prev) => prev.filter((gm) => gm.players.length === 2));
  };

  return (
    <>
      <div className="flex w-full justify-between mt-8 mx-2">
        <div className="flex items-center text-font font-xl font-semibold gap-4">
          <span>
            <span>My Games</span>&nbsp;
            <span className="text-gold">{games.length}</span>
          </span>
          <button
            className="py-0.5 px-2 bg-[#252525] rounded-sm text-sm font-normal"
            onClick={dismiss}
          >
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
        {games.map((game) => (
          <MatchCard
            key={`Matchcard-${game.game_id}`}
            game={game}
            setGames={setGames}
          />
        ))}
        {games.length < 4 &&
          [...Array(4 - games.length)].map((a, index) => (
            <BlankCard key={`Matchcard-blank-${index}`} />
          ))}
      </div>
    </>
  );
};

export default MyGames;
