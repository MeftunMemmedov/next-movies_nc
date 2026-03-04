import { Banner } from "./(sections)";
import { CiCalendar } from "react-icons/ci";
import { TbCategory } from "react-icons/tb";
import CastSlider from "./(components)/CastSlider";
import { LiaImdb } from "react-icons/lia";
import Image from "next/image";
import { createFakeImage } from "@/helpers/common";
import { notFound } from "next/navigation";
import { getMovieDetails } from "@/api/helpers/movie";
import { Metadata } from "next";
import { getDataList } from "@/api/helpers";
import { Movie } from "@/types";
import { cache } from "react";
import TrailerPlayer from "./(components)/TrailerPlayer";

export const revalidate = 3600;

export const getMovie = cache(async (slug: string) => {
  return await getMovieDetails(slug);
});

export const generateStaticParams = async () => {
  const movies = await getDataList<Movie>("mov_movies", { select: "slug" });

  return movies.map((mov) => ({ movie: mov.slug }));
};

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ movie: string }>;
}): Promise<Metadata | undefined> => {
  const { movie } = await params;
  const movieData = await getMovie(movie);
  if (!movieData) return;
  const { movie: currentMovie, cast } = movieData;

  const cast_actors = cast.map((c) => c.actor.fullName);

  const title_description = {
    title: currentMovie.title,
    description: currentMovie.description,
  };

  const images = [currentMovie.poster, currentMovie.poster_bg].map((image) => ({
    url: image,
    width: 1200,
    height: 630,
    alt: currentMovie.title,
  }));
  return {
    ...title_description,
    keywords: [...currentMovie.genres, ...cast_actors, "movies", "movie", "streaming"],
    openGraph: {
      ...title_description,
      siteName: "movies.com",
      images,
      type: "website",
    },
    twitter: {
      ...title_description,
      card: "summary_large_image",
      images,
    },
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `movies.com/movies/${movie}`,
    },
  };
};

const MovieDetails = async ({ params }: { params: Promise<{ movie: string }> }) => {
  const { movie } = await params;

  const movieData = await getMovie(movie);

  if (!movieData) {
    notFound();
  }
  const { movie: currentMovie, cast } = movieData;

  return (
    <main className="container">
      <Banner movie={currentMovie} />
      <article>
        <div className="flex lg:flex-row flex-col gap-5 mt-36.5">
          <div className="lg:w-[65%] w-full flex flex-col gap-7.5">
            <div className="p-12.5 rounded-xl bg-secondary-black">
              <h2 className="text-gray-400 mb-3.5">Description</h2>
              <p className="text-white">{currentMovie.description}</p>
            </div>
            <div>
              <TrailerPlayer url={currentMovie.trailer_url} />
            </div>
            <div>
              <CastSlider cast={cast} />
            </div>
          </div>
          <div className="lg:w-[35%] w-full">
            <div className="p-12.5 rounded-xl bg-secondary-black">
              <div className="mb-5">
                <div className="text-gray-400 flex items-center gap-2 mb-3">
                  <CiCalendar />
                  <h3>Year</h3>
                </div>
                <strong className="text-white font-normal">{currentMovie.year}</strong>
              </div>

              <div className="mb-5">
                <div className="text-gray-400 flex items-center gap-2 mb-3">
                  <TbCategory />
                  <h3>Genres</h3>
                </div>
                <ul>
                  {currentMovie.genres.map((genre, index) => (
                    <li
                      key={`genre-of-${currentMovie.title}-${genre}-${index}`}
                      className="text-white font-normal px-3 py-2 text-sm bg-main-black mr-3 mb-3 rounded-md inline"
                    >
                      {genre}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-5">
                <div className="text-gray-400 flex items-center gap-2 mb-3">
                  <TbCategory />
                  <h3>Age rating</h3>
                </div>
                <strong className="text-white font-normal px-3 py-2 text-sm bg-main-black mr-3 mb-3 rounded-md">
                  {currentMovie.age_rating}
                </strong>
              </div>
              <div className="mb-5">
                <div className="text-gray-400 flex items-center gap-2 mb-3">
                  <LiaImdb />
                  <h3>Rating</h3>
                </div>
                <data
                  value={currentMovie.rating}
                  className="text-white font-normal px-3 py-2 text-sm bg-main-black mr-3 mb-3 rounded-md"
                >
                  {currentMovie.rating}
                </data>
              </div>

              <div className="mb-5">
                <div className="text-gray-400 flex items-center gap-2 mb-3">
                  <h2>Directors</h2>
                </div>
                {currentMovie.director ? (
                  <div className="flex bg-main-black text-white mb-5 rounded-xl p-3">
                    <div className="w-1/6 relative aspect-square rounded-md overflow-hidden">
                      <Image
                        src={currentMovie.director.image || createFakeImage(100, 100)}
                        fill
                        alt={`${currentMovie.title}-directed-by-${currentMovie.director.fullName}`}
                        className="object-cover"
                      />
                    </div>
                    <div className="w-3/4 pl-5 pt-3">
                      <strong className="font-normal">{currentMovie.director.fullName}</strong>
                    </div>
                  </div>
                ) : null}
                {/* {currentMovie.directors.map((director, index) => (
                  <div
                    key={`director-${currentMovie.title}-${director.fullName}-${index}`}
                    className="flex bg-main-black text-white mb-5 rounded-xl p-3"
                  >
                    <div className="w-1/6 relative aspect-square rounded-md overflow-hidden">
                      <Image src={createFakeImage(100, 100)} fill alt="" />
                    </div>
                    <div className="w-3/4 pl-5 pt-3">
                      <strong className="font-normal">{director.fullName}</strong>
                    </div>
                  </div>
                ))} */}
              </div>
            </div>
          </div>
        </div>
      </article>
    </main>
  );
};

export default MovieDetails;
