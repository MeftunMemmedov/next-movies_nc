"use client";
import { addToWatchlist, removeFromWatchlist } from "@/app/movies/actions";
import { useAppSelector } from "@/store/hooks";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const ToggleWatchlist = ({ movieId }: { movieId: string }) => {
  const { user, watchlist } = useAppSelector((store) => store.user);

  if (!user || !watchlist) return null;
  return (
    <>
      <form className="absolute w-full -top-40 group-hover:top-0 transition-all">
        <input type="hidden" name="userId" value={user.id} />
        <input type="hidden" name="movieId" value={movieId} />
        {watchlist.find((wm) => wm.movieId === movieId) ? (
          <button className="text-3xl text-white float-end m-4" formAction={removeFromWatchlist}>
            <FaBookmark />
          </button>
        ) : (
          <button className="text-3xl text-white float-end m-4" formAction={addToWatchlist}>
            <FaRegBookmark />
          </button>
        )}
      </form>
    </>
  );
};

export default ToggleWatchlist;
