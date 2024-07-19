import React, { FC, useState } from "react";

interface Props {
  select?: boolean;
  icon?: React.ReactNode;
  hoverIcon?: React.ReactNode;
  text?: string;
  onClick: () => void;
}

const TabItem: FC<Props> = ({
  select = false,
  icon,
  text,
  onClick,
  hoverIcon,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full px-3 py-2 flex items-center border gap-1 cursor-pointer profile-tab-item ${
        select ? "rounded-[5px] border-[#E9AE15]" : "border-[#0F0F0FAD]"
      } ${
        select ? "text-[#E9AE15]" : "text-[#787878]"
      }  hover:text-[#E9AE15] hover:rounded-[5px] hover:border-[#E9AE15] transition-colors`}
      style={{
        background: `${
          select
            ? "linear-gradient(90deg, rgb(104 75 0 / 42%) 0%, rgba(16, 16, 16, 0.00) 71.56%)"
            : ""
        }`,
      }}
      onClick={onClick}
    >
      {isHovered ? hoverIcon : icon}
      <p className={`text-[12px] font-semibold `}>{text}</p>
    </div>
  );
};

export default TabItem;
