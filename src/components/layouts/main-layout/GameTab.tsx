import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { changePage } from "@/redux/slices/main/pageSlice";
import NavButton from "@/components/buttons/NavButton";
import IconRoulette from "@/utils/icons/Roulette";
import IconSportsBet from "@/utils/icons/SportsBet";
import IconCoinFlip from "@/utils/icons/CoinFlip";
import IconCrown from "@/utils/icons/Crown";
import IconDuel from "@/utils/icons/Duel";

type TabType = {
  active: boolean;
  text: string;
  Icon: React.ComponentType<{
    width: number;
    height: number;
    color: string;
  }>;
};

const GameTab = () => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const setStatus = (idx: number) => {
    setTabs((prev) =>
      prev.map((tab, id) =>
        id === idx ? { ...tab, active: true } : { ...tab, active: false }
      )
    );
  };

  const handleClick = (idx: number) => {
    setStatus(idx);
    switch (idx) {
      case 0:
        router.push("/roulette");
        break;
      case 1:
        router.push("/sports");
        break;
      case 2:
        router.push("/coinflip");
        break;
      case 3:
        router.push("/upgrade");
        break;
      case 4:
        router.push("/price");
        break;
      default:
        break;
    }
  };

  const [tabs, setTabs] = useState<TabType[]>([
    { active: false, text: "King's Roll", Icon: IconRoulette },
    { active: false, text: "", Icon: IconSportsBet },
    { active: false, text: "ROYAL FLIP", Icon: IconCoinFlip },
    { active: false, text: "CROWN & KING", Icon: IconCrown },
    { active: false, text: "", Icon: IconDuel },
  ]);

  useEffect(() => {
    switch (pathname) {
      case "/roulette":
        dispatch(changePage("/roulette"));
        setStatus(0);
        break;
      case "/sports":
        dispatch(changePage("/sports"));
        setStatus(1);
        break;
      case "/coinflip":
        dispatch(changePage("/coinflip"));
        setStatus(2);
        break;
      case "/upgrade":
        dispatch(changePage("/upgrade"));
        setStatus(3);
        break;
      case "/price":
        dispatch(changePage("/price"));
        setStatus(4);
        break;
      default:
        setStatus(5);
        break;
    }
    if (pathname.includes("/profile")) dispatch(changePage("/profile"));
  }, [dispatch, pathname]);

  return (
    <div className="flex gap-4">
      {tabs.map(
        (tab, idx) =>
          tab.text !== "" && (
            <NavButton
              Icon={tab.Icon}
              active={tab.active}
              text={tab.text}
              clicked={() => handleClick(idx)}
              other={false}
              key={`tabs-${idx}`}
            />
          )
      )}
    </div>
  );
};

export default GameTab;
