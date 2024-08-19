import { FC, useCallback, useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import IconCoin from "@/utils/icons/Coin";
import moment from "moment";
import RoyalflipCoin from "@/utils/icons/Royalfilp";
import TransactionModal from "./transactionModal";
import IconLoading from "@/utils/icons/Loading";
import IconRoulette from "@/utils/icons/Roulette";
import UpgradeGame from "@/utils/icons/UpgradeGame";
import GoldCoin from "@/utils/icons/GoldCoin";

const getTransactionIcon = (type: string) => {
  switch (type) {
    case "roulette":
      return <IconRoulette height={16} width={18} color={"#E9AE15"} />;
    case "royalflip":
      return <RoyalflipCoin height={20} width={22} color={"#E9AE15"} />;
    case "upgrader":
      return <UpgradeGame height={20} width={22} color={"#E9AE15"} />;
    default:
      return <GoldCoin height={16} width={18} color={"#E9AE15"} />;
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

export default function History() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [page, setPage] = useState(0);

  const { data } = useFetch("/api/profile/transactions", {
    method: "GET",
  });

  useEffect(() => {
    if (data && data.transactions) {
      setTransactions(
        data.transactions.filter(
          (_: any, index: any) => index > page * 12 && index < (page + 1) * 12
        )
      );
    }
  }, [data, page]);

  const handleClickPrev = useCallback(() => {
    setPage(page - 1 <= 0 ? 0 : page - 1);
  }, [page]);

  const handleClickNext = useCallback(() => {
    if ((page + 1) * 12 < data.transactions.length) setPage(page + 1);
  }, [page, data]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full my-2">
        <p className="text-[#BBB] font-bold">Transactions</p>
      </div>
      <div className="space-y-[1px] w-full">
        {transactions ? (
          transactions.length ? (
            <>
              <div
                className={`w-full h-[50px] flex items-center flex-nowrap text-[#727272] bg-[#282828] bg-opacity-[58%] rounded-t py-1 px-4 hover:cursor-pointer hover:bg-[#3E3E3E]`}
              >
                <div className="w-[150px] flex-none flex">Game</div>
                <div className="w-[100px] flex-none">Number</div>
                <div className="flex-grow"></div>
                <div className="flex flex-row items-center gap-1 w-[100px]">
                  Profits
                </div>
                <div className="w-[150px]">Time</div>
              </div>
              {transactions.map((item, index) => (
                <HistoryTab
                  key={index}
                  transaction={item}
                  last={index === transactions.length - 1}
                  odd={index % 2}
                  setSelected={setSelected}
                />
              ))}
              <div className="pt-4 flex justify-end">
                <button
                  className={`bg-[#333541] hover:bg-[#494d5e] text-[${
                    page === 0 ? "#999" : "#99A"
                  }] font-bold w-8 h-8 rounded-2xl`}
                  onClick={handleClickPrev}
                >
                  {"<"}
                </button>
                <div className="w-8 h-8 flex justify-center items-center text-[#E9AE15]">
                  {page + 1}
                </div>
                <button
                  className={`bg-[#333541] hover:bg-[#494d5e] text-[${
                    page >= Math.ceil(data.transactions.length / 12) - 1
                      ? "#999"
                      : "#99A"
                  }] font-bold w-8 h-8 rounded-2xl`}
                  onClick={handleClickNext}
                >
                  {">"}
                </button>
              </div>
            </>
          ) : (
            <p className="text-[#a8871a]">No Transactions</p>
          )
        ) : (
          <IconLoading width={12} height={12} color="#E9AE15" />
        )}
      </div>
      {selected !== null && (
        <TransactionModal selected={selected} setSelected={setSelected} />
      )}
    </div>
  );
}

interface HistoryTabProps {
  transaction: Transaction;
  last: boolean;
  odd: number;
  setSelected: Function;
}

const HistoryTab: FC<HistoryTabProps> = ({
  transaction,
  last,
  odd,
  setSelected,
}) => {
  const getDateFormat = useCallback(() => {
    const currentYear = new Date().getFullYear();
    const year = moment(transaction.created_at).year();
    if (currentYear === Number(year)) {
      return moment(transaction.created_at).format("ddd DD MMM hh:mm A");
    }
    return moment(transaction.created_at).format("ddd DD MMM, YYYY hh:mm A");
  }, [transaction]);

  const handleSelect = useCallback(() => {
    setSelected(transaction.id);
  }, [setSelected, transaction]);

  return (
    <div
      className={`w-full h-[50px] flex items-center flex-nowrap ${
        odd ? "bg-[#1E1E1E]" : "bg-[#191919]"
      } ${
        last ? "rounded-b" : ""
      } py-1 px-4 hover:cursor-pointer hover:bg-[#3E3E3E] text-xs`}
      onClick={handleSelect}
    >
      <div className="w-[150px] text-white flex items-center">
          {getTransactionIcon(transaction.type)}
          <span>
            {transaction.type.substring(0, 1).toUpperCase() +
              transaction.type.substring(1)}
          </span>
      </div>
      <div className="w-[100px] flex-none text-white">
        #{transaction.game_id}
      </div>
      <div className="flex-grow"></div>
      <div className="flex flex-row items-center gap-1 w-[100px]">
        <IconCoin width={14} height={14} color="#E9AE15" />
        <p
          className={`${
            transaction.amount > 0 ? "text-[#B9FD3F]" : "text-[#FF3148]"
          } font-medium]`}
        >
          {transaction.amount}
        </p>
      </div>
      <div className="w-[150px] text-[#5D5D5D]">{getDateFormat()}</div>
    </div>
  );
};
