import { getDataList } from "@/api/helpers";
import { getGenreDetails } from "@/api/helpers/genre";
import MovieCard from "@/components/MovieCard";
import { Genre } from "@/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

export const revalidate = 3600;

export const getGenre = cache(async (slug: string) => {
  return await getGenreDetails(slug);
});

export const generateStaticParams = async () => {
  const genres = await getDataList<Genre>("mov_genres", { select: "slug" });
  return genres.map((genre) => ({ genre: genre.slug }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ genre: string }>;
}): Promise<Metadata | undefined> => {
  const { genre: slug } = await params;
  const genreData = await getGenre(slug);

  if (!genreData) return;
  const { genre } = genreData;

  const title_description = {
    title: genre.title,
    description: `Watch ${genre.title} movies`,
  };

  return {
    ...title_description,
    robots: {
      index: true,
      follow: true,
    },
  };
};

const MoviesByGenre = async ({ params }: { params: Promise<{ genre: string }> }) => {
  const { genre: slug } = await params;
  const genreData = await getGenre(slug);
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
        <ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {moviesByGenre.map((mov, index) => (
            <li key={`all-movies-${mov.title}-${index}`}>
              <MovieCard movie={mov} />
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default MoviesByGenre;
