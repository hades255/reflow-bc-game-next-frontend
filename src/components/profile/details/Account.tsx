import React, { FC, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import IconCrown2 from "@/utils/icons/Crown2";
import IconCoin from "@/utils/icons/Coin";
import { XP_SYSTEM } from "@/config/constants";

interface Props {
  user: any;
}

const Account: FC<Props> = ({ user }) => {
  const rank = useMemo(() => {
    if (user.player_level === 0) return "Bronze";
    const r = XP_SYSTEM[user.player_level].rank;
    return r.substring(0, 1).toUpperCase() + r.substring(1);
  }, [user]);

  const [levelItem, setLevelItem] = useState(0);

  const levels = [
    { name: "bronze", color: "#DF8E44" },
    { name: "silver", color: "#9F9F9F" },
    { name: "gold", color: "#FFD375" },
    { name: "platinum", color: "#65ABCF" },
    { name: "diamond", color: "#FD91FF" },
    { name: "saphire", color: "#DCDCDC" },
    { name: "warden", color: "#07CBFF" },
    { name: "prince", color: "#B0F215" },
    { name: "monarch", color: "#FE4A45" },
  ];

  useEffect(() => {
    if (user) {
      if (user.player_level > 24) {
        setLevelItem(1);
      } else if (user.player_level > 48) {
        setLevelItem(2);
      } else if (user.player_level > 73) {
        setLevelItem(3);
      } else if (user.player_level > 98) {
        setLevelItem(4);
      } else if (user.player_level > 123) {
        setLevelItem(5);
      }
    }
  }, [user]);

  return (
    <div className="flex flex-row gap-6">
      <div className="w-[200px] h-auto bg-[#1E1E1E] rounded-[5px] p-[16px_12px]">
        <div className="flex flex-col justify-center items-center">
          <Image
            src={user.avatar}
            width={48}
            height={48}
            alt="image"
            className="rounded-[5px] border-[2px] border-[#272727]"
          />
          <p className="text-[14px] font-bold text-white mt-3">{user.name}</p>
        </div>

        <div className="flex flex-col gap-3 mt-3">
          <div className="flex flex-row justify-between">
            <p className="text-[#484848] text-[10px] font-medium">Level</p>
            <div
              className="flex flex-row gap-[2px] items-center justify-center w-[48px] h-[12px] rounded-[2px] border bg-[#020202]"
              style={{ borderColor: `${levels[levelItem].color}` }}
            >
              <Image
                src={`/assets/icons/${levels[levelItem].name}.png`}
                width={8}
                height={8}
                alt="cup"
              />
              <span className="text-[9px] font-bold text-[#DF8E44]">
                {user.player_level}
              </span>
            </div>
          </div>
          <div className="flex flex-row justify-between">
            <p className="text-[#484848] text-[10px] font-medium">Rank</p>
            <p className="text-[10px] text-[#D1D1D1] font-bold">#{rank}</p>
          </div>
        </div>
      </div>

      <div className="w-full h-auto bg-[#1E1E1E] rounded-[5px] px-3 py-6">
        <div className="flex flex-col px-3 gap-4">
          <p className="text-[14px] font-bold text-[#D1D1D1]">Experience</p>
          <div
            style={{
              background: `linear-gradient(to right, #5BFFBA ${
                (user.experience * 100) /
                (XP_SYSTEM[user.player_level].xp -
                  (user.player_level - 1 >= 0
                    ? XP_SYSTEM[user.player_level - 1].xp
                    : 0))
              }%, #12121294 0%)`,
            }}
            className="w-full h-[15px] rounded-[40px] relative"
          >
            <p
              className="text-[#000] font-semibold text-[10px] text-center"
              style={{
                textShadow:
                  "2px 0 #A3FFCDAD, -2px 0 #A3FFCDAD, 0 2px #A3FFCDAD, 0 -2px #A3FFCDAD,1px 1px #A3FFCDAD, -1px -1px #A3FFCDAD, 1px -1px #A3FFCDAD, -1px 1px #A3FFCDAD",
              }}
            >
              {Math.round(user.experience)}/
              {XP_SYSTEM[user.player_level].xp -
                (user.player_level - 1 >= 0
                  ? XP_SYSTEM[user.player_level - 1].xp
                  : 0)}
            </p>
            <div className="absolute -right-[8px] top-[2px]">
              <IconCrown2 color="#5CFFBAFA" width={24} height={24} />
            </div>
          </div>
        </div>
        <div className="mt-6 w-full h-[1px] bg-[#121212]"></div>
        <div className="flex flex-row justify-between mt-[27px]">
          <p className="font-bold text-[12px] text-[#D1D1D1]">Total Bet</p>
          <div className="flex flex-row items-center gap-1">
            <IconCoin width={14} height={14} color="#E9AE15" />
            <p className="text-[#D1D1D1] font-medium text-[12px]">
              {user.totalBet}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
