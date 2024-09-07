import React, { FC, useEffect, useState } from "react";
import IconAttention from "@/utils/icons/Attention";
import IconCoin from "@/utils/icons/Coin";
import Button from "@/components/buttons/Button";
import { setToast } from "@/redux/slices/main/toastSlice";
import { useDispatch } from "react-redux";
import {
  apiBuyItem,
  apiCheckManySteam,
  apiSetResult,
} from "@/services/skinWithdraw";

interface SelectBoxProps {
  item: any;
}

const SelectBox: FC<SelectBoxProps> = ({ item }) => {
  const dispatch = useDispatch();

  const [transactionId, setTransactionId] = useState<string>("");

  const handleBuy = async () => {
    if (!item?.img) {
      dispatch(
        setToast({
          type: 4,
          message: "Please select the Item",
        })
      );
    } else {
      const response = await apiBuyItem({ name: item.name });
      if (response.data?.status === "error") {
        dispatch(
          setToast({
            type: 4,
            message: response.data?.message,
          })
        );
      } else if (response.data?.status === "success") {
        setTransactionId(response.data?.transactionId);
      }
    }
  };

  useEffect(() => {
    if (transactionId) {
      let intervalId = setInterval(() => {
        apiCheckManySteam(transactionId)
          .then(async (res) => {
            if (res.data.trades.status === 6 || res.data.trades.status === 5) {
              clearInterval(intervalId);
              await apiSetResult({ transactionId });
              dispatch(
                setToast({
                  type: 4,
                  message: "Withdraw is Success",
                })
              );
            }
          })
          .catch((err) => console.log(err));
      }, 10000);
    }
  }, [transactionId, dispatch]);

  return (
    <div className="w-[280px] bg-[#1F1F1F] rounded-[5px] overflow-hidden flex flex-col gap-[10px] h-full">
      <div className="bg-[#232323] w-full py-4 px-3">
        <div className="w-full dark-box flex items-center gap-[10px] py-[7px] justify-center">
          <IconAttention color="#D1D1D1" width={11} height={13} />
          <p className="font-semibold text-[12px] text-[#D1D1D1]">Attention</p>
        </div>
      </div>

      {/* <div className="flex flex-col gap-[2px]">
        <p className="bg-[#232323] w-full px-3 py-[10px] font-bold capitalize text-[12px] text-[#5E5E5E]">
          change markup on all items
        </p>

        <div className="bg-[#232323] w-full px-3 py-[10px]">
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-[7px]">
              <div className="w-full relative">
                <p className="absolute text-[12px] font-medium text-[#D1D1D1] top-[10px] left-[10px]">
                  %
                </p>
                <input className="bg-[#111111] w-full rounded-[5px] border border-[#686868] outline-none py-[8px] pl-[20px] text-[12px] font-medium text-[#D1D1D1]" />
              </div>
              <button className="bg-[#6060601f] p-[8.5px_17.5px] dropShadow rounded-[2px] text-[12px] font-bold text-[#9C9C9C]">
                Apply
              </button>
            </div>

            <div className="dropBlack bg-[#121212] w-[253px] h-[10px] px-[6px] rounded-[15px] flex items-center mb-10">
              <input
                type="range"
                min={0}
                max={100}
                value={10}
                className="w-full h-[3px] appearance-none rounded-[15px] range-input"
                style={{
                  background: `linear-gradient(to right, #E9AE15 10%, #121212 0%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div> */}

      <div className="flex flex-grow flex-col h-full">
        <div className="flex flex-col gap-[2px] h-full">
          <p className="bg-[#232323] w-full px-3 py-[10px] font-bold capitalize text-[12px] text-[#5E5E5E]">
            WITHDRAW ITEMS
          </p>
          {item?.img ? (
            <div className="bg-[#232323] w-full px-3 py-[10px] h-full flex flex-col gap-1 overflow-y-scroll max-h-[calc(100vh-330px)] upgrader-list">
              <div className="dropBlack bg-[#1A1A1A] overflow-hidden h-auto w-full rounded-[5px]">
                <div className="pt-5 pb-4 flex flex-row justify-between px-5 gap-2">
                  {/* <Image
                    src="/assets/images/king.png"
                    width={70}
                    height={52}
                    alt="king"
                  /> */}
                  {/* eslint-disable-next-line @next/next/no-img-element*/}
                  <img src={item?.img} alt="" className="h-[60px]" />
                  <div className="flex flex-col gap-2">
                    <p className="text-[12px] font-bold text-[#D1D1D1]">
                      {item?.name}
                    </p>
                    <p className="text-[12px] font-semibold text-[#797979]">
                      {item?.type}
                    </p>
                    {/* <div className="flex flex-row items-center gap-1">
                      <IconCamera width={10} height={10} color="#E9AE15" />
                      <p className="text-[12px] font-medium text-[#D1D1D1]">
                        0.013
                      </p>
                    </div> */}
                  </div>
                </div>

                <div className="bg-[#131313] w-full px-5 py-[6.5px] flex justify-between items-center">
                  <p className="text-[13px] font-semibold text-[#D1D1D1]">
                    Price
                  </p>
                  <div className="flex gap-1 items-center">
                    <IconCoin color="#E9AE15" width={16} height={17} />
                    <p className="text-[#E9AE15] font-semibold text-[14px]">
                      {item?.price / 1000}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>

        <div className="bg-[#232323] w-full px-3 py-[10px] flex flex-col gap-[10px]">
          <div className="flex items-center justify-between">
            <p className="font-bold text-[12px] text-[#D1D1D1]">
              You Will Spend
            </p>
            <div className="flex flex-row gap-1 items-center">
              <IconCoin color="#E9AE15" width={16} height={17} />
              <p className="font-bold text-[12px] text-[#D1D1D1]">
                {item?.price / 1000 || 0}
              </p>
            </div>
          </div>

          <Button text="Buy 1 Item" clicked={() => handleBuy()} />
        </div>
      </div>

      {/* <div className="flex flex-col gap-[2px]">
        <p className="bg-[#232323] w-full px-3 py-[10px] font-bold text-[12px] text-[#5E5E5E] uppercase">
          Seller info
        </p>

        <div className="bg-[#232323] w-full px-3 py-[10px] flex flex-col gap-[10px]">
          <div className="flex flex-row justify-between">
            <p className="text-[12px] font-bold text-[#707070]">
              Delivery Rate (Last 10/100)
            </p>
            <p className="text-[12px] font-bold text-[#D1D1D1]">100% /99%</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-[12px] font-bold text-[#707070]">
              Delivery Time
            </p>
            <p className="text-[12px] font-bold text-[#D1D1D1]">~2h / ~1h</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-[12px] font-bold text-[#707070]">Steam Level</p>
            <p className="text-[12px] font-bold text-[#D1D1D1]">100+</p>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-[12px] font-bold text-[#707070]">
              Trade Notifications
            </p>
            <p className="text-[12px] font-bold text-[#D1D1D1]">On</p>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default SelectBox;
