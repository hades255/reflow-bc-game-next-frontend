import React, { useCallback } from "react";
import { ChatImg } from "@/assets/icons/footer/Footer";
import { useSettingContext } from "@/providers/SiteSettingProvider";

const OpenChat = () => {
  const { setShowSidebar } = useSettingContext();

  const handleClick = useCallback(() => setShowSidebar(true), [setShowSidebar]);

  return (
    <div
      className="fixed top-[calc(100vh_-_80px)] left-0 z-10 w-10 h-10 rounded-e-[20px] border border-s-0 flex justify-center items-center cursor-pointer hover:bg-[#DDD] transition-all"
      onClick={handleClick}
    >
      <ChatImg color="#5D5D5D" />
    </div>
  );
};

export default OpenChat;
