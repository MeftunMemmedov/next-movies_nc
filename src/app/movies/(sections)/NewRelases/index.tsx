"use client";
import MovieCard from "@/components/MovieCard";
import Slider from "@/components/Slider";
import { useAppSelector } from "@/store/hooks";
import { Movie } from "@/types";
import { SwiperSlide } from "swiper/react";

interface Props {
  movies: Movie[];
}

const NewRelases = ({ movies }: Props) => {
  const { user, watchlist } = useAppSelector((store) => store.user);

  if (!user || !watchlist) return null;
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
