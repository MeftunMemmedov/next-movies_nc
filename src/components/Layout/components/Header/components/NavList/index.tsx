"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavList = () => {
  const pathname = usePathname();
  const navLinks: { title: string; path: string }[] = [
    { title: "Home", path: "/" },
    { title: "Movies", path: "/movies" },
    { title: "Support", path: "/support" },
  ];
  return (
    <ul className="h-18.75 bg-[#0F0F0F] lg:flex hidden items-center gap-7 px-10 rounded-xl">
      {navLinks.map((link, index) => (
        <li key={`header-navlink-${link.path}-${index}`}>
          <Link
            href={link.path}
            className={`${pathname.endsWith(link.path) ? "px-10 py-4 bg-secondary-black rounded-md" : ""}`}
          >
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavList;
