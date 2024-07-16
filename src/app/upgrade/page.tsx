"use client";
import React, { FC, useEffect, useState } from "react";
import BetAmount from "@/components/upgrade/BetAmount";
import SelectItem from "@/components/upgrade/SelectItem";
import IconCrown from "@/utils/icons/Crown";
import SearchInput from "@/components/upgrade/SearchInput";
import UpgradeItem from "@/components/upgrade/Item";
import CircularProgressBar from "@/components/upgrade/Circular-Progress";
import Button from "@/components/buttons/Button";
import { apiGetItems, apiPlayGame } from "@/services/upgrader";

const UpgradePage: FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectItems, setSelectItems] = useState<any>(null);
  const [allAmount, setAllAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isWinner, setIsWinner] = useState<boolean | null>(null);
  const [gameResult, setGameResult] = useState<any>();
  const [renderKey, setRenderKey] = useState(1);
  const [btnActive, setBtnActive] = useState<boolean>(true);
  const [betAmount, setBetAmount] = useState(0);
  const [myAmount, setMyAmount] = useState(200000000);

  const handleBet = async () => {
    try {
      setIsLoading(true);
      setBtnActive(true);
      setIsWinner(false);
      const data = await apiPlayGame(selectItems?.id, 100000);

      if (data.data) {
        console.log(data.data);
        setGameResult(data.data);
        setIsWinner(data.data.win);

        setTimeout(() => {
          setIsLoading(false);
          setRenderKey((prevKey) => prevKey + 1);
        }, 3000);
      }
    } catch (error) {
      setRenderKey((prevKey) => prevKey + 1);
      setIsLoading(false);
    }
  };

  const handleSelectItem = (id: number) => {
    const index = items.find((item) => item.id === id);
    setSelectItems(index);
    if (betAmount === 0) {
      setBetAmount(0.01);
    }
    setBtnActive(false);
  };

  useEffect(() => {
    (async () => {
      const data = await apiGetItems("desc", "Knife");
      setItems(data.data.items);
    })();
  }, []);

  useEffect(() => {
    if (isLoading === false && selectItems) {
      setTimeout(() => {
        setBtnActive(false);
      }, 5000);
    }
  }, [isLoading, selectItems]);

  // useEffect(() => {
  //   if (selectItems && betAmount > 0) {
  //     setBtnActive(false);
  //   }
  // }, [selectItems, betAmount]);

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex gap-1 items-center">
        <IconCrown width={24} height={26} color="#E9AE15" />
        <p className="text-[18px] text-[#D1D1D1] font-bold">Crown & King</p>
      </div>
      <div className="flex flex-row justify-between">
        <BetAmount
          value={betAmount}
          onChangeValue={(value: any) => setBetAmount(value)}
          allValue={selectItems?.price || 0}
          myValue={myAmount}
        />
        <div>
          <CircularProgressBar
            key={renderKey}
            betAmount={betAmount}
            assetValue={selectItems?.price || 1}
            betResult={isWinner}
            isLoading={isLoading}
          />
          <div className="flex justify-center mt-[18px]">
            <Button
              className="!w-[250px]"
              text="Upgrade"
              clicked={handleBet}
              disabled={btnActive}
            ></Button>
          </div>
        </div>

        <SelectItem
          allAmount={selectItems?.price}
          imgUrl={selectItems?.img}
          title={selectItems?.name}
        />
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
              select={selectItems?.id === item.id}
              key={index}
              id={item.id}
              title={item.name}
              image={item.img}
              amount={item.price}
              onClick={(id) => handleSelectItem(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
