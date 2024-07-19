"use client";
import { useEffect, useState } from "react";

import CountUp from "react-countup";
import RoulettePro from "react-roulette-pro";
import { coinsTemplate } from "@/services/roulette";
import "react-roulette-pro/dist/index.css";



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
    }, 15400);
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
        prizes={coinsTemplate()}
        prizeIndex={(60 * 108) / 206}
        start={start}
        spinningTime={4}
        onPrizeDefined={handlePrizeDefined}
        defaultDesignOptions={{ hideCenterDelimiter: centerDelimiter }}
        options={{ stopInCenter: true, withoutAnimation: true }}
      />
      {!start && (
        <div className="text-xl text-center text-white absolute top-8 w-full z-50">
          <p>ROLLING</p>
          <div className="text-2xl font-bold text-white text-start pl-[calc(50%-36px)]">
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
      <div className="absolute top-0 left-0 w-full h-32 black-ground z-40"></div>
    </div>
  );
};

export default Rolling;
