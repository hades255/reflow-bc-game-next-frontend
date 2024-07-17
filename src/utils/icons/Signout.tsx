import React from "react";

interface Props {
  width: number;
  height: number;
  color: string;
}

const SignOut: React.FC<Props> = ({ width, height, color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      stroke={color}
      viewBox="0 0 14 14"
      className="ms-h-full ms-w-full"
    >
      <path d="M8 1.8A.8.8 0 1 0 8 .2zm0 12a.8.8 0 0 0 0-1.6zM8 .2H3v1.6h5zM.2 3v8h1.6V3zM3 13.8h5v-1.6H3zM.2 11A2.8 2.8 0 0 0 3 13.8v-1.6A1.2 1.2 0 0 1 1.8 11zM3 .2A2.8 2.8 0 0 0 .2 3h1.6A1.2 1.2 0 0 1 3 1.8z"></path>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.6"
        d="M5.5 7H13m0 0-3-3m3 3-3 3"
      ></path>
    </svg>
  );
};

export default SignOut;
