"use client";
import MovieCard from "@/components/MovieCard";
import Slider from "@/components/Slider";
import { MOVIES } from "@/data/movie";
import { SwiperSlide } from "swiper/react";

const NewRelases = () => {
  return (
    <Slider title="New Relases">
      {MOVIES.map((movie, index) => (
        <SwiperSlide key={`home-genre-slide-${index}-${movie.id}`}>
          <MovieCard movie={movie} />
        </SwiperSlide>
      ))}
    </Slider>
  );
};

export default NewRelases;
