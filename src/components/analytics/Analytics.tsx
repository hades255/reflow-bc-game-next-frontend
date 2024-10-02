"use client";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import SettingAdmin from "./SetAdmin";
import SettingWhiteList from "./SetWhiteList";
import BonusSystem from "./BonusSystem";
import WithdrawTable from "./WithdrawTable";
import { MdOutlineAnalytics } from "react-icons/md";
import Button from "../buttons/Button";

const AnalyticsPage = () => {
  const router = useRouter();

  const handleClickHistoryBtn = useCallback(() => {
    router.push("/profile/admin/bankroll");
  }, [router]);

  return (
    <div className="">
      <div className="flex gap-1 items-center">
        <MdOutlineAnalytics width={24} height={24} color="#E9AE15" />
        <p className="text-[18px] font-bold text-[#D1D1D1]">Dashboard</p>
        <div className="ml-4 py-2">
          <Button
            text={"BankRoll"}
            className="!w-28"
            clicked={handleClickHistoryBtn}
          />
        </div>
      </div>
      <div className="w-full">
        <div className="w-full grid grid-cols-2 gap-6">
          <SettingAdmin />
          <SettingWhiteList />
        </div>
      </div>
      <div className="w-full">
        <BonusSystem />
      </div>

      <div className="w-full">
        <WithdrawTable />
      </div>
    </div>
  );
};

export default AnalyticsPage;
