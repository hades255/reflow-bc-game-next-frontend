import React from "react";

const ItemsBox = ({ width = 18, height = 18, color = "#707070" }) => {
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
        width="4.5"
        height="4.5"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="11.25"
        y="2.25"
        width="4.5"
        height="4.5"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="11.25"
        y="11.25"
        width="4.5"
        height="4.5"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
      />
      <rect
        x="2.25"
        y="11.25"
        width="4.5"
        height="4.5"
        rx="1"
        stroke={color}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default ItemsBox;
