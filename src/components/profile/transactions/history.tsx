import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import IconCoin from "@/utils/icons/Coin";
import moment from "moment";
import RoyalflipCoin from "@/utils/icons/Royalfilp";
import TransactionModal from "./transactionModal";
import IconLoading from "@/utils/icons/Loading";
import IconRoulette from "@/utils/icons/Roulette";
import UpgradeGame from "@/utils/icons/UpgradeGame";
import GoldCoin from "@/utils/icons/GoldCoin";
import ItemsList from "@/utils/icons/ItemsList";
import ItemsBox from "@/utils/icons/ItemsBox";
import SearchIcon from "@/utils/icons/SearchIcon";

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
  const [itemtheme, setItemTheme] = useState<boolean>(true);
  const totalPages = useMemo(
    () =>
      transactions ? Math.ceil(transactions.length / (itemtheme ? 12 : 15)) : 0,
    [transactions, itemtheme]
  );

  const { data } = useFetch("/api/profile/transactions", {
    method: "GET",
  });

  useEffect(() => {
    if (data && data.transactions) {
      setTransactions(data.transactions);
    }
  }, [data, page]);

  const handleClickPage = useCallback((value: any) => {
    setPage(value);
  }, []);

  const handleClickItemList = useCallback(() => {
    setItemTheme(true);
    setPage(0);
  }, []);

  const handleClickItemBox = useCallback(() => {
    setItemTheme(false);
    setPage(0);
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="space-y-[1px] w-full">
        <div className="w-full flex justify-between flex-wrap">
          <div className="text-sm flex items-center mb-5">
            <span className="text-[#727272]">View:</span>
            <div className="ml-1 space-x-1 flex">
              <div
                className="hover:cursor-pointer flex items-center"
                onClick={handleClickItemList}
              >
                <ItemsList color={itemtheme ? "#E9AE15" : "#707070"} />
              </div>
              <div
                className="hover:cursor-pointer flex items-center"
                onClick={handleClickItemBox}
              >
                <ItemsBox color={itemtheme ? "#707070" : "#E9AE15"} />
              </div>
            </div>
            <span className="ml-4 mr-1 text-[#727272]">Type:</span>
            <span className="text-white">All</span>
            <span className="ml-4 mr-1 text-[#727272]">Sort By:</span>
            <span className="text-white">All</span>
          </div>
          <div className="mb-5 relative">
            <input
              className="border-2 border-[#cdcdcd2c] rounded w-[270px] h-[30px] pl-10 bg-transparent text-[#727272] text-sm"
              placeholder="Search..."
            ></input>
            <span className="absolute left-0 top-0 w-10 h-[30px] flex justify-center items-center">
              <SearchIcon />
            </span>
          </div>
        </div>
        {transactions ? (
          transactions.length ? (
            <>
              <div className={`flex ${itemtheme ? "flex-col" : "flex-wrap"}`}>
                {itemtheme && (
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
                )}
                {transactions
                  .filter(
                    (_: any, index: any) =>
                      index >= page * (itemtheme ? 12 : 15) &&
                      index < (page + 1) * (itemtheme ? 12 : 15)
                  )
                  .map((item, index) => (
                    <HistoryTab
                      key={index}
                      transaction={item}
                      last={index === transactions.length - 1}
                      odd={index % 2}
                      setSelected={setSelected}
                      itemtheme={itemtheme}
                    />
                  ))}
              </div>
              <div className="pt-4 flex justify-end">
                {page < 2 && (
                  <>
                    <button
                      className={`bg-[#333541] hover:bg-[#494d5e] ${
                        page === 0 ? "text-white" : "text-[#7E7E7E]"
                      } font-bold w-7 h-7 rounded-2xl text-xs`}
                      onClick={() => handleClickPage(0)}
                    >
                      {1}
                    </button>
                    {totalPages > 1 && (
                      <button
                        className={`bg-[#333541] hover:bg-[#494d5e] ${
                          page === 1 ? "text-white" : "text-[#7E7E7E]"
                        } font-bold w-7 h-7 rounded-2xl text-xs`}
                        onClick={() => handleClickPage(1)}
                      >
                        {2}
                      </button>
                    )}
                    {totalPages > 2 && (
                      <button
                        className={`bg-[#333541] hover:bg-[#494d5e] text-[#7E7E7E] font-bold w-7 h-7 rounded-2xl text-xs`}
                        onClick={() => handleClickPage(2)}
                      >
                        {3}
                      </button>
                    )}
                    {totalPages > 3 && (
                      <button
                        className={`bg-[#333541] hover:bg-[#494d5e] text-[#7E7E7E] font-bold w-7 h-7 rounded-2xl text-xs`}
                        onClick={() => handleClickPage(3)}
                      >
                        {4}
                      </button>
                    )}
                  </>
                )}
                {page - 1 > 0 && (
                  <>
                    <button
                      className={`bg-[#333541] hover:bg-[#494d5e] text-[#7E7E7E] font-bold w-7 h-7 rounded-2xl text-xs`}
                      onClick={() => handleClickPage(page - 2)}
                    >
                      {page - 1}
                    </button>
                    <button
                      className={`bg-[#333541] hover:bg-[#494d5e] text-[#7E7E7E] font-bold w-7 h-7 rounded-2xl text-xs`}
                      onClick={() => handleClickPage(page - 1)}
                    >
                      {page}
                    </button>
                    {page < totalPages && (
                      <button
                        className={`bg-[#333541] hover:bg-[#494d5e] text-white font-bold w-7 h-7 rounded-2xl text-xs`}
                        onClick={() => handleClickPage(page)}
                      >
                        {page + 1}
                      </button>
                    )}
                    {page + 1 < totalPages && (
                      <button
                        className={`bg-[#333541] hover:bg-[#494d5e] text-[#7E7E7E] font-bold w-7 h-7 rounded-2xl text-xs`}
                        onClick={() => handleClickPage(page + 1)}
                      >
                        {page + 2}
                      </button>
                    )}
                    {page + 2 < totalPages && (
                      <button
                        className={`bg-[#333541] hover:bg-[#494d5e] text-[#7E7E7E] font-bold w-7 h-7 rounded-2xl text-xs`}
                        onClick={() => handleClickPage(page + 2)}
                      >
                        {page + 3}
                      </button>
                    )}
                  </>
                )}
                {page + 3 < totalPages && (
                  <button
                    className={`bg-[#333541] hover:bg-[#494d5e] text-[#7E7E7E+] font-bold w-7 h-7 rounded-2xl text-xs`}
                  >
                    ...
                  </button>
                )}
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
  itemtheme: boolean;
  odd: number;
  setSelected: Function;
}

const HistoryTab: FC<HistoryTabProps> = ({
  transaction,
  last,
  odd,
  setSelected,
  itemtheme,
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

  return itemtheme ? (
    <div
      className={`w-full h-[50px] flex items-center flex-nowrap ${
        odd ? "bg-[#1E1E1E]" : "bg-[#191919]"
      } ${
        last ? "rounded-b" : ""
      } py-1 px-4 hover:cursor-pointer hover:bg-[#3E3E3E] text-xs`}
      onClick={handleSelect}
    >
      <div className="w-[150px] text-white flex items-center">
        <div className="w-6 mr-1 flex justify-center">
          {getTransactionIcon(transaction.type)}
        </div>
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
  ) : (
    <div className="w-full md:w-[50%] lg:w-[33.3%] xl:w-[20%] p-2">
      <div
        onClick={handleSelect}
        className="hover:cursor-pointer w-full bg-[#1E1E1E] p-3 rounded text-xs dropBlack"
      >
        <div className="flex justify-between mb-2">
          <div className="text-white flex items-center text-[12px] font-bold">
            <div>{getTransactionIcon(transaction.type)}</div>
            <span>
              {transaction.type.substring(0, 1).toUpperCase() +
                transaction.type.substring(1)}
            </span>
          </div>
          <div className="flex-none text-[#717171] pt-1 text-[10px] font-bold">
            #{transaction.game_id}
          </div>
        </div>
        <div className="bg-[#0303034C] rounded py-4 px-3 flex flex-col dropBlack">
          <div className="flex justify-between">
            <span className="text-[#5D5D5D] my-1 text-[12px] font-bold">
              Profit:
            </span>
            <div className="flex items-center">
              <IconCoin width={18} height={18} color="#E9AE15" />
              <p
                className={`${
                  transaction.amount > 0 ? "text-[#B9FD3F]" : "text-[#FF3148]"
                } ml-1 font-bold text-[16px]`}
              >
                {transaction.amount > 0 && "+"}
                {transaction.amount}
              </p>
            </div>
          </div>
          <div className="text-[#5D5D5D] my-1 text-[12px] font-medium">
            {getDateFormat()}
          </div>
        </div>
      </div>
    </div>
  );
};
