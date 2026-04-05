import { getDataList } from "@/api/helpers";
import MovieCard from "@/components/MovieCard";
import { Movie } from "@/types";
import Filter from "./(components)/Filter";
import { Metadata } from "next";

const title_description = {
  title: "All Movies",
  description:
    "The Best Streaming Experience. StreamVibe is the best streaming experience for watching your favorite movies and shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of content, including the latest blockbusters, classic movies, popular TV shows, and more. You can also create your own watchlists, so you can easily find the content you want to watch.",
};

export const metadata: Metadata = {
  ...title_description,
  keywords: ["movie", "movies", "streaming", "series"],
  authors: [{ name: "mysterio" }],
  openGraph: {
    ...title_description,
    siteName: "movies.com",
    images: [
      {
        url: "",
        width: 1200,
        height: 630,
        alt: "movies",
      },
    ],
    type: "website",
  },
  twitter: {
    ...title_description,
    card: "summary_large_image",
    images: [""],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://movies.com/movies/all",
  },
};

interface Props {
  searchParams: Promise<{
    genre?: string;
    agerating?: string;
    year?: string;
    imdb?: string;
    q: string;
  }>;
}

const AllMovies = async ({ searchParams }: Props) => {
  const { genre, agerating, year, imdb, q } = await searchParams;
  const params: Record<string, string | number | undefined> = {};

  if (genre) params.genres = `cs.{${genre}}`;
  if (year) params.year = `eq.${year}`;
  if (agerating) params.age_rating = `eq.${agerating}`;
  if (imdb) params.rating = `gte.${imdb}`;
  if (q) params.title = `ilike.%${q}%`;

  const movies = await getDataList<Movie>("mov_movies", params);

  return (
    <main className="container pt-32">
      <section className=" mb-20">
        <Filter params={params} />
      </section>
      <section>
        <ul className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
          {movies.map((mov, index) => (
            <li key={`all-movies-${mov.title}-${index}`}>
              <MovieCard movie={mov} />
            </li>
          ))}
        </ul>
        {movies.length === 0 ? (
          <div className="py-20 w-full">
            <p role="status" className="text-white text-center text-3xl font-semibold">
              No Movie Found
            </p>
          </div>
        ) : null}
      </section>
    </main>
  );
};

export default AllMovies;
