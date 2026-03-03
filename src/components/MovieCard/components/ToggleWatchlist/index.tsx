"use client";
import { addToWatchlist, removeFromWatchlist } from "@/app/movies/actions";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useAppSelector } from "@/store/hooks";
import { usePathname } from "next/navigation";
import { useFormStatus } from "react-dom";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const Button = ({ isSaved }: { isSaved: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <button className="text-3xl text-white float-end m-4" disabled={pending}>
      {pending ? (
        <div className="text-main-red text-xl">
          <LoadingSpinner />
        </div>
      ) : isSaved ? (
        <FaBookmark />
      ) : (
        <FaRegBookmark />
      )}
    </button>
  );
};

const ToggleWatchlist = ({ movieId }: { movieId: string }) => {
  const pathname = usePathname();
  const { user, watchlist } = useAppSelector((store) => store.user);
  if (!user || !watchlist) return null;
  const isSaved = watchlist.some((wm) => wm.movieId === movieId);
  const action = isSaved ? removeFromWatchlist : addToWatchlist;
  return (
    <>
      <form className="absolute w-full -top-40 group-hover:top-0 transition-all" action={action}>
        <input type="hidden" name="userId" value={user.id} />
        <input type="hidden" name="movieId" value={movieId} />
        <input type="hidden" name="pathname" value={pathname} />
        <Button isSaved={isSaved} />
      </form>
    </>
  );
};

export default ToggleWatchlist;
