import React, { FC } from "react";
import Image from "next/image";
import IconCoin from "@/utils/icons/Coin";

interface Props {
  isSelect?: boolean;
  case: string;
  title: string;
  coin: number | string;
  percent: any;
  url: string;
  id?: number;
  tier: string;
}

const RouletteItem: FC<Props> = ({
  title,
  url,
  isSelect,
  coin,
  percent,
  tier,
}) => {
  return (
    <div className="inline-block w-[200px]">
      <div
        className={`h-[220px] w-[180px] bg-[#1E1E1E] rounded-[5px] p-3 flex flex-col gap-6 border ${
          isSelect ? "border-[#E9AE15]" : "border-[#1E1E1E]"
        } cursor-pointer z-50`}
        style={{ background: "linear-gradient(#282828, #1E1E1E" }}
      >
        <div
          style={{
            backgroundImage: `${
              isSelect
                ? "url(/assets/images/item-bg-active.png)"
                : "url(/assets/images/item-bg.png)"
            }`,
          }}
          className="w-full h-[135px] bg-cover bg-no-repeat relative dropBlack flex items-center justify-center rounded-[5px] overflow-hidden"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} width={140} height={84} alt="logo" />
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
    </div>
  );
};

export default RouletteItem;
