import React, { FC } from "react";
import Image from "next/image";
import IconCoin from "@/utils/icons/Coin";

interface Props {
  select?: boolean;
  title?: string;
  amount?: number;
  id?: number;
}

const CaseItem: FC<Props> = ({ select, id, title, amount }) => {
  return (
    <div
      className="h-[220px] w-full bg-[#1E1E1E] rounded-[5px] p-3 flex flex-col gap-6 cursor-pointer"
      style={{ background: "linear-gradient(#28282894, #1E1E1E" }}
    >
      <div
        style={{ backgroundImage: "url(/assets/images/item-bg.png)" }}
        className="w-full h-[135px] bg-cover bg-no-repeat relative dropBlack flex items-center justify-center rounded-[5px] overflow-hidden"
      >
        <Image
          src={`/assets/images/mystery/${title}.png`}
          width={84}
          height={84}
          alt="logo"
        />
      </div>

      <div className="w-full h-[49px] flex flex-col gap-1 bg-[#1212127A] dropBlack rounded-[5px] py-[6px] px-3">
        <div className="flex justify-between">
          <p className="text-[14px] font-semibold text-white uppercase">
            {title}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex gap-[5px] items-center">
            <IconCoin width={16} height={16} color="#E9AE15" />
            <p className="text-[12px] font-semibold text-[#E9AE15] leading-[17.28px]">
              20.01
            </p>
          </div>
          <p className="text-[12px] font-semibold text-[#484848]">20,01295%</p>
        </div>
      </div>
    </div>
  );
};

export default CaseItem;
