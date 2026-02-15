"use client";
import Heading from "@/app/(components)/Heading";
import { GENRES } from "@/data/genre";
import { createFakeImage } from "@/helpers/common";
import Image from "next/image";
import { useRef, useState } from "react";
import { MdOutlineArrowForward, MdOutlineArrowBack } from "react-icons/md";
import { FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";

const CategorySlider = () => {
  const swiperRef = useRef<SwiperRef | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [paginationCount, setPaginationCount] = useState<number>(0);

  const swiperOptions: SwiperProps = {
    modules: [Pagination, Navigation, FreeMode],
    freeMode: true,
    breakpoints: {
      1440: {
        slidesPerView: 5,
      },
      1024: {
        slidesPerView: 4,
      },
      768: {
        slidesPerView: 3,
      },
      425: {
        slidesPerView: 2,
      },
      0: {
        slidesPerView: 1,
      },
    },
    spaceBetween: 50,
    onSwiper: (swiper) => {
      setPaginationCount(swiper.snapGrid.length);
    },
    onSlideChange: (swiper) => {
      setActiveIndex(swiper.activeIndex);
    },
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
    <section>
      <div className="container md:pt-36.5 pt-20">
        <div className="flex items-center gap-3 justify-between md:pb-20 pb-10">
          <div className="xl:w-4/5 lg:1/2 w-full">
            <Heading
              title="Explore our wide variety of categories"
              description=" Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new"
            />
          </div>
          <div className="xl:w-1/5 lg:w-1/2 bg-black lg:flex hidden items-center justify-between p-3 rounded-xl">
            <button
              className="size-11 bg-main-black text-2xl rounded-md text-white flex items-center justify-center"
              onClick={() => slideTo("prev")}
            >
              <MdOutlineArrowBack />
            </button>
            <div className={`flex gap-1 w-1/2`}>
              {Array.from({ length: paginationCount }).map((_, index) => (
                <button
                  onClick={() => slideTo(index)}
                  key={`home-category-nav-${index}`}
                  className={`${activeIndex === index ? "bg-main-red w-10" : "bg-secondary-black w-8"} transition-all inline-block h-1  rounded-md`}
                ></button>
              ))}
            </div>
            <button
              className="size-11 bg-main-black text-2xl rounded-md text-white flex items-center justify-center"
              onClick={() => slideTo("next")}
            >
              <MdOutlineArrowForward />
            </button>
          </div>
        </div>
        <div className="">
          <Swiper {...swiperOptions} ref={swiperRef} className="homeGenreSlider">
            {GENRES.map((genre, index) => (
              <SwiperSlide key={`home-genre-slide-${index}-${genre.slug}`}>
                <div className="rounded-md p-6 bg-secondary-black aspect-239/282">
                  <div className="aspect-190/210 rounded-md overflow-hidden">
                    <Image
                      src={createFakeImage(500, 500)}
                      width={190}
                      height={210}
                      className="size-full object-cover"
                      alt={genre.title}
                    />
                  </div>
                  <div className="text-white flex items-center justify-between">
                    <h3>{genre.title}</h3>
                    <MdOutlineArrowForward size={30} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex justify-center py-10 lg:hidden">
            <div className={`flex justify-center gap-1 w-auto bg-secondary-black `}>
              {Array.from({ length: paginationCount }).map((_, index) => (
                <button
                  onClick={() => slideTo(index)}
                  key={`home-category-nav-${index}`}
                  className={`${activeIndex === index ? "bg-main-red w-10" : "w-8"} transition-all inline-block h-1  rounded-md`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySlider;
