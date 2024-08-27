"use client";

import React, { FC, useState } from "react";
import ProfileLayout from "@/components/profile/ProfileLayout";
import Button from "@/components/buttons/Button";
import { apiSetTradeLink } from "@/services/skinWithdraw";
import { useDispatch } from "react-redux";
import { setToast } from "@/redux/slices/main/toastSlice";
import { useBonusCode } from "@/services/useUserInfo";

const ProfileAccount: FC = () => {
  const dispatch = useDispatch();
  const [tradeLink, setTradeLink] = useState<string>("");
  const [bonusCode, setBonusCode] = useState<string>("");

  const handleSetTradeLink = async () => {
    const result = await apiSetTradeLink({ tradelink: tradeLink });
    console.log(result);
    if (result?.status === "success") {
      dispatch(
        setToast({
          type: 2,
          message: "Trade Link Set Success",
        })
      );
    }
  };

  const handleBonusCode = async () => {
    const result = await useBonusCode(bonusCode);
    console.log(result);
    if (result?.status === "success") {
      dispatch(
        setToast({
          type: 2,
          message: "Get Bonus From Code",
        })
      );
    } else {
      dispatch(
        setToast({
          type: 3,
          message: result?.message,
        })
      );
    }
  }

  return (
    <ProfileLayout select={2}>
      <div className="space-y-8 xl:space-y-9 w-full flex flex-col">
        <div className="dropBlack bg-[#0000001F] h-auto w-full p-6 rounded-[5px] flex flex-col gap-3 items-end">
          <input
            value={tradeLink}
            onChange={(e) => setTradeLink(e.target.value)}
            type="text"
            className="bg-[#1A1A1A] h-[32px] dropBlack p-[8px_12px_8px_12px] rounded-[5px] w-full outline-none text-[12px] font-semibold text-[#D1D1D1]"
          />
          <Button
            text="Set Trade Link"
            className="!w-[143px]"
            clicked={handleSetTradeLink}
          />
        </div>
        <div className="dropBlack bg-[#0000001F] h-auto w-full p-6 rounded-[5px] flex flex-col gap-3 items-end">
          <input
            value={bonusCode}
            onChange={(e) => setBonusCode(e.target.value)}
            type="text"
            className="bg-[#1A1A1A] h-[32px] dropBlack p-[8px_12px_8px_12px] rounded-[5px] w-full outline-none text-[12px] font-semibold text-[#D1D1D1]"
          />
          <Button
            text="Use Bonus Code"
            className="!w-[143px]"
            clicked={handleBonusCode}
          />
        </div>
      </div>
    </ProfileLayout>
  );
};

export default ProfileAccount;
