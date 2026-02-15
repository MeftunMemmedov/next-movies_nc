"use client";

import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io";

const SearchModal = () => {
  const [isSearchmodalActive, setIsSearchmodalActive] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");

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
          <form
            className="bg-secondary-black w-200 flex flex-col pb-20 rounded-2xl"
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
        </div>
      )}
    </>
  );
};

export default SearchModal;
