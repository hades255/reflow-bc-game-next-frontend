"use client";

import React, { FC, useState, useEffect } from "react";
import IconDeposit from "@/utils/icons/Deposit";
import SearchInput from "@/components/upgrade/SearchInput";
import SkinDepositItem from "@/components/skin/deposit/SkinDepositItem";
import SelectBox from "@/components/skin/deposit/SelectBox";
import { apiGetInventory } from "@/services/skinDeposit";

const DepositSkin: FC = () => {
  const [items, setItems] = useState<any>({});
  const [search, setSearch] = useState<string>("");
  const [price, setPrice] = useState<string>("desc");
  const [selectItem, setSelectItem] = useState<any>({});

  useEffect(() => {
    (async () => {
      const response = await apiGetInventory();
      setItems(response);
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectItem = (item: any) => {
    console.log(item);
    setSelectItem(item);
  };

  useEffect(() => {
    console.log(selectItem);
  }, [selectItem]);

  return (
    <div className="p-6 flex flex-row gap-6">
      <div className="w-full">
        <div className="flex flex-row items-center gap-1">
          <IconDeposit color="#E9AE15" width={18} height={10} />
          <p className="font-bold text-[18px] text-[#D1D1D1] capitalize">
            Deposit
          </p>
        </div>

        <div className="flex flex-row justify-between mt-12 items-center">
          <div className="w-[264px] flex">
            <SearchInput value={search} onChange={(e) => setSearch(e)} />
          </div>

          <div className="flex flex-row">
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
        <div className="overflow-x-hidden grid grid-cols-6 gap-2 max-[1600px]:grid-cols-4 max-[1430px]:grid-cols-3 max-[1820px]:grid-cols-5 h-[600px] mt-[40px]">
          {items?.status === "success" &&
            items.data?.map((item: any, index: any) => (
              <SkinDepositItem
                select={selectItem.name === item.name ? true : false}
                key={index}
                image={item.steam_price.img}
                title={item.name}
                amount={item.steam_price.lowest_price / 1000}
                discount={-285}
                onClick={() => handleSelectItem(item)}
              />
            ))}
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
