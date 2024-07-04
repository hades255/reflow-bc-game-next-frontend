import React, { useState, useEffect, useCallback } from "react";

import Image from "next/image";
import Button from "../buttons/Button";
import { PiCoinsLight } from "react-icons/pi";
import { TfiCup } from "react-icons/tfi";
import WhiteCoin from "@/utils/icons/WhiteCoin";
import BlackCoin from "@/utils/icons/BlackCoin";
import { UserType, PlayerType, GameType } from "@/utils/types";

import coinb from "@/assets/coinflip/b.gif";

interface Props {
  blank: boolean;
  g_id: number;
  game: GameType;
  setGames: (game_id: number, games: GameType) => void;
}

const user: UserType = {
  user_id: 1,
  name: "John",
  avatar: "/assets/images/default.png",
  level: 54,
};

const MatchCard: React.FC<Props> = ({ blank, g_id, game, setGames }) => {
  const [timer, setTimer] = useState<number>(6);

  const [side, setSide] = useState<boolean | null>(game.side);

  const [show, setShow] = useState<boolean>(false);

  const handlePlay = () => {
    setGames(g_id, {
      ...game,
      players: game["players"].concat([
        {
          ...user,
          side: !game["players"][0]["side"],
          budget: game["players"][0]["budget"],
        },
      ]),
    });
  };

  const handleCall = () => {
    setSide(true);

    setGames(g_id, {
      ...game,
      players: game["players"].concat([
        {
          user_id: -1,
          name: "House",
          avatar: "/assets/images/logo.svg",
          level: 0,
          side: !game["players"][0]["side"],
          budget: game["players"][0]["budget"],
        },
      ]),
      side: true,
    });
  };

  const showResult = useCallback(() => {
    setShow((prev) => !prev);

    const changeBudget = (players: PlayerType[]) => {
      if (side === players[0]["side"]) {
        return players.map((player, index) => {
          return {
            ...player,
            budget:
              index === 0
                ? players[0]["user_id"] === -1 || players[1]["user_id"] === -1
                  ? player.budget * 2
                  : (player.budget * 2 * 99) / 100
                : -player.budget,
          };
        });
      } else {
        return players.map((player, index) => {
          return {
            ...player,
            budget:
              index === 1
                ? players[0]["user_id"] === -1 || players[1]["user_id"] === -1
                  ? player.budget * 2
                  : (player.budget * 2 * 99) / 100
                : -player.budget,
          };
        });
      }
    };

    setGames(g_id, {
      ...game,
      players: changeBudget(game.players),
    });
  }, [side]);

  const deleteGame = useCallback(() => {
    setGames(g_id, {
      ...game,
      bet: 0,
    });
  }, []);

  useEffect(() => {
    if (timer <= 0) {
      return;
    }
    if (game["players"].length === 2) {
      let start = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => {
        clearInterval(start);
      };
    }
  }, [timer, game]);

  useEffect(() => {
    if (timer === 0) {
      setTimeout(() => {
        showResult();
      }, 2000);
      setTimeout(() => {
        deleteGame();
      }, 4000);
    }
  }, [timer, showResult, deleteGame]);

  return blank ? (
    <div className="h-48 w-[300px] rounded-md bg-[#1E1E1E] game-card p-3 flex justify-between items-center relative">
      <div className="h-full w-full rounded-md innerBlack bg-[#191919] flex justify-center items-center">
        <Image
          width={104}
          height={81}
          src={"/assets/images/crown.png"}
          alt=""
        />
      </div>
    </div>
  ) : (
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
              show
                ? side === game["players"][0]["side"]
                  ? "text-[#15C059]"
                  : "text-[#C6363F]"
                : "text-gold"
            }
          >
            {game["players"][0]["budget"].toFixed(2)}
          </span>
        </div>
        {show &&
          game["players"][0]["user_id"] === user["user_id"] &&
          side === game["players"][0]["side"] && (
            <div className="shine border-2 border-[#15C059] rounded-md inner-green"></div>
          )}
        {show &&
          game["players"][0]["user_id"] === user["user_id"] &&
          side === game["players"][1]["side"] && (
            <div className="shine border-2 border-[#C6363F] rounded-md inner-red"></div>
          )}
      </div>

      {timer === 6 ? (
        <h4 className="text-font">VS.</h4>
      ) : timer !== 0 ? (
        <h4 className="text-font innerBlack bg-[#191919] py-1 px-2 rounded-md">
          {timer}
        </h4>
      ) : side ? (
        show ? (
          <div className="white-coin-back absolute z-20"></div>
        ) : (
          <div className="white-coin-gif absolute z-20"></div>
        )
      ) : show ? (
        <div className="black-coin-back absolute z-20"></div>
      ) : (
        <div className="black-coin-gif absolute z-20"></div>
      )}

      {game["players"].length === 1 ? (
        game["players"][0]["user_id"] === user["user_id"] ? (
          <div className="h-full w-28 flex flex-col justify-center items-center gap-2 rounded-md innerBlack bg-[#191919]">
            <h6 className="text-font text-center text-[12px]">
              Waiting for the Apponent...
            </h6>
            <button
              className="py-1 px-2 text-sm text-font font-bold rounded-sm bg-main"
              onClick={deleteGame}
            >
              Cancel
            </button>
            <button
              className="bg-transparent text-center text-gold text-[12px]"
              onClick={handleCall}
            >
              Call the House
            </button>
          </div>
        ) : (
          <div className="h-full w-28 flex flex-col justify-center items-center gap-3 rounded-md innerBlack bg-[#191919] relative">
            <div className="relative">
              {game["players"][0]["side"] ? (
                <BlackCoin width={54} height={54} />
              ) : (
                <WhiteCoin width={54} height={54} />
              )}
            </div>
            <Button text={"Play Now"} disabled={false} clicked={handlePlay} />
            <div className="flex items-center justify-center px-2 py-1 gap-2 text-sm bg-[#121212] rounded-md text-gold">
              <PiCoinsLight />
              <span className={"text-gold"}>
                {game["players"][0]["budget"].toFixed(2)}
              </span>
            </div>
          </div>
        )
      ) : (
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
                <span className="text-[12px]">
                  {game["players"][1]["level"]}
                </span>
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
                show
                  ? side === game["players"][1]["side"]
                    ? "text-[#15C059]"
                    : "text-[#C6363F]"
                  : "text-gold"
              }
            >
              {game["players"][1]["budget"].toFixed(2)}
            </span>
          </div>

          {show &&
            game["players"][1]["user_id"] === user["user_id"] &&
            side === game["players"][1]["side"] && (
              <div className="shine border-2 border-[#15C059] rounded-md inner-green"></div>
            )}
          {show &&
            game["players"][1]["user_id"] === user["user_id"] &&
            side === game["players"][0]["side"] && (
              <div className="shine border-2 border-[#C6363F] rounded-md inner-red"></div>
            )}
        </div>
      )}
    </div>
  );
};

export default React.memo(MatchCard);
