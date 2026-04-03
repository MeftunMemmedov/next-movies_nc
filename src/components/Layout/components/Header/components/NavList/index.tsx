"use client";
import { useAppDispatch } from "@/store/hooks";
import { setUser, setWatchlist } from "@/store/user";
import { User, WatchListMov } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const NavList = ({ user, watchlist }: { user: User; watchlist: WatchListMov[] }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const navLinks: { title: string; path: string }[] = [
    { title: "Home", path: "/" },
    { title: "Movies", path: "/movies" },
    // { title: "Support", path: "/support" },
  ];
  useEffect(() => {
    if (user) {
      dispatch(setUser(user));
    }
  }, [user]);

  useEffect(() => {
    if (watchlist) {
      dispatch(setWatchlist(watchlist));
    }
  }, [watchlist]);

  return (
    <ul className="h-18.75 bg-[#0F0F0F] lg:flex hidden items-center gap-7 px-10 rounded-xl">
      {navLinks.map((link, index) => (
        <li key={`header-navlink-${link.path}-${index}`}>
          <Link
            href={link.path}
            className={`${pathname.endsWith(link.path) || pathname.split("/")[1] === link.title.toLowerCase() ? "px-10 py-4 bg-secondary-black rounded-md" : ""}`}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavList;
