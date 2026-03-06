import NavList from "./components/NavList";
import MobileMenu from "./components/MobileMenu";
import Logo from "../Logo";
import SearchModal from "./components/SearchModal";
import Link from "next/link";
import { BiUser } from "react-icons/bi";
import { IoMdLogIn } from "react-icons/io";
import { getSession } from "@/api/helpers/auth";
import { getDataList } from "@/api/helpers";
import { WatchListMov } from "@/types";

const Header = async () => {
  const user = await getSession();
  const watchlist = user
    ? await getDataList<WatchListMov>("mov_watchlist", {
        userId: `eq.${user?.id}`,
        select: "id,movieId",
      })
    : [];

  return (
    <header className="fixed w-full z-50 bg-[linear-gradient(0deg,rgba(20,20,20,0)_11%,rgba(20,20,20,0.8)_78%)]">
      <div className="container text-white pt-3">
        <nav className="flex justify-between">
          <Logo />

          <NavList user={user} watchlist={watchlist} />

          <div className="lg:flex hidden items-center gap-8">
            <SearchModal />
            {user ? (
              <Link href="/account/dashboard">
                <BiUser className="lg:size-7 size-5" />
              </Link>
            ) : (
              <Link href="/auth/login">
                <IoMdLogIn className="lg:size-7 size-5" />
              </Link>
            )}
          </div>

          <div className="lg:hidden flex items-center justify-center">
            <MobileMenu user={user} />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
