"use client";

import React, { FC, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/redux/slices/main/userSlice";
import TabItem from "./TabItem";
import IconDetails from "@/utils/icons/Details";
import IconAccount from "@/utils/icons/Account";
import IconTransactions from "@/utils/icons/Transactions";
import IconMystery from "@/utils/icons/Mystery";
import IconSocials from "@/utils/icons/Socials";
import { MdOutlineAnalytics } from "react-icons/md";

interface Props {
  select?: number;
}

const TabBar: FC<Props> = ({ select }) => {
  const [activeTab, setActiveTab] = useState(1);
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    setActiveTab(select ?? 1);
  }, [select]);

  const handleClickActiveTab = useCallback(
    (url: String) => {
      router.push(`/profile/${url}`);
    },
    [router]
  );

  return (
    <div className="w-[240px] h-auto bg-[#0F0F0FAD] dropBlack rounded-[5px] py-3 px-[2px] flex flex-col gap-3">
      <TabItem
        select={activeTab === 1}
        icon={
          <IconDetails
            color={`${activeTab === 1 ? "#E9AE15" : "#787878"}`}
            width={12}
            height={14}
          />
        }
        hoverIcon={<IconDetails color={`#E9AE15`} width={12} height={14} />}
        text="Details"
        onClick={() => handleClickActiveTab("details")}
      />
      <TabItem
        select={activeTab === 2}
        hoverIcon={<IconAccount color={`#E9AE15`} width={12} height={14} />}
        icon={
          <IconAccount
            color={`${activeTab === 2 ? "#E9AE15" : "#787878"}`}
            width={12}
            height={12}
          />
        }
        text="Account"
        onClick={() => handleClickActiveTab("account")}
      />
      <TabItem
        select={activeTab === 3}
        hoverIcon={
          <IconTransactions color={`#E9AE15`} width={12} height={14} />
        }
        icon={
          <IconTransactions
            color={`${activeTab === 3 ? "#E9AE15" : "#787878"}`}
            width={12}
            height={12}
          />
        }
        text="Transactions"
        onClick={() => handleClickActiveTab("transactions")}
      />
      <TabItem
        select={activeTab === 4}
        hoverIcon={<IconMystery color={`#E9AE15`} width={12} height={14} />}
        icon={
          <IconMystery
            color={`${activeTab === 4 ? "#E9AE15" : "#787878"}`}
            width={12}
            height={12}
          />
        }
        text="Mystery Box"
        onClick={() => handleClickActiveTab("mystery")}
      />
      {/* <TabItem
        select={activeTab === 5}
        hoverIcon={<IconSocials color={`#E9AE15`} width={12} height={14} />}
        icon={
          <IconSocials
            color={`${activeTab === 5 ? "#E9AE15" : "#787878"}`}
            width={12}
            height={12}
          />
        }
        text="Socials"
        onClick={() => handleClickActiveTab("socials")}
      /> */}
      {user?.is_admin && (
        <TabItem
          select={activeTab === 6}
          hoverIcon={
            <span className={`text-[14px] text-[#E9AE15]`}>
              <MdOutlineAnalytics />
            </span>
          }
          icon={
            <span
              className={`text-[14px] ${
                activeTab === 6 ? "text-[#E9AE15]" : "text-[#787878]"
              }`}
            >
              <MdOutlineAnalytics />
            </span>
          }
          text="Administrator"
          onClick={() => handleClickActiveTab("admin")}
        />
      )}
    </div>
  );
};

export default TabBar;
