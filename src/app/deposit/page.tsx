"use client";

import React, { FC, useState, useEffect } from "react";
import IconDeposit from "@/utils/icons/Deposit";
import IconWallet from "@/utils/icons/Wallet";
import IconCalculator from "@/utils/icons/Calculator";
import IconChange from "@/utils/icons/Change";
import IconCoin from "@/utils/icons/Coin";
import QRCode from "@/assets/images/qrcode.png";
import Image from "next/image";
import Button from "@/components/buttons/Button";
import PaymentItem from "@/components/deposit/PaymentItem";
import { depositTokenList } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";

import { useUser } from "@/redux/slices/main/userSlice";
import { setModal } from "@/redux/slices/main/modalSlice";
import { useDispatch } from "react-redux";

const DepositPage: FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get("type");
  const [token, setToken] = useState<any>({});
  const dispatch = useDispatch();
  const user = useUser();

  useEffect(() => {
    if (type) {
      const foundToken = depositTokenList.find((item) => item.title === type);
      setToken(foundToken || {});
    }
  }, [type]);

  useEffect(() => {
    if (!user) {
      dispatch(
        setModal({
          status: true,
          title: "Sign In",
          content: "Please sign in.",
          name: "Steam Sign In",
          type: 2,
          parameter: `${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login`,
        })
      );
    }
  }, [user, dispatch]);

  return (
    <>
      {type === null ? (
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-row items-center gap-1">
            <IconDeposit color="#E9AE15" width={18} height={10} />
            <p className="font-bold text-[18px] text-[#D1D1D1] capitalize">
              deposit
            </p>
          </div>

          <p className="text-white font-semibold text-[18px] capitalize">
            Stream
          </p>

          <div className="dropBlack bg-[#0000001F] h-auto w-full p-6 rounded-[5px] grid grid-cols-8 gap-6">
            <PaymentItem
              icon="/assets/images/payments/csgo.webp"
              title="CS:GO"
              description="Counter-Strike: Global Offensive"
              type={0}
              onClick={() =>
                window.open(
                  "https://pay.waxpeer.com/merchant/reflowdev",
                  "_blank"
                )
              }
            />
          </div>

          <p className="text-white font-semibold text-[18px] capitalize">
            Crypto
          </p>

          <div className="dropBlack bg-[#0000001F] h-auto w-full p-6 rounded-[5px] grid grid-cols-8 gap-6">
            {depositTokenList.map((item, index) => (
              <PaymentItem
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                type={1}
                onClick={() => router.push(`/deposit?type=${item.title}`)}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 flex flex-col gap-6">
          <div className="flex flex-row items-center gap-1 justify-between">
            <div className="flex flex-row items-center gap-1">
              <IconDeposit color="#E9AE15" width={18} height={10} />
              <p className="font-bold text-[18px] text-[#D1D1D1] capitalize">
                Deposit with {token?.description}
              </p>
            </div>

            <Button
              text="Back"
              className="!w-[100px]"
              clicked={() => router.push("/deposit")}
            />
          </div>
          <p className="font-normal text-[12px] text-[#D1D1D1]">
            You will receive balance automatically after sending ARB to the
            address displayed below. (1 confirmation required).
          </p>
          <div className="dropBlack bg-[#0000001F] h-auto w-full p-6 rounded-[5px] flex flex-col gap-6">
            <div className="flex flex-row items-center gap-1">
              <IconWallet color="#D1D1D1" width={16} height={14} />
              <p className="font-semibold text-[18px] text-white">
                Wallet Address
              </p>
            </div>

            <div className="flex flex-row justify-center">
              <Image src={QRCode} alt="qrcode" />
            </div>

            <div className="flex flex-col gap-3">
              <p className="text-[12px] font-normal text-[#D1D1D1 ]">
                Your {token?.description} Deposit Address
              </p>

              <div className="relative">
                <input
                  type="text"
                  className="bg-[#1A1A1A] dropBlack p-[8px_10px] rounded-[5px] w-full outline-none text-[12px] font-semibold text-[#D1D1D1]"
                  value="5dAsiEtMsJVBEgX5QVyS7earBpybNZ6tg769jjkjkjnn0kh2"
                />

                <button className="!w-[54px] h-[28px] !absolute !top-[3px] rounded-[2px] !right-[4px] text-[12px] font-bold text-[#9C9C9C] bg-[#6060601F]">
                  Copy
                </button>
              </div>

              <div className="flex gap-[7px] items-center justify-end">
                <p className="text-[14px] font-bold text-[#D1D1D1]">Or</p>
                <Button text="Add funds" className="!w-[90px]" />
              </div>
            </div>
          </div>

          <div className="dropBlack bg-[#0000001F] h-auto w-full p-6 rounded-[5px] flex flex-col gap-6">
            <div className="flex gap-[5px] items-center">
              <IconCalculator color="#D1D1D1" width={18} height={18} />
              <p className="text-white font-semibold text-[18px]">
                Coin Rate Calculator
              </p>
            </div>

            <div className="flex items-center gap-[5px]">
              <div className="relative flex w-full">
                <Image
                  src={token?.icon}
                  alt="icon"
                  className="absolute top-[10px] left-[12px]"
                  width={15}
                  height={15}
                />
                <input
                  type="text"
                  className="bg-[#1A1A1A] dropBlack p-[8px_12px_8px_32px] rounded-[5px] w-full outline-none text-[12px] font-semibold text-[#D1D1D1]"
                  value="5dAsiEtMsJVBEgX5QVyS7earBpybNZ6tg769jjkjkjnn0kh2"
                />
              </div>

              <div className="min-w-[34px] h-[34px] flex justify-center items-center bg-[#1A1A1A] rounded-[2px] cursor-pointer">
                <IconChange color="#9C9C9C" width={12} height={10} />
              </div>
              <div className="relative flex w-full">
                <input
                  type="text"
                  className="bg-[#1A1A1A] dropBlack p-[8px_12px_8px_32px] rounded-[5px] w-full outline-none text-[12px] font-semibold text-[#D1D1D1]"
                />
                <div className="absolute top-[9px] left-[12px]">
                  <IconCoin color="#E9AE15" width={16} height={17} />
                </div>
              </div>
            </div>

            <p className="text-[12px] text-[#D1D1D1] font-normal">
              The exchange rate shown above is an estimate. The final rate is
              determined by the time of the transaction.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default DepositPage;
