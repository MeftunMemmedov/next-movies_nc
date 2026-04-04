"use client";
import { useAppSelector } from "@/store/hooks";
import Select from "./Select";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { MovieFilterType } from "@/types";

const Filter = ({ params }: { params: Record<string, string | number | undefined> }) => {
  const { genres } = useAppSelector((store) => store.data);
  const searchParams = useSearchParams();
  const router = useRouter();

  const ageRates = ["G", "PG", "PG-13", "R", "NC-17"];

  const initialFilterState: MovieFilterType = {
    genre: searchParams.get("genre") || "",
    agerating: searchParams.get("agerating") || "",
    year: searchParams.get("year") || "",
    imdb: searchParams.get("imdb") || "",
  };

  const [filterState, setFilterState] = useState<MovieFilterType>(initialFilterState);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => `${1900 + i}`);
  const filters = Object.keys(params);

  const handleFilter = () => {
    const urlSearchParams = new URLSearchParams();
    Object.entries(filterState).forEach(([key, val]) => {
      if (val) urlSearchParams.set(key, val);
    });
    router.push(`?${urlSearchParams.toString()}`);
  };

  const handleReset = () => {
    setFilterState({ genre: "", imdb: "", agerating: "", year: "" });
    router.replace("/movies/all");
  };

  if (!genres) return null;
  return (
    <div className="grid 2xl:grid-cols-5 md:grid-cols-2 grid-cols-1 2xl:gap-0 md:gap-3 gap-5 p-10 bg-secondary-black">
      <div className="flex justify-center">
        <Select
          queryName="genre"
          defaultOptionText="Select Genre"
          options={genres.map((genre) => ({ label: genre.title, value: genre.title }))}
          value={filterState.genre}
          setFilterState={setFilterState}
        />
      </div>

      <div className="flex justify-center">
        <Select
          queryName="agerating"
          defaultOptionText="Select Age Rating"
          options={ageRates.map((rating) => ({ label: rating, value: rating }))}
          value={filterState.agerating}
          setFilterState={setFilterState}
        />
      </div>

      <div className="flex justify-center">
        <Select
          queryName="year"
          defaultOptionText="Select Year"
          options={years.map((year) => ({ label: year, value: year }))}
          value={filterState.year}
          setFilterState={setFilterState}
        />
      </div>

      <div className="flex justify-center">
        <Select
          queryName="imdb"
          defaultOptionText="Select IMDB Rating"
          options={Array.from({ length: 9 }).map((_, i) => ({
            label: `${i + 1}+`,
            value: `${i + 1}`,
          }))}
          value={filterState.imdb}
          setFilterState={setFilterState}
        />
      </div>
      <div className="flex flex-col gap-2 items-center justify-center 2xl:col-span-1 md:col-span-2">
        {Object.values(filterState).some((value) => value !== "") ? (
          <button
            className="px-8 py-1 text-white bg-main-red hover:bg-white hover:text-main-red transition-colors font-semibold rounded-md"
            onClick={handleFilter}
          >
            Filter
          </button>
        ) : null}
        {filters.length > 0 ? (
          <button
            onClick={handleReset}
            className="px-8 py-1 text-white bg-main-black hover:bg-gray-200 hover:text-black font-semibold transition-colors rounded-md"
          >
            Reset
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Filter;
