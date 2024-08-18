"use client";

import React, { FC } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import History from "@/components/profile/transactions/history";

const ProfileTransactions: FC = () => {
  return (
    <ProfileLayout select={3}>
      <div className="space-x-8 w-full flex">
        <History />
      </div>
    </ProfileLayout>
  );
};

export default ProfileTransactions;
