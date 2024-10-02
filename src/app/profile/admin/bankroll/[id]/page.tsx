"use client";

import AdminTransactionHistory from "@/components/profile/bankroll/depositandwithdrawadmin";
import ProfileLayout from "@/components/profile/ProfileLayout";
import React, { FC } from "react";

const ProfileAdminTransaction: FC = () => {
  return (
    <ProfileLayout select={6} isadmin={true}>
      <div className="w-full h-full">
        <AdminTransactionHistory />
      </div>
    </ProfileLayout>
  );
};

export default ProfileAdminTransaction;
