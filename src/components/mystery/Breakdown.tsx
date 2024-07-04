import React, { FC } from "react";
import Image from "next/image";

const BreakdownList = [
  { tier: "bronze", level: 1, totalXP: 20, keys: 2, color: "text-[#C5946A]" },
  { tier: "silver", level: 1, totalXP: 20, keys: 2, color: "text-[#C9C9C9]" },
  { tier: "gold", level: 1, totalXP: 20, keys: 2, color: "text-[#ECC175]" },
  { tier: "platinum", level: 1, totalXP: 20, keys: 2, color: "text-[#68C9F0]" },
  { tier: "diamond", level: 1, totalXP: 20, keys: 2, color: "text-[#CF9DDB]" },
  { tier: "saphire", level: 1, totalXP: 20, keys: 2, color: "text-[#E5E5E5]" },
  { tier: "warden", level: 1, totalXP: 20, keys: 2, color: "text-[#3E76E7]" },
  { tier: "prince", level: 1, totalXP: 20, keys: 2, color: "text-[#EEEEEE]" },
  { tier: "monarch", level: 1, totalXP: 20, keys: 2, color: "text-[#EEEEEE]" },
];
const Breakdown: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[18px] font-bold text-[#D1D1D1]">XP Breakdown</p>

      <div className="w-full">
        <table className="w-full bg-[#191919] text-[#727272] rounded-[5px] overflow-hidden">
          <thead className="">
            <tr className="w-full h-[33px] bg-[#1F1F1F] rounded-[5px]">
              <th className="w-[200px] text-[12px] font-semibold uppercase text-left pl-[12px]">
                Tier
              </th>
              <th className="w-[200px] text-[12px] font-semibold uppercase text-left">
                level
              </th>
              <th className="w-[200px] text-[12px] font-semibold uppercase text-left">
                total xp
              </th>
              <th className="text-right text-[12px] font-semibold uppercase pr-[12px]">
                Keys
              </th>
            </tr>
          </thead>
          <tbody>
            {BreakdownList.map((item, index) => (
              <tr
                className={`w-full ${index % 2 === 1 ? "bg-[#1F1F1F]" : ""}`}
                key={index}
              >
                <td className="w-[200px] h-[41px] flex items-center gap-[6px] pl-[12px]">
                  <Image
                    width={18}
                    height={18}
                    src={`/assets/icons/${item.tier}.png`}
                    alt="icon"
                  />
                  <p
                    className={`text-[12px] font-medium ${item.color} capitalize`}
                  >
                    {item.tier}
                  </p>
                </td>
                <td className="w-[200px]">1</td>
                <td className="w-[200px]">20</td>
                <td className="justify-end flex items-center gap-[5px] pr-[12px]">
                  <Image
                    width={21}
                    height={21}
                    src={`/assets/icons/${item.tier}-key.png`}
                    alt="icon"
                  />
                  <p className="text-[14px] font-medium">2</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Breakdown;
