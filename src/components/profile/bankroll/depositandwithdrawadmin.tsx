import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import IconLoading from "@/utils/icons/Loading";
import UpDownArrow from "@/utils/icons/UpDownArrow";
import { FaChevronDown } from "react-icons/fa";
import { FilterDropItem, getTransactionIcon } from "../transactions/history";
import moment from "moment";
import IconCoin from "@/utils/icons/Coin";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { User } from "./bankroll";
import { fixed2 } from "../details/ProfitLoss";
import Button from "@/components/buttons/Button";

interface Transaction {
  id: number;
  type: string;
  amount: number;
  updated_at: string;
  roll: string;
  txid: string;
  address: string;
  currency: string;
  user_id: number;
  user: any;
}

const transactionTypes = ["deposit", "withdraw"];

export default function AdminTransactionHistory() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [filteredtransactions, setFilteredTransactions] = useState<
    Transaction[] | null
  >(null);
  const [page, setPage] = useState(0);
  const [filterType, setFilterType] = useState<string>("All");
  const [sortBy, setSortBy] = useState<number>(0);
  const [sortByDirection, setSortByDirection] = useState<number>(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);

  const totalPages = useMemo(
    () =>
      filteredtransactions ? Math.ceil(filteredtransactions.length / 12) : 0,
    [filteredtransactions]
  );

  const { data } = useFetch(`/api/admin/users/bankroll/${id}`, {
    method: "GET",
  });

  useEffect(() => {
    if (data && data.deposit && data.withdraw) {
      const updatedData = [
        ...data.deposit.map((item: any) => ({
          roll: "deposit",
          updated_at: item.updated_at,
          amount: Number(item.amount),
          txid: item.txid,
          user_id: item.user_id,
          type: item.type,
          user: item.user,
          address:
            item.type === "crypto" && item.note
              ? JSON.parse(item.note).pay_address
              : "",
          currency:
            item.type === "crypto" && item.note
              ? JSON.parse(item.note).pay_currency
              : "",
        })),
        ...data.withdraw.map((item: any) => ({
          roll: "withdraw",
          updated_at: item.updated_at,
          amount: Number(item.amount),
          txid: item.txid,
          user_id: item.user_id,
          type: item.type,
          user: item.user,
          address: item.address,
          currency: item.currency,
        })),
      ].sort((a: any, b: any) => {
        if (a.updated_at > b.updated_at) return -1;
        if (a.updated_at < b.updated_at) return 1;
        return 0;
      });
      let deposit = 0;
      let withdraw = 0;
      updatedData.forEach((item: any) => {
        if (item.roll === "deposit") deposit += item.amount;
        else withdraw += item.amount;
      });
      setTotalDeposit(deposit);
      setTotalWithdraw(withdraw);
      setTransactions(updatedData);
      setFilteredTransactions(updatedData);
    }
    if (data && data.user) setSelectedUser(data.user);
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
          transactions.filter((item) => item.roll === id)
        );
      }
    },
    [transactions]
  );

  const handleSortByCreatedat = useCallback(() => {
    const newSortByDirection = -1 * sortByDirection;
    if (filteredtransactions) {
      setFilteredTransactions(
        filteredtransactions.sort((a: Transaction, b: Transaction) => {
          let x1, x2;
          x1 = a.updated_at;
          x2 = b.updated_at;
          if (x1 > x2) return -1 * newSortByDirection;
          if (x1 < x2) return 1 * newSortByDirection;
          return 0;
        })
      );
    }
    setSortBy(3);
    setSortByDirection(newSortByDirection);
  }, [filteredtransactions, sortByDirection, sortBy]);

  const handleClickBack = useCallback(() => {
    router.push("/profile/admin/bankroll");
  }, [router]);

  return (
    <div className="w-full flex flex-col">
      <div className="space-y-[1px] w-full">
        <div className="flex justify-between">
          <div>
            {selectedUser && (
              <div className="flex">
                <div className="mr-4">
                  <Image
                    src={selectedUser.avatar}
                    width={80}
                    height={80}
                    className="rounded-[40px] border-2 border-[#5D5D5D]"
                    alt="icon"
                  />
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col">
                    <span className="text-[#CCC] font-semibold">
                      {selectedUser.name}
                    </span>
                    <span className="text-[#5D5D5D] text-sm font-semibold">
                      Deposit: {fixed2(totalDeposit)}
                    </span>
                    <span className="text-[#5D5D5D] text-sm font-semibold">
                      Withdraw: {fixed2(totalWithdraw)}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <Button
              text="Back"
              className="!w-[100px] mb-2"
              clicked={handleClickBack}
            />
          </div>
        </div>
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
          </div>
        </div>
        <div className={`flex flex-col`}>
          <div
            className={`text-[12px] font-semibold w-full h-10 flex items-center flex-nowrap text-[#727272] bg-[#282828] bg-opacity-[58%] rounded-t py-1 px-4 hover:cursor-pointer hover:bg-[#3E3E3E]`}
          >
            <div className="w-6 flex justify-center">No.</div>
            <div className="w-[15%] max-w-[300px] flex justify-center">Type</div>
            <div className="w-[10%] max-w-[200px] flex justify-center">Amount</div>
            <div className="w-[10%] max-w-[200px] flex justify-center">Currency</div>
            <div className="w-[10%] max-w-[200px] flex justify-center">Network</div>
            <div className="w-[35%] max-w-[400px] flex justify-center">Address</div>
            <div
              className="flex items-center gap-1"
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
                      odd={index % 2}
                      index={index}
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
    </div>
  );
}

interface HistoryTabProps {
  transaction: Transaction;
  odd: number;
  index: number;
}

const HistoryTab: FC<HistoryTabProps> = ({ transaction, odd, index }) => {
  const getDateFormat = useCallback(() => {
    const currentYear = new Date().getFullYear();
    const year = moment(transaction.updated_at).year();
    if (currentYear === Number(year)) {
      return moment(transaction.updated_at).format("ddd DD MMM hh:mm A");
    }
    return moment(transaction.updated_at).format("ddd DD MMM, YYYY hh:mm A");
  }, [transaction]);

  const handleSelect = useCallback(() => {}, []);

  return (
    <div
      className={`text-[12px] w-full h-[50px] flex items-center flex-nowrap ${
        odd ? "bg-[#1E1E1E]" : "bg-[#191919]"
      } py-1 px-4 hover:bg-[#3E3E3E] text-xs`}
      onClick={handleSelect}
    >
      <div className="w-6 text-[#5D5D5D] flex justify-center">{index + 1}</div>
      <div className="text-[#D1D1D1] flex items-center w-[15%] max-w-[200px] justify-center">
        <div className="w-6 mr-1 flex justify-center">
          {getTransactionIcon(transaction.type)}
        </div>
        <span className="font-bold capitalize">{transaction.roll}</span>
      </div>
      <div className="flex flex-row items-center gap-1 w-[10%] max-w-[200px] justify-center">
        <IconCoin width={14} height={14} color="#E9AE15" />
        <p
          className={`${
            transaction.amount > 0 ? "text-[#B9FD3F]" : "text-[#FF3148]"
          } font-medium]`}
        >
          {fixed2(transaction.amount)}
        </p>
      </div>
      <div className="flex-none text-[#5D5D5D] font-semibold w-[10%] max-w-[200px] capitalize justify-center">
        {transaction.type}
      </div>
      <div className="flex-none text-[#5D5D5D] font-semibold w-[10%] max-w-[200px] capitalize justify-center">
        {transaction.currency}
      </div>
      <div className="flex-none text-[#5D5D5D] font-semibold w-[35%] max-w-[400px] justify-center">
        {transaction.address}
      </div>
      <div className="text-[#5D5D5D] font-semibold justify-center">{getDateFormat()}</div>
    </div>
  );
};
