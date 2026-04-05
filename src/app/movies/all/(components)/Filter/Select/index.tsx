"use client";
import { MovieFilterType } from "@/types";
import { useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Option = { label: string; value: string };

interface Props {
  queryName: "genre" | "agerating" | "imdb" | "year";
  defaultOptionText: string;
  options: Option[];
  value: string;
  setFilterState: Dispatch<SetStateAction<MovieFilterType>>;
}

const Select = ({ queryName, defaultOptionText, options, value, setFilterState }: Props) => {
  const searchParams = useSearchParams();
  const [isSelectActive, setIsSelectActive] = useState<boolean>(false);

  const selectedOption: string = value;
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  const handleSelect = (val: string) => {
    setFilterState((prevFilters) => ({ ...prevFilters, [queryName]: val }));
    setIsSelectActive(false);
  };

  return (
    <div className="text-gray-300 inline-block md:min-w-56 min-w-full relative">
      <button
        aria-expanded={isSelectActive}
        className="w-full flex items-center md:gap-8 gap-4 justify-between md:pl-10 pl-5 pr-3 py-2 rounded-t-lg bg-black relative z-30 transition-all hover:bg-main-black aria-expanded:rounded-b-none aria-expanded:bg-main-black text-white rounded-b-lg"
        onClick={() => setIsSelectActive((prevState) => !prevState)}
      >
        <span
          className={`${defaultOptionText.length > 17 ? "text-sm" : "text-base"} font-semibold text-nowrap`}
        >
          {selectedOption || `${defaultOptionText}`}
        </span>
        <IoIosArrowDown
          className={`${isSelectActive ? "rotate-180" : "rotate-0"} transition-transform`}
        />
      </button>
      <ul
        className={`custom-scrollbar bg-main-black scroll- z-20 w-full md:absolute md:top-6 md:left-0 rounded-b-lg overflow-auto transition-all ${isSelectActive ? "max-h-56 pb-4 pt-5" : "max-h-0"}`}
      >
        {urlSearchParams.get(queryName) !== null ? (
          <li
            className="hover:bg-main-red px-4 py-2 cursor-pointer"
            onClick={() => {
              setFilterState((prevFilters) => ({ ...prevFilters, [queryName]: "" }));
              setIsSelectActive(false);
            }}
          >
            <span>{`--${defaultOptionText}--`}</span>
          </li>
        ) : null}
        {options.map((option, index) => (
          <li
            aria-disabled={
              selectedOption === option.label ||
              (queryName === "imdb" &&
                selectedOption !== "" &&
                option.label.startsWith(selectedOption))
            }
            key={`select-${defaultOptionText}-${option.value}-${index}`}
            className="hover:bg-red-950 aria-disabled:bg-red-950 aria-disabled:font-semibold px-4 py-2 cursor-pointer"
            onClick={() => handleSelect(option.value)}
          >
            <span>{option.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
