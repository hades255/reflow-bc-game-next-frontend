import React, { FC } from "react";
import Image from "next/image";

interface Props {
  onClick?: () => void;
  title: string;
  description: string;
  icon: string;
  type: number; // steam 0, crypto 1
}

const PaymentItem: FC<Props> = ({
  title,
  description,
  icon,
  type,
  onClick,
}) => {
  return (
    <div
      className="gray-box p-4"
      style={{ cursor: "pointer" }}
      onClick={onClick}
    >
      <div className="mx-auto flex items-center justify-center dark-box p-4">
        {type === 0 ? (
          <Image
            className="mx-auto"
            src={icon}
            alt={title}
            width={90}
            height={60}
          />
        ) : (
          <Image
            className="mx-auto"
            src={icon}
            alt={title}
            width={50}
            height={50}
          />
        )}
      </div>
      <div className="text-center mt-2">
        <h1
          className="text-xs text-white"
          style={{
            fontFamily: "Flama-Medium, Flama, sans-serif",
            fontWeight: "600",
          }}
        >
          {title}
        </h1>
        <p
          className="text-white"
          style={{
            fontFamily: "Flama-Medium, Flama, sans-serif",
            fontWeight: "100",
            fontSize: "11px",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default PaymentItem;
