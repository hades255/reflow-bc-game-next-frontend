import { FC, useCallback, useEffect, useMemo, useState } from "react";
import IconLoading from "@/utils/icons/Loading";
import IconCoin from "@/utils/icons/Coin";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { fixed2 } from "../details/ProfitLoss";
import SearchIcon from "@/utils/icons/SearchIcon";
import IconTransactions from "@/utils/icons/Transactions";
import LabelItem from "../details/LabelItem";
import { fetchAPI } from "@/services/fetchAPI";
import moment from "moment";

export interface User {
  id: number;
  name: string;
  avatar: string;
  player_level: number;
}

interface Transaction {
  user_id: number;
  total_amount: number;
  total_count: number;
  user: User;
}

interface TransformedTransaction {
  user_id: number;
  user: User;
  deposit: {
    total_amount: number;
    total_count: number;
  };
  withdraw: {
    total_amount: number;
    total_count: number;
  };
}

interface TransactionData {
  deposit: Transaction[];
  withdraw: Transaction[];
}

const selectItems = ["All", "This Week", "This Month", "This Year"];

export default function BankRoll() {
  const [transactions, setTransactions] = useState<
    TransformedTransaction[] | null
  >(null);
  const [filteredtransactions, setFilteredTransactions] = useState<
    TransformedTransaction[] | null
  >(null);
  const [page, setPage] = useState(0);
  const [totalDeposit, setTotalDeposit] = useState(0);
  const [totalWithdraw, setTotalWithdraw] = useState(0);
  const [selectItem, setSelectItem] = useState(0);
  const [startDate, setStartDate] = useState("");

  const totalPages = useMemo(
    () =>
      filteredtransactions ? Math.ceil(filteredtransactions.length / 12) : 0,
    [filteredtransactions]
  );

  const transformData = useCallback(
    (
      data: TransactionData
    ): {
      result: TransformedTransaction[];
      totaldeposit: number;
      totalwithdraw: number;
    } => {
      const result: TransformedTransaction[] = [];

      const userMap: { [key: number]: TransformedTransaction } = {};

      // Process deposits
      data.deposit.forEach((deposit) => {
        if (!userMap[deposit.user_id]) {
          userMap[deposit.user_id] = {
            user_id: deposit.user_id,
            user: deposit.user,
            deposit: {
              total_amount: Number(deposit.total_amount),
              total_count: deposit.total_count,
            },
            withdraw: {
              total_amount: 0,
              total_count: 0,
            },
          };
        } else {
          userMap[deposit.user_id].deposit = {
            total_amount: Number(deposit.total_amount),
            total_count: deposit.total_count,
          };
        }
      });

      // Process withdraws
      data.withdraw.forEach((withdraw) => {
        if (!userMap[withdraw.user_id]) {
          userMap[withdraw.user_id] = {
            user_id: withdraw.user_id,
            user: withdraw.user,
            deposit: {
              total_amount: 0,
              total_count: 0,
            },
            withdraw: {
              total_amount: Number(withdraw.total_amount),
              total_count: withdraw.total_count,
            },
          };
        } else {
          userMap[withdraw.user_id].withdraw = {
            total_amount: Number(withdraw.total_amount),
            total_count: withdraw.total_count,
          };
        }
      });

      // Convert userMap to result array
      let totaldeposit = 0;
      let totalwithdraw = 0;
      for (const userId in userMap) {
        totaldeposit += userMap[userId].deposit.total_amount;
        totalwithdraw += userMap[userId].withdraw.total_amount;
        result.push(userMap[userId]);
      }

      return { result, totaldeposit, totalwithdraw };
    },
    []
  );

  useEffect(() => {
    (async () => {
      const { data } = await fetchAPI(
        "/api/admin/users/bankroll?selected=" + selectItem,
        "GET"
      );
      if (data && data.deposit && data.withdraw) {
        const updatedData = transformData(data);
        setTransactions(updatedData.result);
        setFilteredTransactions(updatedData.result);
        setTotalDeposit(updatedData.totaldeposit);
        setTotalWithdraw(updatedData.totalwithdraw);
        setStartDate(data.startDate);
      }
    })();
  }, [selectItem, transformData]);

  const handleClickPage = useCallback((value: any) => {
    setPage(value);
  }, []);

  const handleSearchInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (transactions) {
        if (event.target.value) {
          setFilteredTransactions(
            transactions.filter((item: TransformedTransaction) => {
              if (
                item.user.name
                  .toLowerCase()
                  .indexOf(event.target.value.toLowerCase()) >= 0
              )
                return true;
              return false;
            })
          );
        } else {
          setFilteredTransactions(transactions);
        }
      }
    },
    [transactions]
  );

  const handleClickLabelItem = useCallback((index: number) => {
    setSelectItem(index);
    setTransactions(null);
    setFilteredTransactions(null);
    setTotalDeposit(0);
    setTotalWithdraw(0);
    setStartDate("");
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="space-y-[1px] w-full">
        <div className="flex justify-between">
          <div className="py-2 flex items-baseline">
            <span className="text-white mr-4 font-bold text-[18px]">
              Bankroll
            </span>
            <div className="flex flex-row gap-1">
              {selectItems.map((item, index) => (
                <LabelItem
                  key={index}
                  text={item}
                  onClick={() => handleClickLabelItem(index)}
                  active={selectItem === index}
                />
              ))}
            </div>
            {selectItem > 0 && startDate && (
              <div className="ml-4 font-semibold">
                <span className="text-[#8D8D8D] text-[10px] mr-1">From</span>
                <span className="text-[#DDDDDD] text-xs mr-1">
                  {moment(startDate).format("MMM D, YYYY")}
                </span>
                <span className="text-[#8D8D8D] text-[10px] mr-1">To</span>
                <span className="text-[#DDDDDD] text-xs mr-1">Today</span>
              </div>
            )}
          </div>
          <div className="mb-2 relative">
            <input
              className="border-2 border-[#cdcdcd2c] rounded w-[270px] h-[30px] pl-10 bg-transparent text-[#727272] text-sm"
              placeholder="Search name..."
              onChange={handleSearchInputChange}
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
            <div className="w-8 flex justify-center">No</div>
            <div className="w-[30%] pl-2">User</div>
            <div className="w-[18%] pl-3">Deposit</div>
            <div className="w-[18%] pl-3">Withdraw</div>
            <div className="w-[18%] pl-3">Bankroll</div>
            <div className="">Transactions</div>
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
                      index={index}
                      transaction={item}
                      odd={index % 2}
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
          <div
            className={`text-[12px] font-semibold w-full h-10 flex items-center flex-nowrap text-[#727272] bg-[#282828] bg-opacity-[58%] rounded-b py-1 px-4 hover:cursor-pointer hover:bg-[#3E3E3E] border-t border-t-[#5D5D5D]`}
          >
            <div className="w-8 px-2"></div>
            <div className="w-[30%] flex justify-end pr-2">Total</div>
            <div className="w-[18%]">
              <div className="ml-3 flex items-center">
                <IconCoin width={14} height={14} color="#E9AE15" />
                <span className="ml-[6px]">{fixed2(totalDeposit)}</span>
              </div>
            </div>
            <div className="w-[18%]">
              <div className="ml-3 flex items-center">
                <IconCoin width={14} height={14} color="#E9AE15" />
                <span className="ml-[6px]">{fixed2(totalWithdraw)}</span>
              </div>
            </div>
            <div className="w-[18%]">
              <div className="ml-3 flex items-center">
                <IconCoin width={14} height={14} color="#E9AE15" />
                <span
                  className={`ml-[6px] ${
                    totalDeposit - totalWithdraw > 0
                      ? "text-[#B9FD3F]"
                      : "text-[#FF3148]"
                  }`}
                >
                  {fixed2(totalDeposit - totalWithdraw)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface HistoryTabProps {
  transaction: TransformedTransaction;
  odd: number;
  index: number;
}

const HistoryTab: FC<HistoryTabProps> = ({ transaction, odd, index }) => {
  const router = useRouter();

  const handleViewBankroll = useCallback(() => {
    router.push(`/profile/admin/bankroll/${transaction.user_id}`);
  }, [transaction, router]);

  const handleViewTransaction = useCallback(() => {
    router.push(`/profile/admin/transaction/${transaction.user_id}`);
  }, [transaction, router]);

  return (
    <div
      className={`text-[12px] w-full h-[50px] flex items-center flex-nowrap cursor-pointer ${
        odd ? "bg-[#1E1E1E]" : "bg-[#191919]"
      } py-1 px-4 hover:bg-[#3E3E3E] text-xs`}
      onClick={handleViewBankroll}
    >
      <div className="w-8 flex justify-center text-[#5D5D5D]">{index + 1}</div>
      <div className="flex items-center w-[30%]">
        <Image
          src={transaction.user.avatar}
          width={40}
          height={40}
          className="rounded-[20px] border border-[#5D5D5D]"
          alt="icon"
        />
        <span className="ml-3 text-[#D1D1D1] font-semibold">
          {transaction.user.name}
        </span>
      </div>
      <div className="w-[18%]">
        <div className="flex flex-col">
          <div className="ml-3 flex">
            <IconCoin width={14} height={14} color="#E9AE15" />
            <span
              className="ml-[6px] text-white"
              title={`Total Deposit Count: ${transaction.deposit.total_count}`}
            >
              {fixed2(transaction.deposit.total_amount)}
            </span>
          </div>
          {/* <hr className="border-[#333]" />
          <span className="ml-8 text-[#7D7D7D]">
            {transaction.deposit.total_count} Times
          </span> */}
        </div>
      </div>
      <div className="w-[18%]">
        <div className="flex flex-col">
          <div className="ml-3 flex">
            <IconCoin width={14} height={14} color="#E9AE15" />
            <span
              className="ml-[6px] text-white"
              title={`Total Withdraw Count: ${transaction.withdraw.total_count}`}
            >
              {transaction.withdraw.total_amount}
            </span>
          </div>
          {/* <hr className="border-[#333]" />
          <span className="ml-8 text-[#7D7D7D]">
            {transaction.withdraw.total_count} Times
          </span> */}
        </div>
      </div>
      <div className="w-[18%] text-white">
        <div className="ml-3 flex">
          <IconCoin width={14} height={14} color="#E9AE15" />
          <span
            className={`ml-[6px] ${
              transaction.deposit.total_amount -
                transaction.withdraw.total_amount >
              0
                ? "text-[#B9FD3F]"
                : "text-[#FF3148]"
            }`}
          >
            {fixed2(
              transaction.deposit.total_amount -
                transaction.withdraw.total_amount
            )}
          </span>
        </div>
      </div>
      <div className="pl-3">
        <button
          onClick={handleViewTransaction}
          className="w-8 h-6 flex justify-center items-center rounded hover:bg-[#E9AE1530] transition-colors"
          title="Show Transaction History"
        >
          <IconTransactions color={`#E9AE15`} width={16} height={16} />
        </button>
      </div>
    </div>
  );
};
