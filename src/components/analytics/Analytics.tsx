// import BalanceTable from "./BalanceTable";
// import QuotaTable from "./QuotaTable";
import SetAdmin from "./SetAdmin";
import SetWhiteList from "./SetWhiteList";
import BonusSystem from "./BonusSystem";
import ProfitsTable from "./ProfitsTable";
import Stats from "./Stats";
import { MdOutlineAnalytics } from "react-icons/md";

const AnalyticsPage = () => {
  return (
    <div>
      <div className="flex gap-1 items-center mt-4">
        <MdOutlineAnalytics width={24} height={24} color="#E9AE15" />
        <p className="text-[18px] font-bold text-[#D1D1D1]">Dashboard</p>
      </div>
      <div className="w-full my-8">
        <div className="w-full grid grid-cols-2 gap-6">
          <SetAdmin />
          <SetWhiteList />
        </div>
      </div>
      <div className="w-full my-8">
        <BonusSystem />
      </div>
      <div className="w-full my-8">
        <p className="text-[#717171] font-bold">Detailed Stats</p>
        <Stats />
      </div>
      {/* <div className="w-full my-4">
        <p className="text-[#717171] font-bold">Game Overview</p>
        <ProfitsTable />
      </div> */}
    </div>
  );
};

export default AnalyticsPage;
