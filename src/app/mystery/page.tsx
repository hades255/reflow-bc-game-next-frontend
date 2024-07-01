import React, { FC } from "react";
import Breakdown from "@/components/mystery/Breakdown";
import CaseBox from "@/components/mystery/CaseBox";
import CaseItem from "@/components/mystery/CaseItem";

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
  return (
    <div className="p-6">
      <div className="w-[1000px] flex flex-col gap-4">
        <CaseBox />
        <div className="flex flex-col gap-6">
          <p className="text-[18px] font-bold text-[#D1D1D1]">
            Items In The Case
          </p>
          <div className="grid grid-cols-5 gap-4">
            {caseList.map((item, index) => (
              <CaseItem key={index} title={item.title} />
            ))}
          </div>
        </div>
        <Breakdown />
      </div>
    </div>
  );
};

export default MysteryPage;
