"use client";

import React, { FC, useRef } from "react";

import Image from "next/image";
import arrowLeft from "@/assets/icons/arrow-left.svg";
import arrowRight from "@/assets/icons/arrow-right.svg";

import { Swiper, SwiperSlide } from "swiper/react";

import { Navigation } from "swiper/modules";
import { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";

const tokenColors = [
  "#9E5B23",
  "#6C6F76",
  "#D2B13F",
  "#0196F2",
  "#A328A6",
  "#6C6F76",
  "#5491FF",
  "#6BF05A",
  "#C21715",
  "#61479A",
];

interface Token {
  count: number;
  token_icon: string;
  token_id: number;
  token_level: number;
}

interface Props {
  tokens: [Token];
}

const TokenBox: FC<Props> = ({ tokens }) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full h-auto bg-[#1E1E1E] rounded-[5px] p-3">
      <div className="flex flex-row items-center justify-between p-[8px_12px_16px_12px]">
        <p className="text-[14px] font-semibold text-[#D1D1D1]">
          Tokens You have
        </p>
        <p className="text-[10px] font-semibold text-[#838383]">
          Go to Key Synthesis
        </p>
      </div>
      <div className="bg-[#03030347] rounded-[5px] dropBlack w-full h-[80px] flex flex-row items-center gap-1">
        <Image
          src={arrowLeft}
          className="cursor-pointer ml-1"
          alt="image"
          width={8}
          height={8}
          onClick={() => swiperRef.current?.slidePrev()}
        />
        <Swiper
          slidesPerView={7}
          spaceBetween={12}
          modules={[Navigation]}
          className="w-full h-full"
          onSwiper={(swiper: any) => {
            swiperRef.current = swiper;
          }}
        >
          {tokens &&
            tokens.map((item, index) => (
              <SwiperSlide
                className="!flex items-center justify-center min-w-12"
                key={index}
              >
                <div className="w-[48px] h-[48px] text-black relative">
                  <Image
                    src={`/assets/images/gametokens/${item.token_icon}.png`}
                    width={48}
                    height={48}
                    alt="bronze"
                  />
                  <div
                    className={`absolute w-[14px] h-[14px] rounded-full text-white text-[10px] font-bold text-center bg-[${
                      tokenColors[item.token_level - 1]
                    }] top-0 right-0`}
                  >
                    {item.count}
                  </div>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
        <Image
          src={arrowRight}
          alt="image"
          width={8}
          height={8}
          className="cursor-pointer mr-1"
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>
    </div>
  );
};

export default TokenBox;
