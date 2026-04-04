"use client";

import { useAppSelector } from "@/store/hooks";
import Link from "next/link";
import { MdOutlineArrowForward } from "react-icons/md";
import { SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("@/components/Slider"), { ssr: false });

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
          <div className="rounded-xl p-6 bg-secondary-black hover:bg-black aspect-5/1 font-semibold group">
            {/* <div className="aspect-190/210 rounded-md overflow-hidden">
              <Image
                src={createFakeImage(500, 500)}
                width={190}
                height={210}
                className="size-full object-cover"
                alt={genre.title}
                loading="lazy"
              />
            </div> */}
            <Link
              href={`/${genre.slug}`}
              className="text-white flex items-center justify-between group-hover:text-main-red"
            >
              <h2 className="group-hover:scale-110 transition-transform">{genre.title}</h2>
              <MdOutlineArrowForward size={30} className="group-hover:-mr-2 transition-all" />
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default CategorySlider;
