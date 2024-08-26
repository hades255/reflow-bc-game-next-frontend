import React, { FC } from "react";
import IconCoin from "@/utils/icons/Coin";
import Image from "next/image";

interface Props {
  case: string;
  title: string;
  coin: number | string;
  url: string;
  percent: any;
  tier: string;
}

const CaseItem: FC<Props> = ({ title, url, coin, percent, tier }) => {
  return (
    <div
      className="h-[220px] w-full max-w-[220px] bg-[#1E1E1E] rounded-[5px] p-3 flex flex-col gap-6 cursor-pointer my-4"
      style={{ background: "linear-gradient(#28282894, #1E1E1E" }}
    >
      <div
        style={{ backgroundImage: "url(/assets/images/item-bg.png)" }}
        className="w-full h-[135px] bg-cover bg-no-repeat relative dropBlack flex items-center justify-center rounded-[5px] overflow-hidden px-2"
      >
        <Image src={url} alt="logo" width={200} height={130} />
      </div>

      <div className="w-full h-[49px] flex flex-col gap-1 bg-[#1212127A] dropBlack rounded-[5px] py-[6px] px-3">
        <div className="text-[14px] font-semibold text-white uppercase w-full overflow-hidden">
          {title}
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex gap-[5px] items-center">
            <IconCoin width={16} height={16} color="#E9AE15" />
            <p className="text-[12px] font-semibold text-[#E9AE15] leading-[17.28px]">
              {coin}
            </p>
          </div>
          <p className="text-[12px] font-semibold text-[#484848]">
            {percent[tier]}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaseItem;
