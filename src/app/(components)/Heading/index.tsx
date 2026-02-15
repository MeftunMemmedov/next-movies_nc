interface Props {
  title: string;
  description: string;
}

const Heading = ({ title, description }: Props) => {
  return (
    <>
      <h4 className="md:text-[28px] text-2xl text-white mb-1">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </>
  );
};

export default Heading;
