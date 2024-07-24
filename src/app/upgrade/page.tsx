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
import { useBalance, useUser } from "@/redux/slices/main/userSlice";
import { useToken } from "@/redux/slices/main/authSlice";
import { setModal } from "@/redux/slices/main/modalSlice";
import { useDispatch } from "react-redux";

const UpgradePage: FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectItems, setSelectItems] = useState<any>(null);
  const [allAmount, setAllAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean | null>(null);
  const [isWinner, setIsWinner] = useState<boolean | null>(null);
  const [gameResult, setGameResult] = useState<any>();
  const [renderKey, setRenderKey] = useState(1);
  const [btnActive, setBtnActive] = useState<boolean>(true);
  const [betAmount, setBetAmount] = useState<any>("");
  const [price, setPrice] = useState<string>("desc");
  const [sort, setSort] = useState<string>("1");
  const balance = useBalance();
  const dispatch = useDispatch();
  const user = useUser();
  const token = useToken();

  const handleClickSelectItem = () => {
    setSelectItems(null);
    setBetAmount(0);
  };

  const handleBet = async () => {
    try {
      if (token === "" || token === undefined) {
        dispatch(
          setModal({
            status: true,
            title: "Sign In",
            content: "Please sign in to start playing.",
            name: "Steam Sign In",
            type: 1,
            parameter: `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login`,
          })
        );
      } else {
        if (betAmount > Number(balance) || balance === undefined) {
          dispatch(
            setModal({
              status: true,
              title: "No enough balance",
              content: "Bet Amount can not big more than balance",
              name: "Deposit",
              type: 3,
              parameter: ``,
            })
          );
        } else {
          setBtnActive(true);
          const data = await apiPlayGame(selectItems?.id, betAmount);

          if (data.data) {
            setIsLoading(true);
            console.log(data.data);
            setGameResult(data.data);
            setIsWinner(data.data.win);

            setTimeout(() => {
              setIsLoading(false);
              setRenderKey((prevKey) => prevKey + 1);
            }, 5000);
          }
        }
      }
    } catch (error) {
      setRenderKey((prevKey) => prevKey + 1);
      setIsLoading(false);
    }
  };

  const handleSelectItem = (id: number) => {
    const index = items.find((item) => item.id === id);
    if (index === selectItems) {
      handleClickSelectItem();
    } else {
      if (selectItems === null) {
        setBtnActive(false);
      }
      setSelectItems(index);
      if (betAmount === 0) {
        if (token !== "") {
          setBetAmount(0.01);
        }
      }
    }
  };

  useEffect(() => {
    (async () => {
      const data = await apiGetItems(price, sort);
      setItems(data?.data?.items);
    })();
  }, [price, sort]);

  useEffect(() => {
    if (isLoading === false && selectItems) {
      setTimeout(() => {
        setBtnActive(false);
      }, 5000);
    }
  }, [isLoading, selectItems]);

  useEffect(() => {
    if (Number(betAmount) === Number(0)) {
      setBtnActive(true);
    }
  }, [betAmount]);

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
          allValue={selectItems?.price / 1000 || 0}
          myValue={Number(balance)}
        />
        <div>
          <CircularProgressBar
            key={renderKey}
            betAmount={betAmount}
            assetValue={
              selectItems?.price / 1000 + selectItems?.price / 18000 || 1
            }
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
          allAmount={selectItems ? selectItems?.price / 1000 : 0}
          imgUrl={selectItems?.img}
          title={selectItems?.name}
          onClick={() => handleClickSelectItem()}
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
              <select
                className="bg-[#121212] text-[12px] text-white outline-none"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="1">All</option>
                <option value="2">0 - 5</option>
                <option value="3">5 - 25</option>
                <option value="4">25 - 50</option>
                <option value="5">50 - 100</option>
                <option value="6">100 - 250</option>
                <option value="7">{"> 250"}</option>
              </select>
            </div>

            <div className="flex flex-row items-center gap-1">
              <p className="text-[12px] text-[#D1D1D1] font-medium">Price:</p>
              <select
                className="bg-[#121212] text-[12px] text-white outline-none"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex-wrap flex flex-row justify-center gap-2 mt-6 overflow-y-scroll max-h-[510px] upgrader-list">
          {items.map((item, index) => (
            <UpgradeItem
              select={selectItems?.id === item.id}
              key={index}
              id={item.id}
              title={item.name}
              image={item.img}
              amount={item.price / 1000}
              onClick={(id) => handleSelectItem(id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
