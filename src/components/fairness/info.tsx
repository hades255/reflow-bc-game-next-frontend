import React, { FC } from "react";
import Image from "next/image";
import Button from "../buttons/Button";
import ClientSeed from "./clientseed";
import ServerSeed from "./serverseed";

const FairnessInfo: FC = () => {
  return (
    <div className="flex flex-row gap-6">
      <div className="flex flex-col flex-1 w-64 gap-6">
        <h3 className="text-white font-semibold text-[20px]">
          HOW DO I VERIFY THE FAIRNESS OF THE GAME?
        </h3>
        <p className="font-normal text-[16px] text-[#D1D1D1] leading-5">
          The game outcomes are predetermined BEFORE you make your bet, and,
          importantly, we have the means to substantiate this claim. Before each
          round commences, we provide you with the round`s outcome in a hashed
          form. Prior to the round`s start, we furnish you with the hash of the
          concealed seed upon which the round`s result hinges. Once the round
          concludes, we disclose the hidden seed for you to cross-verify with
          the hash, ensuring their congruence. This system empowers us to affirm
          the fairness and pre-determination of the results.
        </p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={"/assets/images/fairness/info.png"}
          alt="info"
          className="-ml-3"
        />
      </div>
      <div className="flex flex-col flex-1 w-64">
        {/* <div className="flex flex-col gap-[26px]">
          <p className="font-normal text-[16px] text-[#D1D1D1] leading-[21.9px]">
            In the case of every auditable bet (with the exception of roulette
            and coinflip, where distinct systems are employed), a client seed, a
            server seed, and a nonce are utilized as the input variables
          </p>

          <div className="flex flex-col gap-6">
            <p className="text-white font-semibold text-[20px]">Client Seed</p>
            <p className="font-normal text-[16px] text-[#D1D1D1] leading-[21.9px]">
              It can either be a passphrase or a randomly generated string,
              which is selected by the player or their web browser. You have the
              flexibility to modify and update this at your own discretion.
            </p>
            <ClientSeed />
          </div>

          <div className="flex flex-col gap-6">
            <p className="text-white font-semibold text-[20px]">Server Seed</p>
            <p className="font-normal text-[16px] text-[#D1D1D1] leading-[21.9px]">
              To unveil the hashed server seed, the player needs to rotate the
              seed, prompting it to be substituted with a freshly generated one.
              Once this is done, you have the ability to authenticate all wagers
              placed with the previous server seed, ensuring the authenticity of
              the server seed by comparing it with the encrypted hash that was
              furnished.
            </p>
            <ServerSeed />
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FairnessInfo;
