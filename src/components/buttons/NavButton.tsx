import React, { useState } from "react";

interface Props {
  Icon: React.ComponentType<{
    width: number;
    height: number;
    color: string;
  }>;
  active: boolean;
  text: string;
  other: boolean;
  clicked: () => void;
}

const NavButton: React.FC<Props> = ({ Icon, active, text, other, clicked }) => {
  const [hover, setHover] = useState<boolean>(false);

  const handleClick = () => {
    setHover(false);
    clicked();
  };

  return (
    <>
      {active ? (
        <button
          className="max-w-48 px-2 h-full nav-btn rounded-sm gold-drop-active relative flex justify-center items-center"
          onClick={handleClick}
        >
          <div className="shine rounded-sm gold-inner-active"></div>
          <div className="shine rounded-sm nav-btn-active"></div>
          <span className="flex gap-1 text-xs items-center">
            <Icon width={16} height={16} color={"#E9AE15"} />
            <span className="text-[#E9AE15]">{text}</span>
          </span>
        </button>
      ) : (
        <button
          className="max-w-48 px-2 h-full nav-btn rounded-sm dropBlack relative flex justify-center items-center"
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleClick}
        >
          <div className="shine rounded-sm innerBlack"></div>
          {hover && <div className="shine rounded-sm nav-btn-hover"></div>}
          <span className="flex gap-1 text-xs items-center">
            <Icon
              width={16}
              height={16}
              color={other ? "#f1b31a" : hover ? "#A5A5A5" : "#717171"}
            />
            <span
              className={
                other
                  ? "text-[#f1b31a]"
                  : hover
                  ? "text-[#A5A5A5]"
                  : "text-[#717171]"
              }
            >
              {text}
            </span>
          </span>
        </button>
      )}
    </>
  );
};

export default NavButton;
