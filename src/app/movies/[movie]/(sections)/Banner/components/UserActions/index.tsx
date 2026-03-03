"use client";
import ToggleWatchlistHeroBtn from "@/components/ToggleWatchlistHeroBtn";
import { useAppSelector } from "@/store/hooks";
import { Movie } from "@/types";
import { usePathname } from "next/navigation";

const UserActions = ({ movie }: { movie: Movie }) => {
  const pathname = usePathname();
  const { user, watchlist } = useAppSelector((store) => store.user);

  if (!user || !watchlist) return null;
  return (
    <div className="flex items-center gap-5">
      <form className="flex items-center gap-5">
        <input type="hidden" name="userId" value={user.id} />
        <input type="hidden" name="movieId" value={movie.id} />
        <input type="hidden" name="pathname" value={pathname} />
        <ToggleWatchlistHeroBtn watchlist={watchlist} slide={movie} />
      </form>
      {/* <button className="lg:size-14 size-10 bg-black text-white hover:bg-white hover:text-black transition-colors rounded-lg pointer-events-auto">
                     <AiOutlineLike className="m-auto size-7" />
                   </button>
                   <button className="lg:size-14 size-10 bg-black text-white hover:bg-white hover:text-black transition-colors rounded-lg pointer-events-auto">
                     <AiFillSound className="m-auto size-7" />
                   </button> */}
    </div>
  );
};

export default UserActions;
