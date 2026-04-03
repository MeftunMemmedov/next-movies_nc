"use client";
import { getDataList } from "@/api/helpers";
import { Movie } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io";
import LoadingSpinner from "@/components/LoadingSpinner";
// import { usePathname } from "next/navigation";

const SearchModal = () => {
  // const pathname = usePathname();
  const [isSearchmodalActive, setIsSearchmodalActive] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [debouncedVal, setDebouncedVal] = useState<string>("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "finished">(
    "idle"
  );
  const [results, setResults] = useState<Movie[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const timeOut = setTimeout(() => {
        setDebouncedVal(searchInput);
      }, 500);

      return () => clearTimeout(timeOut);
    }
  }, [searchInput]);

  useEffect(() => {
    if (debouncedVal === "") return;
    const getResults = async () => {
      try {
        setStatus("loading");
        const res = await getDataList<Movie>("mov_movies", {
          title: `ilike.%${debouncedVal.trim()}%`,
          limit: 5,
        });
        setResults(res);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };
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
    return () => document.body.classList.remove("overflow-hidden");
  }, [isSearchmodalActive]);
  // const resetStates = () => {
  //   setIsSearchmodalActive(false);
  //   setSearchInput("");
  //   setResults([]);
  // };
  // useEffect(() => {
  //   resetStates();
  // }, [pathname]);

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
          <div
            className="bg-secondary-black w-200 pb-20 rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              // onSubmit={(e) => e.preventDefault()}
              className=" flex flex-col"
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
                  autoFocus
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchInput(value);
                    if (value === "") {
                      setStatus("idle");
                    } else {
                      setStatus("loading");
                    }
                  }}
                />
                <div className="flex items-center gap-2 absolute right-0 bottom-1 pr-5">
                  <button>
                    <IoIosSearch className="lg:size-8 size-6" />
                  </button>
                  {searchInput !== "" && (
                    <button
                      onClick={() => {
                        setSearchInput("");
                      }}
                    >
                      <IoIosCloseCircle className="lg:size-8 size-6" />
                    </button>
                  )}
                </div>
              </div>
            </form>
            <div className=" h-50 pt-4 px-10">
              {status === "loading" ? (
                <div className="flex justify-center items-center py-20">
                  <div className="text-main-red text-4xl">
                    <LoadingSpinner />
                  </div>
                </div>
              ) : (
                results.length > 0 && (
                  <ul className="h-full overflow-y-auto custom-scrollbar">
                    {results.map((result, index) => (
                      <li
                        key={`result-${result.title}-${index}-${result.slug}`}
                        className="custom-scrollbar w-11/12 m-auto"
                      >
                        <Link
                          href={`/movies/${result.slug}`}
                          className="text-white inline-flex w-full hover:scale-105 transition-transform items-center justify-between p-3 rounded-md bg-main-black mb-3"
                          onClick={() => {
                            setIsSearchmodalActive(false);
                            setSearchInput("");
                            setResults([]);
                            setStatus("idle");
                          }}
                        >
                          <div className="flex items-center gap-4">
                            <Image
                              width={200}
                              height={300}
                              src={result.poster}
                              className="aspect-2/3 w-10 rounded-sm"
                              alt={result.title}
                            />
                            <h2 className="text-xl font-semibold">{result.title}</h2>
                          </div>
                          <h3 className="text-sm text-gray-400">{result.year}</h3>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )
              )}
              {debouncedVal === "" && status === "idle" && (
                <div className="py-16 text-center text-gray-400">
                  <p>Start typing to search movies</p>
                </div>
              )}
              {status === "success" && results.length === 0 && (
                <div className="py-10 text-center text-white">
                  <p>No result found</p>
                </div>
              )}
              {status === "error" && (
                <div className="py-10 text-center text-red-800">
                  <p>An error occured. Please try again.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchModal;
