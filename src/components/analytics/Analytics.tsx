"use client"
import SettingAdmin from "./SetAdmin";
import SettingWhiteList from "./SetWhiteList";
import BonusSystem from "./BonusSystem";
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
          <SettingAdmin />
          <SettingWhiteList />
        </div>
      </div>
      <div className="w-full my-8">
        <BonusSystem />
      </div>
    </div>
  );
};

export default AnalyticsPage;
