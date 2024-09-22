"use client";

import React, { FC, useCallback, useMemo } from "react";
import Image from "next/image";
import lock from "@/assets/icons/lock.svg";

import caseLeft from "@/assets/icons/case-arrow-left.svg";
import caseRight from "@/assets/icons/case-arrow-right.svg";
import { LEVEL_SYSTEM } from "@/config/constants";
import OpenCaseButton from "./OpenCaseButton";

interface Props {
  current: number;
  setCurrent: Function;
  tier: string;
  setTier: Function;
  onClick?: () => void;
  keys: any;
}

const CaseBox: FC<Props> = ({
  onClick,
  current,
  setCurrent,
  tier,
  setTier,
  keys,
}) => {
  const handleClickkeyImage = useCallback(() => {
    if (LEVEL_SYSTEM[current].name === "invincible") setTier("");
    else setTier(tier === "BS" ? "MW" : tier === "MW" ? "FN" : "BS");
  }, [tier, setTier, current]);

  const keyName = useMemo(() => {
    if (LEVEL_SYSTEM[current].name === "invincible") return "Pandora";
    const name = LEVEL_SYSTEM[current].name;
    return (
      name.substring(0, 1).toUpperCase() +
      name.substring(1) +
      "-" +
      (tier === "MW" ? "MinimalWear" : tier === "FN" ? "FactoryNew" : "Scarred")
    );
  }, [current, tier]);

  const keyCount = useMemo(() => {
    if (LEVEL_SYSTEM[current].name === "invincible")
      return keys.find((item: any) => item.level == 10)?.count || 0;
    return (
      keys.find((item: any) => item.level == current + 1 && item.tier == tier)
        ?.count || 0
    );
  }, [keys, current, tier]);

  return (
    <div
      className="w-full h-[224px] bg-[#1E1E1E] py-6 px-12 rounded-[5px] flex flex-row items-center justify-between"
      style={{ background: "linear-gradient(#28282894, #1E1E1E" }}
    >
      <div className="flex flex-col">
        <p className="capitalize text-white text-[21px] font-bold">
          {LEVEL_SYSTEM[current].name} Crate
        </p>
        <div className="flex flex-row gap-[6px] mt-[8px]">
          <Image src={lock} alt="logo" />
          <p className="text-[14px] font-normal text-[#D1D1D1]">
            Unlocks at{" "}
            <span className="font-medium">
              Level {LEVEL_SYSTEM[current].level}
            </span>
          </p>
        </div>

        <div className="flex flex-row items-center gap-3 mt-6">
          <div
            className="w-[52px] h-[29px] dropBlack flex flex-row items-center justify-center gap-1 hover:cursor-pointer"
            style={{ background: "linear-gradient(#11111147, #14141447)" }}
            onClick={handleClickkeyImage}
          >
            <Image
              src={`/assets/images/keys/${keyName}.png`}
              alt="icon"
              width={21}
              height={21}
            />
            <p className="text-[12px] font-medium text-[#D1D1D1]">{keyCount}</p>
          </div>
          <p className="text-[12px] font-semibold text-[#484848]">
            1 Key Needed
          </p>
        </div>

        {onClick && (
          <OpenCaseButton
            clicked={onClick}
            disabled={!onClick || keyCount < 1}
          />
        )}
      </div>

      <div className="flex flex-row items-center gap-0">
        <Image
          src={caseLeft}
          alt="icon"
          className="cursor-pointer"
          onClick={() => {
            if (current > 0) {
              setCurrent(current - 1);
            }
          }}
        />
        <Image
          width={280}
          height={180}
          src={`/assets/images/boxes/${LEVEL_SYSTEM[current].name}.png`}
          alt="image"
        />
        <Image
          src={caseRight}
          alt="icon"
          className="cursor-pointer"
          onClick={() => {
            if (current < LEVEL_SYSTEM.length - 1) {
              setCurrent(current + 1);
            }
          }}
        />
      </div>
    </div>
  );
};

export default CaseBox;
