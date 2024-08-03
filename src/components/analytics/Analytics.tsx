import { MdOutlineAnalytics } from "react-icons/md";
import BalanceTable from "./BalanceTable";
import QuotaTable from "./QuotaTable";
import ProfitsTable from "./ProfitsTable";
import Stats from "./Stats";

const AnalyticsPage = () => {
  return (
    <div className="p-6">
      <div className="flex gap-1 items-center">
        <MdOutlineAnalytics width={24} height={24} color="#E9AE15" />
        <p className="text-[18px] font-bold text-[#D1D1D1]">Analytics</p>
      </div>
      <div className="w-full my-4">
        <p className="text-[#717171] font-bold">Game Wallet Balance</p>
        <div className="w-full grid grid-cols-2 gap-6">
          <BalanceTable />
          <QuotaTable />
        </div>
      </div>
      <div className="w-full my-4">
        <p className="text-[#717171] font-bold">Detailed Stats</p>
        <Stats />
      </div>
      <div className="w-full my-4">
        <p className="text-[#717171] font-bold">Game Overview</p>
        <ProfitsTable />
      </div>
    </div>
  );
};

export default AnalyticsPage;
