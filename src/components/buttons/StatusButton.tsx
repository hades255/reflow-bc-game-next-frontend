import React from "react";

interface Props {
  text: string;
  status: number;
  clicked: () => void;
}

const StatusButton: React.FC<Props> = ({ text, status, clicked }) =>
  status === 1 ? (
    <button
      className="w-44 h-8 bg-gold rounded-sm gold-btn-drop relative"
      onClick={clicked}
    >
      <div className="shine gold-btn-inner rounded-sm"></div>
      <div className="shine flex justify-center items-center">
        <span className="text-black font-semibold text-xs">{text}</span>
      </div>
    </button>
  ) : status === 2 ? (
    <button
      className="w-44 h-8 bg-transparent rounded-sm gold-btn-drop relative border-[1px] border-gold"
      onClick={clicked}
    >
      <div className="shine rounded-sm"></div>
      <div className="shine flex justify-center items-center">
        <span className="text-[#EDB239] font-semibold text-xs">{text}</span>
      </div>
    </button>
  ) : status === 3 ? (
    <button
      className="w-44 h-8 locked rounded-sm gold-btn-drop relative cursor-not-allowed"
      onClick={clicked}
    >
      <div className="shine rounded-sm"></div>
      <div className="shine flex justify-center items-center">
        <span className="text-[#77510E] font-semibold text-xs">{text}</span>
      </div>
    </button>
  ) : (
    <button
      className="w-44 h-8 done rounded-sm relative cursor-not-allowed"
      onClick={clicked}
    >
      <div className="shine rounded-sm"></div>
      <div className="shine flex justify-center items-center">
        <span className="text-[#121212] font-semibold text-xs">{text}</span>
      </div>
    </button>
  );

export default StatusButton;
