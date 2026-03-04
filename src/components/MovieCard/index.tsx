import { Movie } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ToggleWatchlist from "./components/ToggleWatchlist";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <article className="inline-block rounded-md p-6 bg-secondary-black aspect-239/282">
      <Link
        href={`/movies/${movie.slug}`}
        className="aspect-2/3 rounded-md overflow-hidden relative inline-block hover:scale-110 transition-transform"
      >
        <div className="absolute size-full z-20 group overflow-hidden bg-transparent hover:bg-black/40 transition-colors">
          <div className="relative size-full">
            <ToggleWatchlist movieId={movie.id} />
            <div className="text-center absolute w-full -bottom-40 group-hover:bottom-0 transition-all text-white">
              <h2 className="inline-block fomt-semibold hover:text-main-red hover:scale-120 transition-all">
                {movie.title}
              </h2>
            </div>
          </div>
        </div>
        <figure className="size-full">
          <Image
            src={movie.poster}
            width={190}
            height={210}
            className="size-full object-cover"
            alt={`${movie.title} official movie poster`}
          />
        </figure>
      </Link>
    </article>
  );
};

export default MovieCard;
