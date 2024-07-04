import React, { FC, PropsWithChildren } from "react";
import AppHeader from "./main-layout/AppHeader";
import AppSidebar from "./main-layout/AppSidebar";
import TokenBar from "./main-layout/TokenBar";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <div className="flex flex-col w-full">
        <AppSidebar />
        <div className="ml-[280px] mt-[84px] h-[calc(100%-84px)] min-h-[calc(100vh-84px)] bg-[#121212]">{children}</div>
      </div>
    </div>
  );
};

export default MainLayout;
