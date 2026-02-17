"use client";

import { useQueryState } from "nuqs";
import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";

type Option = { label: string; value: string };

interface Props {
  queryName: string;
  defaultOptionText: string;
  options: Option[];
}

const Select = ({ queryName, defaultOptionText, options }: Props) => {
  const [query, setQuery] = useQueryState(queryName);
  const [isSelectActive, setIsSelectActive] = useState<boolean>(false);

  const getSelectedOption = () => {
    if (!query) return undefined;
    return options.find((option) => option.value === query)?.label;
  };

  const selectedOption = getSelectedOption();

  return (
    <div className="text-white inline-block md:min-w-56 min-w-full relative">
      <button
        className={`w-full flex items-center md:gap-8 gap-4 justify-between md:pl-10 pl-5 pr-2 py-2 rounded-t-lg bg-red-900 relative z-30 transition-all ${isSelectActive ? "rounded-b-none" : "rounded-b-lg"}`}
        onClick={() => setIsSelectActive((prevState) => !prevState)}
      >
        <span className={`${defaultOptionText.length > 17 ? "text-sm" : "text-base"}`}>
          {selectedOption ?? `--${defaultOptionText}--`}
        </span>
        <IoIosArrowDown
          className={`${isSelectActive ? "rotate-180" : "rotate-0"} transition-transform`}
        />
      </button>
      <ul
        className={`custom-select-option-list bg-red-950 scroll- z-20 w-full md:absolute md:top-6 md:left-0 rounded-b-lg overflow-auto transition-all ${isSelectActive ? "max-h-56 pb-4 pt-5" : "max-h-0"}`}
      >
        {options.map((option, index) => (
          <li
            key={`select-${defaultOptionText}-${option.value}-${index}`}
            className="hover:bg-main-red px-4 py-2"
            onClick={() => {
              // setSelectedOption(option.label);
              setIsSelectActive(false);
              setQuery(option.value);
            }}
          >
            <span>{option.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
