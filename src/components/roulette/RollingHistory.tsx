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
      <Image src={"/assets/roulette/red.png?v=1"} width={24} height={24} alt="" className="hidden" />
      <Image src={"/assets/roulette/black.png?v=1"} width={24} height={24} alt="" className="hidden" />
      <Image src={"/assets/roulette/gold.png?v=1"} width={24} height={24} alt="" className="hidden" />
      <div className="flex gap-2">
        <span className="text-font">Previous Rolls</span>
        <div className="flex gap-1">
          {tenGames.filter((game) => game).map((game, id) => (
            <Image
              key={`coinhistory-${id}`}
              width={24}
              height={24}
              src={`/assets/roulette/${game}.png?v=1`}
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
            src={"/assets/roulette/red.png?v=1"}
            alt=""
          />
          <span>{hundredGames[0]}</span>
        </span>
        <span className="flex gap-1">
          <Image
            width={24}
            height={24}
            src={"/assets/roulette/gold.png?v=1"}
            alt=""
          />
          <span>{hundredGames[1]}</span>
        </span>
        <span className="flex gap-1">
          <Image
            width={24}
            height={24}
            src={"/assets/roulette/black.png?v=1"}
            alt=""
          />
          <span>{hundredGames[2]}</span>
        </span>
      </div>
    </div>
  );
};

export default RollingHistory;
