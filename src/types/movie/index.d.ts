import { Artist, Cast } from "../artist";
import { Genre } from "../genre";

export type Movie = {
  id: string;
  title: string;
  genres: Genre[];
  year: string;
  rating: number;
  description: string;
  //   type: string;
  trailer_urls: string[];
  images: string[];
  age_rating: string;
  poster: string;
  poster_bg: string;
  directors: Artist[];
  cast: Cast[];
  likes: string[];
  dislikes: string[];
};
