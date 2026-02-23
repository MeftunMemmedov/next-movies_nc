import { Genre, Movie } from "@/types";
import { getData, getDataList } from ".";

export const getGenreDetails = async (
  slug: string
): Promise<{ genre: Genre; moviesByGenre: Movie[] } | null> => {
  const genre = await getData<Genre>("mov_genres", { slug: `eq.${slug}` });

  if (!genre) return null;

  const moviesByGenre = await getDataList<Movie>("mov_movies", { genres: `cs.{${genre.title}}` });

  return { genre, moviesByGenre };
};
