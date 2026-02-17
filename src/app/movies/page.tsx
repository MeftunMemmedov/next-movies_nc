import Link from "next/link";
import { Hero, NewRelases, OurGenres, TrendingNow } from "./(sections)";

const Movies = () => {
  return (
    <main className="container">
      <Hero />
      <OurGenres />
      <TrendingNow />
      <NewRelases />
      <div className="pt-15 flex justify-center">
        <Link href="/movies/all" className="py-3 px-10 bg-main-red text-white rounded-md">
          All movies
        </Link>
      </div>
    </main>
  );
};

export default Movies;
