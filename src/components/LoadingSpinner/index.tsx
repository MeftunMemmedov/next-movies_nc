import { ImSpinner10 } from "react-icons/im";

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <ImSpinner10 className="animate-spin" />
    </div>
  );
};

export default LoadingSpinner;
