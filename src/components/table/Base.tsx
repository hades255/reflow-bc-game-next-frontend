import React, { FC } from "react";
import Image from "next/image";

const BreakdownList = [
  {
    date: "2024-08-28",
    serverSeed:
      "96f3e04d221ca1b2048cc3b3b844e479f2bd9c80a870628072ee98fd1aa83cd0",
    publicSeed: "460670512935",
    rolls: "9839989 - 9842557",
  },
]

interface Props {
  column?: string[];
  data?: any[];
}
const TableBase: FC<Props> = ({ column, data }) => {
  return (
    <div className="w-full">
      <table className="w-full bg-[#191919] text-[#727272] rounded-[5px] overflow-hidden">
        <thead className="">
          <tr className="w-full h-[33px] bg-[#1F1F1F] rounded-[5px]">
            <th className=" text-[12px] font-semibold uppercase text-left pl-[12px]">
              Date
            </th>
            <th className=" text-[12px] font-semibold uppercase text-left">
              Server Seed
            </th>
            <th className="text-[12px] font-semibold uppercase text-left">
              Public seed
            </th>
            <th className="text-[12px] font-semibold uppercase pr-[12px] text-left">
              rolls
            </th>
          </tr>
        </thead>
        <tbody>
          {BreakdownList.map((item, index) => (
            <tr
              className={`w-full ${index % 2 === 1 ? "bg-[#1F1F1F]" : ""}`}
              key={index}
            >
              <td className=" h-[41px] flex items-center gap-[6px] pl-[12px]">
                <p className={`text-[12px] font-medium capitalize`}>
                  {item.date}
                </p>
              </td>
              <td className="">{item.serverSeed}</td>
              <td className="">{item.publicSeed}</td>
              <td className="flex items-center gap-[5px] pr-[12px]">
                <p className="text-[14px] font-medium">{item.rolls}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableBase;
