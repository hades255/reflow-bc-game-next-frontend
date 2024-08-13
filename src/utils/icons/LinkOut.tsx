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
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.125 5.125L0.75 0.75M0.75 0.75H3.66667M0.75 0.75V3.66667M0.75 7.16667V10.0833C0.75 10.3928 0.872917 10.6895 1.09171 10.9083C1.3105 11.1271 1.60725 11.25 1.91667 11.25H10.0833C10.3928 11.25 10.6895 11.1271 10.9083 10.9083C11.1271 10.6895 11.25 10.3928 11.25 10.0833V1.91667C11.25 1.60725 11.1271 1.3105 10.9083 1.09171C10.6895 0.872916 10.3928 0.75 10.0833 0.75H7.16667"
        stroke={color}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default IconAccount;
