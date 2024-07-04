"use client";

import React, { FC, useState } from "react";
import Breakdown from "@/components/mystery/Breakdown";
import CaseBox from "@/components/mystery/CaseBox";
import CaseItem from "@/components/mystery/CaseItem";
import ProfileLayout from "@/components/profile/ProfileLayout";
import Roulette from "@/components/mystery/Roulette/Roulette";
import BaseModal from "@/components/Modal/BaseModal";

const caseList = [
  { title: "solana" },
  { title: "doge" },
  { title: "near" },
  { title: "shiba" },
  { title: "xrp" },
  { title: "pepe" },
  { title: "cro" },
  { title: "harmoney" },
  { title: "hedera" },
  { title: "avalanche" },
];

const MysteryPage: FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <ProfileLayout select={4}>
        <div className="w-full flex flex-col gap-4">
          <CaseBox onClick={() => setOpen(true)} />
          <div className="flex flex-col gap-6">
            <p className="text-[18px] font-bold text-[#D1D1D1]">
              Items In The Case
            </p>
            <div className="grid grid-cols-5 gap-12">
              {caseList.map((item, index) => (
                <CaseItem key={index} title={item.title} />
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
