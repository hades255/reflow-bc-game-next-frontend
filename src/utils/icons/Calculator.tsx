import React, { FC } from "react";

interface Props {
  width: number;
  height: number;
  color: string;
}

const IconAccount: FC<Props> = ({ width, height, color }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.598 15.4012C3.6975 16.5 5.4645 16.5 9 16.5C12.5355 16.5 14.3032 16.5 15.4012 15.4012C16.5 14.304 16.5 12.5355 16.5 9C16.5 5.4645 16.5 3.69675 15.4012 2.598C14.304 1.5 12.5355 1.5 9 1.5C5.4645 1.5 3.69675 1.5 2.598 2.598C1.5 3.6975 1.5 5.4645 1.5 9C1.5 12.5355 1.5 14.3032 2.598 15.4012Z"
        stroke={color}
        stroke-width="1.5"
      />
      <path
        d="M13.5 6.375H10.5M13.5 10.875H10.5M13.5 13.125H10.5M7.5 6.375H6M6 6.375H4.5M6 6.375V4.875M6 6.375V7.875M7.125 10.875L6 12M6 12L4.875 13.125M6 12L4.875 10.875M6 12L7.125 13.125"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default IconAccount;
