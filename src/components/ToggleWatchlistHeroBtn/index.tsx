import { addToWatchlist, removeFromWatchlist } from "@/app/movies/actions";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Movie, WatchListMov } from "@/types";
import { useFormStatus } from "react-dom";
import { FiMinus, FiPlus } from "react-icons/fi";

const ToggleWatchlistHeroBtn = ({
  watchlist,
  slide,
}: {
  watchlist: WatchListMov[] | null;
  slide: Movie;
}) => {
  const { pending } = useFormStatus();
  if (!watchlist) return null;
  return (
    <>
      {watchlist?.find((wm) => wm.movieId === slide.id) ? (
        <button
          formAction={removeFromWatchlist}
          className="lg:size-14 size-10 bg-main-red text-white hover:bg-white hover:text-black transition-colors rounded-lg  pointer-events-auto"
          disabled={pending}
        >
          {pending ? <LoadingSpinner /> : <FiMinus className="m-auto size-7" />}
        </button>
      ) : (
        <button
          formAction={addToWatchlist}
          className="lg:size-14 size-10 bg-black text-white hover:bg-white hover:text-black transition-colors rounded-lg  pointer-events-auto"
          disabled={pending}
        >
          {pending ? <LoadingSpinner /> : <FiPlus className="m-auto size-7" />}
        </button>
      )}
    </>
  );
};

export default ToggleWatchlistHeroBtn;
