"use client";

import { useAppSelector } from "@/store/hooks";
import Link from "next/link";

const GenreList = () => {
  const { genres } = useAppSelector((store) => store.data);
  if (!genres) return null;
  return (
    <nav>
      <h3 className="mb-5 text-lg font-bold">Genres</h3>
      <ul>
        {genres.slice(0, 4).map((genre, navIndex) => (
          <li
            key={`footer-navlist-list-${genre.slug}-${navIndex}`}
            className="mb-3 text-gray-400 hover:text-white transition-colors"
          >
            <Link href={genre.slug}>{genre.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default GenreList;
