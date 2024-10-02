"use client";

import React, { FC } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import AdminTransactionHistory from "@/components/profile/bankroll/depositandwithdrawadmin";

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
