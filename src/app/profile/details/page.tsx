"use client";

import React, { FC } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import Account from "@/components/profile/details/Account";
// import KeyBox from "@/components/profile/details/KeyBox";
// import TokenBox from "@/components/profile/details/TokenBox";
import ProfitLoss from "@/components/profile/details/ProfitLoss";
import Button from "@/components/buttons/Button";
import Shield from "@/utils/icons/Shield";
import Clock from "@/utils/icons/Clock";
import History from "@/utils/icons/History";
// import { useFetch } from "@/hooks/useFetch";

const ProfileDetails: FC = () => {
  return (
    <ProfileLayout select={1}>
      <div className="w-full flex flex-col gap-6">
        <Account />
        <div className="flex flex-row gap-6">
          <div className="flex-1 w-32">{/* <KeyBox /> */}</div>
          <div className="flex-1 w-32">{/* <TokenBox /> */}</div>
        </div>
        <ProfitLoss />
        <div className="flex flex-row gap-6">
          <div className="w-full gray-box p-4 relative">
            <Shield className="absolute inset-0 w-full h-full opacity-50" />
            <div className="flex flex-col justify-center p-4 min-h-[100px] relative z-10">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-center gap-3">
                  <div className="text-sm font-bold text-[#D1D1D1]">
                    Two-Factor Authentication (2FA)
                  </div>
                  <div className="text-[10px] font-normal text-[#484848]">
                    Add An extra layer of security to your account
                  </div>
                </div>
                <div className="flex items-center">
                  <Button text="Enable 2FA" />
                </div>
              </div>
            </div>
          </div>

          <div className="w-full gray-box p-4 relative">
            <Clock className="absolute inset-0 w-full h-full opacity-50" />
            <div className="flex flex-col justify-center p-4 min-h-[100px] relative z-10">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-center gap-3">
                  <div className="text-sm font-bold text-[#D1D1D1]">
                    Take a Break
                  </div>
                  <div className="text-[10px] font-normal text-[#484848]">
                    Feeling unwell or not in the mood? let`s Take a break
                  </div>
                </div>
                <div className="flex items-center">
                  <Button text="Choose Duration" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full gray-box p-4 relative">
          <History className="absolute inset-0 w-full h-full opacity-50" />
          <div className="flex flex-col justify-center p-4 min-h-[100px] relative z-10">
            <div className="flex flex-row justify-between">
              <div className="flex flex-col justify-center gap-3">
                <div className="text-sm font-bold text-[#D1D1D1]">History</div>
                <div className="text-[10px] font-normal text-[#484848]">
                  See transaction and game history.
                </div>
              </div>
              <div className="flex items-center">
                <Button text="Show History" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfileDetails;
