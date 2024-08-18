"use client";
import { FC } from "react";
import Image from "next/image";

interface Props {
  tenGames: string[];
  hundredGames: number[];
}

const RollingHistory: FC<Props> = ({ tenGames, hundredGames }) => {
  return (
    <div className="my-8 flex gap-4 justify-center">
      <div className="flex gap-2">
        <span className="text-font">Previous Rolls</span>
        <div className="flex gap-1">
          {tenGames.filter((game) => game).map((game, id) => (
            <Image
              key={`coinhistory-${id}`}
              width={24}
              height={24}
              src={`/assets/roulette/${game}.png`}
              alt=""
            />
          ))}
        </div>
      </div>
      <div className="flex gap-2 text-font">
        <span>Last {hundredGames[0] + hundredGames[1] + hundredGames[2]}</span>
        <span className="flex gap-1">
          <Image
            width={24}
            height={24}
            src={"/assets/roulette/red.png"}
            alt=""
          />
          <span>{hundredGames[0]}</span>
        </span>
        <span className="flex gap-1">
          <Image
            width={24}
            height={24}
            src={"/assets/roulette/gold.png"}
            alt=""
          />
          <span>{hundredGames[1]}</span>
        </span>
        <span className="flex gap-1">
          <Image
            width={24}
            height={24}
            src={"/assets/roulette/black.png"}
            alt=""
          />
          <span>{hundredGames[2]}</span>
        </span>
      </div>
    </div>
  );
};

export default RollingHistory;
