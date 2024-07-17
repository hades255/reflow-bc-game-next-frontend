import { FC } from "react";
import Image from "next/image";
import { TfiCup } from "react-icons/tfi";
import { PiCoinsLight } from "react-icons/pi";
import { HiOutlineFlag } from "react-icons/hi";

interface Props {
  list: {
    id: number;
    name: string;
    avatar: string;
    wagered: number;
    prize: number;
  }[];
}

const DailyTable: FC<Props> = ({ list }) => {
  return (
    <div className="flex flex-col gap-4 mt-12 px-6">
      <p className="text-[18px] font-semibold text-[#D1D1D1] flex items-center"><span className="text-gold"><HiOutlineFlag /></span>&nbsp;Roulette Race</p>

      <div className="w-full">
        <table className="w-full bg-[#191919] text-[#727272] rounded-[5px] overflow-hidden">
          <thead className="">
            <tr className="w-full h-[33px] bg-[#1F1F1F] rounded-[5px]">
              <th className="w-[150px] text-[12px] font-semibold uppercase text-left pl-[12px]">
                #
              </th>
              <th className="w-[400px] text-[12px] font-semibold uppercase text-left">
                Name
              </th>
              <th className="w-[200px] text-[12px] font-semibold uppercase text-left">
                Wadered
              </th>
              <th className="text-right text-[12px] font-semibold uppercase pr-[12px]">
                Prize
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr
                className={`w-full ${index % 2 === 1 ? "bg-[#1F1F1F]" : ""}`}
                key={`daily-table-${index}`}
              >
                <td className="w-[150px] h-[40px] flex items-center gap-[6px] pl-[12px]">
                  {index < 3 && (
                    <span
                      className={
                        index === 0
                          ? "text-gold"
                          : index === 1
                          ? "text-font"
                          : "text-[#F08A48]"
                      }
                    >
                      <TfiCup />
                    </span>
                  )}
                  <p className={`text-[12px] ${index < 3 ? 'font-bold text-white' : 'font-medium text-[#727272]'}`}>
                    {item.id}
                    {index === 0
                      ? "st"
                      : index === 1
                      ? "nd"
                      : index === 2
                      ? "rd"
                      : "th"}
                  </p>
                </td>
                <td className="w-[200px]">
                  <div className="w-full h-full flex items-center gap-2">
                    {index < 3 && (
                      <Image
                        width={24}
                        height={24}
                        src={item.avatar}
                        alt=""
                        className="rounded-sm"
                      />
                    )}
                    <span className={index < 3 ? "text-white" : "text-[#727272]"}>{item.name}</span>
                  </div>
                </td>
                <td className="w-[200px]">
                  <div className="flex items-center gap-2">
                    <span className={index < 3 ? "text-gold" : "text-font"}>
                      <PiCoinsLight />
                    </span>
                    {item.wagered}
                  </div>
                </td>
                <td className="justify-end flex items-center gap-[5px] pr-[12px]">
                  {item.prize}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DailyTable;
