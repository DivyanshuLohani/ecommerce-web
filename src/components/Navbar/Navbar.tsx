import React from "react";
import SearchBar from "./SearchBar";
import Navlinks from "./Navlinks";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between gap-10 px-5 py-5 md:px-10 shadow-lg sticky top-0 z-50 bg-[#4151f9]">
      <div className="md:w-1/10">
        <Image src={"/logo.jpg"} width={50} height={50} alt="Logo" />
      </div>
      <div className="hidden md:flex w-3/5 items-center">
        <SearchBar />
      </div>
      <div className="links md:w-1/5">
        <Navlinks />
      </div>
    </nav>
  );
}
