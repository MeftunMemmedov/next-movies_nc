import Link from "next/link";
import { NewRelases, OurGenres } from "./(sections)";
import { getDataList } from "@/api/helpers";
import { Movie } from "@/types";
import { Metadata } from "next";
import Hero from "./(sections)/Hero";

const title_description = {
  title: "Movies | Top Movies",
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
    canonical: "movies.com/movies",
  },
};

const Movies = async () => {
  const movies = await getDataList<Movie>("mov_movies");

  const featuredMovies = movies.filter((mov) => mov.is_featured);
  return (
    <main className="container">
      <Hero featuredMovies={featuredMovies} />
      <OurGenres />
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
