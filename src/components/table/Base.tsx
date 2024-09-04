import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

const BreakdownList = [
  {
    created_at: "2024-08-28",
    server_seed:
      "96f3e04d221ca1b2048cc3b3b844e479f2bd9c80a870628072ee98fd1aa83cd0",
    public_seed: "460670512935",
    id: "9839989 - 9842557",
  },
];

interface Props {
  column?: string[];
  data?: any[];
}
const TableBase: FC<Props> = ({ column, data }) => {
  const [page, setPage] = useState<number>(1);
  const [showData, setShowData] = useState<any | undefined>();

  useEffect(() => {
    let temp = (data ?? []).slice(10 * (page - 1), 10 * page);
    setShowData([...temp]);
  }, [page, data]);

  // const handlePage = (index: number) => {};

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
              ID
            </th>
          </tr>
        </thead>
        <tbody>
          {showData?.map((item: any, index: any) => (
            <tr
              className={`w-full ${index % 2 === 1 ? "bg-[#1F1F1F]" : ""}`}
              key={index}
            >
              <td className=" h-[41px] flex items-center gap-[6px] pl-[12px]">
                <p className={`text-[12px] font-medium capitalize`}>
                  {item.created_at}
                </p>
              </td>
              <td className="">{item.server_seed}</td>
              <td className="">{item.public_seed}</td>
              <td className="flex items-center gap-[5px] pr-[12px]">
                <p className="text-[14px] font-medium">{item.id}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-row mt-[20px] gap-1">
        <div
          className="w-[40px] h-[40px] cursor-pointer rounded-sm flex flex-col justify-center bg-[#1F1F1F] text-center"
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          {"<<"}
        </div>
        <div
          className="w-[40px] h-[40px] rounded-sm flex cursor-pointer flex-col justify-center bg-[#1F1F1F] text-center text-white"
          onClick={() => setPage(1)}
        >
          1
        </div>
        <div
          className="w-[40px] h-[40px] rounded-sm flex flex-col cursor-pointer justify-center bg-[#1F1F1F] text-center text-white"
          onClick={() => setPage(2)}
        >
          2
        </div>
        <div
          className="w-[40px] h-[40px] rounded-sm flex flex-col justify-center cursor-pointer bg-[#1F1F1F] text-center text-white"
          onClick={() => setPage(3)}
        >
          3
        </div>
        <div
          className="w-[40px] h-[40px] rounded-sm flex flex-col justify-center bg-[#1F1F1F] cursor-pointer text-center text-white"
          onClick={() => setPage(4)}
        >
          4
        </div>
        <div
          className="w-[40px] h-[40px] rounded-sm flex flex-col justify-center bg-[#1F1F1F] text-center cursor-pointer text-white"
          onClick={() => setPage(5)}
        >
          5
        </div>
        <div
          className="w-[40px] h-[40px] rounded-sm flex flex-col justify-center bg-[#1F1F1F] text-center cursor-pointer text-white"
          onClick={() => {
            if (page < 5) {
              setPage(page + 1);
            }
          }}
        >
          {">>"}
        </div>
      </div>
    </div>
  );
};

export default TableBase;
