"use client";
import React, { FC, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import GameTab from "./GameTab";
import UserArea from "./UserArea";
import NormalButton from "@/components/buttons/NormalButton";
import Button from "@/components/buttons/Button";
import SteamLoginButton from "@/components/buttons/SteamLoginButton";
import Image from "next/image";
import { useToken } from "@/redux/slices/main/authSlice";
import { signin } from "@/redux/slices/main/authSlice";
import logo from "@/assets/logos/logo.png";

const AppHeader: FC = () => {
  const token = useToken();

  const router = useRouter();

  const handleClick = () => {
    console.log("Withdraw");
  };

  const handleLogin = async () => {
    router.push(`${process.env.NEXT_PUBLIC_API_HOST}/api/auth/login`);
  };

  const searchParams = useSearchParams();

  const dispatch = useDispatch();

  useEffect(() => {
    if (searchParams.get("token") != null) {
      dispatch(signin(searchParams.get("token") ?? ""));
      localStorage.setItem("token", searchParams.get("token") ?? "");
      router.replace("/coinflip");
    }
  }, [token, router, searchParams]);


  return (
    <header className="h-[84px] bg-[#1D1D1D] w-full fixed flex top-0 left-0 z-50">
      <div className="flex justify-center items-center w-[280px] min-w-[280px] h-[84px] shadow-[0_4px_4px_0_#00000040]">
        <Image src={logo} alt="logo" />
      </div>
      <div className="w-full h-full flex justify-between p-6">
        <GameTab />
        <div className="flex gap-4">
          {token === "" ? (
            <>
              <NormalButton
                icon={<></>}
                text={"Withdraw"}
                clicked={handleClick}
              />
              <Button text={"Deposit"} disabled={false} clicked={handleClick} />
              <SteamLoginButton text={"Sign In"} clicked={handleLogin} />
            </>
          ) : (
            <UserArea />
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
