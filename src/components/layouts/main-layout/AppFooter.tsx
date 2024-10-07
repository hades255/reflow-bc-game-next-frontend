"use client";
import React, { FC } from "react";
import Image from "next/image";
import {
  DiscordImg,
  SupportImg,
  TwitchImg,
  TwitterImg,
} from "@/assets/icons/footer/Footer";
import logo from "@/assets/logos/logo.png";
import ukIcon from "@/assets/logos/flags/uk.png";

const AppFooter: FC = () => {
  return (
    <footer className="w-full p-12 pb-4 text-[#5D5D5D]">
      <div className="px-6 pt-10 pb-4 flex justify-between min-h-max mobile:flex-col mobile:gap-[20px] mobile:px-[20px] mobile:py-[30px] mobile:mb-[26px] rounded-lg innerBlack">
        <div className="flex justify-between md:gap-[57px] gap-[30px] mobile:flex-col mobile:gap-[15px] mobile:justify-start mobile:items-center">
          <div className="flex flex-col gap-[12px] max-w-[340px] mobile:max-w-full mobile:w-full mobile:items-center items-start">
            <div className="mobile:!p-[0px]">
              <Image
                src={logo}
                alt="logo"
                loading="lazy"
                height={50}
                decoding="async"
                className="medium:min-w-[40px] min-w-[50px]"
              />
            </div>
            <span className="text-lg">© 2024 REFLOW </span>
            <p className="text-xs mobile:text-center leading-[14px] text-md">
              REFLOW is owned and operated by RUNITUP LTD located at Avlonos, 1
              Maria house 1075, Nicosia, Cyprus.
            </p>
            <div className="mobile:hidden flex items-center gap-[10px]">
              <div>
                <div className="w-9 h-9 rounded-[18px] bg-gray-600 flex justify-center items-center text-white">
                  18+
                </div>
              </div>
              <span className="text-xs leading-[14px] text-md">
                By using this site, you confirm that you are 18 years old or
                older.
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-[20px] max-w-[360px] mobile:w-full">
            <div className="max-w-[520px] text-xs leading-[18px] text-md mobile:w-full mobile:text-center">
              At Reflow, we{"’"}re committed to providing the fairest and most
              thrilling gaming experience, featuring the industry{"’"}s best
              house edge. Join us today and play with confidence, knowing that
              luck is on your side.
            </div>
            <a
              href="mailto:support@reflow.im"
              target="_blank"
              className="h-fit w-fit mb-[15px] mt-[7px] select-none mobile:hidden"
            >
              <div className="text-white text-lg">support@reflow.im</div>
            </a>
            <div
              className="group/support w-fit cursor-pointer mobile:hidden"
              rel="noopener noreferrer"
            >
              <div className="w-[160px] flex justify-center items-center text-xl gap-[8px] p-[10px] bg-raisin-black rounded-[8px] text-white border border-[#5D5D5D]">
                <SupportImg color="white" />
                <span className="footer_support__gb0LW group-hover/support:text-cool-grey transition duration-300">
                  Support
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between gap-[30px] ml-[10px] mobile:flex-wrap mobile:gap-[20px]">
          <div className="flex flex-col gap-[6px] min-w-[150px] mobile:w-[calc(50%_-_25px)]">
            <div className="text-white text-sm">About:</div>
            <span className="text-sm select-none transition-all overflow-hidden overflow-ellipsis capitalize cursor-pointer hover:text-white">
              Fairness
            </span>
            <span className="text-sm select-none transition-all overflow-hidden overflow-ellipsis capitalize cursor-pointer hover:text-white">
              Terms and Conditions
            </span>
            <span className="text-sm select-none transition-all overflow-hidden overflow-ellipsis capitalize cursor-pointer hover:text-white">
              Privacy Policy
            </span>
            <span className="text-sm select-none transition-all overflow-hidden overflow-ellipsis capitalize cursor-pointer hover:text-white">
              AML Policy
            </span>
          </div>
          <div className="flex flex-col gap-[10px] mobile:w-[_40%] mobile:items-start">
            <div className="text-white text-xs text-center">Community</div>
            <div className="select-none flex justify-center gap-[10px] items-center">
              <div className="flex mobile:flex-col items-center gap-[10px]">
                <a href="https://discord.gg/reflow" target="_blank">
                  <DiscordImg color={"#767B86"} />
                </a>
                <a href="https://www.twitch.tv/reflow" target="_blank">
                  <TwitchImg color={"#787c84"} />
                </a>
                <a href="https://twitter.com/reflow" target="_blank">
                  <TwitterImg color={"#767B86"} />
                </a>
              </div>
            </div>
            <div className="flex flex-col gap-[0px] w-full h-[80px]">
              <div className="language_short__bH9Qg !justify-start !items-start group/active hover: cursor-pointer w-full h-full flex transition duration-300 text-xl gap-[5px] text-white relative">
                <div className="flex items-center gap-[10px]">
                  <Image
                    src={ukIcon}
                    className="w-[12px] h-[12px]"
                    alt="logo"
                  />
                  <span className="text-white select-none text-sm">ENG</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden mobile:flex flex-col gap-[0px] h-[80px]">
            <a
              href="mailto:support@reflow.im"
              target="_blank"
              className="h-fit w-fit mb-[15px] mt-[7px] select-none"
            >
              <div className="text-white text-lg">support@reflow.im</div>
            </a>
            <div
              className="group/support w-fit cursor-pointer hidden mobile:flex"
              rel="noopener noreferrer"
            >
              <div className="flex justify-center items-center text-[14px] text-xl gap-[5px] p-[10px] bg-raisin-black rounded-[8px] text-white border border-[#5D5D5D]">
                <SupportImg color="white" />
                <span className="footer_support__gb0LW group-hover/support:text-cool-grey">
                  Live chat
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
