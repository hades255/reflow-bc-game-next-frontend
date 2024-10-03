"use client";
import React, { FC, PropsWithChildren } from "react";
import { useModal } from "@/redux/slices/main/modalSlice";
import { useToast } from "@/redux/slices/main/toastSlice";
import AppHeader from "./main-layout/AppHeader";
import AppSidebar from "./main-layout/AppSidebar";
import ModernModal from "../Modal/ModernModal";
import Toast from "../Modal/Toast";

const MainLayout: FC<PropsWithChildren> = ({ children }) => {
  const modal = useModal();
  const toast = useToast();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <AppHeader />
        <div className="flex w-full h-[calc(100vh-84px)]">
          <AppSidebar />
          <div className="sticky top-0 w-[calc(100%-280px)] bg-[#121212] h-full overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
      {modal.status && (
        <ModernModal
          content={modal.content}
          title={modal.title}
          name={modal.name}
          type={modal.type}
          parameter={modal.parameter}
        />
      )}
      {toast.status && <Toast type={toast.type} message={toast.message} />}
    </>
  );
};

export default MainLayout;
