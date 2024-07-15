import React, { FC } from "react";
import IconDeposit from "@/utils/icons/Deposit";
import IconWallet from "@/utils/icons/Wallet";
import QRCode from "@/assets/images/qrcode.png";
import Image from "next/image";

const DepositPage: FC = () => {
  return (
    <div className="p-6 flex flex-col gap-6">
      <div className="flex flex-row items-center gap-1">
        <IconDeposit color="#E9AE15" width={18} height={10} />
        <p className="font-bold text-[18px] text-[#D1D1D1] capitalize">
          deposit with arbitrum
        </p>
      </div>
      <p className="font-normal text-[12px] text-[#D1D1D1]">
        You will receive balance automatically after sending ARB to the address
        displayed below. (1 confirmation required).
      </p>
      <div className="dropBlack bg-[#0000001F] h-[417px] w-full p-6 rounded-[5px] flex flex-col gap-6">
        <div className="flex flex-row items-center gap-1">
          <IconWallet color="#D1D1D1" width={16} height={14} />
          <p className="font-semibold text-[18px] text-white">Wallet Address</p>
        </div>

        <div className="flex flex-row justify-center">
          <Image src={QRCode} alt="qrcode" />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[12px] font-normal text-[#D1D1D1 ]">
            Your arbitrum Deposit Address
          </p>

          <div className="relative">
            <input
              type="text"
              className="bg-[#1A1A1A] p-[8px_10px] rounded-[5px] w-full outline-none text-[12px] font-semibold text-[#D1D1D1]"
            />

            <button className="!w-[54px] h-[30px] !absolute !top-[2px] !right-[4px] text-[12px] font-bold text-[#9C9C9C] bg-[#6060601F]">
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepositPage;
