"use client";

import React, { FC } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import Account from "@/components/profile/details/Account";
import KeyBox from "@/components/profile/details/KeyBox";
import TokenBox from "@/components/profile/details/TokenBox";
import ProfitLoss from "@/components/profile/details/ProfitLoss";
import Button from "@/components/buttons/Button";
import Shield from "@/utils/icons/Shield";
import Clock from "@/utils/icons/Clock";
import History from "@/utils/icons/History";
import { useFetch } from "@/hooks/useFetch";
import IconLoading from "@/utils/icons/Loading";

const ProfileDetails: FC = () => {
  const { data, isLoading, error } = useFetch("/api/profile/details", {
    method: "GET",
  });

  const user = data?.user;
  const keys = data?.keys;
  const tokens = data?.tokens;

  return (
    <ProfileLayout select={1}>
      <div className="w-full flex flex-col gap-6">
        {user ? (
          <>
            <Account user={user} />
            <div className="flex flex-col xl:flex-row gap-6">
              <div className="flex-1 w-1/2">
                <KeyBox keys={keys} />
              </div>
              <div className="flex-1 w-1/2">
                <TokenBox tokens={tokens} />
              </div>
            </div>
            <ProfitLoss />
          </>
        ) : (
          <IconLoading width={12} height={12} color="#E9AE15" />
        )}
      </div>
    </ProfileLayout>
  );
};

export default ProfileDetails;
