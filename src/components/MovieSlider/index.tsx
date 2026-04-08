"use client";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types";
import dynamic from "next/dynamic";
import { SwiperSlide } from "swiper/react";

const Slider = dynamic(() => import("@/components/Slider"), { ssr: false });

interface Props {
  title: string;
  movies: Movie[];
}

const MovieSlider = ({ title, movies }: Props) => {
  return (
    <Slider title={title}>
      {movies.map((movie, index) => (
        <SwiperSlide key={`${title}-mov-slide-${index}-${movie.id}`}>
          <MovieCard movie={movie} />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default MovieSlider;
