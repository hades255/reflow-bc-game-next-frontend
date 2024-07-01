import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface Props {
  clicked: () => void;
}

const DropdownButton: React.FC<Props> = ({ clicked }) => {
  const [status, setStatus] = useState<boolean>(true);

  const handleClick = () => {
    setStatus((prev) => !prev);
    clicked();
  };

  return (
    <button
      className="w-80 h-10 dropdown-btn text-sm rounded-md"
      onClick={handleClick}
    >
      <span className="flex text-white justify-center gap-3 items-center text-sm">
        {status ? (
          <>
            {"Show More"}
            <IoIosArrowDown />
          </>
        ) : (
          <>
            {"Show Less"}
            <IoIosArrowUp />
          </>
        )}
      </span>
    </button>
  );
};

export default DropdownButton;
