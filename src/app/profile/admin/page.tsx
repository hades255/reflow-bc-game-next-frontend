"use client";

import React, { FC } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import AnalyticsPage from "@/components/analytics/Analytics";

const ProfileAdmin: FC = () => {
  return (
    <ProfileLayout select={6}>
      <div className="w-full space-x-8">
        <AnalyticsPage />
      </div>
    </ProfileLayout>
  );
};

export default ProfileAdmin;
