"use client"
import { useState, useEffect } from "react";
import { getBalances } from "@/services/analytics";
import { FaSort } from "react-icons/fa";
import Button from "../buttons/Button";

type BalanceType = {
  name: string;
  token: string;
  balance: number;
}

const BalanceTable = () => {

  const [balances, setBalances] = useState<BalanceType[]>([]);
  const [isSort, setIsSort] = useState<boolean>(false);
  const [sort, setSort] = useState<boolean>(false);

  useEffect(() => {
    setBalances(getBalances);
  }, []);

  useEffect(() => {
    if (isSort)
      setBalances((prev) => sort ? prev.sort((a, b) => b.balance - a.balance) : prev.sort((a, b) => a.balance - b.balance));
  }, [isSort, sort]);

  return (
    <table className="w-full bg-[#191919] text-[#727272] rounded-[5px] overflow-hidden my-2">
      <thead className="">
        <tr className="w-full h-[33px] bg-[#1F1F1F] rounded-[5px]">
          <th className="w-[60px] text-sm font-semibold text-left pl-[12px] py-3">
            No.
          </th>
          <th className="text-sm font-semibold w-28 text-left py-3">Network</th>
          <th className="text-sm font-semibold text-center py-3">Token</th>
          <th className="text-sm font-semibold text-center py-3 cursor-pointer flex gap-2 justify-center items-center" onClick={() => {
            if (!isSort) {
              setIsSort((prev) => !prev);
            } 
            setSort((prev) => !prev);
          }}>Balance<FaSort /></th>
          <th className="text-sm font-semibold w-32 py-3">View</th>
        </tr>
      </thead>
      <tbody>
        {balances.map((balance, index) => (
          <tr
            className={`w-full ${index % 2 === 1 ? "bg-[#1F1F1F]" : ""}`}
            key={index}
          >
            <td className="w-[60px] h-[41px] text-sm pl-[12px]">
              {index + 1}
            </td>
            <td className="text-sm text-[#D1D1D1]">{balance.name}</td>
            <td className="text-sm text-[#D1D1D1] text-center">{balance.token}</td>
            <td className="text-sm text-[#D1D1D1] text-center">{`$ ${balance.balance}`}</td>
            <td className="flex justify-center items-center w-32 py-2">
              <Button text={"VIEW"} disabled={false} className="!w-28" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BalanceTable;
