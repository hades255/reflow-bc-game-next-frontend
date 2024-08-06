"use client";
import { FC, Dispatch, useEffect, useState, SetStateAction } from "react";
import Image from "next/image";
import CountUp from "react-countup";
import { useWinning } from "@/redux/slices/roulette/winningSlice";
import RoulettePro from "react-roulette-pro";
import { coinsTemplate } from "@/services/roulette";
import "react-roulette-pro/dist/index.css";

interface Props {
  key: string;
  second: number;
  setSecond: Dispatch<SetStateAction<number>>;
  acted: number;
  finish: () => void;
  start: boolean;
  setStart: Dispatch<SetStateAction<boolean>>;
}

const Rolling: FC<Props> = ({
  second,
  setSecond,
  acted,
  finish,
  start,
  setStart,
}) => {
  const [centerDelimiter, setCenterDelimiter] = useState<boolean>(false);
  const winning = useWinning();

  useEffect(() => {
    if (acted !== -1 && second === 15) {
      setCenterDelimiter(true);
      setStart(true);
    }
    if (second <= 0) {
      if (second === -1) {
        setStart(false);
        return;
      } else {
        setTimeout(() => {
          setCenterDelimiter(true);
          setStart(true);
        }, 1000);
      }
    } else if (second > 0 && second < 15) {
      let counter = setInterval(() => {
        setCenterDelimiter(false);
        setSecond((prev) => prev - 1);
      }, 1000);
      return () => {
        clearInterval(counter);
      };
    }
  }, [second, acted, setSecond, setStart]);

  return (
    <div className="relative">
      <Image src={"/assets/roulette/red.png"} width={108} height={108} alt="" className="hidden" />
      <Image src={"/assets/roulette/black.png"} width={108} height={108} alt="" className="hidden" />
      <Image src={"/assets/roulette/gold.png"} width={108} height={108} alt="" className="hidden" />
      <RoulettePro
        prizes={coinsTemplate}
        prizeIndex={((66 + (winning.index || 0)) * 108) / 206}
        start={start}
        spinningTime={acted === -1 ? 5 : acted}
        onPrizeDefined={finish}
        defaultDesignOptions={{ hideCenterDelimiter: !centerDelimiter }}
        options={{ stopInCenter: true, withoutAnimation: true }}
      />
      {!start && second > -1 && (
        <div className="text-xl text-center text-white absolute top-9 w-full z-50">
          <p className="text-xl">ROLLING</p>
          <div className="text-xl font-black text-white flex justify-between px-[calc(50%-24px)]">
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
