import React from "react";

interface Props {
  icon?: React.ReactNode;
  text: string;
  active?: boolean;
  clicked?: () => void;
}

const NormalButton: React.FC<Props> = ({ icon, text, active, clicked }) => {
  return (
    <button
      className={`py-2 px-6 normal-btn text-sm rounded-sm btn-hover ${active ? 'btn-active' : ''}`}
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
