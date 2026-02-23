import { getGenreDetails } from "@/api/helpers/genre";
import MovieCard from "@/components/MovieCard";
import { notFound } from "next/navigation";

const MoviesByGenre = async ({ params }: { params: Promise<{ genre: string }> }) => {
  const { genre: slug } = await params;
  const genreData = await getGenreDetails(slug);

  if (!genreData) {
    notFound();
  }

  const { moviesByGenre, genre } = genreData;

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
