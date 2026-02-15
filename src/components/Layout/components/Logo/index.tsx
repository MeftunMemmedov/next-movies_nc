import { projectName } from "@/api";
import { createFakeImage } from "@/helpers/common";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src={createFakeImage(60, 60)}
        width={60}
        height={60}
        className="w-14 h-14 aspect-square rounded-full"
        alt={projectName ?? "LOGO"}
      />
      <h2 className="font-bold lg:text-xl text-sm sm:block hidden">Movies</h2>
    </Link>
  );
};

export default Logo;
