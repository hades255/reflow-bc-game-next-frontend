"use client";
import { useState, useEffect } from "react";
import myEcho from "@/hooks/myEcho";
import { useDispatch } from "react-redux";
import { useUser } from "@/redux/slices/main/userSlice";
import { getHistory } from "@/services/coinflip";
import {
  useMyGames,
  setAMyGame,
  dismissAllGames,
} from "@/redux/slices/coinflip/myGamesSlice";
import { balanceBackup } from "@/redux/slices/main/userSlice";
import MyGameCard from "./MyGameCard";
import BlankCard from "./BlankCard";
import HistoryCard from "./HistoryCard";
import { HistoryType } from "@/utils/types";

const MyGames = () => {
  const [isCurrent, setIsCurrent] = useState<boolean>(true);

  const [historyList, setHistoryList] = useState([]);

  const [historyTotal, setHistoryTotal] = useState(0);

  const user = useUser();

  const myGames = useMyGames();

  const dispatch = useDispatch();

  const changePeriod = (current: boolean) => {
    setIsCurrent(current);
  };

  const dismiss = () => {
    dispatch(balanceBackup());
    dispatch(dismissAllGames());
  };

  useEffect(() => {
    myEcho();
    const channel = window.Echo.channel("RoyalFlipGameChannel");
    channel.listen("RoyalFlipGameEvent", (e: any) => {
      if (e.type === "join") {
        if (user && e.data.userId === user.id) {
          dispatch(
            setAMyGame({
              round: e.data.round,
              game: e.data,
            })
          );
        }
      }
    });
    return () => {
      channel.stopListening("RoyalFlipGameEvent");
    };
  }, [dispatch, user]);

  useEffect(() => {
    (async () => {
      if (!isCurrent && user) {
        let { total, data } = await getHistory(user);
        setHistoryList(data);
        setHistoryTotal(total);
      }
    })();
  }, [isCurrent, user]);

  return (
    <>
      <div className="flex w-full justify-between mt-8 mx-2">
        <div className="flex items-center text-font font-xl font-semibold gap-4">
          <span>
            <span>My Games</span>&nbsp;
            <span className="text-gold">{isCurrent ? (myGames && myGames.length) : historyTotal}</span>
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
        {isCurrent ? (
          <>
            {myGames &&
              myGames.map((game) => (
                <MyGameCard key={`Matchcard-MyGames-${game.id}`} game={game} />
              ))}
            {!myGames ||
              (myGames.length < 4 &&
                [...Array(4 - myGames.length)].map((a, index) => (
                  <BlankCard key={`Matchcard-blank-${index}`} />
                )))}
          </>
        ) : (
          historyList.map((history: HistoryType) => <HistoryCard key={`history-${history.round}`} game={history} />)
        )}
      </div>
    </>
  );
};

export default MyGames;
