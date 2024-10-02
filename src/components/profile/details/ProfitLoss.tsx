import React, { FC, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import LabelItem from "./LabelItem";
import { fetchAPI } from "@/services/fetchAPI";

interface CustomProps {
  active?: any;
  payload?: any;
}

export const fixed2 = (param: any) => {
  return Math.round(param * 100) / 100;
};

const CustomTooltip: FC<CustomProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const uv = payload[0].payload.uv;
    return (
      <div
        className="text-white"
        style={{
          backgroundColor: "transparent",
          padding: "5px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <p>{`${uv >= 0 ? "Profit" : "Lose"}: $${fixed2(uv)}`}</p>
      </div>
    );
  }
  return null;
};

const selectItems = [
  "All",
  "This Year",
  "Last Month",
  "This Month",
  "12h",
  "24h",
];

const ProfitLoss: FC = () => {
  const [selectItem, setSelectItem] = useState(3);

  const [graphdata, setGraphdata] = useState([]);
  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);

  useEffect(() => {
    (async () => {
      const { data } = await fetchAPI(
        "/api/profile/profitloss?selection=" + selectItem,
        "GET"
      );
      if (data.data && data.data.length > 0) {
        if (selectItem === 2 || selectItem === 3 || selectItem === 5)
          setGraphdata(
            data.data.map((item: any, index: any) =>
              index % 2 ? { ...item, name: "" } : { ...item }
            )
          );
        else setGraphdata(data.data);
      }
      setWinCount(data.wins);
      setLoseCount(data.lose);
    })();
  }, [selectItem]);

  const gradientOffset = () => {
    const dataMax = Math.max(...graphdata.map((i: any) => i.uv));
    const dataMin = Math.min(...graphdata.map((i: any) => i.uv));

    if (dataMax <= 0) {
      return 0;
    }
    if (dataMin >= 0) {
      return 1;
    }

    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <div className="w-full h-[400px] p-3 profile-box">
      <div className="flex flex-row justify-between mb-3 ml-3 mr-3">
        <p className="font-semibold text-[14px] text-[#D1D1D1]">
          Profit & Loss
        </p>
        <div className="flex flex-row gap-1">
          {selectItems.map((item, index) => (
            <LabelItem
              key={index}
              text={item}
              onClick={() => setSelectItem(index)}
              active={selectItem === index}
            />
          ))}
        </div>
      </div>
      <div className="w-full h-[295px] bg-[#161616] relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={graphdata}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <ReferenceLine y={0} stroke="#292929" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 8 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <defs>
              <linearGradient id="strokeColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B3FD63" stopOpacity={1} />
                <stop offset={off} stopColor="#D2FE25" stopOpacity={1} />
                <stop offset={off} stopColor="#FB4454" stopOpacity={1} />
                <stop offset="100%" stopColor="#E9505C" stopOpacity={1} />
              </linearGradient>
            </defs>
            <defs>
              <linearGradient id="fillColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#B3FD63" stopOpacity={0.24} />
                <stop offset={off} stopColor="#D2FE25" stopOpacity={0} />
                <stop offset={off} stopColor="#FB4454" stopOpacity={0} />
                <stop offset="100%" stopColor="#E9505C" stopOpacity={0.24} />
              </linearGradient>
            </defs>
            <Area
              type="monotone"
              dataKey="uv"
              stroke="url(#strokeColor)"
              fill="url(#fillColor)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>

        {false && (
          <div className="flex flex-row gap-3 absolute bottom-3 right-4">
            <div className="border border-[#8787877A] border-dashed py-2 px-3 flex rounded-[5px] bg-[#191919AD] relative">
              <p className="font-normal text-[10px] text-[#878787]">
                Total Wins:
              </p>
              <p className="ml-1 font-normal text-[10px] text-[#CAFE35]">
                {winCount}
              </p>
            </div>

            <div className="border border-[#8787877A] border-dashed py-2 px-3 flex rounded-[5px] bg-[#191919AD] relative">
              <p className="font-normal text-[10px] text-[#878787]">
                Total Lose:
              </p>
              <p className="ml-1 font-normal text-[10px] text-[#EF4D59]">
                {loseCount}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfitLoss;
