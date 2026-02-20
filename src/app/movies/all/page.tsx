import { getDataList } from "@/api/helpers";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types";
import Filter from "./(components)/Filter";

interface Props {
  searchParams: Promise<{
    genre?: string;
    agerating?: string;
    year?: string;
    imdb?: string;
  }>;
}

const AllMovies = async ({ searchParams }: Props) => {
  const { genre, agerating, year, imdb } = await searchParams;

  const params: Record<string, string | number | undefined> = {};

  if (genre) params.genres = `cs.{${genre}}`;
  if (year) params.year = `eq.${year}`;
  if (agerating) params.age_rating = `eq.${agerating}`;
  if (imdb) params.rating = `gte.${imdb}`;

  const movies = await getDataList<Movie>("mov_movies", params);

  return (
    <main className="container pt-32">
      <section className=" mb-20">
        <Filter params={params} />
      </section>
      <section>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {movies.map((mov, index) => (
            <MovieCard movie={mov} key={`all-movies-${mov.title}-${index}`} />
          ))}
        </div>
        {movies.length === 0 ? (
          <div className="py-20 w-full">
            <p className="text-white text-center text-3xl font-semibold">No Movie Found</p>
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default AllMovies;
