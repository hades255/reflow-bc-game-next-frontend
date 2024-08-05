"use client";

import React, { FC, useState } from "react";
import IconDeposit from "@/utils/icons/Deposit";
import TabItem from "@/components/skin/TabItem";
import SearchInput from "@/components/upgrade/SearchInput";
import Switch from "@/components/buttons/Switch";
import IconCoin from "@/utils/icons/Coin";
import SkinWithdrawItem from "@/components/skin/withdraw/SkinWithdrawItem";
import FilterBox from "@/components/skin/withdraw/FilterBox";
import SelectBox from "@/components/skin/withdraw/SelectBox";

const WithdrawSkin: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [deals, setDeals] = useState<boolean>(false);

  return (
    <div className="p-6 flex flex-row gap-6">
      <div className="w-full">
        <div className="flex flex-row items-center gap-1">
          <IconDeposit color="#E9AE15" width={18} height={10} />
          <p className="font-bold text-[18px] text-[#D1D1D1] capitalize">
            Withdraw
          </p>
        </div>

        <div className="flex flex-row gap-2 mt-3">
          <TabItem text="Market" />
          <TabItem text="my inventory" />
          <TabItem text="notifications" />
        </div>

        <div className="flex flex-row justify-between mt-12 items-center">
          <div className="w-[264px]">
            <SearchInput value={search} onChange={(e) => setSearch(e)} />
          </div>

          <div className="flex flex-row items-center gap-4">
            <div className="flex flex-row gap-2">
              <Switch status={deals} onClick={() => setDeals(!deals)} />
              <p className="text-[#707070] font-bold text-[12px]">Best Deals</p>
            </div>

            <div className="flex flex-row gap-[6px] items-center">
              <p className="text-[#707070] font-bold text-[12px]">
                Total Value:
              </p>
              <IconCoin color="#E9AE15" width={16} height={17} />
              <p className="text-[12px] font-medium text-[#D1D1D1]">143,24</p>
            </div>

            <div className="flex flex-row gap-[2px] items-center">
              <p className="text-[#707070] font-bold text-[12px]">View:</p>
              <select className="bg-[#121212] text-[12px] outline-none">
                <option>Hight Price First</option>
              </select>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mt-6">
          <SkinWithdrawItem
            image="https://steamcommunity-a.akamaihd.net/economy/image/class/730/5932384433"
            title="★ StatTrak™ Karambit | Gamma Doppler (Factory New)"
            amount={19880}
            phase="Emerald"
            discount={-285}
            onClick={() => console.log("item")}
          />
        </div>
      </div>

      <div>
        {/* <FilterBox /> */}
        <SelectBox />
      </div>
    </div>
  );
};

export default WithdrawSkin;
