import React, {
  FC,
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import RouletteItem from "./RouletteItem";
import Button from "@/components/buttons/Button";
import { Roulette, weaponAttributes } from "@/utils/Routlette/roulette.classes";
import { caseList, LEVEL_SYSTEM } from "@/config/constants";
import { fetchAPI } from "@/services/fetchAPI";
import { updateBalance } from "@/redux/slices/main/balanceSlice";
import { useDispatch } from "react-redux";

function lcg(seed: any) {
  const m = 0x80000000; // 2**31
  let state = Math.floor(Math.random() * seed) % m;
  return function () {
    state = (state + Math.floor(Math.random() * Date.now())) % m;
    return state / m;
  };
}

interface Props {
  onClose: () => void;
  reLoadKeys: () => void;
  tier: string;
  current: number;
}

const RoulettePage: FC<Props> = ({ onClose, reLoadKeys, tier, current }) => {
  const random = useMemo(
    () => lcg(localStorage.getItem("PUBLIC_CLIENT_SEED") || 123456789012),
    []
  );

  const dispatch = useDispatch();

  const [rouletteWeapons, setRouletteWeapons] = useState<weaponAttributes[]>(
    caseList.filter((item) => item.case === LEVEL_SYSTEM[current].name)
  );
  const [weaponPrizeId, setWeaponPrizeId] = useState<number>(-1);
  const [isSpin, setIsSpin] = useState<boolean>(false);
  const [isSpinEnd, setIsSpinEnd] = useState<boolean>(false);
  const [winHistory, setWinHistory] = useState<weaponAttributes[]>([]);
  const [winner, setWinner] = useState<weaponAttributes>();
  const [playFlag, setPlayFlag] = useState(false);

  const [finished, setFinished] = useState(0);

  const rouletteContainerRef = useRef<HTMLDivElement>(null);
  const weaponsRef = useRef<HTMLDivElement>(null);

  const transitionEndHandler = useCallback(() => {
    setWinHistory(winHistory.concat(rouletteWeapons[weaponPrizeId]));
    setIsSpin(false);
    setIsSpinEnd(true);
  }, [winHistory, rouletteWeapons, weaponPrizeId]);

  const load = useCallback(() => {
    const percents = rouletteWeapons.map((item) => item.percent[tier]);
    const sum = percents.reduce((a, b) => a + b);
    const rand = random() * sum;
    let s = 0;
    let winC = 0;
    percents.some((item, index) => {
      s += item;
      if (rand < s) {
        winC = index;
        return true;
      }
    });
    console.log(percents, sum, rand, s, winC);
    let winner = rouletteWeapons[winC];

    const roulette = new Roulette({
      winner,
      weapons: rouletteWeapons,
      rouletteContainerRef,
      weaponsRef,
      weaponsCount: 100,
      transitionDuration: 5,
    });

    (async () => {
      try {
        const response = await fetchAPI("/api/profile/winMysteryBox", "POST", {
          coin: winner.coin,
          level: current + 1,
          tier,
        });
        if (response.data.msg === "OK") setFinished(1);
        else setFinished(2);
        reLoadKeys();
      } catch (error) {
        console.log(error);
      }
    })();

    roulette.set_weapons();
    setRouletteWeapons(roulette.weapons);
    setWinner(winner);

    return roulette;
  }, [current, reLoadKeys, rouletteWeapons, tier, random]);

  const play = useCallback(() => {
    const roulette = load();
    setIsSpin(true);
    setWeaponPrizeId(roulette.spin());
  }, [load]);

  const handleClaim = useCallback(() => {
    if (finished === 1)
      dispatch(updateBalance({ balance: Number(winner?.coin || 0) }));
    onClose();
  }, [onClose, winner, dispatch, finished]);

  useEffect(() => {
    setTimeout(() => {
      setPlayFlag(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (playFlag) {
      play();
      setPlayFlag(false);
    }
  }, [play, playFlag]);

  return (
    <div className="flex flex-row justify-center">
      <div className="flex flex-col">
        <div
          ref={rouletteContainerRef}
          className="relative w-[1920px] h-[300px] m-[0_auto]"
        >
          <div
            className="w-[18px] h-[290px] absolute z-[51] -top-[33px] left-[calc(50%_-_9px)]"
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
                tier={tier}
                {...item}
                isSelect={index === weaponPrizeId && !isSpin && isSpinEnd}
              />
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-[10px]">
          <div className="w-[127px]">
            <Button
              clicked={handleClaim}
              text="Claim"
              disabled={finished === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoulettePage;
