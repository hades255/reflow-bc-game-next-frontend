"use client";

import React, { FC, useEffect } from "react";
import { useUser } from "@/redux/slices/main/userSlice";
import { useRouter } from "next/navigation";
import ProfileLayout from "@/components/profile/ProfileLayout";
import AnalyticsPage from "@/components/analytics/Analytics";

const ProfileAdmin: FC = () => {

  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/roulette");
    }
  }, [user]);

  return (
    <ProfileLayout select={6}>
      <div className="w-full space-x-8">
        <AnalyticsPage />
      </div>
    </ProfileLayout>
  );
};

export default ProfileAdmin;
