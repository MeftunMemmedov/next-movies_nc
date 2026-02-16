"use client";
import { GENRES } from "@/data/genre";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { createFakeImage } from "@/helpers/common";
import { MdOutlineArrowForward } from "react-icons/md";
import Slider from "@/components/Slider";

const OurGenres = () => {
  return (
    <Slider title="Our Genres">
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
    </Slider>
  );
};

export default OurGenres;
