import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import TransactionModal from "./transactionModal";
import IconLoading from "@/utils/icons/Loading";
import SearchIcon from "@/utils/icons/SearchIcon";
import UpDownArrow from "@/utils/icons/UpDownArrow";
import { FaChevronDown } from "react-icons/fa";
import {
  FilterDropItem,
  getTransactionIcon,
  HistoryTabProps,
  sortByItems,
  Transaction,
  transactionTypes,
} from "./history";
import moment from "moment";
import IconCoin from "@/utils/icons/Coin";

export default function AdminTransactionHistory() {
  const params = useParams();
  const { id } = params;

  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [filteredtransactions, setFilteredTransactions] = useState<
    Transaction[] | null
  >(null);
  const [selected, setSelected] = useState<number | null>(null);
  const [page, setPage] = useState(0);
  const [filterType, setFilterType] = useState<string>("All");
  const [sortBy, setSortBy] = useState<number>(0);
  const [sortByDirection, setSortByDirection] = useState<number>(1);

  const totalPages = useMemo(
    () =>
      filteredtransactions ? Math.ceil(filteredtransactions.length / 12) : 0,
    [filteredtransactions]
  );

  const { data } = useFetch(`/api/admin/users/${id}/transactions`, {
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

  const handleClickTypeFilter = useCallback(
    (id: string) => {
      setFilterType(id);
      setSortByDirection(1);
      if (transactions) {
        if (id === "All") {
          setFilteredTransactions(transactions);
          return;
        }
        setFilteredTransactions(
          transactions.filter((item) => item.type === id)
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
            <span className="ml-4 mr-1 text-[#727272]">Type:</span>
            <div className="hs-dropdown relative inline-flex !z-30 h-8 bg-transparent rounded-sm">
              <button
                id="hs-dropdown-type"
                type="button"
                className="py-[6px] px-2 text-[#707070] flex items-center gap-2 text-sm"
              >
                <span className="text-white capitalize">{filterType}</span>
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
          <div className="mb-2 relative">
            <input
              className="border-2 border-[#cdcdcd2c] rounded w-[270px] h-[30px] pl-10 bg-transparent text-[#727272] text-sm"
              placeholder="Search..."
            ></input>
            <span className="absolute left-0 top-0 w-10 h-[30px] flex justify-center items-center">
              <SearchIcon />
            </span>
          </div>
        </div>
        <div className={`flex flex-col`}>
          <div
            className={`text-[12px] font-semibold w-full h-10 flex items-center flex-nowrap text-[#727272] bg-[#282828] bg-opacity-[58%] rounded-t py-1 px-4 hover:cursor-pointer hover:bg-[#3E3E3E]`}
          >
            <div className="w-[20%] max-w-[300px] flex-none flex justify-center">
              Game
            </div>
            <div className="w-[15%] max-w-[200px] flex-none flex justify-center">
              Number
            </div>
            <div className="w-[15%] max-w-[200px] flex-none flex justify-center">
              Before
            </div>
            <div
              className="flex items-center gap-1 w-[15%] max-w-[200px] flex justify-center"
              onClick={handleSortByProfit}
            >
              Profits
              <UpDownArrow />
            </div>
            <div className="w-[15%] max-w-[200px] flex-none flex justify-center">
              After
            </div>
            <div
              className="flex items-center gap-1 flex justify-center"
              onClick={handleSortByCreatedat}
            >
              Time
              <UpDownArrow />
            </div>
          </div>
          {filteredtransactions ? (
            filteredtransactions.length ? (
              <>
                {filteredtransactions
                  .filter(
                    (_: any, index: any) =>
                      index >= page * 12 && index < (page + 1) * 12
                  )
                  .map((item, index) => (
                    <HistoryTab
                      key={index}
                      transaction={item}
                      last={index === filteredtransactions.length - 1}
                      odd={index % 2}
                      setSelected={setSelected}
                      itemtheme={true}
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
      className={`text-[12px] w-full h-[50px] flex items-center flex-nowrap ${
        odd ? "bg-[#1E1E1E]" : "bg-[#191919]"
      } ${
        last ? "rounded-b" : ""
      } py-1 px-4 hover:cursor-pointer hover:bg-[#3E3E3E] text-xs`}
      onClick={handleSelect}
    >
      <div className="w-[20%] max-w-[320px] text-[#D1D1D1] flex items-center justify-center">
        <div className="w-6 mr-1 flex justify-center">
          {getTransactionIcon(transaction.type)}
        </div>
        <span className="font-bold capitalize">{transaction.type}</span>
      </div>
      <div className="w-[15%] max-w-[300px] flex-none text-white flex justify-center">
        #{transaction.game_id}
      </div>
      <div className="w-[15%] max-w-[200px] flex-none text-[#5D5D5D] flex justify-center">
        {transaction.before}
      </div>
      <div className="flex flex-row items-center gap-1 w-[15%] max-w-[300px] justify-center">
        <IconCoin width={14} height={14} color="#E9AE15" />
        <p
          className={`${
            transaction.amount > 0 ? "text-[#B9FD3F]" : "text-[#FF3148]"
          } font-medium]`}
        >
          {transaction.amount}
        </p>
      </div>
      <div className="w-[15%] max-w-[200px] flex-none text-[#5D5D5D] flex justify-center">
        {transaction.after}
      </div>
      <div className="text-[#5D5D5D] font-semibold flex justify-center">
        {getDateFormat()}
      </div>
    </div>
  );
};
