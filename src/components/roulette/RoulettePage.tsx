"use client";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import Rolling from "./Rolling";
import RollingHistory from "./RollingHistory";
import Betting from "./Betting";
import BetterTable from "./BetterTable";
import { useUser } from "@/redux/slices/main/userSlice";
import { updateBalance } from "@/redux/slices/main/userSlice";
import { setToast } from "@/redux/slices/main/toastSlice";
import { setModal } from "@/redux/slices/main/modalSlice";
import { getActive } from "@/services/roulette";
import { placeBet } from "@/services/roulette";
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
  const [tenGames, setTenGames] = useState<string[]>([]);
  const [hundredGames, setHundredGames] = useState<number[]>([]);
  const [winningIndex, setWinningIndex] = useState<number | null>(null);
  const [winningColor, setWinningColor] = useState<string>("");
  const [cacheTen, setCacheTen] = useState<string[]>([]);
  const [cacheHundred, setCacheHundred] = useState<number[]>([]);
  const [redBetters, setRedBetters] = useState<BetterType[]>([]);
  const [goldBetters, setGoldBetters] = useState<BetterType[]>([]);
  const [blackBetters, setBlackBetters] = useState<BetterType[]>([]);
  const [show, setShow] = useState<boolean>(false);

  const user = useUser();

  const dispatch = useDispatch();

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
          let data = await placeBet(bet, val);
          if (data.status === 200) {
            if (bettedVals.includes(val)) {
              setBets((prev) => ({ ...prev, [val]: bet }));
              dispatch(updateBalance({ balance: -bet }));
            } else {
              setBets((prev) => ({ ...prev, [val]: 0 }));
              dispatch(updateBalance({ balance: bet }));
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

  const finishGame = () => {
    if (betted.includes(winningColor)) {
      if (winningColor === "gold") {
        dispatch(updateBalance({ balance: 14 * bets.gold }));
      } else if (winningColor === "red") {
        dispatch(updateBalance({ balance: 2 * bets.red }));
      } else {
        dispatch(updateBalance({ balance: 2 * bets.black }));
      }
    }
    setTenGames(cacheTen);
    setHundredGames(cacheHundred);
    setShow((prev) => !prev);
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
      setBet(0);
      setShow((prev) => !prev);
    }, 1000);
  };

  useEffect(() => {
    (async () => {
      let { data, status } = await getActive();
      if (status === 200) {
        let sec = Math.floor(
          moment().diff(moment.utc(data.created_at).local()) / 1000
        );
        if (data.status === "pending") {
          setActed(-1);
          setSecond(15 - sec);
          setHundredGames(
            ["red", "gold", "black"].map((color) => data.last_100_games[color])
          );
          setTenGames(
            data.last_10_games.map((dt: any) => dt.winning_color).reverse()
          );
        } else {
          setHundredGames(
            ["red", "gold", "black"].map((color) =>
              color === data.winning_color
                ? data.last_100_games[color] - 1
                : data.last_100_games[color]
            )
          );
          setTenGames(() => {
            let games = data.last_10_games.map((dt: any) => dt.winning_color);
            games.shift();
            return games.reverse();
          });
          setCacheHundred(
            ["red", "gold", "black"].map((color) => data.last_100_games[color])
          );
          setCacheTen(
            data.last_10_games.map((dt: any) => dt.winning_color).reverse()
          );
          setActed(22 - sec);
          data.bets.forEach((bet: any) => {
            if (bet.color === "red") {
              setRedBetters((prev: BetterType[]) =>
                prev.concat([
                  {
                    user_id: bet.user.id,
                    name: bet.user.name,
                    level: Number(bet.user.player_level),
                    avatar: bet.user.avatar,
                    bet: bet.amount,
                  },
                ])
              );
            } else if (bet.color === "gold") {
              setGoldBetters((prev: BetterType[]) =>
                prev.concat([
                  {
                    user_id: bet.user.id,
                    name: bet.user.name,
                    level: Number(bet.user.player_level),
                    avatar: bet.user.avatar,
                    bet: bet.amount,
                  },
                ])
              );
            } else {
              setBlackBetters((prev: BetterType[]) =>
                prev.concat([
                  {
                    user_id: bet.user.id,
                    name: bet.user.name,
                    level: Number(bet.user.player_level),
                    avatar: bet.user.avatar,
                    bet: bet.amount,
                  },
                ])
              );
            }
          });
          setWinningIndex(data.winning_number);
          setSecond(15);
        }
        setGameId(uuidv4());
      }
    })();
  }, []);

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
      setWinningIndex(data.game.winning_number);
      setWinningColor(data.game.winning_color);
      setCacheTen(
        data.game.last_10_games.map((game: any) => game.winning_color).reverse()
      );
      setCacheHundred(
        ["red", "gold", "black"].map((color) => data.game.last_100_games[color])
      );
    });
    channel.listen(".UpdateBet", (data: any) => {
      if (data.bets.bet.color === "red") {
        setRedBetters((prev: BetterType[]) =>
          prev.concat([
            {
              user_id: data.bets.bet.user_id,
              name: data.bets.user.name,
              level: Number(data.bets.user.player_level),
              avatar: data.bets.user.avatar,
              bet: data.bets.bet.amount,
            },
          ])
        );
      } else if (data.bets.bet.color === "gold") {
        setGoldBetters((prev: BetterType[]) =>
          prev.concat([
            {
              user_id: data.bets.bet.user_id,
              name: data.bets.user.name,
              level: Number(data.bets.user.player_level),
              avatar: data.bets.user.avatar,
              bet: data.bets.bet.amount,
            },
          ])
        );
      } else {
        setBlackBetters((prev: BetterType[]) =>
          prev.concat([
            {
              user_id: data.bets.bet.user_id,
              name: data.bets.user.name,
              level: Number(data.bets.user.player_level),
              avatar: data.bets.user.avatar,
              bet: data.bets.bet.amount,
            },
          ])
        );
      }
    });
    return () => {
      channel.stopListening(".Last10Games");
      channel.stopListening(".GameUpdate");
      channel.stopListening(".UpdateBet");
    };
  }, []);

  useEffect(() => {
    if (rollingStart) {
      // setBet(0);
    } else {
      setBetted([]);
    }
  }, [rollingStart]);

  return (
    <>
      <Rolling
        key={gameId}
        second={second}
        setSecond={setSecond}
        winningIndex={winningIndex}
        acted={acted}
        finish={finishGame}
        start={rollingStart}
        setStart={setRollingStart}
      />
      {tenGames.length !== 0 && (
        <RollingHistory tenGames={tenGames} hundredGames={hundredGames} />
      )}
      <Betting bet={bet} setBet={setBet} start={rollingStart} />
      <div className="w-full grid grid-cols-3 gap-12 mt-8 px-6">
        <BetterTable
          type="red"
          betters={redBetters}
          bet={handleBet}
          betted={betted}
          amount={bets.red}
          start={rollingStart}
          win={winningColor === "red"}
          show={show}
        />
        <BetterTable
          type="gold"
          betters={goldBetters}
          bet={handleBet}
          betted={betted}
          amount={bets.gold}
          start={rollingStart}
          win={winningColor === "gold"}
          show={show}
        />
        <BetterTable
          type="black"
          betters={blackBetters}
          bet={handleBet}
          betted={betted}
          amount={bets.black}
          start={rollingStart}
          win={winningColor === "black"}
          show={show}
        />
      </div>
    </>
  );
};

export default RoulettePage;
