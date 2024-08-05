"use client";

import React, { FC, useState, useEffect } from "react";
import IconCoin from "@/utils/icons/Coin";
import { useUser } from "@/redux/slices/main/userSlice";

interface Props {
  value: number;
  allValue: any;
  myValue: number;
  onChangeValue: (value: any) => void;
}

const BetAmount: FC<Props> = ({ value, allValue, myValue, onChangeValue }) => {
  const [btnTab, setBtnTab] = useState<number>(0);
  const [progress, setProgress] = useState(0);
  const [disable, setDisable] = useState(true);
  const user = useUser();

  useEffect(() => {
    if (user && allValue > 0) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [user, allValue]);

  useEffect(() => {
    setBtnTab(0);
  }, [allValue]);

  useEffect(() => {
    if (value > 0) {
      let temp = (value / allValue) * 100;
      setProgress(temp);
    } else if (Number(value) === Number(0)) {
      setProgress(0);
    }
  }, [value, allValue]);

  const handleClickBtn = (id: any) => {
    setBtnTab(id);
    if (id === 1) {
      onChangeValue((allValue / 10).toFixed(2));
    } else if (id === 2) {
      onChangeValue((allValue / 4).toFixed(2));
    } else if (id === 3) {
      onChangeValue((allValue / 2).toFixed(2));
    } else if (id === 4) {
      onChangeValue(((allValue / 1000) * 999).toFixed(2));
    }
  };

  const handleChange = (amount: number) => {
    setBtnTab(0);
    if (amount > allValue || amount.toFixed(2) === allValue.toFixed(2)) {
      onChangeValue(allValue - 0.01);
    } else {
      onChangeValue(amount);
    }
  };

  const handleChangeProgress = (p: number) => {
    setBtnTab(0);
    let temp = (allValue / 100) * p;
    onChangeValue(temp.toFixed(2));
    if (temp.toFixed(2) === allValue.toFixed(2)) {
      onChangeValue(Number(allValue - 0.01).toFixed(2));
    }
  };

  return (
    <div
      className="w-[342px] h-[350px] bg-[#1E1E1E] rounded-[5px] p-3"
      style={{ background: "linear-gradient(#282828, #1E1E1E)" }}
    >
      <div className="w-full h-full bg-[#1212127A] dropBlack rounded-[5px] flex flex-col gap-6  justify-center items-center px-[6.5px]">
        <p className="uppercase text-[#838383] text-[12px] font-medium">
          Use your balance to upgrade
        </p>
        <div className="relative">
          <div className="absolute top-[10px] left-[10px]">
            <IconCoin
              width={16}
              height={17}
              color={`${disable ? "#808080" : "#E9AE15"}`}
            />
          </div>

          <input
            type="number"
            value={value}
            disabled={disable}
            onChange={(e: any) => handleChange(Number(e.target.value))}
            className={`bg-[#1212127A] w-[253px] py-[6px] pl-[34px] rounded-[5px] dropBlack text-[14px] font-semibold ${
              disable ? "text-[#808080]" : "text-[#D1D1D1]"
            } outline-none`}
          />
        </div>

        <div className="dropBlack bg-[#121212] w-[253px] h-[10px] px-[6px] rounded-[15px] flex items-center">
          <input
            type="range"
            value={progress}
            min={0}
            max={100}
            disabled={disable}
            onChange={(e) => handleChangeProgress(Number(e.target.value))}
            className="w-full h-[3px] appearance-none rounded-[15px] range-input"
            style={{
              background: `linear-gradient(to right, #E9AE15 ${progress}%, #121212 0%)`,
            }}
          />
        </div>

        <div className="flex flex-row w-[253px] gap-3">
          <button
            className="w-full h-[25px] text-[12px] font-semibold rounded-[5px]"
            style={{
              background:
                btnTab === 1 ? "linear-gradient(#F1B31A, #E48F0F)" : "#2F2F2F",
              color: btnTab === 1 ? "#121212" : "#8D8D8D",
            }}
            onClick={() => handleClickBtn(1)}
            disabled={disable}
          >
            10%
          </button>
          <button
            className="w-full h-[25px] text-[12px] font-semibold rounded-[5px]"
            style={{
              background:
                btnTab === 2 ? "linear-gradient(#F1B31A, #E48F0F)" : "#2F2F2F",
              color: btnTab === 2 ? "#121212" : "#8D8D8D",
            }}
            onClick={() => handleClickBtn(2)}
            disabled={disable}
          >
            25%
          </button>
          <button
            className="w-full h-[25px] text-[12px] font-semibold rounded-[5px]"
            style={{
              background:
                btnTab === 3 ? "linear-gradient(#F1B31A, #E48F0F)" : "#2F2F2F",
              color: btnTab === 3 ? "#121212" : "#8D8D8D",
            }}
            onClick={() => handleClickBtn(3)}
            disabled={disable}
          >
            50%
          </button>
          <button
            className="w-full h-[25px] text-[12px] font-semibold rounded-[5px]"
            style={{
              background:
                btnTab === 4 ? "linear-gradient(#F1B31A, #E48F0F)" : "#2F2F2F",
              color: btnTab === 4 ? "#121212" : "#8D8D8D",
            }}
            onClick={() => handleClickBtn(4)}
            disabled={disable}
          >
            Max
          </button>
        </div>
      </div>
    </div>
  );
};

export default BetAmount;
