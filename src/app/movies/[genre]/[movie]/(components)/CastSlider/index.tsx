"use client";

import { createFakeImage } from "@/helpers/common";
import { Cast } from "@/types";
import Image from "next/image";
import { useRef } from "react";
import { MdOutlineArrowBack, MdOutlineArrowForward } from "react-icons/md";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";

const CastSlider = ({ cast }: { cast: Cast[] }) => {
  const swiperRef = useRef<SwiperRef | null>(null);

  const swiperOptions: SwiperProps = {
    modules: [FreeMode],
    freeMode: true,
    breakpoints: {
      1440: {
        slidesPerView: 8,
      },
      1024: {
        slidesPerView: 6,
      },
      768: {
        slidesPerView: 3,
      },
      500: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
    spaceBetween: 20,
  };

  const slideTo = (dir: "next" | "prev" | number) => {
    if (swiperRef.current) {
      if (typeof dir === "string") {
        if (dir === "next") {
          swiperRef.current.swiper.slideNext();
        }
        if (dir === "prev") {
          swiperRef.current.swiper.slidePrev();
        }
      } else {
        swiperRef.current.swiper.slideTo(dir);
      }
    }
  };
  return (
    <div className="p-12.5 rounded-xl bg-secondary-black">
      <div className="flex items-center justify-between mb-7.5">
        <h3 className="text-gray-400">Cast</h3>
        <div className="flex items-center gap-3">
          <button
            onClick={() => slideTo("prev")}
            className="size-12.5 rounded-full text-gray-300 text-2xl flex items-center justify-center border border-gray-500 bg-main-black"
          >
            <MdOutlineArrowBack />
          </button>
          <button
            onClick={() => slideTo("next")}
            className="size-12.5 rounded-full text-gray-300 text-2xl flex items-center justify-center border border-gray-500 bg-main-black"
          >
            <MdOutlineArrowForward />
          </button>
        </div>
      </div>
      <div>
        <Swiper ref={swiperRef} {...swiperOptions}>
          {cast.map((c, index) => (
            <SwiperSlide key={`cast-${c.actor.fullName}-${index}`}>
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image src={createFakeImage(500, 500)} fill alt="" className="object-cover" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CastSlider;
