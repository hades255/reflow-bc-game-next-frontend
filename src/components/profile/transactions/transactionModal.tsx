import React, { useCallback } from "react";
import moment from "moment";
import IconCoin from "@/utils/icons/Coin";
import RoyalflipCoin from "@/utils/icons/Royalfilp";
import { RiCloseLine } from "react-icons/ri";

interface Transaction {
  id: number;
  type: string;
  game_id: number;
  amount: number;
  status: string;
  created_at: string;
}

interface Props {
  transaction: Transaction;
  setSelected: Function;
}

const TransactionModal: React.FC<Props> = ({ transaction, setSelected }) => {
  const getDateFormat = useCallback(() => {
    const currentYear = new Date().getFullYear();
    const year = moment(transaction.created_at).year();
    if (currentYear === Number(year)) {
      return moment(transaction.created_at).format("DD MMM HH:mm");
    }
    return moment(transaction.created_at).format("DD MMM, YYYY HH:mm");
  }, [transaction]);

  const handleClickClose = useCallback(() => {
    setSelected(null);
  }, [setSelected]);

  return (
    <div
      className="relative z-50"
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
          <div className="relative transform overflow-hidden rounded-lg text-[#D8D8E8] bg-[#25252E] text-left shadow-xl transition-all w-[360px]">
            <div className="w-full flex justify-end pt-4 pr-4">
              <span
                onClick={handleClickClose}
                className="hover:cursor-pointer hover:text-gray-400"
              >
                <RiCloseLine />
              </span>
            </div>
            <div className="w-full flex justify-center font-bold p-2 pt-0">
              {transaction.type.substring(0, 1).toUpperCase() +
                transaction.type.substring(1)}
            </div>
            <div className="w-full flex justify-center">
              Placed on {getDateFormat()}
            </div>
            <div className="w-full p-2 px-8 pb-0">
              <div className="w-full rounded-t-lg bg-[#20202A] p-4">
                <div className="flex justify-between align-middle">
                  <div className="flex">
                    <div>
                      <RoyalflipCoin height={60} width={66} color="white" />
                    </div>
                    <div className="flex flex-col">
                      <div>{transaction.game_id}</div>
                      <div>CT</div>
                    </div>
                  </div>
                  <div className="pt-4">Verify</div>
                </div>
              </div>
            </div>
            <div className="w-full p-2 px-8 pt-1">
              <div className="w-full rounded-b-lg bg-[#20202A] p-4">
                <div className="flex justify-between">
                  <div>Bet Placed on</div>
                  <div className="flex">
                    <span className="pt-[2px]">
                      <RoyalflipCoin height={20} width={22} color="white" />
                    </span>
                    <div>CT</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full p-2 px-8">
              <div className="w-full rounded-lg bg-[#20202A] p-4 flex justify-between">
                <span>{transaction.amount > 0 ? "You Won" : "You Lose"}</span>
                <div className="flex">
                  <span className="pt-[1px] pr-[2px]">
                    <IconCoin width={14} height={14} color="#E9AE15" />
                  </span>
                  <span
                    className={`${
                      transaction.amount > 0 ? "text-green-600" : "text-red-600	"
                    } font-medium text-[12px]`}
                  >
                    {transaction.amount}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full p-2 px-8 mb-6">
              <button
                className="bg-[#333541] hover:bg-[#494d5e] py-2 px-4 rounded-sm w-full"
                onClick={handleClickClose}
              >
                <div className="flex justify-center items-center">
                  <p className="font-semibold text-xs">Close</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;
