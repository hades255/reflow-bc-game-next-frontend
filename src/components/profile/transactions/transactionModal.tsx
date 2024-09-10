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
import WhiteCoin from "@/utils/icons/WhiteCoin";
import BlackCoin from "@/utils/icons/BlackCoin";
import CoinBlack from "@/utils/icons/CoinBlack";
import CoinRed from "@/utils/icons/CoinRed";
import CoinYellow from "@/utils/icons/CoinYellow";
import { useRouter } from "next/navigation";
import IconMysteryBox from "@/utils/icons/MysteryBox";
import IconMystery from "@/utils/icons/Mystery";

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
    case "mystery bonus":
      return <IconMystery height={20} width={width} color={"#E9AE15"} />;
    default:
      return <GoldCoin height={16} width={16} color={"#E9AE15"} />;
  }
};

const getTransactionWinIcon = (
  type: string,
  bet: any,
  width: number = 35,
  height: number = 35
) => {
  switch (type) {
    case "roulette":
      return bet.color === "black" ? (
        <CoinBlack width={35} height={35} />
      ) : bet.color === "red" ? (
        <CoinRed width={35} height={35} />
      ) : (
        <CoinYellow width={35} height={35} />
      );
    case "royalflip":
      return bet.user_color ? (
        <WhiteCoin width={35} height={35} />
      ) : (
        <BlackCoin width={35} height={35} />
      );
    case "upgrader":
      return <UpgradeGame height={height} width={width} color={"#E9AE15"} />;
    case "mystery bonus":
      return <IconMysteryBox height={height} width={width} color={"#E9AE15"} />;
    default:
      return <GoldCoin height={height} width={width} color={"#E9AE15"} />;
  }
};

const getbetText = (type: string, bet: any) => {
  switch (type) {
    case "roulette":
      return bet.color === "black"
        ? "T"
        : bet.color === "red"
        ? "CT"
        : "Yellow";
    case "royalflip":
      return bet.user_color ? "CT" : "T";
    case "upgrader":
      return "";
    default:
      return "";
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
  const router = useRouter();

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [bet, setBet] = useState<any | null>(null);

  const { data } = useFetch(`/api/profile/transactions/${selected}`, {
    method: "GET",
  });

  useEffect(() => {
    if (data && data.transaction) setTransaction(data.transaction);
    if (data && data.game) setBet(data.game[0]);
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

  const handleClickVerify = useCallback(() => {
    router.push(`/fairness`);
  }, [router]);

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
                    <span className="text-white font-[600] text-md ml-1">
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
                      {getTransactionWinIcon(transaction.type, bet)}
                      <span className="ml-2">
                        {getbetText(transaction.type, bet)}
                      </span>
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
                    onClick={handleClickVerify}
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
