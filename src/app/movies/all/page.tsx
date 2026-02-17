import Select from "@/components/Filter/Select";
import MovieCard from "@/components/MovieCard";
import { GENRES } from "@/data/genre";
import { MOVIES } from "@/data/movie";
import Link from "next/link";

const AllMovies = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => `${1900 + i}`);

  return (
    <main className="container">
      <section className="pt-32 mb-20">
        <div className="grid 2xl:grid-cols-5 md:grid-cols-2 grid-cols-1 2xl:gap-0 md:gap-3 gap-5 p-10 bg-secondary-black">
          <div className="flex justify-center">
            <Select
              queryName="genre"
              defaultOptionText="Select Genre"
              options={GENRES.map((genre) => ({ label: genre.title, value: genre.slug }))}
            />
          </div>

          <div className="flex justify-center">
            <Select
              queryName="agerating"
              defaultOptionText="Select Age Rating"
              options={GENRES.map((genre) => ({ label: genre.title, value: genre.slug }))}
            />
          </div>

          <div className="flex justify-center">
            <Select
              queryName="year"
              defaultOptionText="Select Year"
              options={years.map((year) => ({ label: year, value: year }))}
            />
          </div>

          <div className="flex justify-center">
            <Select
              queryName="imdb"
              defaultOptionText="Select IMDB Rating"
              options={Array.from({ length: 9 }).map((_, i) => ({
                label: `${i + 1}+`,
                value: `${i + 1}`,
              }))}
            />
          </div>
          <div className="flex items-center justify-center 2xl:col-span-1 md:col-span-2">
            <Link href="/movies/all" className="px-8 py-1 text-white bg-main-red rounded-md">
              Reset
            </Link>
          </div>
        </div>
      </section>
      <section>
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          {MOVIES.map((mov, index) => (
            <MovieCard movie={mov} key={`all-movies-${mov.title}-${index}`} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default AllMovies;
