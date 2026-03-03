import { getDataList } from "@/api/helpers";
import { getSession } from "@/api/helpers/auth";
import MovieCard from "@/components/MovieCard";
import { createFakeImage } from "@/helpers/common";
import { WatchListMov } from "@/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import LogoutForm from "./(components)/LogoutBtn";

const Dashboard = async () => {
  const user = await getSession();
  if (!user) {
    notFound();
  }
  const watchlist = await getDataList<WatchListMov>("mov_watchlist", {
    select: "id,movieId,movie:movieId(*)",
    userId: `eq.${user.id}`,
  });
  return (
    <main className="container pt-32">
      <div className="text-white">
        <div className="flex items-center justify-between border-b border-white pb-10">
          <div className="flex items-center gap-2 ">
            <Image
              src={createFakeImage(100, 100)}
              width={39}
              height={39}
              className="w-10 rounded-full aspect-square"
              alt="avatar"
            />
            <div>
              <div className="font-bold">{user.user_metadata.username}</div>
              <div>{user.user_metadata.email}</div>
            </div>
          </div>
          <div>
            <LogoutForm />
          </div>
        </div>
      </div>
      <div className="">
        <h3 className="text-main-red mb-10 font-semibold my-10 text-3xl">Watchlist</h3>
        {watchlist.length > 0 ? (
          <div className="grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {watchlist.map((wl, index) => (
              <MovieCard movie={wl.movie} key={`all-movies-${wl.movie.title}-${index}`} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400">
            <p className="text-3xl font-semibold">No movie in watchlist</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
