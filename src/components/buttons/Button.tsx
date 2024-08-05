"use client"
import React, { useState } from "react";
import clsx from "clsx";

interface Props {
  text: string;
  disabled?: boolean;
  active?: boolean;
  clicked?: () => void;
  className?: string;
}

const Button: React.FC<Props> = ({ text, disabled, active, clicked, className }) => {
  const [hover, setHover] = useState<boolean>(false);

  const handleClick = () => {
    setHover(false);
    clicked && clicked();
  };

  return disabled ? (
    <button
      className={clsx(
        `w-full locked py-2 px-4 rounded-sm gold-btn-drop relative cursor-not-allowed`,
        className
      )}
      onClick={clicked}
    >
      <div className="shine rounded-sm"></div>
      <div className="flex justify-center items-center">
        <p className="text-[#77510E] font-semibold text-xs">{text}</p>
      </div>
    </button>
  ) : (
    <button
      className={clsx(
        `bg-gold w-full py-2 px-4 rounded-sm relative primary-btn gold-btn-drop hover:gold-btn-drop-hover btn-hover !hover:text-brown ${active ? 'btn-active' : ''}`,
        className
      )}
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
