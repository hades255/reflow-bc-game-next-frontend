import React from "react";

interface Props {
  text: string;
  clicked: () => void;
}

const NewGame: React.FC<Props> = ({ text, clicked }) => {
  return (
    <button
      className="w-16 h-6 new-btn rounded-sm flex justify-center items-center content-center"
      onClick={clicked}
    >
      <span className="text-sm text-gold">{text}</span>
    </button>
  );
};

export default NewGame;
