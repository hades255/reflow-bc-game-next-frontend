import React from "react";

const ItemsList = ({ width = 18, height = 18, color = "#707070" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="2.25"
        y="2.25"
        width="2.25"
        height="2.25"
        rx="0.75"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M6.75 3.375L15.75 3.375"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <rect
        x="2.25"
        y="7.5"
        width="2.25"
        height="2.25"
        rx="0.75"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="2.25"
        y="12.75"
        width="2.25"
        height="2.25"
        rx="0.75"
        stroke={color}
        strokeWidth="1.5"
      />
      <path
        d="M6.75 8.625L15.75 8.625"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M6.75 13.875L15.75 13.875"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default ItemsList;
