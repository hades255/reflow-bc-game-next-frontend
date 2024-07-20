"use client";
import { FC, Dispatch, useEffect, useState, SetStateAction } from "react";

import CountUp from "react-countup";
import RoulettePro from "react-roulette-pro";
import { coinsTemplate } from "@/services/roulette";
import "react-roulette-pro/dist/index.css";

interface Props {
  second: number;
  setSecond: Dispatch<SetStateAction<number>>;
}

const Rolling: FC<Props> = ({ second, setSecond}) => {
  const [start, setStart] = useState(false);

  const [centerDelimiter, setCenterDelimiter] = useState<boolean>(true);

  const handlePrizeDefined = () => {
    console.log("Defined");
  };

  useEffect(() => {
    if (second <= 0) {
      if (second === -1) {
        setStart(false);
        return;
      } else {
        setTimeout(() => {
          setCenterDelimiter(false);
          setStart(true);
        }, 1100);
      }
    } else {
      let counter = setInterval(() => {
        setSecond((prev) => prev - 1);
      }, 1000);
      return () => {
        clearInterval(counter);
      };
    }
  }, [second]);

  return (
    <div className="relative">
      <RoulettePro
        prizes={coinsTemplate()}
        prizeIndex={(66 * 108) / 206}
        start={start}
        spinningTime={Math.random()*3+3}
        onPrizeDefined={handlePrizeDefined}
        defaultDesignOptions={{ hideCenterDelimiter: centerDelimiter }}
        options={{ stopInCenter: true, withoutAnimation: true }}
      />
      {!start && second !== -1 && (
        <div className="text-xl text-center text-white absolute top-10 w-full z-50">
          <p className="text-sm">ROLLING</p>
          <div className="text-2xl font-bold text-white flex justify-between w-15 px-[calc(50%-30px)]">
            <span>{second}&nbsp;.</span>
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
      <div className="absolute top-0 -left-6 w-[calc(100%+48px)] h-32 black-ground z-40"></div>
    </div>
  );
};

export default Rolling;
