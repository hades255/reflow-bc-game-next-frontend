import React, { useState, useEffect, useCallback } from "react";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { useUser } from "@/redux/slices/main/userSlice";
import {
  callHouse,
  updateBudget,
  deleteAGame,
} from "@/redux/slices/coinflip/myGamesSlice";
import { updateBalance } from "@/redux/slices/main/balanceSlice";
import { setToast } from "@/redux/slices/main/toastSlice";
import { joinGame, cancelGames } from "@/services/coinflip";
import { PiCoinsLight } from "react-icons/pi";
import { LEVEL_SYSTEM } from "@/config/constants";
import WhiteCoin from "@/utils/icons/WhiteCoin";
import BlackCoin from "@/utils/icons/BlackCoin";
import { GameType } from "@/utils/types";

interface Props {
  game: GameType;
}
const MyGameCard: React.FC<Props> = ({ game }) => {
  const user = useUser();
  const dispatch = useDispatch();
  const [timer, setTimer] = useState<number>(6);
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleCall = async () => {
    if (user && !loading) {
      setLoading((prev) => !prev);
      let data = await joinGame(Number(game.game_id));
      if (data.status === 200) {
        setLoading((prev) => !prev);
        dispatch(
          callHouse({
            round: game.round,
            side: data.data.game.winner,
            game:data.data.game,
          })
        );
      } else {
        setLoading((prev) => !prev);
        dispatch(
          setToast({
            type: 3,
            message: "Server internal error.",
          })
        );
      }
    }
  };

  const showResult = useCallback(() => {
    setShow((prev) => !prev);
    dispatch(
      updateBudget({
        round: game.round,
      })
    );
    if (
      Number(game.bet) === Number(game.players[0].budget) &&
      Number(game.bet) === Number(game.players[1].budget)
    ) {
      dispatch(
        updateBalance({
          balance:
            game.side
              ? (game.players[1].name === "house"
                ? Number(game.bet) * 2
                : Number(game.bet) * 1.98)
              : 0,
        })
      );
    }
  }, [dispatch, game.bet, game.round, game.side, game.players]);

  const cancelMyGame = async () => {
    if (!loading) {
      setLoading((prev) => !prev);
      let data = await cancelGames([Number(game.game_id)]);
      if (data.status === 200) {
        setLoading((prev) => !prev);
        dispatch(
          updateBalance({
            balance: Number(game.bet),
          })
        );
        dispatch(deleteAGame({ round: game.round }));
      } else {
        setLoading((prev) => !prev);
        dispatch(
          setToast({
            type: 3,
            message: "Server internal error.",
          })
        );
      }
    }
  };

  const deleteGame = useCallback(async () => {
    dispatch(deleteAGame({ round: game.round }));
  }, [dispatch, game.round]);

  useEffect(() => {
    if (timer <= 0) {
      return;
    }
    if (game.players.length === 2) {
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

  return (
    user && (
      <div className="h-48 w-[300px] rounded-md bg-[#1E1E1E] game-card p-3 flex justify-between items-center relative">
        <div className="relative h-full w-28 flex gap-2 flex-col justify-center items-center rounded-md innerBlack bg-[#191919]">
          <Image
            src={"/assets/coinflip/a.png"}
            width={200}
            height={200}
            alt=""
            className="hidden"
          />
          <Image
            src={"/assets/coinflip/b.png"}
            width={200}
            height={200}
            alt=""
            className="hidden"
          />
          <div className="relative">
            <Image
              width={64}
              height={64}
              src={game.players[0].avatar}
              alt=""
              className="rounded-lg"
            />
            <div
              className={`absolute rounded-sm w-11 h-4 left-[calc(50%-22px)] -bottom-1.5 flex justify-center items-center gap-1.5 bg-black px-1 font-bold`}
              style={{
                color: LEVEL_SYSTEM.filter(
                  (level) =>
                    level.min <= game.players[0].level &&
                    game.players[0].level <= level.max
                )[0].color,
                borderWidth: 1,
                borderColor: LEVEL_SYSTEM.filter(
                  (level) =>
                    level.min <= game.players[0].level &&
                    game.players[0].level <= level.max
                )[0].color,
              }}
            >
              <Image
                src={`/assets/icons/${
                  LEVEL_SYSTEM.filter(
                    (level) =>
                      level.min <= game.players[0].level &&
                      game.players[0].level <= level.max
                  )[0].name
                }.png`}
                alt=""
                width={10}
                height={10}
              />
              {game.players[0].level < 224 && (
                <span className={`text-[10px]`}>{game.players[0].level}</span>
              )}
            </div>
            <div className="absolute top-0 -right-3">
              {game.players[0].side ? (
                <WhiteCoin width={28} height={28} />
              ) : (
                <BlackCoin width={28} height={28} />
              )}
            </div>
          </div>
          <h5 className="text-center text-md text-font mt-1 truncate w-20">
            {game.players[0].name}
          </h5>
          <div className="flex items-center justify-center px-2 py-1 gap-2 text-gold text-sm bg-[#121212] rounded-md text-bold">
            <PiCoinsLight />
            <span
              className={
                show
                  ? game.side
                    ? "text-[#15C059]"
                    : "text-[#C6363F]"
                  : "text-gold"
              }
            >
              {game.players[0].budget.toFixed(2)}
            </span>
          </div>
          {show && game.side && (
            <div className="shine border-2 border-[#15C059] rounded-md inner-green"></div>
          )}
          {show && !game.side && (
            <div className="shine border-2 border-[#C6363F] rounded-md inner-red"></div>
          )}
        </div>

        {timer === 6 ? (
          <h4 className="text-font">VS.</h4>
        ) : timer !== 0 ? (
          <h4 className="text-font innerBlack bg-[#191919] py-1 px-2 rounded-md">
            {timer}
          </h4>
        ) : !(game.side !== game.players[0].side)? (
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

        {game.players.length === 1 ? (
          <div className="h-full w-28 flex flex-col justify-center items-center gap-2 rounded-md innerBlack bg-[#191919]">
            <h6 className="text-font text-center text-[12px]">
              Waiting for the Apponent...
            </h6>
            <button
              className="py-1 px-2 text-sm text-font font-bold rounded-sm bg-main"
              onClick={cancelMyGame}
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
          <div className="h-full w-28 flex flex-col justify-center items-center gap-2 rounded-md innerBlack bg-[#191919] relative">
            <div className="relative">
              <Image
                width={64}
                height={64}
                src={game.players[1].avatar}
                alt=""
                className="rounded-lg"
              />
              {game.players[1].level !== 0 &&
                game.players[1].name !== "house" && (
                  <div
                    className="absolute rounded-sm w-11 h-3 left-[calc(50%-22px)] -bottom-1.5 flex justify-center items-center gap-1 px-1 bg-black font-bold"
                    style={{
                      color: LEVEL_SYSTEM.filter(
                        (level) =>
                          level.min <= game.players[1].level &&
                          game.players[1].level <= level.max
                      )[0].color,
                      borderWidth: 1,
                      borderColor: LEVEL_SYSTEM.filter(
                        (level) =>
                          level.min <= game.players[1].level &&
                          game.players[1].level <= level.max
                      )[0].color,
                    }}
                  >
                    <Image
                      src={`/assets/icons/${
                        LEVEL_SYSTEM.filter(
                          (level) =>
                            level.min <= game.players[1].level &&
                            game.players[1].level <= level.max
                        )[0].name
                      }.png`}
                      alt=""
                      width={10}
                      height={10}
                    />
                    {game.players[1].level < 224 && (
                      <span className="text-[10px]">
                        {game.players[1].level}
                      </span>
                    )}
                  </div>
                )}
              <div className="absolute top-0 -right-3">
                {game.players[1].side ? (
                  <WhiteCoin width={28} height={28} />
                ) : (
                  <BlackCoin width={28} height={28} />
                )}
              </div>
            </div>
            <h5 className="text-center text-md text-font mt-1 truncate w-20">
              {game.players[1].name}
            </h5>
            <div className="flex items-center justify-center px-2 py-1 gap-2 text-sm bg-[#121212] rounded-md text-gold">
              <PiCoinsLight />
              <span
                className={
                  show
                    ? !game.side
                      ? "text-[#15C059]"
                      : "text-[#C6363F]"
                    : "text-gold"
                }
              >
                {game.players[1].budget.toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default React.memo(MyGameCard);
