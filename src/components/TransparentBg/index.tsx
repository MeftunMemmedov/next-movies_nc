interface Props {
  disable: () => void;
}
const TransparentBg = ({ disable }: Props) => {
  return (
    <div className="w-full h-screen absolute top-0 left-0 z-40 bg-black/30" onClick={disable}></div>
  );
};

export default TransparentBg;
