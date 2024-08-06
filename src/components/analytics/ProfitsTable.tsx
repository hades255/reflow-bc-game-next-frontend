"use client";
import React, { useState, useEffect } from "react";
import Button from "../buttons/Button";
import { PiCoins } from "react-icons/pi";
import { FaSort } from "react-icons/fa";
import { getProfits } from "@/services/analytics";

type ProfitType = {
  name: string;
  icon: React.ComponentType<{
    width: number;
    height: number;
    color: string;
  }>;
  volume: number;
  monthProfits: number;
  totalProfits: number;
};

const ProfitsTable = () => {
  const [profits, setProfits] = useState<ProfitType[]>([]);
  const [isSort, setIsSort] = useState<boolean>(false);
  const [sort, setSort] = useState<boolean[]>([]);
  const [focus, setFocus] = useState<boolean>(true);

  useEffect(() => {
    setProfits(getProfits);
  }, []);

  useEffect(() => {
    if (isSort) {
      if (focus) {
        setProfits((prev) =>
          sort[0]
            ? prev.sort((a, b) => b.monthProfits - a.monthProfits)
            : prev.sort((a, b) => a.monthProfits - b.monthProfits)
        );
      } else {
        setProfits((prev) =>
          sort[1]
            ? prev.sort((a, b) => b.totalProfits - a.totalProfits)
            : prev.sort((a, b) => a.totalProfits - b.totalProfits)
        );
      }
    }
  }, [isSort, sort, focus]);

  return (
    <table className="w-full bg-[#191919] text-[#727272] rounded-[5px] overflow-hidden my-2">
      <thead className="">
        <tr className="w-full h-[33px] bg-[#1F1F1F] rounded-[5px]">
          <th className="w-56 text-sm font-semibold text-left pl-[12px] py-3">
            Game
          </th>
          <th className="text-sm font-semibold w-28 text-left py-3">Volume</th>
          <th
            className="text-sm font-semibold text-center py-3 cursor-pointer flex justify-center items-center gap-2"
            onClick={() => {
              if (!isSort) {
                setIsSort((prev) => !prev);
              }
              setFocus(true);
              setSort((prev) => [!prev[0], prev[1]]);
            }}
          >
            30 Days Profits
            <FaSort />
          </th>
          <th
            className="text-sm font-semibold text-center py-3 cursor-pointer"
            onClick={() => {
              if (!isSort) {
                setIsSort((prev) => !prev);
              }
              setFocus(false);
              setSort((prev) => [prev[0], !prev[1]]);
            }}
          >
            <div className="w-full flex justify-center items-center gap-2">
              Total Profits
              <FaSort />
            </div>
          </th>
          <th className="text-sm font-semibold w-32 py-3">View</th>
        </tr>
      </thead>
      <tbody>
        {profits.map((profit, index) => (
          <tr
            className={`w-full ${index % 2 === 1 ? "bg-[#1F1F1F]" : ""}`}
            key={index}
          >
            <td className="w-56 h-[41px] text-sm pl-[12px]">
              <div className="w-full flex justify-start gap-2 items-center">
                <profit.icon width={16} height={16} color={"#E9AE15"} />
                <span className="text-[#D1D1D1]">{profit.name}</span>
              </div>
            </td>
            <td className="text-sm text-[#D1D1D1]">{`$ ${profit.volume}`}</td>
            <td className="text-sm text-center">
              <div className="w-full flex justify-center gap-2 items-center">
                <span className="text-gold">
                  <PiCoins />
                </span>
                <span className="text-green-500">{profit.monthProfits}</span>
              </div>
            </td>
            <td className="text-sm text-center">
              <div className="w-full flex justify-center gap-2 items-center">
                <span className="text-gold">
                  <PiCoins />
                </span>
                <span className="text-green-500">{profit.totalProfits}</span>
              </div>
            </td>
            <td className="flex justify-center items-center w-32 py-2">
              <Button text={"Detail"} disabled={false} className="!w-28" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ProfitsTable;
