"use client";
import React, { FC, useEffect, useState } from "react";
import BetAmount from "@/components/upgrade/BetAmount";
import SelectItem from "@/components/upgrade/SelectItem";
import IconCrown from "@/utils/icons/Crown";
import SearchInput from "@/components/upgrade/SearchInput";
import UpgradeItem from "@/components/upgrade/Item";
import CircularProgressBar from "@/components/upgrade/Circular-Progress";
import Button from "@/components/buttons/Button";
import { apiGetItems, apiPlayGame, apiJoin } from "@/services/upgrader";
import { useBalance, updateBalance } from "@/redux/slices/main/balanceSlice";
import { useToken } from "@/redux/slices/main/authSlice";
import { setModal } from "@/redux/slices/main/modalSlice";
import { useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroller";
import MultiRangeSlider from "@/components/upgrade/MultiRangeSlider";
import BaseModal from "@/components/Modal/BaseModal";
import IconReload from "@/utils/icons/Reload";
import RandomString from "randomstring";
import IconClose from "@/utils/icons/Close";

const UpgradePage: FC = () => {
  const [items, setItems] = useState<any[]>([]);
  const [selectItems, setSelectItems] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean | null>(false);
  const [isWinner, setIsWinner] = useState<boolean | null>(null);
  const [renderKey, setRenderKey] = useState(1);
  const [btnActive, setBtnActive] = useState<boolean>(true);
  const [betAmount, setBetAmount] = useState<any>("");
  const [price, setPrice] = useState<string>("desc");
  const [hasMoreItems, setHasMoreItems] = useState(true);
  const [search, setSearch] = useState<string>("");
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(5000);
  const balance = useBalance();
  const dispatch = useDispatch();
  const token = useToken();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [clientSeed, setClientSeed] = useState<string>(
    RandomString.generate(6)
  );
  const [serverSeedHash, setServerSeedHash] = useState<string>("");
  const [playResult, setPlayResult] = useState<any>(null);

  const handleClickSelectItem = () => {
    setSelectItems(null);
    setBetAmount(0);
  };

  const handleChangeClientSeed = () => {
    const seed = RandomString.generate(6);
    setClientSeed(seed);
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
        if (
          Number(betAmount) > Number(balance.balance) ||
          balance.balance === undefined
        ) {
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
          if (!isLoading && !btnActive) {
            dispatch(updateBalance({ balance: -betAmount }));
            setBtnActive(true);
            const data = await apiPlayGame(
              selectItems?.id,
              betAmount,
              serverSeedHash,
              clientSeed
            );

            setPlayResult(data.data);

            if (data.data) {
              setIsLoading(true);
              setIsWinner(data.data.win);

              setTimeout(() => {
                setIsLoading(false);
                setBtnActive(false);
                setRenderKey((prevKey) => prevKey + 1);
              }, 5500);

              if (data.data.win) {
                setTimeout(() => {
                  const amount = Number(data.data.skinPrice / 1000);

                  dispatch(
                    updateBalance({
                      balance: +amount,
                    })
                  );
                }, 6000);
              }
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
      setBetAmount(0);
    } else {
      setSelectItems(index);
      setBetAmount(0);
      // if (betAmount === 0) {
      //   if (token !== "") {
      //     setBetAmount(0.01);
      //   }
      // }
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
      loadMore(0);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, search, minRange, maxRange]);

  useEffect(() => {
    if (isLoading === false && selectItems && Number(betAmount) !== Number(0)) {
      setBtnActive(false);
    } else {
      setBtnActive(true);
    }
  }, [isLoading, selectItems, betAmount]);

  useEffect(() => {
    (async () => {
      const result = await apiJoin();
      setServerSeedHash(result.data.serverSeedHash);
    })();
  }, [playResult]);

  return (
    <>
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-row justify-between items-center">
            <div className="flex gap-1 items-center">
              <IconCrown width={24} height={26} color="#E9AE15" />
              <p className="text-[18px] text-[#D1D1D1] font-bold">
                Crown & King
              </p>
            </div>
            <div className="flex flex-col">
              <Button text="Provably Fair" clicked={() => setModalOpen(true)} />
            </div>
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
        </div>

        <div className="flex flex-col mt-6">
          <div className="flex flex-row justify-between">
            <div className="w-[264px] flex">
              <SearchInput value={search} onChange={(e) => setSearch(e)} />
            </div>

            <div className="flex flex-row">
              <div className="flex justify-center items-center bg-[#282828] gap-4 px-4 py-2 rounded-md">
                <p className="text-white">0.00</p>
                <MultiRangeSlider
                  min={0}
                  max={200000}
                  onChange={({ min, max }) => {
                    setMinRange(min / 100);
                    setMaxRange(max / 100);
                  }}
                />
                <p className="text-white">2000.00</p>
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

          <div className="overflow-y-scroll max-h-[510px] mt-[40px] upgrader-list">
            <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={hasMoreItems}
              loader={<div key={0}>Loading...</div>}
              className="grid grid-cols-7 gap-5 max-2xl:grid-cols-5 max-xl:grid-cols-4 max-[1820px]:grid-cols-6"
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
      {modalOpen && (
        <BaseModal>
          <div className="w-[600px] h-auto bg-[#1E1E1E] rounded-[5px] p-2">
            <div className="flex flex-row items-center justify-between">
              <div className="text-white text-lg p-1">Provably Fair</div>
              <div
                className="cursor-pointer"
                onClick={() => setModalOpen(false)}
              >
                <IconClose width={24} height={24} />
              </div>
            </div>

            <div className="bg-[#1212127A] h-auto flex flex-col p-4 mt-[10px] gap-3">
              <div className="flex flex-col gap-1">
                <p>Hashed Server Seed</p>
                <input
                  type="text"
                  value={serverSeedHash}
                  className={`bg-[#1212127A] w-full p-1 rounded-[5px] text-white dropBlack text-[14px] font-semibold outline-none`}
                />
              </div>
              <div className="flex flex-col gap-1">
                <p>Client Seed</p>
                <div className="flex flex-row gap-1">
                  <input
                    type="text"
                    value={clientSeed}
                    className={`bg-[#1212127A] w-full p-1 rounded-[5px] text-white dropBlack text-[14px] font-semibold outline-none`}
                  />
                  <div
                    className="w-[30px] rounded-sm cursor-pointer flex flex-col justify-center items-center bg-[#1E1E1E]"
                    onClick={handleChangeClientSeed}
                  >
                    <IconReload width={20} height={20} />
                  </div>
                </div>
              </div>

              {playResult && (
                <div className="flex flex-col gap-1">
                  <div className="flex flex-col gap-1">
                    <p>Server Seed</p>
                    <input
                      type="text"
                      value={playResult?.severSeed}
                      className={`bg-[#1212127A] w-full p-1 rounded-[5px] text-white dropBlack text-[14px] font-semibold outline-none`}
                    />
                  </div>

                  <div className="flex flex-row w-full gap-3">
                    <div className="flex flex-col gap-1 w-full">
                      <p>Win Rate</p>
                      <input
                        type="text"
                        value={playResult?.winRate}
                        className={`bg-[#1212127A] w-full p-1 rounded-[5px] text-white dropBlack text-[14px] font-semibold outline-none`}
                      />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                      <p>Result Rate</p>
                      <input
                        type="text"
                        value={playResult?.resultRate}
                        className={`bg-[#1212127A] w-full p-1 rounded-[5px] text-white dropBlack text-[14px] font-semibold outline-none`}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </BaseModal>
      )}
    </>
  );
};

export default UpgradePage;
