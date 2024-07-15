"use client";

import React, { FC } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";

const ProfileAccount: FC = () => {
  return (
    <ProfileLayout select={5}>
      <div className="space-y-8 xl:space-y-9 space-x-8 w-full flex"></div>
    </ProfileLayout>
  );
};

export default ProfileAccount;
