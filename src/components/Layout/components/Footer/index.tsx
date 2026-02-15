import Link from "next/link";
import { JSX } from "react";
import { IoLogoFacebook } from "react-icons/io5";
import { BsTwitterX } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import Logo from "../Logo";

const Footer = () => {
  const footerNavlist: { title: string; list: { title: string; path: string }[] }[] = [
    {
      title: "Links",
      list: [
        {
          title: "Home",
          path: "/",
        },
        {
          title: "FAQ",
          path: "/faq",
        },
        {
          title: "Support",
          path: "/support",
        },
      ],
    },
    {
      title: "Genres",
      list: [
        {
          title: "Action",
          path: "/action",
        },
        {
          title: "Adventure",
          path: "/adventure",
        },
        {
          title: "Comedy",
          path: "/comedy",
        },
      ],
    },
  ];

  const socials: { title: string; icon: JSX.Element }[] = [
    {
      title: "facebook",
      icon: <IoLogoFacebook size={24} />,
    },
    {
      title: "twitter x",
      icon: <BsTwitterX size={20} />,
    },
    {
      title: "linkedin",
      icon: <FaLinkedin size={24} />,
    },
  ];

  return (
    <footer className="bg-[#0F0F0F] text-white lg:mt-36.5 mt-20">
      <div className="container">
        <div className="py-25 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-y-10">
          <nav>
            <Logo />
          </nav>
          {footerNavlist.map((nav, index) => (
            <nav key={`footer-navlist-${nav.title}-${index}`} className="">
              <h3 className="mb-5 text-lg font-bold">{nav.title}</h3>
              <ul>
                {nav.list.map((navLink, navIndex) => (
                  <li
                    key={`footer-navlist-list-${navLink.path}-${navIndex}`}
                    className="mb-3 text-gray-400 hover:text-white transition-colors"
                  >
                    <Link href={navLink.path}>{navLink.title}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <nav>
            <h3 className="text-lg font-bold mb-5">Connect with us</h3>
            <ul className="flex items-center gap-3.5">
              {socials.map((social, index) => (
                <li
                  key={`footer-social-${social.title}-${index}`}
                  className="size-14 flex items-center justify-center bg-secondary-black hover:bg-white hover:text-secondary-black transition-colors rounded-md"
                >
                  {social.icon}
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <hr className="text-gray-500" />
        <p className="text-gray-400 pt-6 pb-12.5">@2023 Movies, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
