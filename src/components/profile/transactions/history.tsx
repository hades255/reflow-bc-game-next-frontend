import { FC, useCallback, useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";
import IconCoin from "@/utils/icons/Coin";
import moment from "moment";
import RoyalflipCoin from "@/utils/icons/Royalfilp";
import TransactionModal from "./transactionModal";
import IconLoading from "@/utils/icons/Loading";

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
  const [selected, setSelected] = useState<Transaction | null>(null);

  const { data, isLoading, error } = useFetch("/api/profile/transactions", {
    method: "GET",
  });

  useEffect(() => {
    if (data && data.transactions) {
      setTransactions(data.transactions);
    }
  }, [data]);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full my-2">
        <p className="text-[#BBB] font-bold">Transactions</p>
      </div>
      <div className="space-y-[1px] w-full">
        {transactions ? (
          transactions.length ? (
            transactions.map((item, index) => (
              <HistoryTab
                key={index}
                transaction={item}
                firstOrLast={
                  index === 0 ? 0 : index === transactions.length - 1 ? 1 : 2
                }
                setSelected={setSelected}
              />
            ))
          ) : (
            <p className="text-[#a8871a]">No Transactions</p>
          )
        ) : (
          <IconLoading width={12} height={12} color="#E9AE15" />
        )}
      </div>
      {selected && (
        <TransactionModal transaction={selected} setSelected={setSelected} />
      )}
    </div>
  );
}

interface HistoryTabProps {
  transaction: Transaction;
  firstOrLast: Number;
  setSelected: Function;
}

const HistoryTab: FC<HistoryTabProps> = ({
  transaction,
  firstOrLast,
  setSelected,
}) => {
  const getDateFormat = useCallback(() => {
    const currentYear = new Date().getFullYear();
    const year = moment(transaction.created_at).year();
    if (currentYear === Number(year)) {
      return moment(transaction.created_at).format("ddd DD MMM HH:mm");
    }
    return moment(transaction.created_at).format("ddd DD MMM, YYYY HH:mm");
  }, [transaction]);

  const handleSelect = useCallback(() => {
    setSelected(transaction);
  }, [setSelected, transaction]);

  return (
    <div
      className={`w-full flex flex-nowrap bg-[#25252E] ${
        firstOrLast === 0 ? "rounded-t" : firstOrLast === 1 ? "rounded-b" : ""
      } py-1 px-4 hover:cursor-pointer hover:bg-[#3E3E3E]`}
      onClick={handleSelect}
    >
      <div className="w-[150px] flex-none text-[#AAA] flex">
        <span className="pt-1">
          <RoyalflipCoin height={20} width={22} color="white" />
        </span>
        <span>
          {transaction.type.substring(0, 1).toUpperCase() +
            transaction.type.substring(1)}
        </span>
      </div>
      <div className="w-[100px] flex-none text-[#99A]">
        {transaction.game_id}
      </div>
      <div className="flex-grow"></div>
      <div className="flex flex-row items-center gap-1 w-[100px]">
        <IconCoin width={14} height={14} color="#E9AE15" />
        <p
          className={`${
            transaction.amount > 0 ? "text-green-600" : "text-red-600	"
          } font-medium text-[12px]`}
        >
          {transaction.amount}
        </p>
      </div>
      <div className="w-[150px] text-[#99A]">{getDateFormat()}</div>
    </div>
  );
};
