import React, { FC, useState, useRef, useEffect } from "react";
import RouletteItem from "./RouletteItem";
import Button from "@/components/buttons/Button";
import { Roulette, weaponAttributes } from "@/utils/Routlette/roulette.classes";

const rouletteList: weaponAttributes[] = [
  { title: "solana", value: "0", percent: "0", steam_image: "solana" },
  { title: "doge", value: "0", percent: "0", steam_image: "solana" },
  { title: "near", value: "0", percent: "0", steam_image: "solana" },
  { title: "shiba", value: "0", percent: "0", steam_image: "solana" },
  { title: "xrp", value: "0", percent: "0", steam_image: "solana" },
  { title: "pepe", value: "0", percent: "0", steam_image: "solana" },
  { title: "cro", value: "0", percent: "0", steam_image: "solana" },
  { title: "harmoney", value: "0", percent: "0", steam_image: "solana" },
  { title: "hedera", value: "0", percent: "0", steam_image: "solana" },
  { title: "avalanche", value: "0", percent: "0", steam_image: "solana" },
];

interface Props {
  onClose?: () => void;
}

const RoulettePage: FC<Props> = ({ onClose }) => {
  const [rouletteWeapons, setRouletteWeapons] =
    useState<weaponAttributes[]>(rouletteList);
  const [weaponPrizeId, setWeaponPrizeId] = useState<number>(-1);
  const [isReplay, setIsReplay] = useState<boolean>(false);
  const [isSpin, setIsSpin] = useState<boolean>(false);
  const [isSpinEnd, setIsSpinEnd] = useState<boolean>(false);
  const [winHistory, setWinHistory] = useState<weaponAttributes[]>([]);

  const rouletteContainerRef = useRef<HTMLDivElement>(null);
  const weaponsRef = useRef<HTMLDivElement>(null);

  function transitionEndHandler() {
    setWinHistory(winHistory.concat(rouletteWeapons[weaponPrizeId]));
    setIsSpin(false);
    setIsSpinEnd(true);
  }

  function prepare() {
    weaponsRef.current!.style.transition = "none";
    weaponsRef.current!.style.left = "0px";
  }

  function load() {
    let winner = rouletteList[Math.floor(Math.random() * rouletteList.length)];

    const roulette = new Roulette({
      winner,
      weapons: rouletteList,
      rouletteContainerRef,
      weaponsRef,
      weaponsCount: 100,
      transitionDuration: 5,
    });

    roulette.set_weapons();
    setRouletteWeapons(roulette.weapons);

    return roulette;
  }

  function play() {
    if (isReplay) {
      prepare();
    }
    setIsSpin(true);

    const roulette = load();

    setIsSpin(true);
    setWeaponPrizeId(roulette.spin());
    setIsReplay(true);
  }

  useEffect(() => {
    setTimeout(() => {
      play();
    }, 100);
  }, []);

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col">
        <div
          ref={rouletteContainerRef}
          className="relative w-[1920px] h-[300px] m-[0_auto]"
        >
          <div
            className="w-[18px] h-[290px] absolute z-[51] -top-[33px] left-[calc(50%_-_50px)]"
            style={{ backgroundImage: "url(/assets/images/line.png)" }}
          ></div>
          <div
            ref={weaponsRef}
            onTransitionEnd={transitionEndHandler}
            className="relative h-[200px] left-0 whitespace-nowrap"
          >
            {rouletteWeapons.map((item, index) => (
              <RouletteItem
                key={index}
                title={item.title}
                isSelect={index === weaponPrizeId && !isSpin && isSpinEnd}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-[10px] -ml-[70px]">
          <div className="w-[127px]">
            <Button clicked={onClose} text="Claim" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoulettePage;
