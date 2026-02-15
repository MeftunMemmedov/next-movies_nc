import { HomeHeroImg } from "@/assets/images";
import Image from "next/image";
import Link from "next/link";
import { FaPlay } from "react-icons/fa6";

const Hero = () => {
  return (
    <section id="home-hero">
      <div className="xl:aspect-1920/1092 md:aspect-1440/836 aspect-390/639 relative">
        <div className=" absolute w-full h-full bg-[linear-gradient(180deg,rgba(20,20,20,1)_2%,rgba(20,20,20,1)_3%,rgba(20,20,20,0.64)_37%,rgba(20,20,20,0.64)_57%,rgba(20,20,20,1)_98%)]"></div>
        <div className="xl:aspect-1920/860 md:aspect-1440/699 aspect-399/500">
          <Image src={HomeHeroImg} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="absolute bottom-0 w-full z-20">
          <div className="xl:w-1/2 md:w-4/5 w-11/12 text-center m-auto">
            <h1 className="text-white lg:text-[58px] text-4xl font-semibold lg:mb-3.5 mb-2">
              The Best Streaming Experience
            </h1>
            <p className="text-gray-400 lg:mb-12.5 md:block hidden">
              StreamVibe is the best streaming experience for watching your favorite movies and
              shows on demand, anytime, anywhere. With StreamVibe, you can enjoy a wide variety of
              content, including the latest blockbusters, classic movies, popular TV shows, and
              more. You can also create your own watchlists, so you can easily find the content you
              want to watch.
            </p>
            <p className="text-gray-400 mb-8 md:hidden block">
              StreamVibe is the best streaming experience for watching your favorite movies and
              shows on demand, anytime, anywhere.
            </p>
            <Link
              href="/movies"
              className="inline-flex items-center gap-2 rounded-md bg-main-red py-[18.5px] px-6 text-white"
            >
              <FaPlay size={18} />
              <span>Start Watching Now</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
