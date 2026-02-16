"use client";
import { MOVIES } from "@/data/movie";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { FaPlay } from "react-icons/fa6";
import { MdOutlineArrowBack, MdOutlineArrowForward } from "react-icons/md";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import { FiPlus } from "react-icons/fi";
import { AiOutlineLike, AiFillSound } from "react-icons/ai";

const Hero = () => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const swiperOptions: SwiperProps = {
    modules: [Navigation, Pagination],
    breakpoints: {
      768: {
        pagination: {
          clickable: true,
        },
      },
      0: {
        pagination: {
          clickable: false,
        },
      },
    },
  };

  const slides = MOVIES.slice(1, 4);

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
    <section className="pt-32">
      <div className="xl:aspect-1594/835 md:aspect-1594/935 sm:aspect-358/468 aspect-358/568 relative pb-10">
        <div className="absolute top-0 left-0 z-30 size-full lg:flex hidden flex-col justify-end pointer-events-none lg:px-10 px-1 pb-14">
          <div className="h-14 flex justify-between items-center">
            <button
              className="size-11 bg-main-black hover:bg-white hover:text-black transition-colors text-2xl rounded-md text-white flex items-center justify-center pointer-events-auto"
              onClick={() => slideTo("prev")}
            >
              <MdOutlineArrowBack />
            </button>
            <div className="w-1/2 "></div>
            <button
              className="size-11 bg-main-black hover:bg-white hover:text-black transition-colors text-2xl rounded-md text-white flex items-center justify-center pointer-events-auto"
              onClick={() => slideTo("next")}
            >
              <MdOutlineArrowForward />
            </button>
          </div>
        </div>
        <Swiper className="size-full" ref={swiperRef} {...swiperOptions}>
          {slides.map((slide, index) => (
            <SwiperSlide key={`movies-slide-${slide.id}-${index}`}>
              <div className="absolute top-0 left-0 z-40 size-full flex flex-col justify-between pointer-events-none bg-[linear-gradient(180deg,rgba(20,20,20,0.21)_0%,rgba(20,20,20,0.9)_73%)]">
                <div className="lg:h-11/12 h-full flex flex-col items-center justify-end lg:py-14 py-3 text-center">
                  <h2 className="mb-3 font-semibold lg:text-3xl sm:text-xl text-white">
                    {slide.title}
                  </h2>
                  <p className="mb-5 xl:w-1/2 lg:w-4/5 w-11/12 lg:block hidden text-center lg:text-base text-sm text-gray-400">
                    {slide.description}
                  </p>

                  <div className="flex lg:flex-row flex-col justify-center items-center gap-5 w-full">
                    <Link
                      href="/movies"
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-main-red lg:py-[18.5px] py-3 px-6 lg:w-auto w-11/12 text-white  pointer-events-auto"
                    >
                      <FaPlay size={18} />
                      <span>Play Now</span>
                    </Link>
                    <div className="flex items-center gap-5">
                      <button className="lg:size-14 size-10 bg-black text-white hover:bg-white hover:text-black transition-colors rounded-lg  pointer-events-auto">
                        <FiPlus className="m-auto size-7" />
                      </button>
                      <button className="lg:size-14 size-10 bg-black text-white hover:bg-white hover:text-black transition-colors rounded-lg pointer-events-auto">
                        <AiOutlineLike className="m-auto size-7" />
                      </button>
                      <button className="lg:size-14 size-10 bg-black text-white hover:bg-white hover:text-black transition-colors rounded-lg pointer-events-auto">
                        <AiFillSound className="m-auto size-7" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <Image
                src={slide.poster_bg}
                width={500}
                height={300}
                className="size-full object-cover"
                alt=""
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Hero;
