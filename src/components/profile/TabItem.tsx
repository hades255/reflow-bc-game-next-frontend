import React, { FC } from "react";

interface Props {
  select?: boolean;
  icon?: React.ReactNode;
  text?: string;
  onClick: () => void;
}

const TabItem: FC<Props> = ({ select = false, icon, text, onClick }) => {
  return (
    <div
      className={`w-full px-3 py-2 flex items-center border gap-1 cursor-pointer ${
        select ? "rounded-[5px] border-[#E9AE15]" : "border-[#0F0F0FAD]"
      }`}
      style={{
        background: `${
          select
            ? "linear-gradient(90deg, rgb(104 75 0 / 42%) 0%, rgba(16, 16, 16, 0.00) 71.56%)"
            : ""
        }`,
      }}
      onClick={onClick}
    >
      {icon}
      <p
        className={`text-[12px] font-semibold ${
          select ? "text-[#E9AE15]" : "text-[#787878]"
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default TabItem;
