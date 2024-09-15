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
        className={`text-[10px] font-semibold`}
        style={{ color: active ? "#E9AE15" : "#838383" }}
      >
        {text}
      </p>
      {active && (
        <div
          className="h-[1px] w-auto mt-[2px]"
          style={{
            background:
              "linear-gradient(to left, #12121255, #E9AE1555,#12121255)",
          }}
        ></div>
      )}
    </div>
  );
};

export default LabelItem;
