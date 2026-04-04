"use client";
import { SwiperSlide } from "swiper/react";
import Image from "next/image";
import { createFakeImage } from "@/helpers/common";
import { MdOutlineArrowForward } from "react-icons/md";
import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("@/components/Slider"), { ssr: false });

const OurGenres = () => {
  const { genres } = useAppSelector((store) => store.data);

  if (!genres) return null;

  return (
    <Slider title="Our Genres">
      {genres.map((genre, index) => (
        <SwiperSlide key={`home-genre-slide-${index}-${genre.slug}`}>
          <div className="rounded-md p-6 bg-secondary-black aspect-239/282 group">
            <div className="aspect-190/210 group-hover:scale-90 transition-transform rounded-md overflow-hidden">
              <Image
                src={createFakeImage(500, 500)}
                width={190}
                height={210}
                className="size-full object-cover"
                alt={genre.title}
                loading="lazy"
              />
            </div>
            <Link
              href={`/${genre.slug}`}
              className="text-white inline-flex w-full items-center justify-between cursor-pointer group-hover:text-main-red font-semibold transition-colors"
            >
              <h3>{genre.title}</h3>
              <MdOutlineArrowForward size={30} />
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default OurGenres;
