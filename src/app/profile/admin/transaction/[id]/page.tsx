"use client";

import React, { FC, useEffect } from "react";
import { useUser } from "@/redux/slices/main/userSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setToast } from "@/redux/slices/main/toastSlice";
import ProfileLayout from "@/components/profile/ProfileLayout";
import AdminTransactionHistory from "@/components/profile/transactions/admin";

const ProfileAdminTransaction: FC = () => {
  const user = useUser();
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      router.push("/roulette");
    } else {
      if (!user.is_admin) {
        router.push("/profile/details");
        dispatch(
          setToast({
            type: 4,
            message: "You can not access the administrator page.",
          })
        );
      }
    }
  }, [user, router, dispatch]);

  return (
    <ProfileLayout select={6}>
      <div className="w-full h-full">
        <AdminTransactionHistory />
      </div>
    </ProfileLayout>
  );
};

export default ProfileAdminTransaction;
