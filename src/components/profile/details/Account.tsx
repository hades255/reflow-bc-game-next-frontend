import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import IconAward from "@/utils/icons/Award";
import IconCrown2 from "@/utils/icons/Crown2";
import IconCoin from "@/utils/icons/Coin";
import { useFetch } from "@/hooks/useFetch";

const Account: FC = () => {
  const { data, isLoading, error } = useFetch("/api/profile/show", {
    method: "GET",
  });

  const user = data?.user;

  return (
    user && (
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
              <div className="p-[2px_8px] bg-[#F1B31A] flex flex-row items-center gap-[2px] rounded-[2px]">
                <IconAward width={7} height={7} color="#000" />
                <p className="text-[#101010] font-bold text-[9px]">
                  {user.player_level}
                </p>
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <p className="text-[#484848] text-[10px] font-medium">Rank</p>
              <p className="text-[10px] text-[#D1D1D1] font-bold">#32,326</p>
            </div>
          </div>
        </div>

        <div className="w-full h-auto bg-[#1E1E1E] rounded-[5px] px-3 py-6">
          <div className="flex flex-col px-3 gap-4">
            <p className="text-[14px] font-bold text-[#D1D1D1]">Experience</p>
            <div
              style={{
                background: `linear-gradient(to right, #5BFFBA ${50}%, #12121294 0%)`,
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
                260/500
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
              <p className="text-[#D1D1D1] font-medium text-[12px]">78.84</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Account;
