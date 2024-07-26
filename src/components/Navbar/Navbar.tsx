import React from "react";
import SearchBar from "./SearchBar";
import Navlinks from "./Navlinks";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 py-5 md:pl-10 shadow-lg sticky top-0 z-50 bg-[#4151f9]">
      <div className="md:w-1/10">
        <Link href={"/"}>
          <Image src={"/logo.jpg"} width={50} height={50} alt="Logo" />
        </Link>
      </div>
      <div className="hidden md:flex items-center w-3/5">
        <SearchBar />
      </div>
      <div className="links">
        <Navlinks />
      </div>
    </nav>
  );
}
