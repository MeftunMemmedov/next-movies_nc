import { ImSpinner10 } from "react-icons/im";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <ImSpinner10 className="text-main-red animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
