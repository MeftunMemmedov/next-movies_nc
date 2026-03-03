import LoadingSpinner from "@/components/LoadingSpinner";

const Loading = () => {
  return (
    <div className="h-screen text-8xl text-main-red flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
};

export default Loading;
