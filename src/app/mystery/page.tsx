"use client";

import React, { FC, useState } from "react";
import Breakdown from "@/components/mystery/Breakdown";
import CaseBox from "@/components/mystery/CaseBox";
import CaseItem from "@/components/mystery/CaseItem";
import { caseList, LEVEL_SYSTEM } from "@/config/constants";
import BaseModal from "@/components/Modal/BaseModal";
import Roulette from "@/components/mystery/Roulette/Roulette";

const MysteryPage: FC = () => {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);

  return (
    <div className="p-6">
      <div className="w-[1000px] flex flex-col gap-4">
        <CaseBox
          onClick={() => setOpen(true)}
          current={current}
          setCurrent={setCurrent}
        />
        <div className="flex flex-col gap-6">
          <p className="text-[18px] font-bold text-[#D1D1D1]">
            Items In The Case
          </p>
          <div className="grid grid-cols-5 gap-4">
            {caseList
              .filter((item) => item.case === LEVEL_SYSTEM[current].name)
              .map((item, index) => (
                <CaseItem key={index} {...item} />
              ))}
          </div>
        </div>
        <Breakdown />
      </div>
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
