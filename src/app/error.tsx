"use client";
import { MdOutlineLocalMovies } from "react-icons/md";

const Error = () => {
  return (
    <div className=" lg:text-8xl text-4xl  h-screen flex items-center justify-center">
      <div className="relative">
        <MdOutlineLocalMovies className="text-red-900 lg:text-[400px] text-9xl absolute -top-20 left-20 -rotate-45 -z-10" />
        <p className="text-white">Oops.. </p>
        <p className="text-red-500 font-semibold">An error occured</p>
      </div>
    </div>
  );
};

export default Error;
