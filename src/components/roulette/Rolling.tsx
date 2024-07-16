"use client";
import { useEffect, useState } from "react";

import CountUp from "react-countup";
import RoulettePro from "react-roulette-pro";
import { v4 as uuidv4 } from "uuid";
import "react-roulette-pro/dist/index.css";

const coins = [1, 2, 1, 2, 1, 3, 2, 1, 1, 2, 1, 2, 2, 1, 2];

const tempList = coins.map((coin) =>
  coin === 1
    ? {
        value: coin,
        image: "/assets/roulette/red.png",
      }
    : coin === 2
    ? {
        value: coin,
        image: "/assets/roulette/black.png",
      }
    : {
        value: coin,
        image: "/assets/roulette/gold.png",
      }
);

const coinsList = [
  ...tempList.map((temp) => ({
    id: uuidv4(),
    ...temp,
  })),
  ...tempList.map((temp) => ({
    id: uuidv4(),
    ...temp,
  })),
  ...tempList.map((temp) => ({
    id: uuidv4(),
    ...temp,
  })),
  ...tempList.map((temp) => ({
    id: uuidv4(),
    ...temp,
  })),
];

const Rolling = () => {
  const [start, setStart] = useState(false);

  const [centerDelimiter, setCenterDelimiter] = useState<boolean>(true);

  const handlePrizeDefined = () => {
    console.log("Defined");
  };

  const [second, setSecond] = useState<number>(14);

  useEffect(() => {
    setTimeout(() => {
      setCenterDelimiter(false);
      setStart(true);
    }, 15500);
  }, []);

  useEffect(() => {
    if (second <= 0) {
      return;
    }
    let counter = setInterval(() => {
      setSecond((prev) => prev - 1);
    }, 1000);
    return () => {
      clearInterval(counter);
    };
  }, [second]);

  return (
    <div className="relative">
      <RoulettePro
        prizes={coinsList}
        prizeIndex={(30 * 108) / 209}
        start={start}
        spinningTime={3}
        onPrizeDefined={handlePrizeDefined}
        defaultDesignOptions={{ hideCenterDelimiter: centerDelimiter }}
        options={{ stopInCenter: true, withoutAnimation: true }}
      />
      {!start && (
        <div className="text-xl text-center absolute top-7 w-full z-50">
          <p>ROLLING</p>
          <div className="text-2xl font-bold">
            <span>{second}&nbsp;.&nbsp;</span>
            <CountUp
              key={`counter-${second}`}
              start={99}
              end={0}
              decimals={0}
              duration={1}
              easingFn={(t: number, b: number, c: number, d: number) =>
                (c * t) / d + b
              }
              formattingFn={(val: number) => (val > 9 ? `${val}` : `0${val}`)}
            />
          </div>
        </div>
      )}
      <div className="absolute top-0 left-0 w-full h-full black-ground z-40"></div>
    </div>
  );
};

export default Rolling;
