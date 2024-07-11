"use client";

import React, { FC, useState, useEffect } from "react";
import TabItem from "./TabItem";
import IconDetails from "@/utils/icons/Details";
import IconAccount from "@/utils/icons/Account";
import IconTransactions from "@/utils/icons/Transactions";
import IconMystery from "@/utils/icons/Mystery";
import IconSocials from "@/utils/icons/Socials";

interface Props {
  select?: number;
}

const TabBar: FC<Props> = ({ select }) => {
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    setActiveTab(select ?? 1);
  }, [select]);

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
        text="Details"
        onClick={() => setActiveTab(1)}
      />
      <TabItem
        select={activeTab === 2}
        icon={
          <IconAccount
            color={`${activeTab === 2 ? "#E9AE15" : "#787878"}`}
            width={12}
            height={12}
          />
        }
        text="Account"
        onClick={() => setActiveTab(2)}
      />
      <TabItem
        select={activeTab === 3}
        icon={
          <IconTransactions
            color={`${activeTab === 3 ? "#E9AE15" : "#787878"}`}
            width={12}
            height={12}
          />
        }
        text="Transactions"
        onClick={() => setActiveTab(3)}
      />
      <TabItem
        select={activeTab === 4}
        icon={
          <IconMystery
            color={`${activeTab === 4 ? "#E9AE15" : "#787878"}`}
            width={12}
            height={12}
          />
        }
        text="Mystery Box"
        onClick={() => setActiveTab(4)}
      />
      <TabItem
        select={activeTab === 5}
        icon={
          <IconSocials
            color={`${activeTab === 5 ? "#E9AE15" : "#787878"}`}
            width={12}
            height={12}
          />
        }
        text="Socials"
        onClick={() => setActiveTab(5)}
      />
    </div>
  );
};

export default TabBar;
