import Link from "next/link";
import { JSX } from "react";

interface Props {
  path: string;
  icon: JSX.Element;
  title: string;
  extraClassName?: string;
}

const LinkButton = ({ path, icon, title, extraClassName }: Props) => {
  return (
    <Link
      href={path}
      className={`inline-flex justify-center items-center aspect-16/4 min-w-60 rounded-md bg-main-red text-white hover:bg-white hover:text-main-red hover:scale-105 transition-all ${extraClassName}`}
    >
      <div className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </div>
    </Link>
  );
};

export default LinkButton;
