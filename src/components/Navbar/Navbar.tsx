"use client";

import { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import Navlinks from "./Navlinks";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className="border-b bg-[#4151f9] py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 font-bold text-xl">
            <Image src={"/logo.jpg"} width={50} height={50} alt="Logo" />
          </Link>

          {/* Desktop Navigation */}
          {/* <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/categories"
              className="text-muted-foreground hover:text-foreground"
            >
              Categories
            </Link>
            <Link
              href="/deals"
              className="text-muted-foreground hover:text-foreground"
            >
              Deals
            </Link>
            <Link
              href="/new-arrivals"
              className="text-muted-foreground hover:text-foreground"
            >
              New Arrivals
            </Link>
          </div> */}

          {/* Search Bar - Desktop */}
          <div className="hidden md:block w-3/5">
            <SearchBar />
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <Navlinks />
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] sm:w-[400px]  text-white"
              >
                <nav className="flex flex-col h-full">
                  <div className="flex items-center justify-between py-4 border-b">
                    <span className="font-bold text-lg">Menu</span>
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetTrigger>
                  </div>
                  <div className="flex flex-col space-y-4 py-4">
                    <Link
                      href="/account/profile/"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/cart"
                      className="text-muted-foreground hover:text-foreground"
                    >
                      Cart
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="md:hidden py-4">
            <SearchBar />
          </div>
        )}
      </div>
    </nav>
  );
}
