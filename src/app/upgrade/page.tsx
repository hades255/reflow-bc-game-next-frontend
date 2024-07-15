"use client";
import React, { FC, useEffect, useState } from "react";
import BetAmount from "@/components/upgrade/BetAmount";
import SelectItem from "@/components/upgrade/SelectItem";
import IconCrown from "@/utils/icons/Crown";
import SearchInput from "@/components/upgrade/SearchInput";
import UpgradeItem from "@/components/upgrade/Item";
import CircularProgressBar from "@/components/upgrade/Circular-Progress";
import Button from "@/components/buttons/Button";

const items = [
  { id: 1, title: "zagabond", amount: 10000 },
  { id: 2, title: "zagabond", amount: 10000 },
  { id: 3, title: "zagabond", amount: 10000 },
  { id: 4, title: "zagabond", amount: 10000 },
  { id: 5, title: "zagabond", amount: 10000 },
];

const UpgradePage: FC = () => {
  const [selectItems, setSelectItems] = useState<number[]>([]);
  const [allAmount, setAllAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWinner, setIsWinner] = useState<boolean>(false);

  const handleBet = async () => {
    setIsLoading(true);
  };

  const handleSelectItem = (id: number) => {
    const tempItem = selectItems;
    if (tempItem.indexOf(id) > -1) {
      tempItem.splice(tempItem.indexOf(id), 1);
      setSelectItems([...tempItem]);
    } else {
      setSelectItems([...selectItems, id]);
    }
  };

  useEffect(() => {
    let sum = 0;

    items.forEach((element) => {
      if (selectItems.indexOf(element.id) > -1) {
        sum = sum + element.amount;
      }
    });

    setAllAmount(sum);
  }, [selectItems]);

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex gap-1 items-center">
        <IconCrown width={24} height={26} color="#E9AE15" />
        <p className="text-[18px] text-[#D1D1D1] font-bold">Crown & King</p>
      </div>
      <div className="flex flex-row justify-between">
        <BetAmount />
        <div>
          <CircularProgressBar
            key={1}
            betAmount={10}
            assetValue={100}
            betResult={true}
            isLoading={true}
          />
          <div className="flex justify-center mt-[18px]">
            <Button className="!w-[250px]" text="Upgrade"></Button>
          </div>
        </div>

        <SelectItem allAmount={allAmount} />
      </div>

      <div className="flex flex-col mt-6">
        <div className="flex flex-row justify-between">
          <div className="w-[264px] flex">
            <SearchInput />
          </div>

          <div className="flex flex-row gap-[18px]">
            <div className="flex flex-row items-center gap-1">
              <p className="text-[12px] text-[#D1D1D1] font-medium">Sort by:</p>
              <select className="bg-[#000] text-[12px] text-white outline-none">
                <option>All</option>
              </select>
            </div>

            <div className="flex flex-row items-center gap-1">
              <p className="text-[12px] text-[#D1D1D1] font-medium">Price:</p>
              <select className="bg-[#000] text-[12px] text-white outline-none">
                <option>Descending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-4 mt-[17px]">
          {items.map((item, index) => (
            <UpgradeItem
              select={selectItems.indexOf(item.id) > -1}
              key={index}
              id={item.id}
              title={item.title}
              amount={item.amount}
              onClick={(id) => handleSelectItem(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
