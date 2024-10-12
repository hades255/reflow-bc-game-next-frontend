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
import UpDownArrow from "@/utils/icons/UpDownArrow";
import IconMystery from "@/utils/icons/Mystery";
import { FaChevronDown } from "react-icons/fa";
import { fixed2 } from "../details/ProfitLoss";

export const getTransactionIcon = (type: string) => {
  switch (type) {
    case "roulette":
      return <IconRoulette height={16} width={18} color={"#E9AE15"} />;
    case "royalflip":
      return <RoyalflipCoin height={22} width={24} color={"#E9AE15"} />;
    case "upgrader":
      return <UpgradeGame height={20} width={22} color={"#E9AE15"} />;
    case "mystery bonus":
      return <IconMystery height={12} width={22} color={"#E9AE15"} />;
    default:
      return <GoldCoin height={16} width={18} color={"#E9AE15"} />;
  }
};

export const transactionTypes = [
  "king's roll",
  "royal flip",
  "crown & king",
  "mystery bonus",
  "bonus code",
  "crypto_withdraw",
];

export const sortByItems = ["type", "number", "profits", "time"];

export interface Transaction {
  id: number;
  type: string;
  game_id: number;
  amount: number;
  status: string;
  created_at: string;
  updated_at: string;
  before: number;
  after: number;
}

export default function History() {
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [filteredtransactions, setFilteredTransactions] = useState<
    Transaction[] | null
  >(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [itemtheme, setItemTheme] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<string>("All");
  const [sortBy, setSortBy] = useState<number>(0);
  const [sortByDirection, setSortByDirection] = useState<number>(1);

  const totalPages = useMemo(
    () =>
      filteredtransactions
        ? Math.ceil(filteredtransactions.length / (itemtheme ? 12 : 15))
        : 0,
    [filteredtransactions, itemtheme]
  );

  const { data } = useFetch("/api/profile/transactions", {
    method: "GET",
  });

  useEffect(() => {
    if (data && data.transactions) {
      setTransactions(data.transactions);
      setFilteredTransactions(data.transactions);
    }
  }, [data]);

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

  const handleClickTypeFilter = useCallback(
    (id: string) => {
      setFilterType(id);
      setSortByDirection(1);
      if (transactions) {
        if (id === "All") {
          setFilteredTransactions(transactions);
          return;
        }
        let type = id;
        if (id === "king's roll") type = "roulette";
        if (id === "royal flip") type = "royalflip";
        if (id === "crown & king") type = "upgrader";
        setFilteredTransactions(
          transactions.filter((item) => item.type === type)
        );
      }
    },
    [transactions]
  );

  const handleClickSortBy = useCallback(
    (id: string) => {
      const index = sortByItems.indexOf(id);
      if (filteredtransactions) {
        setFilteredTransactions(
          filteredtransactions.sort((a: Transaction, b: Transaction) => {
            let x1, x2;
            switch (index) {
              case 0:
                x2 = a.type;
                x1 = b.type;
                break;
              case 1:
                x1 = Number(a.game_id);
                x2 = Number(b.game_id);
                break;
              case 2:
                x1 = Number(a.amount);
                x2 = Number(b.amount);
                break;
              case 3:
                x1 = a.created_at;
                x2 = b.created_at;
                break;
              default:
                return 0;
            }
            if (x1 > x2) return -1 * sortByDirection;
            if (x1 < x2) return 1 * sortByDirection;
            return 0;
          })
        );
      }
      setSortBy(index);
      setSortByDirection(1);
    },
    [filteredtransactions, sortByDirection]
  );

  const handleSortByProfit = useCallback(() => {
    const newSortByDirection = -1 * sortByDirection;
    if (filteredtransactions) {
      setFilteredTransactions(
        filteredtransactions.sort((a: Transaction, b: Transaction) => {
          let x1, x2;
          x1 = Number(a.amount);
          x2 = Number(b.amount);
          if (x1 > x2) return -1 * newSortByDirection;
          if (x1 < x2) return 1 * newSortByDirection;
          return 0;
        })
      );
    }
    setSortBy(2);
    setSortByDirection(newSortByDirection);
  }, [filteredtransactions, sortByDirection]);

  const handleSortByCreatedat = useCallback(() => {
    const newSortByDirection = -1 * sortByDirection;
    if (filteredtransactions) {
      setFilteredTransactions(
        filteredtransactions.sort((a: Transaction, b: Transaction) => {
          let x1, x2;
          x1 = a.created_at;
          x2 = b.created_at;
          if (x1 > x2) return -1 * newSortByDirection;
          if (x1 < x2) return 1 * newSortByDirection;
          return 0;
        })
      );
    }
    setSortBy(3);
    setSortByDirection(newSortByDirection);
  }, [filteredtransactions, sortByDirection]);

  return (
    <div className="w-full flex flex-col">
      <div className="space-y-[1px] w-full">
        <div className="w-full flex justify-between flex-wrap">
          <div className="text-sm flex items-center mb-2">
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
            <div className="hs-dropdown relative inline-flex !z-30 h-8 bg-transparent rounded-sm">
              <button
                id="hs-dropdown-type"
                type="button"
                className="py-[6px] px-2 text-[#707070] flex items-center gap-2 text-sm"
              >
                <span className="text-white capitalize">
                  {filterType.replace("_", " ")}
                </span>
                <FaChevronDown className="s-dropdown-open:rotate-180" />
              </button>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-32 bg-main shadow-md rounded-md p-2 mt-2 !z-30"
                aria-labelledby="hs-dropdown-type"
              >
                <FilterDropItem title="All" onClick={handleClickTypeFilter} />
                {transactionTypes.map((item) => (
                  <FilterDropItem
                    key={item}
                    title={item}
                    onClick={handleClickTypeFilter}
                  />
                ))}
              </div>
            </div>
            <span className="ml-4 mr-1 text-[#727272]">Sort By:</span>
            <div className="hs-dropdown relative inline-flex !z-30 h-8 bg-transparent rounded-sm">
              <button
                id="hs-dropdown-sort-by"
                type="button"
                className="py-[6px] px-2 text-[#707070] flex items-center gap-2 text-sm"
              >
                <span className="text-white capitalize">
                  {sortByItems[sortBy]}
                </span>
                <FaChevronDown className="s-dropdown-open:rotate-180" />
              </button>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-32 bg-main shadow-md rounded-md p-2 mt-2 !z-30"
                aria-labelledby="hs-dropdown-sort-by"
              >
                {sortByItems.map((item) => (
                  <FilterDropItem
                    key={item}
                    title={item}
                    onClick={handleClickSortBy}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className={`flex ${itemtheme ? "flex-col" : "flex-wrap"}`}>
          {itemtheme && (
            <div
              className={`text-[12px] font-semibold w-full h-10 flex items-center flex-nowrap text-[#727272] bg-[#282828] bg-opacity-[58%] rounded-t py-1 px-4 hover:cursor-pointer hover:bg-[#3E3E3E]`}
            >
              <div className="w-[35%] max-w-[320px] flex-none flex">Game</div>
              <div className="w-[22%] max-w-[300px] flex-none">Number</div>
              <div
                className="flex items-center gap-1 w-[22%] max-w-[300px]"
                onClick={handleSortByProfit}
              >
                Profits
                <UpDownArrow />
              </div>
              <div
                className="flex items-center gap-1"
                onClick={handleSortByCreatedat}
              >
                Time
                <UpDownArrow />
              </div>
            </div>
          )}
          {filteredtransactions ? (
            filteredtransactions.length ? (
              <>
                {filteredtransactions
                  .filter(
                    (_: any, index: any) =>
                      index >= page * (itemtheme ? 12 : 15) &&
                      index < (page + 1) * (itemtheme ? 12 : 15)
                  )
                  .map((item, index) => (
                    <HistoryTab
                      key={index}
                      transaction={item}
                      last={index === filteredtransactions.length - 1}
                      odd={index % 2}
                      setSelected={setSelected}
                      itemtheme={itemtheme}
                    />
                  ))}
                {totalPages > 1 && (
                  <div className="pt-4 flex justify-end space-x-1">
                    {page > 2 && (
                      <button
                        className={`bg-[#282828] hover:bg-[#494d5e] text-[#7E7E7E+] font-bold w-7 h-7 rounded-2xl text-xs`}
                      >
                        ...
                      </button>
                    )}
                    {page < 2 && (
                      <>
                        <button
                          className={`bg-[#282828] hover:bg-[#494d5e] ${
                            page === 0 ? "text-white" : "text-[#7E7E7E]"
                          } font-bold w-7 h-7 rounded-2xl text-xs`}
                          onClick={() => handleClickPage(0)}
                        >
                          {1}
                        </button>
                        {totalPages > 1 && (
                          <button
                            className={`bg-[#282828] hover:bg-[#494d5e] ${
                              page === 1 ? "text-white" : "text-[#7E7E7E]"
                            } font-bold w-7 h-7 rounded-2xl text-xs`}
                            onClick={() => handleClickPage(1)}
                          >
                            {2}
                          </button>
                        )}
                        {totalPages > 2 && (
                          <button
                            className={`bg-[#282828] hover:bg-[#494d5e] text-[#7E7E7E] font-bold w-7 h-7 rounded-2xl text-xs`}
                            onClick={() => handleClickPage(2)}
                          >
                            {3}
                          </button>
                        )}
                        {totalPages > 3 && (
                          <button
                            className={`bg-[#282828] hover:bg-[#494d5e] text-[#7E7E7E] font-bold w-7 h-7 rounded-2xl text-xs`}
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
                          className={`bg-[#282828] hover:bg-[#494d5e] text-[#7E7E7E] font-bold w-7 h-7 rounded-2xl text-xs`}
                          onClick={() => handleClickPage(page - 2)}
                        >
                          {page - 1}
                        </button>
                        <button
                          className={`bg-[#282828] hover:bg-[#494d5e] text-[#7E7E7E] font-bold w-7 h-7 rounded-2xl text-xs`}
                          onClick={() => handleClickPage(page - 1)}
                        >
                          {page}
                        </button>
                        {page < totalPages && (
                          <button
                            className={`bg-[#282828] hover:bg-[#494d5e] text-white font-bold w-7 h-7 rounded-2xl text-xs`}
                            onClick={() => handleClickPage(page)}
                          >
                            {page + 1}
                          </button>
                        )}
                        {page + 1 < totalPages && (
                          <button
                            className={`bg-[#282828] hover:bg-[#494d5e] text-[#7E7E7E] font-bold w-7 h-7 rounded-2xl text-xs`}
                            onClick={() => handleClickPage(page + 1)}
                          >
                            {page + 2}
                          </button>
                        )}
                        {page + 2 < totalPages && (
                          <button
                            className={`bg-[#282828] hover:bg-[#494d5e] text-[#7E7E7E] font-bold w-7 h-7 rounded-2xl text-xs`}
                            onClick={() => handleClickPage(page + 2)}
                          >
                            {page + 3}
                          </button>
                        )}
                      </>
                    )}
                    {page + 3 < totalPages && (
                      <button
                        className={`bg-[#282828] hover:bg-[#494d5e] text-[#7E7E7E+] font-bold w-7 h-7 rounded-2xl text-xs`}
                      >
                        ...
                      </button>
                    )}
                  </div>
                )}
              </>
            ) : (
              <p className="text-[#a8871a] flex justify-center">
                No Transactions
              </p>
            )
          ) : (
            <div className="flex justify-center">
              <IconLoading width={12} height={12} color="#E9AE15" />
            </div>
          )}
        </div>
      </div>
      {selected !== null && (
        <TransactionModal selected={selected} setSelected={setSelected} />
      )}
    </div>
  );
}

export interface HistoryTabProps {
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

  const transactionType = useMemo(() => {
    let type = transaction.type;
    if (transaction.type === "roulette") type = "king's roll";
    if (transaction.type === "royalflip") type = "royal Flip";
    if (transaction.type === "upgrader") type = "crown & King";
    return type;
  }, [transaction]);

  return itemtheme ? (
    <div
      className={`text-[12px] w-full h-[50px] flex items-center flex-nowrap ${
        odd ? "bg-[#1E1E1E]" : "bg-[#191919]"
      } ${
        last ? "rounded-b" : ""
      } py-1 px-4 hover:cursor-pointer hover:bg-[#3E3E3E] text-xs`}
      onClick={handleSelect}
    >
      <div className="w-[35%] max-w-[320px] text-[#D1D1D1] flex items-center">
        <div className="w-6 mr-1 flex justify-center">
          {getTransactionIcon(transaction.type)}
        </div>
        <span className="font-bold capitalize">{transactionType}</span>
      </div>
      <div className="w-[22%] max-w-[300px] flex-none text-white">
        #{transaction.game_id}
      </div>
      <div className="flex flex-row items-center gap-1 w-[22%] max-w-[300px]">
        <IconCoin width={14} height={14} color="#E9AE15" />
        <p
          className={`${
            transaction.amount > 0 ? "text-[#B9FD3F]" : "text-[#FF3148]"
          } font-medium]`}
        >
          {fixed2(transaction.amount)}
        </p>
      </div>
      <div className="text-[#5D5D5D] font-semibold">{getDateFormat()}</div>
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
            <span className="font-bold capitalize">{transactionType}</span>
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
                {fixed2(transaction.amount)}
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

export const FilterDropItem: FC<{
  onClick: Function;
  title: string;
}> = ({ title, onClick }) => {
  const handleClick = useCallback(() => onClick(title), [title, onClick]);

  return (
    <button
      className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010] capitalize"
      onClick={handleClick}
    >
      {title.replace("_", " ")}
    </button>
  );
};
