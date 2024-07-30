import React, { FC } from "react";
import IconCoin from "@/utils/icons/Coin";

interface Props {
  select?: boolean;
  title?: string;
  amount?: number;
  id?: number;
  image?: string;
  onClick: (id: number) => void;
}

const UpgradeItem: FC<Props> = ({
  select,
  id,
  onClick,
  title,
  amount,
  image,
}) => {
  return (
    <div
      className="h-[250px] w-[200px] bg-[#1E1E1E] rounded-[5px] p-2 flex flex-col gap-2 cursor-pointer"
      style={{ background: "linear-gradient(#28282894, #1E1E1E" }}
      onClick={() => {
        if (id) {
          onClick(id);
        }
      }}
    >
      {select ? (
        <div
          className="w-full h-[130px] relative flex items-center justify-center border border-[#EAA62580] rounded-[5px] overflow-hidden bg-[#1212127A]"
          style={{ background: "linear-gradient(#191A1900, #EAA62580)" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img src={image} alt="" className="h-[100px]" />
        </div>
      ) : (
        <div className="w-full h-[130px] relative flex items-center justify-center dropBlack rounded-[5px] overflow-hidden bg-[#1212127A]">
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img src={image} alt="" className="h-[100px]" />
        </div>
      )}

      <div className="w-full h-[90px] justify-between flex flex-col gap-1 bg-[#1212127A] dropBlack rounded-[5px] p-3">
        <div className="flex justify-between">
          <p className="text-[10px] font-semibold text-white uppercase">
            {title}
          </p>
        </div>
        <div className="flex gap-[5px] items-center">
          <IconCoin width={20} height={20} color="#E9AE15" />
          <p className="text-[12px] font-semibold text-[#E9AE15] leading-[17.28px]">
            {amount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UpgradeItem;
