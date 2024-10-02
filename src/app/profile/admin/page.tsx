"use client";

import React, { FC } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import AnalyticsPage from "@/components/analytics/Analytics";

const ProfileAdmin: FC = () => {
  return (
    <ProfileLayout select={6} isadmin={true}>
      <div className="w-full h-full">
        <AnalyticsPage />
      </div>
    </ProfileLayout>
  );
};

export default ProfileAdmin;
