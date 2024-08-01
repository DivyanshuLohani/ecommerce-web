"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <div className="relative w-full shadow-md rounded-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search?q=${search}`);
        }}
      >
        <Input
          placeholder="Search for..."
          className="pl-10  w-full rounded-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="absolute top-2 left-2 text-primary">
        <Search />
      </div>
    </div>
  );
}
