"use client";

import React, { FC } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import BankRoll from "@/components/profile/bankroll/bankroll";

const ProfileAdminTransaction: FC = () => {
  return (
    <ProfileLayout select={6} isadmin={true}>
      <div className="w-full h-full">
        <BankRoll />
      </div>
    </ProfileLayout>
  );
};

export default ProfileAdminTransaction;
