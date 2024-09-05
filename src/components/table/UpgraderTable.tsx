import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { apiListUpgrader } from "@/services/fairness";

const UpgraderTable: FC = () => {
  const [page, setPage] = useState<number>(1);
  const [showData, setShowData] = useState<any | undefined>();
  const [total, setTotal] = useState<number>(0);
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    (async () => {
      if (10 * (page - 1) < total || 10 * (page - 1) == total) {
        const result = await apiListUpgrader({ perPage: 10, page: page });
        setTotal(result?.data?.total);
        setShowData(result?.data?.items);
        setCurrent(result?.data?.current);
      }
    })();
  }, [page]);

  return (
    <div className="w-full">
      <div className="overflow-x-auto overflow-y-hidden w-full">
        <table className="w-full bg-[#191919] text-[#727272] min-w-[1200px] rounded-[5px]">
          <thead className="">
            <tr className="h-[33px] bg-[#1F1F1F] rounded-[5px]">
              <th className="text-[12px] font-semibold uppercase text-left pl-[12px]">
                Date
              </th>
              <th className=" text-[12px] font-semibold uppercase text-left">
                ID
              </th>
              <th className="text-[12px] font-semibold uppercase text-left">
                BET
              </th>
              <th className="text-[12px] font-semibold uppercase text-left">
                SERVER SEED
              </th>
              <th className="text-[12px] font-semibold uppercase text-left">
                SERVER SEED HASH
              </th>
              <th className="text-[12px] font-semibold uppercase text-left">
                PUBLIC SEED
              </th>
              <th className="text-[12px] font-semibold uppercase text-left pr-[12px]">
                WIN
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
                    {moment(item.created_at).format("YYYY-MM-DD")}
                  </p>
                </td>
                <td className="">{item.id}</td>
                <td className="">{item.bet_amount}</td>
                <td className="">{item.server_seed}</td>
                <td className="">{item.server_seed_hash}</td>
                <td className="">{item.public_seed}</td>
                <td className="flex items-center gap-[5px] pr-[12px]">
                  {item.winner ? (
                    <p className="text-[12px] text-green-700">Win</p>
                  ) : (
                    <p className="text-[12px] text-red-700">Lost</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-row mt-[20px] gap-1">
        <button
          className="w-[40px] h-[40px] cursor-pointer rounded-sm bg-[#1F1F1F] text-center"
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
        >
          {"<<"}
        </button>
        <button
          className="w-[40px] h-[40px] rounded-sm  cursor-pointer bg-[#1F1F1F] text-center text-white"
          onClick={() => setPage(1)}
        >
          1
        </button>
        <button
          className="w-[40px] h-[40px] rounded-sm cursor-pointer bg-[#1F1F1F] text-center text-white"
          onClick={() => setPage(2)}
        >
          2
        </button>
        <button
          className="w-[40px] h-[40px] rounded-sm cursor-pointer bg-[#1F1F1F] text-center text-white"
          onClick={() => setPage(3)}
        >
          3
        </button>
        <button
          className="w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] cursor-pointer text-center text-white"
          onClick={() => setPage(4)}
        >
          4
        </button>
        <button
          className="w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] text-center cursor-pointer text-white"
          onClick={() => setPage(5)}
        >
          5
        </button>
        <button
          className="w-[40px] h-[40px] rounded-sm bg-[#1F1F1F] text-center cursor-pointer text-white"
          onClick={() => {
            if (page < 5) {
              setPage(page + 1);
            }
          }}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
};

export default UpgraderTable;
