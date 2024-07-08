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

interface Props {}

const KeyBox: FC = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div className="w-full h-auto bg-[#1E1E1E] rounded-[5px] p-3">
      <div className="flex flex-row items-center justify-between p-[8px_12px_16px_12px]">
        <p className="text-[14px] font-semibold text-[#D1D1D1]">
          Keys You Have
        </p>
        <p className="text-[10px] font-semibold text-[#838383]">
          Go To Mystery Box
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
          {Array.from({ length: 20 }).map((item, index) => (
            <SwiperSlide
              className="!flex items-center justify-center"
              key={index}
            >
              <div className="w-[48px] h-[48px] p-[5px] text-black relative">
                <Image
                  src={"/assets/images/keys/Pandora.png"}
                  width={38}
                  height={38}
                  alt="bronze"
                />
                <div className="absolute w-[14px] h-[14px] rounded-full text-white text-[10px] font-bold text-center bg-[#61479A] top-0 left-0">
                  1
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

export default KeyBox;
