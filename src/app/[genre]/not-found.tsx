import { RiMovie2Fill } from "react-icons/ri";

const NotFound = () => {
  return (
    <div className=" lg:text-8xl text-4xl  h-screen flex items-center justify-center">
      <div className="relative">
        <RiMovie2Fill className="text-red-900 lg:text-[400px] text-9xl absolute -top-50 right-20 -rotate-180 -z-10" />
        <p className="text-white">
          The <b className="text-main-red">Genre</b> you are looking for...
        </p>
        <p className="text-red-500 font-semibold">NOT FOUND</p>
        <p className="absolute -bottom-30 text-center -z-10 w-full font-bold text-[300px] text-slate-800">
          404
        </p>
      </div>
    </div>
  );
};

export default NotFound;
