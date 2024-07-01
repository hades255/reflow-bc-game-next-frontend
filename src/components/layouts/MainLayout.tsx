import React, { FC, PropsWithChildren } from "react";
import AppHeader from "./main-layout/AppHeader";
import AppSidebar from "./main-layout/AppSidebar";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <div className="flex flex-col w-full">
        <AppSidebar />
        <div className="ml-[280px] mt-[84px]">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
