"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface SiteSettingContextType {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const SiteSettingContext = createContext<SiteSettingContextType | undefined>(
  undefined
);

interface Props {
  children: ReactNode;
}

export const SiteSettingProvider: React.FC<Props> = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <SiteSettingContext.Provider value={{ showSidebar, setShowSidebar }}>
      {children}
    </SiteSettingContext.Provider>
  );
};

export const useSettingContext = () => {
  const context = useContext(SiteSettingContext);
  if (!context) {
    throw new Error(
      "useSettingContext must be used within a SiteSettingProvider"
    );
  }
  return context;
};
