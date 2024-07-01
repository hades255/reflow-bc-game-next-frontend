import React, { FC } from "react";
import Image from "next/image";
import upgradeItem1 from "@/assets/images/upgrade-item-1.png";
import selectCrown from "@/assets/images/upgrade-select.svg";
import IconCoin from "@/utils/icons/Coin";
import { title } from "process";

interface Props {
  select?: boolean;
  title?: string;
  amount?: number;
  id?: number;
  onClick: (id: number) => void;
}

const UpgradeItem: FC<Props> = ({ select, id, onClick, title, amount }) => {
  return (
    <div
      className="h-[350px] w-full bg-[#1E1E1E] rounded-[5px] p-3 flex flex-col gap-6 cursor-pointer"
      style={{ background: "linear-gradient(#28282894, #1E1E1E" }}
      onClick={() => {
        if (id) {
          onClick(id);
        }
      }}
    >
      {select ? (
        <div
          className="w-full h-[232px] relative flex items-center justify-center border border-[#EAA62580] rounded-[5px] overflow-hidden bg-[#1212127A]"
          style={{ background: "linear-gradient(#191A1900, #EAA62580)" }}
        >
          <Image src={upgradeItem1} alt="logo" />
        </div>
      ) : (
        <div className="w-full h-[232px] relative flex items-center justify-center dropBlack rounded-[5px] overflow-hidden bg-[#1212127A]">
          <Image src={upgradeItem1} alt="logo" />
        </div>
      )}

      <div className="w-full flex flex-col gap-1 bg-[#1212127A] dropBlack rounded-[5px] p-3">
        <div className="flex justify-between">
          <p className="text-[16px] font-semibold text-white uppercase">
            {title}
          </p>
        </div>
        <div className="flex gap-[5px] items-center">
          <IconCoin width={30} height={30} color="#E9AE15" />
          <p className="text-[16px] font-semibold text-[#E9AE15] leading-[17.28px]">
            {amount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradeItem;
