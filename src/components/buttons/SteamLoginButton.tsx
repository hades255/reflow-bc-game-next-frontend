import React, { useState } from "react";
import { FaSteam } from "react-icons/fa";

interface Props {
  text: string;
  clicked: () => void;
}

const SteamLoginButton: React.FC<Props> = ({ text, clicked }) => {
  const [hover, setHover] = useState<boolean>(false);

  const handleClick = () => {
    setHover(false);
    clicked();
  };

  return (
    <button
      className="steam max-w-40 py-2 px-6 rounded-sm relative primary-btn steam-btn-drop hover:gold-btn-drop-hover !hover:text-brown active:opacity-90"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
    >
      <div className="shine rounded-t-sm gold-btn-inner"></div>
      {hover && <div className="shine gold-btn-hover rounded-sm"></div>}
      <div className="flex justify-center items-center">
        <p className="text-black font-semibold text-xs flex items-center gap-2">
          <FaSteam />
          {text}
        </p>
      </div>
    </button>
  );
};

export default SteamLoginButton;
