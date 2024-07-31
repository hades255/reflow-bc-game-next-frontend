"use client";

import React, { FC, useState } from "react";
import IconWithdraw from "@/utils/icons/Withdraw";
import IconWallet from "@/utils/icons/Wallet";
import IconCalculator from "@/utils/icons/Calculator";
import IconChange from "@/utils/icons/Change";
import IconCoin from "@/utils/icons/Coin";
import QRCode from "@/assets/images/qrcode.png";
import Image from "next/image";
import Button from "@/components/buttons/Button";
import arbitrum from "@/assets/icons/arbitrum-logo.svg";
import Switch from "@/components/buttons/Switch";

const DepositPage: FC = () => {
  const [fee, setFee] = useState<number>(1);

  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-row items-center gap-1">
        <IconWithdraw color="#E9AE15" width={18} height={10} />
        <p className="font-bold text-[18px] text-[#D1D1D1] capitalize">
          withdraw Arbitrum
        </p>
      </div>
      <p className="font-normal text-[12px] text-[#D1D1D1]">
        you can typically withdraw up to 2,000 coins before KYC checks are
        required, but sometimes our security system will trigger these checks
        before this limit is reached. you can view more information on this here
      </p>

      <div className="dropBlack bg-[#0000001F] h-auto w-full p-6 rounded-[5px] flex flex-col gap-6">
        <p className="text-[12px] font-normal text-[#D1D1D1]">
          Please enter the bitcoin wallet address you want the withdrawal to be
          sent to. all bitcoin withdraws are sent instantly.
        </p>

        <div className="flex gap-[5px] items-center">
          <p className="text-white font-semibold text-[18px] capitalize">
            receiving arbitrum address
          </p>
        </div>

        <div className="flex items-center gap-[5px]">
          <div className="relative flex w-full">
            <input
              type="text"
              className="bg-[#1A1A1A] dropBlack p-[8px_12px_8px_32px] rounded-[5px] w-full outline-none text-[12px] font-semibold text-[#D1D1D1]"
            />
            <div className="absolute top-[9px] left-[12px]">
              <IconCoin color="#E9AE15" width={16} height={17} />
            </div>
          </div>

          <div className="relative flex w-[120px]">
            <div className="absolute top-[9px] left-[12px]">
              <IconCoin color="#E9AE15" width={16} height={17} />
            </div>
            <input
              type="text"
              className="bg-[#101010] border-[#1A1A1A] border-[1px] p-[8px_12px_8px_32px] rounded-[5px] w-full outline-none text-[12px] font-semibold text-[#D1D1D1]"
              value="14324"
            />
          </div>

          <div className="min-w-[34px] h-[34px] flex justify-center items-center bg-[#1A1A1A] rounded-[2px] cursor-pointer">
            <IconChange color="#9C9C9C" width={12} height={10} />
          </div>

          <div className="relative flex w-[120px]">
            <input
              value={1268904}
              type="text"
              className="bg-[#101010] border-[#1A1A1A] border-[1px] p-[8px_12px_8px_32px] rounded-[5px] w-full outline-none text-[12px] font-semibold text-[#D1D1D1]"
            />
            <Image
              src={arbitrum}
              alt="icon"
              className="absolute top-[9px] left-[12px]"
            />
          </div>
        </div>

        <p className="text-white font-semibold text-[18px] capitalize">
          Network fee
        </p>

        <div className="flex gap-[46px] items-center">
          <div className="flex gap-[6px] items-center">
            <Switch status={fee === 1} onClick={() => setFee(1)} />
            <div className="flex gap-1 items-center">
              <p className="font-bold text-[#707070] text-[12px]">Slow-</p>
              <IconCoin color="#E9AE15" width={16} height={17} />
              <p className="font-bold text-[#707070] text-[12px]">7.88</p>
            </div>
          </div>

          <div className="flex gap-[6px] items-center">
            <Switch status={fee === 2} onClick={() => setFee(2)} />
            <div className="flex gap-1 items-center">
              <p className="font-bold text-[#707070] text-[12px]">Standard-</p>
              <IconCoin color="#E9AE15" width={16} height={17} />
              <p className="font-bold text-[#707070] text-[12px]">8.56</p>
            </div>
          </div>

          <div className="flex gap-[6px] items-center">
            <Switch status={fee === 3} onClick={() => setFee(3)} />
            <div className="flex gap-1 items-center">
              <p className="font-bold text-[#707070] text-[12px]">Fast-</p>
              <IconCoin color="#E9AE15" width={16} height={17} />
              <p className="font-bold text-[#707070] text-[12px]">9.23</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <p className="text-[#5D5D5D] text-[12px] font-bold">Total</p>
            <div className="flex gap-[2px] items-center">
              <IconCoin color="#E9AE15" width={16} height={17} />
              <p className="text-[12px] font-bold text-[#D1D1D1]">156,65</p>
            </div>
          </div>

          <Button text="Request Withdraw" className="!w-[143px]" />
        </div>
      </div>

      <div className="flex justify-between">
        <p className="text-[12px] font-medium text-[#9C9C9C]">Transactions</p>
        <select className="bg-[#121212] text-[12px] font-medium text-[#9C9C9C] outline-none">
          <option>10 Per Page</option>
        </select>
      </div>
    </div>
  );
};

export default DepositPage;
