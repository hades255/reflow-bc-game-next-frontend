import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import myEcho from "@/hooks/myEcho";
import { getPendingGames } from "@/services/coinflip";
import { useUser } from "@/redux/slices/main/userSlice";
import {
  useLiveGames,
  setLiveGames,
  setALiveGame,
  deleteALiveGameById,
  cacheDelete,
  filterAmount,
  sortAmount,
  initialLiveGames,
} from "@/redux/slices/coinflip/liveGamesSlice";
import BlankCard from "./BlankCard";
import LiveGameCard from "./LiveGameCard";
import { PiCoinsLight } from "react-icons/pi";

const LiveGames = () => {
  const [cards, setCards] = useState<number>(10);
  const [amount, setAmount] = useState<number[]>([0, -1]);
  const [sort, setSort] = useState<boolean>(true);
  const user = useUser();
  const games = useLiveGames();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      let data = await getPendingGames(false, user);
      dispatch(initialLiveGames(data));
    })();
  }, [dispatch, user])

  useEffect(() => {
    myEcho();
    const channel = window.Echo.channel("RoyalFlipGameChannel");
    channel.listen("RoyalFlipGameEvent", (e: any) => {
      if (e.type === "create") {
        if ((user && e.data[0].userId !== user.id) || !user) {
          dispatch(setLiveGames({ games: e.data, count: cards }));
        }
      } else if (e.type === "join") {
        if (
          (user && e.data.userId !== user.id) ||
          (user && e.data.competitorId !== user.id) ||
          !user
        ) {
          dispatch(
            setALiveGame({
              round: e.data.round,
              game: e.data,
            })
          );
        }
      } else {
        dispatch(deleteALiveGameById({ id: e.data }));
      }
    });
    return () => {
      channel.stopListening("RoyalFlipGameEvent");
    };
  }, [dispatch, user, cards]);

  useEffect(() => {
    if (games.length !== 0 && games.filter((gm) => gm.round !== null).length === 0) {
      dispatch(cacheDelete());
    }
  }, [dispatch, games]);

  useEffect(() => {
    dispatch(filterAmount({ condition: amount }));
  }, [dispatch, amount])

  useEffect(() => {
    dispatch(sortAmount({ sort: sort }));
  }, [dispatch, sort])

  return (
    <>
      <div className="flex w-full justify-between mt-8 mx-2">
        <div className="flex items-center text-font font-xl font-semibold gap-4">
          <span>
            <span>Live Games</span>&nbsp;
            <span className="text-gold">{games.length}</span>
          </span>
        </div>
        <div className="flex gap-1 pr-4 items-center text-[#707070]">
          {"Amount:"}
          <div className="hs-dropdown relative inline-flex !z-30 bg-transparent rounded-sm">
            <button
              id="hs-dropdown-amount"
              type="button"
              className="px-2 text-font"
            >
              All
            </button>
            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-32 bg-main shadow-md rounded-md p-2 mt-2 !z-30"
              aria-labelledby="hs-dropdown-amount"
            >
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]"
                onClick={() => setAmount([0, -1])}
              >
                <PiCoinsLight /> All
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]"
                onClick={() => setAmount([0, 5])}
              >
                <PiCoinsLight /> 0.00 - 5.00
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]"
                onClick={() => setAmount([5, 20])}
              >
                <PiCoinsLight /> 5.00 - 20.00
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]"
                onClick={() => setAmount([20, 50])}
              >
                <PiCoinsLight /> 20.00 - 50.00
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]"
                onClick={() => setAmount([50, 100])}
              >
                <PiCoinsLight /> 50.00 - 100.00
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]"
                onClick={() => setAmount([100, 250])}
              >
                <PiCoinsLight /> 100.00 - 250.00
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]"
                onClick={() => setAmount([250, -1])}
              >
                <PiCoinsLight /> 250.00 -
              </button>
            </div>
          </div>
          &nbsp;&nbsp;&nbsp;
          {"Display Games:"}
          <div className="hs-dropdown relative inline-flex !z-30 bg-transparent rounded-sm">
            <button
              id="hs-dropdown-games"
              type="button"
              className="px-2 text-font"
            >
              {cards}
            </button>
            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-12 bg-main shadow-md rounded-md p-2 mt-2 !z-30"
              aria-labelledby="hs-dropdown-games"
            >
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                onClick={() => setCards(10)}
              >
                10
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                onClick={() => setCards(20)}
              >
                20
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                onClick={() => setCards(50)}
              >
                50
              </button>
            </div>
          </div>
          &nbsp;&nbsp;&nbsp;
          {"Sort:"}
          <div className="hs-dropdown relative inline-flex !z-30 bg-transparent rounded-sm">
            <button
              id="hs-dropdown-order"
              type="button"
              className="px-2 text-font"
            >
              Highest Amount First
            </button>
            <div
              className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-12 bg-main shadow-md rounded-md p-2 mt-2 !z-30"
              aria-labelledby="hs-dropdown-order"
            >
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                onClick={() => setSort(true)}
              >
                Highest Amount First
              </button>
              <button
                className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                onClick={() => setSort(false)}
              >
                Lowest Amount First
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-4 grid 2xl:grid-cols-4 grid-cols-3 justify-items-center gap-y-8">
        {games.length !== 0 &&
          games.map((game, id) =>
            id < cards && game.round === null ? (
              <BlankCard key={`livegames-no-${game.id}`} />
            ) : (
              <LiveGameCard
                key={`Matchcard-LiveGames-${game.id}`}
                game={game}
              />
            )
          )}
        {games.length < cards &&
          [...Array(cards - games.length)].map((card, index) => (
            <BlankCard key={`livegames-no-${index}`} />
          ))}
      </div>
    </>
  );
};

export default LiveGames;
