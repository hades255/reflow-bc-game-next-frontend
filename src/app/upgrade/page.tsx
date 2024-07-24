"use client";
import React, { FC, useEffect, useState, useRef } from "react";
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
import InfiniteScroll from "react-infinite-scroller";
import { updateBalance } from "@/redux/slices/main/userSlice";
import MultiRangeSlider from "@/components/upgrade/multiRangeSlider/MultiRangeSlider";

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
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(5000);
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
          dispatch(updateBalance({ balance: -betAmount }));
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

            if (data.data.win) {
              setTimeout(() => {
                dispatch(
                  updateBalance({
                    balance: +(data.data.skinPrice / 1000),
                  })
                );
              }, 6000);
            }
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

      if (page === 1) {
        setItems(newItems);
      } else if (page !== 1 && newItems.length === 0) {
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
      loadMore(1);
    })();
  }, [price, sort, search, minRange, maxRange]);

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
            <SearchInput value={search} onChange={(e) => setSearch(e)} />
          </div>

          <div className="flex flex-row gap-[18px]">
            <MultiRangeSlider
              min={0}
              max={5000}
              onChange={({ min, max }) => {
                setMinRange(min);
                setMaxRange(max);
              }}
            />

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

        {/* <div className="flex-wrap flex flex-row justify-center gap-2 mt-6 overflow-y-scroll max-h-[510px] upgrader-list"></div> */}
        <div className="overflow-y-scroll max-h-[510px] upgrader-list">
          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={hasMoreItems}
            loader={<div key={0}>Loading...</div>}
            className="flex-wrap flex flex-row justify-center gap-2 mt-6"
            useWindow={false}
          >
            {items?.map((item, index) => (
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
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default UpgradePage;
