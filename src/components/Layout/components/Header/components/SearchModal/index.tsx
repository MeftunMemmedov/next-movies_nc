"use client";

import { getDataList } from "@/api/helpers";
import { Movie } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io";
import { ImSpinner10 } from "react-icons/im";

const SearchModal = () => {
  const [isSearchmodalActive, setIsSearchmodalActive] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedVal, setDebouncedVal] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [, setError] = useState<string>("");
  const [results, setResults] = useState<Movie[]>([]);

  const getResults = async () => {
    if (debouncedVal === "") return;
    setIsLoading(true);
    try {
      const res = await getDataList<Movie>("mov_movies", {
        title: `ilike.%${debouncedVal}%`,
        limit: 5,
      });
      setResults(res);
    } catch {
      setError("An error occured. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (searchInput !== "") {
        const timeOut = setTimeout(() => {
          setDebouncedVal(searchInput);
        }, 500);

        return () => clearTimeout(timeOut);
      }
    }
  }, [searchInput]);

  useEffect(() => {
    getResults();
  }, [debouncedVal]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (isSearchmodalActive) {
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    }
  }, [isSearchmodalActive]);
  return (
    <>
      <button onClick={() => setIsSearchmodalActive(true)}>
        <IoIosSearch className="lg:size-8 size-6" />
      </button>
      {isSearchmodalActive && (
        <div
          className="fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-black/30"
          onClick={() => setIsSearchmodalActive(false)}
        >
          <div className="bg-secondary-black w-200 pb-20 rounded-2xl">
            <form
              onSubmit={(e) => e.preventDefault()}
              className=" flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pb-10 pt-5 px-5">
                <button onClick={() => setIsSearchmodalActive(false)} className="float-right">
                  <IoIosCloseCircleOutline className="lg:size-8 size-6" />
                </button>
              </div>
              <div className="w-11/12 m-auto relative">
                <input
                  type="text"
                  className="border-b px-5 m-auto w-full h-10 focus:outline-0"
                  placeholder="Search movie"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <div className="flex items-center gap-2 absolute right-0 bottom-1 pr-5">
                  <button>
                    <IoIosSearch className="lg:size-8 size-6" />
                  </button>
                  {searchInput !== "" && (
                    <button onClick={() => setSearchInput("")}>
                      <IoIosCloseCircle className="lg:size-8 size-6" />
                    </button>
                  )}
                </div>
              </div>
            </form>
            <div className="overflow-auto h-50 pt-2 px-10">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <ImSpinner10 className="text-main-red text-4xl animate-spin" />
                </div>
              ) : (
                results.map((result, index) => (
                  <Link
                    href={`/movies/${result.slug}`}
                    className="text-white inline-flex w-full hover:scale-105 transition-transform items-center justify-between p-3 rounded-md bg-main-black mb-3"
                    key={`result-${result.title}-${index}-${result.slug}`}
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        width={200}
                        height={300}
                        src={result.poster}
                        className="aspect-2/3 w-10 rounded-sm"
                        alt={result.title}
                      />
                      <h3 className="text-xl font-semibold">{result.title}</h3>
                    </div>
                    <span className="text-sm text-gray-400">{result.year}</span>
                  </Link>
                ))
              )}

              {searchInput !== "" && !isLoading && results.length === 0 ? (
                <div className="py-10 text-center text-white">
                  <p>No result found</p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
