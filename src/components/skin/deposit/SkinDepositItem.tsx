import React, { FC } from "react";
import IconCoin from "@/utils/icons/Coin";
import LinkOut from "@/utils/icons/LinkOut";

interface Props {
  title?: string;
  amount?: number;
  discount?: number;
  phase?: string;
  select?: boolean;
  id?: number;
  image?: string;
  onClick: (id: number) => void;
}

const SkinDepositItem: FC<Props> = ({
  select,
  id,
  onClick,
  title,
  amount,
  image,
  discount,
  phase,
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
          <p className="absolute top-1 left-2">{phase}</p>
          {/* eslint-disable-next-line @next/next/no-img-element*/}
          <img src={image} alt="" className="h-[100px]" />
        </div>
      ) : (
        <div className="w-full h-[130px] relative flex items-center justify-center dropBlack rounded-[5px] overflow-hidden bg-[#1212127A]">
          <p className="absolute top-1 left-2">{phase}</p>
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
        <div className="flex justify-between items-center">
          <div className="flex gap-[5px]">
            <IconCoin width={20} height={20} color="#E9AE15" />
            <p className="text-[12px] font-semibold text-[#E9AE15] leading-[17.28px]">
              {amount}
            </p>
          </div>

          <LinkOut width={12} height={12} color="#E9AE15" />
        </div>
      </div>
    </div>
  );
};

export default SkinDepositItem;
