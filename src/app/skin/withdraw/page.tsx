"use client";

import React, { FC, useState } from "react";
import IconDeposit from "@/utils/icons/Deposit";
import TabItem from "@/components/skin/TabItem";
import SearchInput from "@/components/upgrade/SearchInput";
import Switch from "@/components/buttons/Switch";
import IconCoin from "@/utils/icons/Coin";
import IconAttention from "@/utils/icons/Attention";
import SkinWithdrawItem from "@/components/skin/withdraw/SkinWithdrawItem";
import Image from "next/image";
import IconArrowTop from "@/assets/icons/arrow-top.svg";
import MultiRangeSlider from "@/components/skin/withdraw/MultiRangeSlider";
import Button from "@/components/buttons/Button";
import StatusButton from "@/components/buttons/StatusButton";

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

        <div className="flex flex-row gap-2">
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

      <div className="min-w-[280px] bg-[#1F1F1F] rounded-[5px] overflow-hidden flex flex-col gap-[10px]">
        <div className="bg-[#232323] w-full py-4 px-3">
          <div className="w-full dark-box flex items-center gap-[10px] py-[7px] justify-center">
            <IconAttention color="#D1D1D1" width={11} height={13} />
            <p className="font-semibold text-[12px] text-[#D1D1D1]">
              Attention
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[2px]">
          <p className="bg-[#232323] w-full px-3 py-[10px] font-bold text-[12px] text-[#5E5E5E] uppercase">
            Price
          </p>

          <div className="bg-[#232323] w-full px-3 py-[10px]">
            <div className="flex flex-row items-center justify-between">
              <div className="relative">
                <div className="absolute top-[10px] left-[9px]">
                  <IconCoin color="#E9AE15" width={16} height={17} />
                </div>
                <input className="bg-[#111111] rounded-[5px] border border-[#686868] outline-none py-[8px] pl-[28px] text-[12px] font-medium text-[#D1D1D1] w-[110px]" />
              </div>

              <div className="bg-[#838383] h-[1.31px] w-[11px]"></div>

              <div className="relative">
                <div className="absolute top-[10px] left-[9px]">
                  <IconCoin color="#E9AE15" width={16} height={17} />
                </div>
                <input className="bg-[#111111] rounded-[5px] border border-[#686868] outline-none py-[8px] pl-[28px] text-[12px] font-medium text-[#D1D1D1] w-[110px]" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#232323] w-full py-[10px] px-3 flex flex-col gap-3">
          <div className="flex flex-row gap-[10px]">
            <Switch status={true} onClick={() => console.log("all items")} />
            <p className="text-[#707070] font-bold text-[12px]">All Items</p>
          </div>

          <div className="flex flex-row gap-[10px]">
            <Switch status={false} onClick={() => console.log("all items")} />
            <p className="text-[#707070] font-bold text-[12px]">
              Auctions Only
            </p>
          </div>

          <div className="flex flex-row gap-[10px]">
            <Switch status={false} onClick={() => console.log("all items")} />
            <p className="text-[#707070] font-bold text-[12px]">
              Non-Auctions Only
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[2px]">
          <div className="bg-[#232323] w-full px-3 py-[10px] flex flex-row justify-between items-center">
            <p className="font-bold text-[12px] text-[#5E5E5E] uppercase">
              Delivery
            </p>
            <Image src={IconArrowTop} className="cursor-pointer" alt="icon" />
          </div>

          <div className="bg-[#232323] w-full py-[10px] px-3 flex flex-col gap-3">
            <div className="flex flex-row gap-[10px]">
              <Switch status={true} onClick={() => console.log("all items")} />
              <div>
                <p className="text-[#707070] font-bold text-[12px]">Express</p>
                <p className="text-[#707070] font-semibold text-[10px]">
                  Estimated Delivery Time : 0-10 Minutes
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-[10px]">
              <Switch status={true} onClick={() => console.log("all items")} />
              <div>
                <p className="text-[#707070] font-bold text-[12px]">Fast</p>
                <p className="text-[#707070] font-semibold text-[10px]">
                  Estimated Delivery Time : 0-30 Minutes
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-[10px]">
              <Switch status={true} onClick={() => console.log("all items")} />
              <div>
                <p className="text-[#707070] font-bold text-[12px]">Normal</p>
                <p className="text-[#707070] font-semibold text-[10px]">
                  Estimated Delivery Time : 0-12 Hours
                </p>
              </div>
            </div>

            <p className="text-[9px] font-medium text-[#5D5D5D] capitalize">
              delivery times are rough estimates, always see the item seller
              info for for more details.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[2px]">
          <div className="bg-[#232323] w-full px-3 py-[10px] flex flex-row justify-between items-center">
            <p className="font-bold text-[12px] text-[#5E5E5E] uppercase">
              Percentage
            </p>
            <Image src={IconArrowTop} className="cursor-pointer" alt="icon" />
          </div>

          <div className="bg-[#232323] w-full py-[10px] px-3 flex flex-col gap-3">
            <div className="flex flex-row gap-[10px]">
              <Switch status={true} onClick={() => console.log("all items")} />
              <div>
                <p className="text-[#707070] font-bold text-[12px]">-12%</p>
              </div>
            </div>

            <div className="flex flex-row gap-[10px]">
              <Switch status={true} onClick={() => console.log("all items")} />
              <div>
                <p className="text-[#707070] font-bold text-[12px]">-6%</p>
              </div>
            </div>

            <div className="flex flex-row gap-[10px]">
              <Switch status={true} onClick={() => console.log("all items")} />
              <div>
                <p className="text-[#707070] font-bold text-[12px]">
                  Recommended Price
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-[10px]">
              <Switch status={true} onClick={() => console.log("all items")} />
              <div>
                <p className="text-[#707070] font-bold text-[12px]">+6%</p>
              </div>
            </div>

            <div className="flex flex-row gap-[10px]">
              <Switch status={true} onClick={() => console.log("all items")} />
              <div>
                <p className="text-[#707070] font-bold text-[12px]">+12%</p>
              </div>
            </div>

            <div className="relative">
              <div className="absolute top-[10px] right-[8px] text-[12px] font-medium text-[#D1D1D1]">
                %
              </div>
              <input className="bg-[#111111] rounded-[5px] border border-[#686868] outline-none py-[8px] pl-[8px] text-[12px] font-medium text-[#D1D1D1] w-full" />
            </div>

            <p className="text-[9px] font-medium text-[#5D5D5D] capitalize">
              max +15% above the recommended price.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-[2px]">
          <div className="bg-[#232323] w-full px-3 py-[10px] flex flex-row justify-between items-center">
            <p className="font-bold text-[12px] text-[#5E5E5E] uppercase">
              exterior
            </p>
            <Image src={IconArrowTop} className="cursor-pointer" alt="icon" />
          </div>

          <div className="bg-[#232323] w-full py-[10px] px-3 flex flex-col gap-3">
            <div className="flex flex-row gap-[10px]">
              <Switch status={true} onClick={() => console.log("all items")} />
              <div>
                <p className="text-[#707070] font-bold text-[12px]">
                  Factory New
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-[10px]">
              <Switch status={true} onClick={() => console.log("all items")} />
              <div>
                <p className="text-[#707070] font-bold text-[12px]">
                  Minimal Wear
                </p>
              </div>
            </div>

            <div className="flex flex-row gap-[10px]">
              <Switch status={true} onClick={() => console.log("all items")} />
              <div>
                <p className="text-[#707070] font-bold text-[12px]">Scarred</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-[2px]">
          <div className="bg-[#232323] w-full px-3 py-[10px] flex flex-row justify-between items-center">
            <p className="font-bold text-[12px] text-[#5E5E5E] uppercase">
              float
            </p>
            <Image src={IconArrowTop} className="cursor-pointer" alt="icon" />
          </div>

          <div className="bg-[#232323] w-full py-[10px] px-3 flex flex-col gap-3">
            <div className="flex flex-row items-center justify-between gap-2">
              <div className="relative">
                <input className="bg-[#111111] rounded-[5px] border border-[#686868] outline-none py-[8px] pl-[28px] text-[12px] font-medium text-[#D1D1D1] w-full" />
              </div>

              <div className="relative">
                <input className="bg-[#111111] rounded-[5px] border border-[#686868] outline-none py-[8px] pl-[28px] text-[12px] font-medium text-[#D1D1D1] w-full" />
              </div>
            </div>

            {/* <MultiRangeSlider
              min={0}
              max={2000}
              onChange={({ min, max }) => {
                console.log(min, max);
              }}
            /> */}
          </div>
        </div>

        <div className="bg-[#232323] w-full py-3 px-3 flex flex-row gap-1">
          <button className="w-[50%] h-8 done rounded-sm relative">
            <div className="shine rounded-sm"></div>
            <div className="shine flex justify-center items-center">
              <span className="text-[#D1D1D1] font-semibold text-xs">
                Reset
              </span>
            </div>
          </button>
          <Button text="Apply" className="!w-[50%]" />
        </div>
      </div>
    </div>
  );
};

export default WithdrawSkin;
