"use client";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types";
import dynamic from "next/dynamic";
import { SwiperSlide } from "swiper/react";

const Slider = dynamic(() => import("@/components/Slider"), { ssr: false });

interface Props {
  movies: Movie[];
}

const NewRelases = ({ movies }: Props) => {
  return (
    <Slider title="New Relases">
      {movies.map((movie, index) => (
        <SwiperSlide key={`home-genre-slide-${index}-${movie.id}`}>
          <MovieCard movie={movie} />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default NewRelases;
