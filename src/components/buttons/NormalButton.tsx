import React from "react";

interface Props {
  icon?: React.ReactNode;
  text: string;
  clicked?: () => void;
}

const NormalButton: React.FC<Props> = ({ icon, text, clicked }) => {
  return (
    <button
      className="py-2 px-6 normal-btn text-sm rounded-sm"
      onClick={clicked}
    >
      <span className="flex text-white text-sm justify-center gap-1 items-center font-semibold">
        {icon}
        {text}
      </span>
    </button>
  );
};

export default NormalButton;
