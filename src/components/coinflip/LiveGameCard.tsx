import React, { useState, useEffect, useCallback } from "react";

import Image from "next/image";
import { useDispatch } from "react-redux";
import { useUser } from "@/redux/slices/main/userSlice";
import {
  updateBudget,
  playAGame,
  deleteALiveGame,
} from "@/redux/slices/coinflip/liveGamesSlice";
import { updateBalance, useBalance } from "@/redux/slices/main/balanceSlice";
import { setModal } from "@/redux/slices/main/modalSlice";
import { setToast } from "@/redux/slices/main/toastSlice";
import { joinGame } from "@/services/coinflip";
import Button from "../buttons/Button";
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
  const balance = useBalance().balance;
  const dispatch = useDispatch();
  const [timer, setTimer] = useState<number>(6);
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handlePlay = async () => {
    if (user && !loading) {
      if (game.bet <= Number(balance)) {
        setLoading((prev) => !prev);
        let data = await joinGame(Number(game.game_id));
        if (data.status === 200) {
          setLoading((prev) => !prev);
          dispatch(
            playAGame({
              round: game.round,
              data: data.data.game,
            })
          );
          dispatch(
            updateBalance({
              balance: -Number(game.bet),
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
      } else {
        dispatch(
          setModal({
            status: true,
            title: "No enough balance",
            content: "Please deposit the money to start playing.",
            name: "Deposit",
            type: 3,
            parameter: "",
          })
        );
      }
    } else {
      dispatch(
        setModal({
          status: true,
          title: "Sign In",
          content: "Please sign in to start playing.",
          name: "Steam Sign In",
          type: 1,
          parameter: `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login`,
        })
      );
    }
  };

  const showResult = useCallback(() => {
    setShow((prev) => !prev);
    dispatch(
      updateBudget({
        round: game.round,
      })
    );
    if (game.round && game.players[1]?.user_id === user?.id) {
      dispatch(
        updateBalance({
          balance:
            game.side ? 0 : Number(game.bet * 1.99),
        })
      );
    }
    setTimer(10);
  }, [dispatch, game.bet, game.round, game.side, game.players, user?.id]);

  const deleteGame = useCallback(() => {
    dispatch(deleteALiveGame({ round: game.round }));
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
      </div>

      {timer === 6 ? (
        <h4 className="text-font">VS.</h4>
      ) : timer !== 0 && timer < 6 ? (
        <h4 className="text-font innerBlack bg-[#191919] py-1 px-2 rounded-md">
          {timer}
        </h4>
      ) : !(game.side !== game.players[0].side) ? (
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
        <div className="h-full w-28 flex flex-col justify-center items-center gap-3 rounded-md innerBlack bg-[#191919] relative">
          <div className="relative">
            {game.players[0].side ? (
              <BlackCoin width={54} height={54} />
            ) : (
              <WhiteCoin width={54} height={54} />
            )}
          </div>
          <Button
            text={"Play Now"}
            disabled={false}
            clicked={handlePlay}
            className="!w-24"
          />
          <div className="flex items-center justify-center px-2 py-1 gap-2 text-sm bg-[#121212] rounded-md text-gold">
            <PiCoinsLight />
            <span className={"text-gold"}>
              {game.players[0].budget.toFixed(2)}
            </span>
          </div>
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
                  className={`absolute rounded-sm w-11 h-4 left-[calc(50%-22px)] -bottom-1.5 flex justify-center items-center gap-1.5 bg-black px-1 font-bold`}
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
                    <span className={`text-[10px]`}>
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
  );
};

export default React.memo(MyGameCard);
