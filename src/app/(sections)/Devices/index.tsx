import { JSX } from "react";
import { RiSmartphoneFill } from "react-icons/ri";
import { FaTablet } from "react-icons/fa6";
import { IoIosTv } from "react-icons/io";
import { BsLaptopFill } from "react-icons/bs";
import { GiGamepad } from "react-icons/gi";
import { BsHeadsetVr } from "react-icons/bs";
import Heading from "@/app/(components)/Heading";

const Devices = () => {
  const devices: {
    title: string;
    description: string;
    icon: JSX.Element;
  }[] = [
    {
      title: "Smartphones",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
      icon: <RiSmartphoneFill />,
    },
    {
      title: "Tablet",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
      icon: <FaTablet />,
    },
    {
      title: "Smart TV",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
      icon: <IoIosTv />,
    },
    {
      title: "Laptops",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
      icon: <BsLaptopFill />,
    },
    {
      title: "Gaming Consoles",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
      icon: <GiGamepad />,
    },
    {
      title: "VR Headsets",
      description:
        "StreamVibe is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store",
      icon: <BsHeadsetVr />,
    },
  ];
  return (
    <section>
      <div className="container md:pt-36.5 pt-20">
        <div className="md:pb-20 pb-10">
          <Heading
            title="We Provide you streaming experience across various devices."
            description="With StreamVibe, you can enjoy your favorite movies and TV shows anytime, anywhere. Our platform is designed to be compatible with a wide range of devices, ensuring that you never miss a moment of entertainment."
          />
        </div>
        <div className="grid xl:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-10">
          {devices.map((device, index) => (
            <div
              key={`home-device-${index}`}
              className="border border-gray-800 rounded-xl aspect-413/230 p-10 bg-black bg-[linear-gradient(31deg,rgba(20,20,20,0)_59%,rgba(255,0,0,0.28)_100%)]"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="bg-secondary-black text-main-red size-12.5 rounded-md text-3xl flex items-center justify-center">
                  {device.icon}
                </div>
                <h3 className="text-white text-xl">{device.title}</h3>
              </div>
              <p className="text-gray-400">{device.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Devices;
