"use client";

import React, { FC } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import History from "@/components/profile/transactions/history";
import FilterPanel from "@/components/profile/transactions/FilterPanel";
// import { useFetch } from "@/hooks/useFetch";

const ProfileTransactions: FC = () => {
  return (
    <ProfileLayout select={3}>
      <div className="space-x-8 w-full flex">
        <div className="w-2/3">
          <History />
        </div>
        <div className="w-1/3">
          <FilterPanel />
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfileTransactions;
