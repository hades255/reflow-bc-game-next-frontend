"use client";

import React, { FC, useState } from "react";
import Breakdown from "@/components/mystery/Breakdown";
import CaseBox from "@/components/mystery/CaseBox";
import CaseItem from "@/components/mystery/CaseItem";
import ProfileLayout from "@/components/profile/ProfileLayout";
import Roulette from "@/components/mystery/Roulette/Roulette";
import BaseModal from "@/components/Modal/BaseModal";
import { LEVEL_SYSTEM } from "@/config/constants";
import { weaponAttributes } from "@/utils/Routlette/roulette.classes";

export const caseList: weaponAttributes[] = [
  {
    case: "bronze",
    title: "P90 | Sand Spray",
    coin: 0.01,
    url: "https://images.waxpeer.com/i/730-p90-sand-spray-factory-new.webp",
    percent: 0,
  },
  {
    case: "bronze",
    title: "MP7 | Army Recon",
    coin: 0.02,
    url: "https://images.waxpeer.com/i/730-mp7-army-recon-factory-new.webp",
    percent: 0,
  },
  {
    case: "bronze",
    title: "M4A4 | Mainframe",
    coin: 0.05,
    url: "https://images.waxpeer.com/i/730-m4a4-mainframe-factory-new.webp",
    percent: 0,
  },
  {
    case: "bronze",
    title: "Galil AR | Cold Fusion",
    coin: 0.08,
    url: "https://images.waxpeer.com/i/730-galil-ar-cold-fusion-factory-new.webp",
    percent: 0,
  },
  {
    case: "bronze",
    title: "PP Bizon | Candy Apple",
    coin: 0.09,
    url: "https://images.waxpeer.com/i/730-galil-ar-cold-fusion-factory-new.webp",
    percent: 0,
  },
  {
    case: "bronze",
    title: "M4A1-S | Hyper Beast",
    coin: 50,
    url: "https://images.waxpeer.com/i/730-m4a1-s-hyper-beast-factory-new.webp",
    percent: 0,
  },
  {
    case: "silver",
    title: "XM1014 | Blue Spruce",
    coin: 0.03,
    url: "https://images.waxpeer.com/i/730-xm1014-blue-spruce-factory-new.webp",
    percent: 0,
  },
  {
    case: "silver",
    title: "Famas | Colony",
    coin: 0.03,
    url: "https://images.waxpeer.com/i/730-famas-colony-factory-new.webp",
    percent: 0,
  },
  {
    case: "silver",
    title: "SCAR-20 | Blue Print",
    coin: 0.5,
    url: "https://images.waxpeer.com/i/730-scar-20-blueprint-factory-new.webp",
    percent: 0,
  },
  {
    case: "silver",
    title: "AWP | Atheris",
    coin: 3,
    url: "https://images.waxpeer.com/i/730-awp-atheris-factory-new.webp",
    percent: 0,
  },
  {
    case: "silver",
    title: "Desert Eagle | Ocean Drive",
    coin: 90,
    url: "https://images.waxpeer.com/i/730-desert-eagle-ocean-drive-factory-new.webp",
    percent: 0,
  },
  {
    case: "gold",
    title: "Galil AR | Cold Fusion",
    coin: 0.04,
    url: "https://images.waxpeer.com/i/730-galil-ar-cold-fusion-factory-new.webp",
    percent: 0,
  },
  {
    case: "gold",
    title: "P2000 | Imperial Factory",
    coin: 0.8,
    url: "https://images.waxpeer.com/i/730-p2000-imperial-factory-new.webp",
    percent: 0,
  },
  {
    case: "gold",
    title: "M4A4 | Magnesium",
    coin: 0.9,
    url: "https://images.waxpeer.com/i/730-m4a4-magnesium-factory-new.webp",
    percent: 0,
  },
  {
    case: "gold",
    title: "Sawed-off | Limelight",
    coin: 2,
    url: "https://images.waxpeer.com/i/730-sawed-off-limelight-factory-new.webp",
    percent: 0,
  },
  {
    case: "gold",
    title: "MP9 | Ruby Poison Dart",
    coin: 7,
    url: "https://images.waxpeer.com/i/730-mp9-ruby-poison-dart-factory-new.webp",
    percent: 0,
  },
  {
    case: "gold",
    title: "Five Seven | Angry Mob",
    coin: 18,
    url: "https://images.waxpeer.com/i/730-five-seven-angry-mob-factory-new.webp",
    percent: 0,
  },
  {
    case: "gold",
    title: "PP-Bizon | High Roller",
    coin: 24,
    url: "https://images.waxpeer.com/i/730-pp-bizon-high-roller-factory-new.webp",
    percent: 0,
  },
  {
    case: "gold",
    title: "AK-47 | Red Laminate",
    coin: 140,
    url: "https://images.waxpeer.com/i/730-ak-47-red-laminate-factory-new.webp",
    percent: 0,
  },
];

const MysteryPage: FC = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative">
      <ProfileLayout select={4}>
        <div className="w-full flex flex-col gap-4">
          <CaseBox
            onClick={() => setOpen(true)}
            current={current}
            setCurrent={setCurrent}
          />
          <div className="flex flex-col gap-6">
            <p className="text-[18px] font-bold text-[#D1D1D1]">
              Items In The Case
            </p>
            <div className="grid grid-cols-5 gap-12">
              {caseList
                .filter((item) => item.case === LEVEL_SYSTEM[current].name)
                .map((item, index) => (
                  <CaseItem key={index} {...item} />
                ))}
            </div>
          </div>
          <Breakdown />
        </div>
      </ProfileLayout>

      {open && (
        <BaseModal>
          <div className="w-full h-[220px]">
            <Roulette onClose={() => setOpen(false)} />
          </div>
        </BaseModal>
      )}
    </div>
  );
};

export default MysteryPage;
