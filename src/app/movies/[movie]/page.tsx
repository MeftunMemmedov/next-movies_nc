import { Banner } from "./(sections)";
import { CiCalendar } from "react-icons/ci";
import { TbCategory } from "react-icons/tb";
import CastSlider from "./(components)/CastSlider";
import { LiaImdb } from "react-icons/lia";
import Image from "next/image";
import { createFakeImage } from "@/helpers/common";
import { notFound } from "next/navigation";
import { getMovieDetails } from "@/api/helpers/movie";

const MovieDetails = async ({ params }: { params: Promise<{ movie: string }> }) => {
  const { movie } = await params;

  const movieData = await getMovieDetails(movie);

  if (!movieData) {
    notFound();
  }
  const { movie: currentMovie, cast } = movieData;

  return (
    <main className="container">
      <Banner movie={currentMovie} />
      <section>
        <div className="flex lg:flex-row flex-col gap-5 mt-36.5">
          <div className="lg:w-[65%] w-full flex flex-col gap-7.5">
            <div className="p-12.5 rounded-xl bg-secondary-black">
              <h3 className="text-gray-400 mb-3.5">Description</h3>
              <p className="text-white">{currentMovie.description}</p>
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
                {currentMovie.genres.map((genre, index) => (
                  <strong
                    key={`genre-of-${currentMovie.title}-${genre}-${index}`}
                    className="text-white font-normal px-3 py-2 text-sm bg-main-black mr-3 mb-3 rounded-md"
                  >
                    {genre}
                  </strong>
                ))}
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
                <strong className="text-white font-normal px-3 py-2 text-sm bg-main-black mr-3 mb-3 rounded-md">
                  {currentMovie.rating}
                </strong>
              </div>

              <div className="mb-5">
                <div className="text-gray-400 flex items-center gap-2 mb-3">
                  <h3>Directors</h3>
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
      </section>
    </main>
  );
};

export default MovieDetails;
