"use client";
import { useAppSelector } from "@/store/hooks";
import Select from "./Select";
import Link from "next/link";

const ageRates = ["G", "PG", "PG-13", "R", "NC-17"];
const Filter = () => {
  const { genres } = useAppSelector((store) => store.data);
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => `${1900 + i}`);

  if (!genres) return null;
  return (
    <div className="grid 2xl:grid-cols-5 md:grid-cols-2 grid-cols-1 2xl:gap-0 md:gap-3 gap-5 p-10 bg-secondary-black">
      <div className="flex justify-center">
        <Select
          queryName="genre"
          defaultOptionText="Select Genre"
          options={genres.map((genre) => ({ label: genre.title, value: genre.title }))}
        />
      </div>

      <div className="flex justify-center">
        <Select
          queryName="agerating"
          defaultOptionText="Select Age Rating"
          options={ageRates.map((rating) => ({ label: rating, value: rating }))}
        />
      </div>

      <div className="flex justify-center">
        <Select
          queryName="year"
          defaultOptionText="Select Year"
          options={years.map((year) => ({ label: year, value: year }))}
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
        />
      </div>
      <div className="flex flex-col gap-2 items-center justify-center 2xl:col-span-1 md:col-span-2">
        {/* <button
          className="px-8 py-1 text-white bg-blue-500 rounded-md"
          // onClick={() => revalidateP()}
        >
          Filter
        </button> */}
        <Link href="/movies/all" className="px-8 py-1 text-white bg-main-red rounded-md">
          Reset
        </Link>
      </div>
    </div>
  );
};

export default Filter;
