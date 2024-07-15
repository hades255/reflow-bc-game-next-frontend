import { FC, useCallback, useEffect, useState } from "react";
import { useFetch } from "@/hooks/useFetch";

const checkboxs = [
  "All",
  "Tips",
  "Withdrawals",
  "Deposits",
  "Matechbetting",
  "Roulette",
  "Coinflip",
  "Cases",
  "Rewards",
  "Credit Grants",
  "Case Battles",
];

export default function FilterPanel() {
  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex">
        <div className="hover:cursor-pointer w-1/2 text-[#BBB] bg-[#25252E] rounded-t-lg flex justify-center p-2">
          Type
        </div>
        <div className="hover:cursor-pointer w-1/2 text-[#99A] bg-[#20202B] rounded-t-lg flex justify-center p-2">
          Trades
        </div>
      </div>
      <div className="w-full flex flex-col bg-[#20202B] p-4 space-y-2 h-[70vh]">
        {checkboxs.map((item, index) => (
          <div className="flex" key={index}>
            <input
              checked
              id={`${item}-select-checkbox`}
              type="checkbox"
              className="w-4 h-4 accent-yellow-500"
            />
            <label
              htmlFor={`${item}-select-checkbox`}
              className="ms-2 text-sm font-medium text-[#99A]"
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
