"use client";
import { useState, useEffect, useCallback } from "react";
import myEcho from "@/hooks/myEcho";
import { useDispatch } from "react-redux";
import { useUser } from "@/redux/slices/main/userSlice";
import { getHistory, getPendingGames, cancelGames } from "@/services/coinflip";
import {
  initialMyGames,
  useMyGames,
  setAMyGame,
  dismissAllGames,
  cacheDelete,
} from "@/redux/slices/coinflip/myGamesSlice";
import { updateBalance } from "@/redux/slices/main/balanceSlice";
import MyGameCard from "./MyGameCard";
import BlankCard from "./BlankCard";
import HistoryCard from "./HistoryCard";
import { HistoryType } from "@/utils/types";
import Pagination from "../analytics/Pagination";

const MyGames = () => {
  const [isCurrent, setIsCurrent] = useState<boolean>(true);
  const [historyList, setHistoryList] = useState([]);
  const user = useUser();
  const myGames = useMyGames();
  const dispatch = useDispatch();

  const perPage = 20;
  const showPages = 3;
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [firstPage, setFirstPage] = useState<number>(1);

  const changePeriod = (current: boolean) => {
    setIsCurrent(current);
  };

  const dismiss = useCallback(async () => {
    let data = await cancelGames(myGames.map((game) => Number(game.game_id)));
    if (data.status === 200) {
      let created = myGames.filter((game) => game.players.length === 1);
      let allBudget = 0;
      created.forEach((gm) => {
        allBudget += gm.bet;
      });
      dispatch(updateBalance({ balance: allBudget }));
      dispatch(dismissAllGames());
    }
  }, [dispatch, myGames]);

  const getPending = async () => {
    if (user) {
      let data = await getPendingGames(true, user);
      dispatch(initialMyGames(data));
    } else {
      dispatch(initialMyGames([]));
    }
  };

  useEffect(() => {
    getPending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  }, [dispatch, user]);

  useEffect(() => {
    (async () => {
      if (!isCurrent && user) {
        let { total, data } = await getHistory(user, page);
        setHistoryList(data);
        setTotal(total);
      }
    })();
  }, [isCurrent, user, page]);

  useEffect(() => {
    if (
      myGames.length !== 0 &&
      myGames.filter((game) => game.round !== null).length === 0
    ) {
      dispatch(cacheDelete({ type: true }));
    }
    if (
      myGames.length > 4 &&
      myGames.filter((game, id) => game.round !== null && id > 3).length === 0
    ) {
      dispatch(cacheDelete({ type: false }));
    }
  }, [dispatch, myGames]);

  const handleNextPage = async () => {
    if (firstPage + showPages - 1 === page) {
      setFirstPage((prev) => prev + 1);
    }
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = async () => {
    if (firstPage === page) {
      setFirstPage((prev) => prev - 1);
    }
    setPage((prev) => prev - 1);
  };

  const clickPage = async (_page: number) => {
    setPage(_page);
  };

  return (
    <>
      <div className="flex w-full justify-between mt-8 mx-2">
        <div className="flex items-center text-font font-xl font-semibold gap-4">
          <span>
            <span>My Games</span>&nbsp;
            <span className="text-gold">
              {isCurrent
                ? myGames &&
                  myGames.filter((game) => game.round !== null).length
                : total}
            </span>
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
              myGames.map((game) =>
                game.round ? (
                  <MyGameCard
                    key={`Matchcard-MyGames-${game.id}`}
                    game={game}
                  />
                ) : (
                  <BlankCard key={`Matchcard-blank-${game.id}`} />
                )
              )}
            {!myGames ||
              (myGames.length < 4 &&
                [...Array(4 - myGames.length)].map((a, index) => (
                  <BlankCard key={`Matchcard-blank-${index}`} />
                )))}
          </>
        ) : (
          historyList &&
          historyList.length &&
          historyList.map((history: HistoryType) => (
            <HistoryCard key={`history-${history.round}`} game={history} />
          ))
        )}
      </div>
      {!isCurrent && user ? (
        <Pagination
          page={page}
          total={total}
          perPage={perPage}
          showPages={showPages}
          firstPage={firstPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          setPage={clickPage}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default MyGames;
