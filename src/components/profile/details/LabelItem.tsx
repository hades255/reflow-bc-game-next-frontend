import React, { FC } from "react";

interface Props {
  text?: string;
  active?: boolean;
  onClick?: () => void;
}

const LabelItem: FC<Props> = ({ text = "All", active, onClick }) => {
  return (
    <div className="p-[6px] cursor-pointer" onClick={onClick}>
      <p
        className={`text-[10px] font-semibold  ${
          active ? "text-[#E9AE15]" : "text-[#838383]"
        }`}
      >
        {text}
      </p>
      {active && (
        <div
          className="h-[0.5px] w-auto mt-[2px]"
          style={{
            background: "linear-gradient(to left, #1e1e1e, #E9AE15,#1e1e1e)",
          }}
        ></div>
      )}
    </div>
  );
};

export default LabelItem;
