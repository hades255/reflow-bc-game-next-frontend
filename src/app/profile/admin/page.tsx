"use client";

import React, { FC, useEffect } from "react";
import { useUser } from "@/redux/slices/main/userSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToast } from "@/redux/slices/main/toastSlice";
import ProfileLayout from "@/components/profile/ProfileLayout";
import AnalyticsPage from "@/components/analytics/Analytics";

const ProfileAdmin: FC = () => {

  const user = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      router.push("/roulette");
    } else {
      if (!user.is_admin) {
        router.push("/profile/details");
        dispatch(setToast({
          type: 4,
          message: "You can not access the administrator page."
        }));
      } 
    }
  }, [user, dispatch]);

  return (
    <ProfileLayout select={6}>
      <div className="w-full space-x-8">
        <AnalyticsPage />
      </div>
    </ProfileLayout>
  );
};

export default ProfileAdmin;
