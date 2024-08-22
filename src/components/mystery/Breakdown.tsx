import React, { FC } from "react";
import Image from "next/image";
import { LEVEL_SYSTEM, XP_SYSTEM } from "@/config/constants";

const Breakdown: FC = () => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-[18px] font-bold text-[#D1D1D1]">XP Breakdown</p>

      <div className="w-full">
        <table className="w-full bg-[#191919] text-[#727272] font-semibold rounded-[5px] overflow-hidden h-[33px]">
          <thead className="">
            <tr className="w-full h-[33px] bg-[#1F1F1F] rounded-[5px]">
              <th className="w-[22%] text-[12px] font-semibold uppercase text-left pl-5">
                Tier
              </th>
              <th className="w-[22%] text-[12px] font-semibold uppercase text-left">
                level
              </th>
              <th className="w-[22%] text-[12px] font-semibold uppercase text-left">
                total xp
              </th>
              <th className="text-right text-[12px] font-semibold uppercase pr-5">
                Keys
              </th>
            </tr>
          </thead>
          <tbody>
            {XP_SYSTEM.map((item, index) => (
              <tr
                className={`w-full ${index % 2 === 1 ? "bg-[#1F1F1F]" : ""}`}
                key={index}
              >
                <td className="w-[200px] h-[41px] flex items-center gap-[6px] pl-5">
                  <Image
                    width={21}
                    height={21}
                    src={`/assets/icons/${item.rank.toLowerCase()}.png`}
                    alt="icon"
                  />
                  <p
                    className={`text-[12px] font-medium capitalize`}
                    style={{
                      color:
                        (LEVEL_SYSTEM.find(
                          (item_) => item_.name === item.rank.toLowerCase()
                        )?.color || "#727272") + "80",
                    }}
                  >
                    {item.rank}
                  </p>
                </td>
                <td className="w-[200px]">{item.level}</td>
                <td className="w-[200px]">{item.xp}</td>
                <td className="justify-end flex items-center gap-[5px] pr-5">
                  <Image
                    width={21}
                    height={21}
                    src={`/assets/icons/${item.rank.toLowerCase()}-key.png`}
                    alt="icon"
                  />
                  <p className="w-4 text-end text-[14px] font-medium">{item.keys}</p>
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
