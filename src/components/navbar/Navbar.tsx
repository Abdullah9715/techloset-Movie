import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface NavbarProps {
  searchPlaceholder: string;
  onSearchChange: (query: string) => void;
  showSearchButton?: boolean;
  showPlusButton?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  searchPlaceholder,
  onSearchChange,
  showSearchButton,
  showPlusButton,
}) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchVisible((prev) => !prev);
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const currentPathname = window.location.pathname;
    const shouldNavigate = currentPathname !== "/search";

    if (shouldNavigate) {
      const encodedQuery = encodeURIComponent(searchQuery);
      navigate(`/search?query=${encodedQuery}`);
      setSearchQuery(encodedQuery);
      setSearchQuery(searchQuery);
    } else {
      const encodedQuery = encodeURIComponent(searchQuery);
      navigate(`/search?query=${encodedQuery}`);
      setSearchQuery(encodedQuery);
      onSearchChange(searchQuery);
      setSearchQuery(searchQuery);
    }
  };

  return (
    <nav className="p-4 w-full">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-black font-roboto text-[35px] font-semibold leading-[30px]">
          <Link to="/">
            The <br />
            Movie <br />
            Tracker
          </Link>
        </div>
        <div className="flex-grow flex items-center justify-end sm:hidden">
          {showSearchButton && (
            <button
              className="text-white focus:outline-none text-[20px] font-bold"
              onClick={toggleSearch}
            >
              🔍
            </button>
          )}
          {showPlusButton && (
            <button className="text-black ms-1 focus:outline-none text-[30px] font-bold">
              +
            </button>
          )}
        </div>
        <div
          className={`flex-grow  items-center justify-center sm:flex hidden`}
        >
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 rounded-[30px] focus:outline-none text-center bg-input  focus:ring focus:border-blue-300 sm:w-full md:w-[630px] lg:w-[40rem] h-[57px]"
            />
          </form>
        </div>
      </div>
      {isSearchVisible && (
        <div className="container mx-auto my-5 sm:hidden  flex items-center justify-center transition-all duration-2000 ease-in-out">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-4 py-2 rounded-[30px] focus:outline-none text-center bg-input  focus:ring focus:border-blue-300 sm:w-full md:w-[630px] lg:w-[40rem] h-[57px]"
            />
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
