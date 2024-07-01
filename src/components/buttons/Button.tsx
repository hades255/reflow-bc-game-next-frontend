import React, { useState } from "react";

interface Props {
  text: string;
  disabled?: boolean;
  clicked?: () => void;
}

const Button: React.FC<Props> = ({ text, disabled, clicked }) => {
  const [hover, setHover] = useState<boolean>(false);

  const handleClick = () => {
    setHover(false);
    clicked && clicked();
  };

  return disabled ? (
    <button
      className="w-full locked py-2 px-6 rounded-sm gold-btn-drop relative cursor-not-allowed"
      onClick={clicked}
    >
      <div className="shine rounded-sm"></div>
      <div className="shine flex justify-center items-center">
        <p className="text-[#77510E] font-semibold text-xs">{text}</p>
      </div>
    </button>
  ) : (
    <button
      className="bg-gold w-full py-2 px-6 rounded-sm relative primary-btn gold-btn-drop hover:gold-btn-drop-hover !hover:text-brown active:opacity-90"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <div className="shine rounded-t-sm gold-btn-inner"></div>
      {hover && <div className="shine gold-btn-hover rounded-sm"></div>}
      <div className="flex justify-center items-center">
        <p className="text-black font-semibold text-xs">{text}</p>
      </div>
    </button>
  );
};

export default Button;
