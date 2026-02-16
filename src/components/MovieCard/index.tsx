import { Movie } from "@/types";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Link href={`/`} className="inline-block rounded-md p-6 bg-secondary-black aspect-239/282">
      <div className="aspect-224/308 rounded-md overflow-hidden relative">
        <div className="absolute size-full group overflow-hidden bg-transparent hover:bg-black/40 transition-colors">
          <div className="relative size-full">
            <div className="text-center absolute w-full -bottom-40 group-hover:bottom-0 transition-all text-white">
              <strong>{movie.title}</strong>
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
    </Link>
  );
};

export default MovieCard;
