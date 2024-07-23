"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  return (
    <div className="relative w-full shadow-md rounded-full">
      <Input
        placeholder="Search for..."
        className="pl-10  w-full rounded-full"
      />
      <div className="absolute top-2 left-2 text-primary">
        <Search />
      </div>
    </div>
  );
}
