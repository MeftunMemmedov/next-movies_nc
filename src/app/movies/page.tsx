import Link from "next/link";
import { Hero, NewRelases, OurGenres } from "./(sections)";
import { getDataList } from "@/api/helpers";
import { Movie } from "@/types";

const Movies = async () => {
  const movies = await getDataList<Movie>("mov_movies");
  const featuredMovies = movies.filter((mov) => mov.is_featured === true);
  return (
    <main className="container">
      <Hero featuredMovies={featuredMovies} />
      <OurGenres />
      {/* <TrendingNow /> */}
      <NewRelases movies={movies} />
      <div className="pt-15 flex justify-center">
        <Link href="/movies/all" className="py-3 px-10 bg-main-red text-white rounded-md">
          All movies
        </Link>
      </div>
    </main>
  );
};

export default Movies;
