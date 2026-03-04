interface Props {
  title: string;
  description: string;
}

const Heading = ({ title, description }: Props) => {
  return (
    <>
      <h3 className="md:text-[28px] text-2xl text-white mb-1">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </>
  );
};

export default Heading;
