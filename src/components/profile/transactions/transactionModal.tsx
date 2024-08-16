import React, { useCallback, useEffect, useState } from "react";
import moment from "moment";
import IconCoin from "@/utils/icons/Coin";
import RoyalflipCoin from "@/utils/icons/Royalfilp";
import { RiCloseLine, RiSubtractLine } from "react-icons/ri";
import IconRoulette from "@/utils/icons/Roulette";
import UpgradeGame from "@/utils/icons/UpgradeGame";
import GoldCoin from "@/utils/icons/GoldCoin";
import { useFetch } from "@/hooks/useFetch";
import IconLoading from "@/utils/icons/Loading";

const getTransactionIcon = (
  type: string,
  width: number = 66,
  height: number = 66
) => {
  switch (type) {
    case "roulette":
      return <IconRoulette height={height} width={width} color={"#E9AE15"} />;
    case "royalflip":
      return <RoyalflipCoin height={height} width={width} color={"#E9AE15"} />;
    case "upgrader":
      return <UpgradeGame height={height} width={width} color={"#E9AE15"} />;
    default:
      return <GoldCoin height={height} width={width} color={"#E9AE15"} />;
  }
};

interface Transaction {
  id: number;
  type: string;
  game_id: number;
  amount: number;
  status: string;
  created_at: string;
}

interface Props {
  selected: number;
  setSelected: Function;
}

const TransactionModal: React.FC<Props> = ({ selected, setSelected }) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [bet, setBet] = useState<string | null>(null);

  const { data } = useFetch(`/api/profile/transactions/${selected}`, {
    method: "GET",
  });

  useEffect(() => {
    if (data && data.transaction) setTransaction(data.transaction);
    if (data && data.game) setBet(data.game.win);
  }, [data]);

  const getDateFormat = useCallback(() => {
    const currentYear = new Date().getFullYear();
    const year = moment(transaction?.created_at).year();
    if (currentYear === Number(year)) {
      return moment(transaction?.created_at).format("ddd DD MMM hh:mm A");
    }
    return moment(transaction?.created_at).format("ddd DD MMM, YYYY hh:mm A");
  }, [transaction]);

  const handleClickClose = useCallback(() => {
    setSelected(null);
  }, [setSelected]);

  return (
    <div
      className="relative z-30"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-900 bg-opacity-70 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="transform rounded rounded-tr-none text-[#D8D8E8] bg-[#242424] text-left shadow-xl transition-all w-[277px]">
            <div className=" absolute right-9 -top-5 w-9 h-5 bg-[#232323] rounded-tl flex justify-center">
              <span
                onClick={handleClickClose}
                className="text-xl text-[#E59513] hover:cursor-pointer hover:text-gray-400"
              >
                <RiSubtractLine />
              </span>
            </div>
            <div className=" absolute right-0 -top-5 w-9 h-5 bg-[#232323] rounded-tr flex justify-center">
              <span
                onClick={handleClickClose}
                className="text-xl text-[#FA3241] hover:cursor-pointer hover:text-gray-400"
              >
                <RiCloseLine />
              </span>
            </div>
            {transaction ? (
              <>
                <div className="m-[10px] flex flex-col bg-[#121212] bg-opacity-[48%] rounded-lg">
                  <div className="mt-6 flex justify-center items-center">
                    {getTransactionIcon(transaction.type, 24, 24)}
                    <span className="text-white font-[600] text-md">
                      {transaction.type.substring(0, 1).toUpperCase() +
                        transaction.type.substring(1)}
                    </span>
                  </div>
                  <div className="flex justify-center items-center text-[#5D5D5D] text-xs">
                    {getDateFormat()}
                  </div>
                  <div className="flex justify-center items-center text-[#5D5D5D] text-xs">
                    Bet Placed On:
                  </div>
                  <div className="m-[10px] h-[50px] flex items-center justify-between bg-[#111111] bg-opacity-[20%] rounded-lg px-[10px]">
                    <div className="flex items-center">
                      {getTransactionIcon(transaction.type)}
                      T
                    </div>
                    <div className="text-[18px]">#{transaction.game_id}</div>
                  </div>
                  <div className="mx-[10px] mb-5 h-[50px] flex items-center justify-between px-[10px] bg-[#111111] bg-opacity-[20%] rounded-lg">
                    <span>You {transaction.amount > 0 ? "Win" : "Lose"}</span>
                    <div className="flex items-center">
                      <IconCoin width={15} height={15} color="#E9AE15" />
                      <span
                        className={`ml-1 ${
                          transaction.amount > 0
                            ? "text-[#A3FC56]"
                            : "text-[#FF3148]"
                        }`}
                      >
                        {transaction.amount}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="m-[10px]">
                  <button
                    className="bg-[#606060] bg-opacity-[12%] hover:bg-[#606060a1] p-1 rounded-sm w-full"
                    onClick={handleClickClose}
                  >
                    <div className="flex justify-center items-center">
                      <p className="text-[#E9AE15]">Verify</p>
                    </div>
                  </button>
                  <button
                    className="mt-1 bg-[#606060] bg-opacity-[12%] hover:bg-[#606060a1] p-1 rounded-sm w-full"
                    onClick={handleClickClose}
                  >
                    <div className="flex justify-center items-center">
                      <p className="">Close</p>
                    </div>
                  </button>
                </div>
              </>
            ) : (
              <div className="min-h-48 flex justify-center items-center">
                <IconLoading width={12} height={12} color="#E9AE15" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
