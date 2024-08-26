"use client";

import React, { FC, useState, useEffect } from "react";
import IconDeposit from "@/utils/icons/Deposit";
import TabItem from "@/components/skin/TabItem";
import SearchInput from "@/components/upgrade/SearchInput";
import Switch from "@/components/buttons/Switch";
import IconCoin from "@/utils/icons/Coin";
import SkinDepositItem from "@/components/skin/deposit/SkinDepositItem";
import FilterBox from "@/components/skin/withdraw/FilterBox";
import SelectBox from "@/components/skin/deposit/SelectBox";
import { apiGetItems } from "@/services/upgrader";
import MultiRangeSlider from "@/components/upgrade/MultiRangeSlider";
import InfiniteScroll from "react-infinite-scroller";
import { apiGetInventory } from "@/services/skinDeposit";

const DepositSkin: FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [deals, setDeals] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(5000);
  const [price, setPrice] = useState<string>("desc");
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [selectItem, setSelectItem] = useState<any[]>([]);

  const loadMore = async (page: any) => {
    try {
      const response = await apiGetItems(
        page,
        price,
        minRange,
        maxRange,
        search
      );
      const newItems = response.data.items;

      if (page === 0) {
        setItems(newItems);
        setHasMoreItems(true);
      } else if (page !== 0 && newItems.length === 0) {
        setHasMoreItems(false);
      } else {
        setItems((prevItems) => [...prevItems, ...newItems]);
      }
    } catch (err) {
      console.log(err);
      setHasMoreItems(false);
    }
  };

  useEffect(() => {
    (async () => {
      const response = await apiGetInventory();
      setItems(response.data?.items);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-6 flex flex-row gap-6">
      <div className="w-full">
        <div className="flex flex-row items-center gap-1">
          <IconDeposit color="#E9AE15" width={18} height={10} />
          <p className="font-bold text-[18px] text-[#D1D1D1] capitalize">
            Deposit
          </p>
        </div>

        <div className="flex flex-row gap-2 mt-3">
          <TabItem text="Market" />
          <TabItem text="my inventory" />
          <TabItem text="notifications" />
        </div>

        <div className="flex flex-row justify-between mt-12 items-center">
          <div className="w-[264px] flex">
            <SearchInput value={search} onChange={(e) => setSearch(e)} />
          </div>

          <div className="flex flex-row">
            <div className="flex justify-center items-center bg-[#282828] gap-4 px-4 py-2 rounded-md">
              <p className="text-white">0.00</p>
              <MultiRangeSlider
                min={0}
                max={100000}
                onChange={({ min, max }) => {
                  setMinRange(min / 100);
                  setMaxRange(max / 100);
                }}
              />
              <p className="text-white">1000.00</p>
            </div>

            <div className="hs-dropdown relative inline-flex !z-30 bg-transparent rounded-sm">
              <button
                id="hs-dropdown-order"
                type="button"
                className="px-2 text-font"
              >
                {price == "desc" ? "Highest" : "Lowest"} Amount First
              </button>
              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-12 bg-main shadow-md rounded-md p-2 mt-2 !z-30"
                aria-labelledby="hs-dropdown-order"
              >
                <button
                  className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                  onClick={() => setPrice("desc")}
                >
                  Highest Amount First
                </button>
                <button
                  className="flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-font hover:bg-[#101010]"
                  onClick={() => setPrice("asc")}
                >
                  Lowest Amount First
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="overflow-x-hidden h-[600px] mt-[40px]">
          {/* <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMoreItems}
            loader={<div key={0}>Loading...</div>}
            className="grid grid-cols-6 gap-5 max-2xl:grid-cols-5 max-xl:grid-cols-4 max-[1820px]:grid-cols-6"
            useWindow={false}
          > */}
          {items?.map((item, index) => (
            <SkinDepositItem
              id={item.id}
              key={index}
              image={item.img}
              title={item.name}
              amount={item.price / 1000}
              // phase="Emerald"
              discount={-285}
              onClick={() => console.log("item")}
            />
          ))}
          {/* </InfiniteScroll> */}
        </div>
      </div>

      <div>
        {/* <FilterBox /> */}
        <SelectBox item={selectItem} />
      </div>
    </div>
  );
};

export default DepositSkin;
