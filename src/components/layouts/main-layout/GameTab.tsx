import React, { useState } from "react";
import { useRouter } from "next/navigation";

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

  const handleClick = (idx: number) => {
    setTabs((prev) =>
      prev.map((tab, index) =>
        idx === index ? { ...tab, active: true } : { ...tab, active: false }
      )
    );
    switch (idx) {
      case 0:
        router.push("/roulette");
        break;
      case 1:
        router.push("/roulette");
        break;
      case 2:
        router.push("/coinflip");
        break;
      case 3:
        router.push("/upgrade");
        break;
      case 4:
        router.push("/upgrade");
        break;
      default:
        break;
    }
  };

  const [tabs, setTabs] = useState<TabType[]>([
    { active: false, text: "ROULETTE", Icon: IconRoulette },
    { active: false, text: "SPORTS BETTING", Icon: IconSportsBet },
    { active: true, text: "ROYAL FLIP", Icon: IconCoinFlip },
    { active: false, text: "CROWN & KING", Icon: IconCrown },
    { active: false, text: "PRICE PREDICTION", Icon: IconDuel },
  ]);

  return (
    <div className="flex gap-4">
      {tabs.map((tab, idx) => (
        <NavButton
          Icon={tab.Icon}
          active={tab.active}
          text={tab.text}
          clicked={() => handleClick(idx)}
          other={false}
          key={`tabs-${idx}`}
        />
      ))}
    </div>
  );
};

export default GameTab;
