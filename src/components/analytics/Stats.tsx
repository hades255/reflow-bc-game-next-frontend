import { FiLink, FiMail } from "react-icons/fi";

const Stats = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-6 py-2">
      <div className="w-full rounded-md bg-[#1E1E1E] game-card p-6">
        <div className="text-xl font-bold mb-4">
          <span>Game Stats</span>
        </div>
        <div className="flex flex-col w-full gap-2 my-2">
          <div className="w-full flex justify-between text-sm">
            <span className="text-[#D1D1D1]">Total Games</span>
            <span className="text-gold">233 Games</span>
          </div>
          <div className="w-full flex justify-between text-sm">
            <span className="text-[#D1D1D1]">Draft Games</span>
            <span className="text-gold">0 Games</span>
          </div>
          <div className="w-full flex justify-between text-sm">
            <span className="text-[#D1D1D1]">Open Games</span>
            <span className="text-gold">6 Games</span>
          </div>
          <div className="w-full flex justify-between text-sm">
            <span className="text-[#D1D1D1]">Total Games</span>
            <span className="text-gold">227 Games</span>
          </div>
          <div className="w-full flex justify-between text-sm">
            <span className="text-[#D1D1D1] font-bold">Resulting Soon</span>
          </div>
          <div className="w-full flex justify-around text-sm">
            <span className="text-[#D1D1D1] text-center">
              Today: <span className="font-bold">0</span>
            </span>
            <span className="text-[#D1D1D1] text-center">
              Next 3 days: <span className="font-bold">6</span>
            </span>
            <span className="text-[#D1D1D1] text-center">
              This week: <span className="font-bold">6</span>
            </span>
          </div>
        </div>
      </div>

      <div className="w-full rounded-md bg-[#1E1E1E] game-card p-6">
        <div className="text-xl font-bold mb-4">
          <span>Referral Stats</span>
        </div>
        <div className="grid grid-cols-2 w-full gap-4 my-2 text-sm">
          <div className="h-28 rounded-md innerBlack bg-[#191919] flex flex-col justify-center items-center gap-4">
            <p>Active Referrals</p>
            <p className="font-bold text-gold">223 Referrals</p>
          </div>
          <div className="h-28 rounded-md innerBlack bg-[#191919] flex flex-col justify-center items-center gap-4">
            <p>Referral Bonuses</p>
            <p className="font-bold text-gold">0 RFL</p>
          </div>
        </div>
        <div className="flex items-center text-sm gap-2 mt-7">
          <span>Share Your Referral:&nbsp;</span>
          <span className="text-gold"><FiLink /></span>
          <span className="text-gold"><FiMail /></span>
        </div>
      </div>

      <div className="w-full rounded-md bg-[#1E1E1E] game-card p-6">
        <div className="text-xl font-bold mb-4">
          <span>RFL Stats</span>
        </div>
        <div className="flex flex-col w-full gap-2 my-2">
          <div className="w-full flex justify-between text-sm">
            <span className="text-[#D1D1D1]">Total</span>
            <span className="text-gold">1263607.678785325 RFL</span>
          </div>
          <div className="w-full flex justify-between text-sm">
            <span className="text-[#D1D1D1]">In Games</span>
            <span className="text-gold">0 RFL</span>
          </div>
          <div className="w-full flex justify-between text-sm">
            <span className="text-[#D1D1D1]">In House</span>
            <span className="text-gold">26 RFL</span>
          </div>
          <div className="w-full flex justify-between text-sm">
            <span className="text-[#D1D1D1] font-bold">Generated Fees</span>
          </div>
          <div className="w-full flex justify-between text-sm">
            <span className="text-[#D1D1D1]">Games</span>
            <span className="text-gold">0 RFL</span>
          </div>
          <div className="w-full flex justify-between text-sm">
            <span className="text-[#D1D1D1]">Transactions</span>
            <span className="text-gold">0 RFL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
