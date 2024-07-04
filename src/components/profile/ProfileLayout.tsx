import React, { FC, PropsWithChildren } from "react";
import TabBar from "@/components/profile/TabBar";
import IconCrown from "@/utils/icons/Crown";

interface Props {
  select?: number;
}

const ProfileLayout: FC<PropsWithChildren<Props>> = ({ select, children }) => {
  return (
    <div className="p-6">
      <div className="flex gap-1 items-center">
        <IconCrown width={24} height={24} color="#E9AE15" />
        <p className="text-[18px] font-bold text-[#D1D1D1]">Profile</p>
      </div>
      <div className="flex gap-6 mt-6">
        <div>
          <TabBar select={select} />
        </div>
        <div className="flex w-full">{children}</div>
      </div>
    </div>
  );
};

export default ProfileLayout;
