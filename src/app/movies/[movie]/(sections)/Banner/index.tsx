import { Movie } from "@/types";
import Image from "next/image";
import UserActions from "../../../../../components/UserActions";

const Banner = ({ movie }: { movie: Movie }) => {
  return (
    <section className="pt-32">
      <div className="xl:aspect-1594/835 md:aspect-1594/935 sm:aspect-358/468 aspect-358/568 relative">
        <div className="absolute top-0 left-0 z-40 size-full flex flex-col justify-between pointer-events-none bg-[linear-gradient(180deg,rgba(20,20,20,0.21)_0%,rgba(20,20,20,0.9)_73%)]">
          <div className="lg:h-11/12 h-full flex flex-col items-center justify-end lg:py-14 py-3 text-center">
            <h1 className="mb-3 font-semibold lg:text-3xl sm:text-xl text-white">{movie.title}</h1>
            <p className="mb-5 xl:w-1/2 lg:w-4/5 w-11/12 lg:block hidden text-center lg:text-base text-sm text-gray-400">
              {movie.description}
            </p>

            <div className="flex lg:flex-row flex-col justify-center items-center gap-5 w-full">
              {/* <Link
                href="/movies"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-main-red lg:py-3.5 py-3 px-6 lg:w-auto w-11/12 text-white  pointer-events-auto"
              >
                <FaPlay size={18} />
                <span>Play Now</span>
              </Link> */}
              <UserActions movie={movie} />
            </div>
          </div>
        </div>
        <Image
          src={movie.poster_bg}
          width={500}
          height={300}
          className="size-full object-cover"
          alt={movie.title}
        />
      </div>
    </section>
  );
};

export default Banner;
