"use client";

import { createFakeImage } from "@/helpers/common";
import { Cast } from "@/types";
import Image from "next/image";
import { useRef, useState } from "react";
import { MdOutlineArrowBack, MdOutlineArrowForward } from "react-icons/md";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";

const CastSlider = ({ cast }: { cast: Cast[] }) => {
  const [isNavVisible, setIsNavVisible] = useState<boolean>(true);
  const swiperRef = useRef<SwiperRef | null>(null);

  const swiperOptions: SwiperProps = {
    modules: [FreeMode],
    freeMode: true,
    onSwiper: (swiper) => {
      setIsNavVisible(swiper.slides.length > Number(swiper.params.slidesPerView));
    },
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
  if (cast.length === 0) return null;
  return (
    <div className="p-12.5 rounded-xl bg-secondary-black">
      <div className="flex items-center justify-between mb-7.5">
        <h3 className="text-gray-400">Cast</h3>
        {isNavVisible ? (
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
        ) : null}
      </div>
      <div>
        <Swiper ref={swiperRef} {...swiperOptions}>
          {cast.map((c, index) => (
            <SwiperSlide key={`cast-${c.actor.fullName}-${index}`}>
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <Image
                  src={c.actor.image ?? createFakeImage(500, 500)}
                  fill
                  alt={`${c.actor.fullName} as ${c.character}`}
                  className="object-cover"
                />
              </div>
              <div className="text-white flex flex-col gap-1 text-center pt-2">
                <strong className="text-xs">{c.actor.fullName}</strong>
                <strong className="text-xs font-thin">{c.character}</strong>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default CastSlider;
