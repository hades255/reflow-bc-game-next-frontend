import React, { FC, useEffect, useState } from "react";
import IconAttention from "@/utils/icons/Attention";
import IconCoin from "@/utils/icons/Coin";
import IconSkinSelected from "@/utils/icons/SkinSelected";
import Button from "@/components/buttons/Button";
import { setToast } from "@/redux/slices/main/toastSlice";
import { useDispatch } from "react-redux";
import {
  apiListInventory,
  apiWaxpeerDeposits,
  apiSetResult,
} from "@/services/skinDeposit";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface SelectBoxProps {
  item: any;
}

const SelectBox: FC<SelectBoxProps> = ({ item }) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const [txId, setTxId] = useState<string>("");

  const handleSell = async () => {
    if (item?.name) {
      const result = await apiListInventory({
        itemId: item?.item_id,
        price: item?.steam_price?.lowest_price,
      });
      dispatch(
        setToast({
          type: 2,
          message: "Deposit Success, This is pending now, Please wait.",
        })
      );

      setTxId(result.data.data.txid);

      // dispatch(updateBalance({ balance: -betAmount }));
    } else {
      dispatch(
        setToast({
          type: 4,
          message: "Please select the Item",
        })
      );
    }
  };

  useEffect(() => {
    if (txId && user) {
      let intervalId = setInterval(() => {
        apiWaxpeerDeposits({
          steam_id: user?.steam_id || "",
          tx_id: txId,
        })
          .then(async (res) => {
            if (
              res.data[0]?.items[0]?.status === 5 ||
              res.data[0]?.items[0]?.status === 6
            ) {
              clearInterval(intervalId);
              await apiSetResult(txId);
            }
          })
          .catch((err) => console.log(err));
      }, 2000);
    }
  }, [txId, user]);

  return (
    <div className="w-[280px] bg-[#1F1F1F] rounded-[5px] overflow-hidden flex flex-col gap-[10px] h-full">
      <div>
        <div className="flex flex-row py-[11px] gap-1 items-center justify-center bg-[#232323]">
          <IconSkinSelected />
          <p className="font-semibold text-[12px] text-[#E9AE15]">
            Selected Item
          </p>
        </div>

        <div className="bg-[#232323] w-full py-4 px-3">
          <div className="w-full dark-box flex items-center gap-[10px] py-[7px] justify-center">
            <IconAttention color="#D1D1D1" width={11} height={13} />
            <p className="font-semibold text-[12px] text-[#D1D1D1]">
              Attention
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-grow flex-col h-full">
        <div className="flex flex-col gap-[2px] h-full">
          <p className="bg-[#232323] w-full px-3 py-[10px] font-bold capitalize text-[12px] text-[#5E5E5E]">
            DEPOSIT ITEMS
          </p>
          {item?.name ? (
            <div className="bg-[#232323] w-full px-3 py-[10px] h-full flex flex-col gap-1 overflow-y-scroll max-h-[calc(100vh-330px)] upgrader-list">
              <div className="dropBlack bg-[#1A1A1A] overflow-hidden h-auto w-full rounded-[5px]">
                <div className="pt-5 pb-4 flex flex-row justify-between px-5 gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element*/}
                  <img
                    src={item?.steam_price?.img}
                    alt=""
                    className="h-[60px]"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-[12px] font-bold text-[#D1D1D1]">
                      {item?.name}
                    </p>
                    <p className="text-[12px] font-semibold text-[#797979]">
                      {item?.type}
                    </p>
                  </div>
                </div>

                <div className="bg-[#131313] w-full px-5 py-[6.5px] flex justify-between items-center">
                  <p className="text-[13px] font-semibold text-[#D1D1D1]">
                    Price
                  </p>
                  <div className="flex gap-1 items-center">
                    <IconCoin color="#E9AE15" width={16} height={17} />
                    <p className="text-[#E9AE15] font-semibold text-[14px]">
                      {item?.steam_price?.lowest_price / 1000}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full"></div>
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
                {item?.steam_price?.lowest_price / 1000 || 0}
              </p>
            </div>
          </div>

          <Button text="Sell Item" clicked={() => handleSell()} />
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
