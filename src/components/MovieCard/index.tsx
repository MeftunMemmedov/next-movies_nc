import { Movie } from "@/types";
import Image from "next/image";
import Link from "next/link";
import ToggleWatchlist from "./components/ToggleWatchlist";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <div className="inline-block rounded-md p-6 bg-secondary-black aspect-239/282">
      <div className="aspect-2/3 rounded-md overflow-hidden relative">
        <div className="absolute size-full group overflow-hidden bg-transparent hover:bg-black/40 transition-colors">
          <div className="relative size-full">
            <ToggleWatchlist movieId={movie.id} />
            <div className="text-center absolute w-full -bottom-40 group-hover:bottom-0 transition-all text-white">
              <Link
                className="inline-block fomt-semibold hover:text-main-red hover:scale-120 transition-all"
                href={`/movies/${movie.slug}`}
              >
                {movie.title}
              </Link>
            </div>
          </div>
        </div>
        <Image
          src={movie.poster}
          width={190}
          height={210}
          className="size-full object-cover"
          alt={movie.title}
        />
      </div>
    </div>
  );
};

export default MovieCard;
