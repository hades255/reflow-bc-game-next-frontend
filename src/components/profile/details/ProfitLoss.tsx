import React, { FC, useState } from "react";
import moment from "moment";
import {
  AreaChart,
  Area,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  YAxis,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import LabelItem from "./LabelItem";

const data = [
  {
    name: "01",
    uv: 4000,
  },
  {
    name: "02",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "03",
    uv: -1000,
  },
  {
    name: "04",
    uv: 500,
  },
  {
    name: "05",
    uv: -2000,
  },
  {
    name: "06",
    uv: -250,
  },
  {
    name: "07",
    uv: 3490,
  },
];

const middleStopOffset = 50;

interface CustomProps {
  active?: any;
  payload?: any;
}

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
        <p>{`Balance: $${uv.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

const ProfitLoss: FC = () => {
  const [selectItem, setSelectItem] = useState(1);

  const gradientOffset = () => {
    const dataMax = Math.max(...data.map((i) => i.uv));
    const dataMin = Math.min(...data.map((i) => i.uv));

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
    <div className="w-full h-[400px] p-3 gray-box">
      <div className="flex flex-row justify-between mb-3 ml-3 mr-3">
        <p className="font-semibold text-[14px] text-[#D1D1D1]">
          Profit & Loss
        </p>
        <div className="flex flex-row gap-1">
          <LabelItem
            text="All"
            onClick={() => setSelectItem(1)}
            active={selectItem === 1}
          />
          <LabelItem
            text="This Year"
            onClick={() => setSelectItem(2)}
            active={selectItem === 2}
          />
          <LabelItem
            text="Last Month"
            onClick={() => setSelectItem(3)}
            active={selectItem === 3}
          />
          <LabelItem
            text="This Month"
            onClick={() => setSelectItem(4)}
            active={selectItem === 4}
          />
          <LabelItem
            text="12h"
            onClick={() => setSelectItem(5)}
            active={selectItem === 5}
          />
          <LabelItem
            text="24h"
            onClick={() => setSelectItem(6)}
            active={selectItem === 6}
          />
        </div>
      </div>
      <div className="w-full h-[300px] bg-[#161616] relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <ReferenceLine y={0} stroke="#292929" />
            <XAxis dataKey="name" />
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

        <div className="flex flex-row gap-3 absolute bottom-[40px] right-[10px]">
          <div className="border border-[#8787877A] py-2 px-3 flex rounded-[5px] border-dashed bg-[#191919AD]">
            <p className="font-normal text-[10px] text-[#878787]">
              Total Wins:
            </p>
            <p className="font-normal text-[10px] text-[#CAFE35]">19</p>
          </div>

          <div className="border border-[#8787877A] py-2 px-3 flex rounded-[5px] border-dashed bg-[#191919AD]">
            <p className="font-normal text-[10px] text-[#878787]">
              Total Wins:
            </p>
            <p className="font-normal text-[10px] text-[#EF4D59]">4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitLoss;
