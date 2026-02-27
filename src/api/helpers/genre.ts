import { Genre, Movie } from "@/types";
import { getData, getDataList } from ".";

export const getGenreDetails = async (
  slug: string
): Promise<{ genre: Genre; moviesByGenre: Movie[] } | void> => {
  const genre = await getData<Genre>("mov_genres", { slug: `eq.${slug}` });

  if (!genre) return;

  const moviesByGenre = await getDataList<Movie>("mov_movies", { genres: `cs.{${genre.title}}` });

  return { genre, moviesByGenre };
};
