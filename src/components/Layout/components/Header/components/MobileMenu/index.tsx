"use client";
import TransparentBg from "@/components/TransparentBg";
import { useEffect, useState } from "react";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import Logo from "../../../Logo";
import { IoIosCloseCircleOutline } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdArrowDropdown } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getGenreList } from "@/store/data/actions";

const MobileMenu = () => {
  const dispatch = useAppDispatch();
  const { genres } = useAppSelector((store) => store.data);
  const pathname = usePathname();

  const [isMobilemenuActive, setIsMobilemenuActive] = useState<boolean>(false);
  const [isGenremenuActive, setIsGenremenuActive] = useState<boolean>(false);

  const navLinks: { title: string; path: string }[] = [
    { title: "Home", path: "/" },
    { title: "Movies", path: "/movies" },
    { title: "Support", path: "/support" },
  ];
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isMobilemenuActive) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    }
  }, [isMobilemenuActive]);

  useEffect(() => {
    if (genres == null) {
      dispatch(getGenreList());
    }
  }, [genres]);

  if (!genres) return null;
  return (
    <>
      <button
        className="bg-secondary-black size-12 flex justify-center items-center rounded-md"
        onClick={() => setIsMobilemenuActive((prevState) => !prevState)}
      >
        <HiOutlineBars3BottomRight size={23} className="text-gray-100" />
      </button>
      <div
        className={`h-screen lg:hidden block fixed ${isMobilemenuActive ? "sm:w-96 w-11/12 right-0" : "w-0 -right-100"} transition-all top-0 z-50 bg-main-black`}
      >
        <div className="container">
          <div className="flex items-center justify-between py-5">
            <Logo />
            <button onClick={() => setIsMobilemenuActive((prevState) => !prevState)}>
              <IoIosCloseCircleOutline className="text-white text-4xl" />
            </button>
          </div>
          <nav>
            <ul className="flex flex-col items-end gap-2">
              {navLinks.map((link, index) => (
                <li key={`header-mobilemenu-navlink-${link.path}-${index}`}>
                  <Link
                    href={link.path}
                    className={`${pathname.endsWith(link.path) ? "text-main-red" : ""} text-xl text-end`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              <li className="text-end">
                <button
                  className="flex items-center justify-end w-full gap-2"
                  onClick={() => {
                    if (isMobilemenuActive) setIsGenremenuActive((prevState) => !prevState);
                  }}
                >
                  <IoMdArrowDropdown
                    color="white"
                    className={`mb-2 ${isGenremenuActive ? "rotate-180" : "rotate-0"} transition-transform duration-100`}
                  />
                  <h3 className="text-xl font-semibold mb-3">Genres</h3>
                </button>
                <ul
                  className={`flex flex-col gap-2 ${isGenremenuActive ? "max-h-100" : "max-h-0"} transition-all duration-100 overflow-hidden`}
                >
                  {genres.map((genre, index) => (
                    <li
                      className="font-semibold"
                      key={`header-mobilemenu-genre-${genre.slug}-${index}`}
                    >
                      <Link href={`/${genre.slug}`}>{genre.title}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {isMobilemenuActive && <TransparentBg disable={() => setIsMobilemenuActive(false)} />}
    </>
  );
};

export default MobileMenu;
