import React, { FC } from "react";
import IconAttention from "@/utils/icons/Attention";

const SelectBox: FC = () => {
  return (
    <div className="min-w-[280px] bg-[#1F1F1F] rounded-[5px] overflow-hidden flex flex-col gap-[10px]">
      <div className="bg-[#232323] w-full py-4 px-3">
        <div className="w-full dark-box flex items-center gap-[10px] py-[7px] justify-center">
          <IconAttention color="#D1D1D1" width={11} height={13} />
          <p className="font-semibold text-[12px] text-[#D1D1D1]">Attention</p>
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
