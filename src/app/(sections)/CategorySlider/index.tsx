"use client";
import Slider from "@/components/Slider";
import { createFakeImage } from "@/helpers/common";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineArrowForward } from "react-icons/md";
import { SwiperSlide } from "swiper/react";

const CategorySlider = () => {
  const { genres } = useAppSelector((store) => store.data);

  if (!genres) return null;
  return (
    <Slider
      title="Explore our wide variety of categories"
      description=" Whether you're looking for a comedy to make you laugh, a drama to make you think, or a documentary to learn something new"
    >
      {genres.map((genre, index) => (
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
            <Link href={`/${genre.slug}`} className="text-white flex items-center justify-between">
              <h3>{genre.title}</h3>
              <MdOutlineArrowForward size={30} />
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default CategorySlider;
