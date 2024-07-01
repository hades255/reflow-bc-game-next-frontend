"use client";
import React, { FC, useState } from "react";
import GameTab from "./GameTab";
import UserArea from "./UserArea";
import NormalButton from "@/components/buttons/NormalButton";
import Button from "@/components/buttons/Button";
import SteamLoginButton from "@/components/buttons/SteamLoginButton";
import Image from "next/image";
import logo from "@/assets/logos/logo.png";

const AppHeader: FC = () => {
  const [auth, setAuth] = useState<boolean>(false);

  const handleClick = () => {
    console.log("clicked");
  };

  const handleLogin = () => {
    setAuth((prev) => !prev);
    console.log("clicked");
  };

  return (
    <header className="h-[84px] bg-[#1D1D1D] w-full fixed flex top-0 left-0 z-10">
      <div className="flex justify-center items-center w-[280px] min-w-[280px] h-[84px] shadow-[0_4px_4px_0_#00000040]">
        <Image src={logo} alt="logo" />
      </div>
      <div className="w-full h-full flex justify-between p-6">
        <GameTab />
        <div className="flex gap-4">
          {auth ? (
            <UserArea />
          ) : (
            <>
              <NormalButton
                icon={<></>}
                text={"Withdraw"}
                clicked={handleClick}
              />
              <Button text={"Deposit"} disabled={false} clicked={handleClick} />
              <SteamLoginButton text={"Sign In"} clicked={handleLogin} />
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
