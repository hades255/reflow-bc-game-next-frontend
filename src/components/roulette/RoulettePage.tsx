"use client";
import { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import Rolling from "./Rolling";
import RollingHistory from "./RollingHistory";
import Betting from "./Betting";
import BetterTable from "./BetterTable";
import { useUser, updateBalance } from "@/redux/slices/main/userSlice";
import { useWinning, setWinning } from "@/redux/slices/roulette/winningSlice";
import {
  useLatestWinning,
  setLatestWinning,
  setCache,
  exchangeLatest,
} from "@/redux/slices/roulette/latestWinningSlice";
import { setToast } from "@/redux/slices/main/toastSlice";
import { setModal } from "@/redux/slices/main/modalSlice";
import { getActive, placeBet } from "@/services/roulette";
import myEcho from "@/hooks/myEcho";

interface BetterType {
  user_id: number;
  name: string;
  level: number;
  avatar: string;
  bet: number;
}

const RoulettePage = () => {
  const [gameId, setGameId] = useState<string>(uuidv4());
  const [acted, setActed] = useState<number>(-1);
  const [betted, setBetted] = useState<string[]>([]);
  const [bet, setBet] = useState<number>(0);
  const [bets, setBets] = useState<{
    red: number;
    gold: number;
    black: number;
  }>({
    red: 0,
    gold: 0,
    black: 0,
  });
  const [rollingStart, setRollingStart] = useState(false);
  const [second, setSecond] = useState<number>(-1);
  const [redBetters, setRedBetters] = useState<BetterType[]>([]);
  const [goldBetters, setGoldBetters] = useState<BetterType[]>([]);
  const [blackBetters, setBlackBetters] = useState<BetterType[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const user = useUser();
  const winning = useWinning();
  const latestWinning = useLatestWinning();

  const dispatch = useDispatch();

  const pushBetter = (
    val: string,
    user_id: number,
    name: string,
    level: number,
    avatar: string,
    bet: number
  ) => {
    if (val === "red") {
      setRedBetters((prev) =>
        prev.concat([{ user_id, name, level, avatar, bet }])
      );
    } else if (val === "gold") {
      setGoldBetters((prev) =>
        prev.concat([{ user_id, name, level, avatar, bet }])
      );
    } else {
      setBlackBetters((prev) =>
        prev.concat([{ user_id, name, level, avatar, bet }])
      );
    }
  };

  const sliceBetter = (val: string, user_id: number) => {
    if (val === "red") {
      setRedBetters((prev) => prev.filter((pv) => pv.user_id !== user_id));
    } else if (val === "gold") {
      setGoldBetters((prev) => prev.filter((pv) => pv.user_id !== user_id));
    } else {
      setBlackBetters((prev) => prev.filter((pv) => pv.user_id !== user_id));
    }
  };

  const handleBet = async (val: string) => {
    if (user) {
      if (rollingStart) {
        dispatch(
          setToast({
            type: 4,
            message: "Bets cannot be placed while rolling.",
          })
        );
      } else {
        if (bet > 0.1) {
          setBetted((prev) =>
            prev.includes(val)
              ? prev.filter((pv) => pv !== val)
              : prev.concat([val])
          );
          let bettedVals = betted.includes(val)
            ? betted.filter((pv) => pv !== val)
            : betted.concat([val]);
          if (bettedVals.includes(val)) {
            setBets((prev) => ({ ...prev, [val]: bet }));
            dispatch(updateBalance({ balance: -bet }));
            pushBetter(
              val,
              user.id,
              user.name,
              Number(user.player_level),
              user.avatar,
              bet
            );
          } else {
            setBets((prev) => ({ ...prev, [val]: 0 }));
            dispatch(updateBalance({ balance: bet }));
            sliceBetter(val, user.id);
          }
          let data = await placeBet(bet, val);
          if (data.status !== 200) {
            if (bettedVals.includes(val)) {
              setBets((prev) => ({ ...prev, [val]: 0 }));
              dispatch(updateBalance({ balance: bet }));
              setBetted((prev) => prev.filter((pv) => pv !== val));
              sliceBetter(val, user.id);
            } else {
              setBets((prev) => ({ ...prev, [val]: bet }));
              dispatch(updateBalance({ balance: -bet }));
              setBetted((prev) => prev.concat([val]));
              pushBetter(
                val,
                user.id,
                user.name,
                Number(user.player_level),
                user.avatar,
                bet
              );
            }
          }
        } else {
          dispatch(
            setModal({
              status: true,
              title: "Error",
              content: "The minimum bet amount is 0.1",
              name: "Steam Sign In",
              type: 3,
              parameter: "",
            })
          );
        }
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

  useEffect(() => {
    (async () => {
      let { data, status } = await getActive();
      if (status === 200) {
        let sec = Math.floor(
          moment().diff(moment.utc(data.created_at).local()) / 1000
        );
        setGameId(uuidv4());
        if (data.status === "pending") {
          if (sec < 15) {
            setActed(-1);
            setSecond(14 - sec);
            let hundred = () => {
              let arr = [0, 0, 0];
              data.last_101_games.slice(0, 100).forEach((game: any) => {
                if (game.winning_color === "red") {
                  arr[0] += 1;
                } else if (game.winning_color === "gold") {
                  arr[1] += 1;
                } else {
                  arr[2] += 1;
                }
              });
              return arr;
            };
            let ten = data.last_11_games
              .slice(0, 10)
              .reverse()
              .map((game: any) => game.winning_color);
            dispatch(setLatestWinning({ hundred: hundred(), ten }));
          }
        } else {
          dispatch(
            setWinning({
              index: data.winning_number,
              color: data.winning_color,
            })
          );
          let hundred = () => {
            let ar = [0, 0, 0];
            data.last_101_games.slice(1).forEach((game: any) => {
              if (game.winning_color === "red") {
                ar[0] += 1;
              } else if (game.winning_color === "gold") {
                ar[1] += 1;
              } else {
                ar[2] += 1;
              }
            });
            return ar;
          };
          let ten = data.last_11_games
            .slice(1)
            .reverse()
            .map((game: any) => game.winning_color);
          dispatch(setLatestWinning({ hundred: hundred(), ten }));
          let cacheHundred = () => {
            let arr = [0, 0, 0];
            data.last_101_games.slice(0, 100).forEach((game: any) => {
              if (game.winning_color === "red") {
                arr[0] += 1;
              } else if (game.winning_color === "gold") {
                arr[1] += 1;
              } else {
                arr[2] += 1;
              }
            });
            return arr;
          };
          let cacheTen = data.last_11_games
            .slice(0, 10)
            .reverse()
            .map((game: any) => game.winning_color);
          dispatch(setCache({ cacheHundred: cacheHundred(), cacheTen }));
          setActed(22 - sec);
          data.bets.forEach((bet: any) => {
            pushBetter(
              bet.color,
              bet.user.id,
              bet.user.name,
              Number(bet.user.player_level),
              bet.user.avatar,
              bet.user.amount
            );
          });
          setSecond(15);
        }
      }
    })();
  }, [dispatch]);

  useEffect(() => {
    myEcho();
    const channel = window.Echo.channel("Roulette");
    channel.listen(".CreateGame", (data: any) => {
      setActed(-1);
      setRollingStart(false);
      setGameId(uuidv4());
      setSecond(14);
    });
    channel.listen(".GameUpdate", (data: any) => {
      dispatch(
        setWinning({
          index: data.game.winning_number,
          color: data.game.winning_color,
        })
      );
      let cacheHundred = [0, 1, 2].map((id) =>
        id === 0
          ? data.game.last_100_games.red
          : id === 1
          ? data.game.last_100_games.gold
          : data.game.last_100_games.black
      );
      let cacheTen = data.game.last_10_games
        .reverse()
        .map((game: any) => game.winning_color);
      dispatch(setCache({ cacheHundred, cacheTen }));
    });
    channel.listen(".UpdateBet", (data: any) => {
      if ((user && data.bets.bet.user_id !== user.id) || !user) {
        if (data.bets.type === "bet") {
          pushBetter(
            data.bets.bet.color,
            data.bets.bet.user_id,
            data.bets.user.name,
            Number(data.bets.user.player_level),
            data.bets.user.avatar,
            data.bets.bet.amount
          );
        } else {
          sliceBetter(data.bets.bet.color, data.bets.bet.user_id);
        }
      }
    });
    return () => {
      channel.stopListening(".CreateGame");
      channel.stopListening(".GameUpdate");
      channel.stopListening(".UpdateBet");
    };
  }, [user, dispatch]);

  const finishGame = useCallback(() => {
    if (betted.includes(winning.color)) {
      if (winning.color === "gold") {
        dispatch(updateBalance({ balance: 14 * bets.gold }));
      } else if (winning.color === "red") {
        dispatch(updateBalance({ balance: 2 * bets.red }));
      } else {
        dispatch(updateBalance({ balance: 2 * bets.black }));
      }
    }
    setShow((prev) => !prev);
    dispatch(exchangeLatest());
    setTimeout(() => {
      setRedBetters([]);
      setGoldBetters([]);
      setBlackBetters([]);
      setBetted([]);
      setBets({
        red: 0,
        gold: 0,
        black: 0,
      });
      setShow((prev) => !prev);
    }, 2000);
  }, [dispatch, betted, winning.color, bets]);

  useEffect(() => {
    if (!rollingStart) {
      setBetted([]);
    }
  }, [rollingStart]);

  return (
    <>
      <Rolling
        key={gameId}
        second={second}
        setSecond={setSecond}
        acted={acted}
        finish={finishGame}
        start={rollingStart}
        setStart={setRollingStart}
      />
      <RollingHistory
        tenGames={latestWinning.ten}
        hundredGames={latestWinning.hundred}
      />
      <Betting bet={bet} setBet={setBet} start={rollingStart} />
      <div className="w-full grid grid-cols-3 gap-12 mt-8 px-6">
        <BetterTable
          type="red"
          betters={redBetters}
          bet={handleBet}
          betted={betted}
          amount={bets.red}
          start={rollingStart}
          win={winning.color === "red"}
          show={show}
        />
        <BetterTable
          type="gold"
          betters={goldBetters}
          bet={handleBet}
          betted={betted}
          amount={bets.gold}
          start={rollingStart}
          win={winning.color === "gold"}
          show={show}
        />
        <BetterTable
          type="black"
          betters={blackBetters}
          bet={handleBet}
          betted={betted}
          amount={bets.black}
          start={rollingStart}
          win={winning.color === "black"}
          show={show}
        />
      </div>
    </>
  );
};

export default RoulettePage;
