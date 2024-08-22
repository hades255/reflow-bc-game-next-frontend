"use client";

import React, { FC, useCallback, useEffect, useState } from "react";
import Breakdown from "@/components/mystery/Breakdown";
import CaseBox from "@/components/mystery/CaseBox";
import CaseItem from "@/components/mystery/CaseItem";
import ProfileLayout from "@/components/profile/ProfileLayout";
import Roulette from "@/components/mystery/Roulette/Roulette";
import BaseModal from "@/components/Modal/BaseModal";
import { caseList, LEVEL_SYSTEM } from "@/config/constants";
import { fetchAPI } from "@/services/fetchAPI";

const MysteryPage: FC = () => {
  const [keys, setKeys] = useState([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const [tier, setTier] = useState("FN"); //  BS / MW / FN

  const reLoadKeys = useCallback(() => {
    (async () => {
      try {
        const response = await fetchAPI("/api/profile/keys", "GET");
        setKeys(response.data.keys);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => reLoadKeys(), [reLoadKeys]);

  return (
    <div className="relative">
      <ProfileLayout select={4}>
        <div className="w-full flex flex-col gap-4">
          <CaseBox
            onClick={() => setOpen(true)}
            current={current}
            setCurrent={setCurrent}
            tier={tier}
            setTier={setTier}
            keys={keys}
          />
          <div className="flex flex-col gap-6">
            <p className="text-[18px] font-bold text-[#D1D1D1]">
              Items In The Case
            </p>
            <div className="grid xl:grid-cols-5 lg:grid-cols-3 xl:gap-6 lg:gap-4">
              {caseList
                .filter((item) => item.case === LEVEL_SYSTEM[current].name)
                .map((item, index) => (
                  <CaseItem key={index} {...item} tier={tier} />
                ))}
            </div>
          </div>
          <Breakdown />
        </div>
      </ProfileLayout>

      {open && (
        <BaseModal>
          <div className="w-full h-[220px]">
            <Roulette
              onClose={() => setOpen(false)}
              tier={tier}
              current={current}
              reLoadKeys={reLoadKeys}
            />
          </div>
        </BaseModal>
      )}
    </div>
  );
};

export default MysteryPage;
