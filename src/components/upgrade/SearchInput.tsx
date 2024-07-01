import React, { FC } from "react";
import Image from "next/image";
import search from "@/assets/icons/search.svg";

const SearchInput: FC = () => {
  return (
    <div className="w-full relative">
      <input
        type="text"
        placeholder="Search For Items"
        className="bg-[#111111] text-[#646464] h-[30px] w-full border border-[#CDCDCD63] rounded-[2px] p-[12px_8px_12px_30px] text-[12px] font-medium leading-[15px] outline-none"
      />
      <Image
        src={search}
        alt="icon"
        className="absolute top-[8.25px] left-[10.25px]"
      />
    </div>
  );
};

export default SearchInput;
