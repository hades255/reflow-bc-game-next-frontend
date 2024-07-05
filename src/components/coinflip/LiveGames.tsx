import { useState } from "react";
import BlankCard from "./BlankCard";
import { PiCoinsLight } from "react-icons/pi";

const LiveGames = () => {
  const [cards, setCards] = useState<number>(10);

  return (
    <>
      <div className="flex w-full justify-between mt-8 mx-2">
        <div className="flex items-center text-font font-xl font-semibold gap-4">
          <span>
            <span>Live Games</span>&nbsp;<span className="text-gold">{0}</span>
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
              <button className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]">
                <PiCoinsLight /> All
              </button>
              <button className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]">
                <PiCoinsLight /> 0.00 - 5.00
              </button>
              <button className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]">
                <PiCoinsLight /> 5.00 - 20.00
              </button>
              <button className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]">
                <PiCoinsLight /> 20.00 - 50.00
              </button>
              <button className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]">
                <PiCoinsLight /> 50.00 - 100.00
              </button>
              <button className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]">
                <PiCoinsLight /> 100.00 - 250.00
              </button>
              <button className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gold hover:bg-[#101010]">
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
              <button className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]">
                Highest Amount First
              </button>
              <button className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]">
                Lowest Amount First
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full mt-4 grid 2xl:grid-cols-4 grid-cols-3 justify-items-center gap-y-8">
        {[...Array(cards)].map((card, index) => (
          <BlankCard key={`livegames-${index}`} />
        ))}
      </div>
    </>
  );
};

export default LiveGames;
