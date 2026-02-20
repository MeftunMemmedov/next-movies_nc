import { getData, getDataList } from "@/api/helpers";
import MovieCard from "@/components/MovieCard";
import { Genre, Movie } from "@/types";

const MoviesByGenre = async ({ params }: { params: Promise<{ genre: string }> }) => {
  const { genre: slug } = await params;

  const genre = await getData<Genre>("mov_genres", { slug: `eq.${slug}` });

  const moviesByGenre = await getDataList<Movie>("mov_movies", { genres: `cs.{${genre.title}}` });
  return (
    <main className="container pt-32">
      <section className="bg-secondary-black h-32 mb-20 text-white flex items-center px-10 rounded-md">
        <h1 className="text-3xl font-semibold">{genre.title}</h1>
      </section>
      <section>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {moviesByGenre.map((mov, index) => (
            <MovieCard movie={mov} key={`all-movies-${mov.title}-${index}`} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default MoviesByGenre;
