const quotas = [
  { name: "Ethereum", value: "0 RFL (+0 RFL)" },
  { name: "Arbitrum", value: "0 RFL (+0 RFL)" },
  { name: "Polygon", value: "121365.2714958... RFL (+121365.2714958... RFL)" },
  { name: "Binance", value: "0 RFL (+0 RFL)" },
  { name: "Optimism", value: "121365.2714958... RFL (+121365.2714958... RFL)" },
  { name: "ZkSync", value: "121365.2714958... RFL (+121365.2714958... RFL)" },
  { name: "Mina", value: "121365.2714958... RFL (+121365.2714958... RFL)" },
  { name: "Kadena", value: "121365.2714958... RFL (+121365.2714958... RFL)" },
  { name: "Cardano", value: "121365.2714958... RFL (+121365.2714958... RFL)" },
  { name: "Starknet", value: "121365.2714958... RFL (+121365.2714958... RFL)" },
  { name: "SUI", value: "121365.2714958... RFL (+121365.2714958... RFL)" },
  { name: "Solana", value: "121365.2714958... RFL (+121365.2714958... RFL)" },
];

const QuotaTable = () => {
  return (
    <div className="w-full rounded-md bg-[#1E1E1E] game-card my-2 flex flex-col justify-between items-center relative">
      <div className="flex justify-between text-sm items-center w-full p-3 text-[#D1D1D1]">
        <span>
          Most Deposited Network: <span className="font-bold">Arbitrum</span>
        </span>
        <span>
          Less Deposited network: <span className="font-bold">Optimism</span>
        </span>
      </div>
      <div className="h-[calc(100%-56px)] w-[calc(100%-24px)] rounded-md innerBlack p-[2px] m-3 mt-0">
        <table className="w-full bg-[#191919] text-[#727272] rounded-[5px] overflow-hidden">
          <thead>
            <tr className="w-full h-[33px] bg-[#323232] rounded-[5px]">
              <th
                className="w-[60px] text-[#D1D1D1] text-sm font-semibold text-left p-3"
                colSpan={2}
              >
                Network Quota
              </th>
            </tr>
          </thead>
          <tbody>
            {quotas.map((quota, index) => (
              <tr
                className={`w-full h-12 ${index % 2 === 1 ? "bg-[#1F1F1F]" : ""}`}
                key={index}
              >
                <td className="text-sm text-[#717171] text-left pl-3">
                  {quota.name}
                </td>
                <td className="text-sm text-[#D1D1D1] text-right pr-3">{quota.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default QuotaTable;
