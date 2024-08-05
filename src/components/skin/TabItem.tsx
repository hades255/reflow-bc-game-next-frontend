import React, { FC } from "react";

interface Props {
  active?: boolean;
  text?: string;
}

const TabItem: FC<Props> = ({ active, text }) => {
  return (
    <div
      className={`py-2 px-3 bg-[#212121B2] rounded-[5px] border ${
        active ? "border-[#E9AE15]" : "border-[#212121B2]"
      }`}
    >
      <p
        className={`${
          active ? "text-[#E9AE15]" : "text-[#717171]"
        } font-semibold text-[12px] capitalize`}
      >
        {text}
      </p>
    </div>
  );
};

export default TabItem;
