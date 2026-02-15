import { GoBell } from "react-icons/go";
import NavList from "./components/NavList";
import MobileMenu from "./components/MobileMenu";
import Logo from "../Logo";
import SearchModal from "./components/SearchModal";

const Header = () => {
  return (
    <header className="fixed w-full z-50">
      <div className="container text-white pt-3">
        <nav className="flex justify-between">
          <Logo />

          <NavList />

          <div className="lg:flex hidden items-center gap-8">
            <SearchModal />
            <button>
              <GoBell className="lg:size-7 size-5" />
            </button>
          </div>

          <div className="lg:hidden flex items-center justify-center">
            <MobileMenu />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
