"use client";
import Link from "next/link";
import React from "react";
import { User2, Truck, Package } from "lucide-react";
import { usePathname } from "next/navigation";

export default function SidebarLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex flex-col">
      <Link
        href="/account/profile/"
        className={`flex items-center gap-4 hover:bg-accent pr-5 md:pr-10 pl-5 transition-colors duration-300 py-5 rounded ${
          pathname.startsWith("/account/profile") ? "bg-accent" : ""
        }`}
      >
        <User2 />
        <li className="hidden md:block">Account</li>
      </Link>
      <Link
        href="/account/addresses/"
        className={`flex items-center gap-4 hover:bg-accent pr-10 pl-5 py-5 rounded transition-colors duration-300 ${
          pathname.startsWith("/account/addresses") ? "bg-accent" : ""
        }`}
      >
        <Truck />
        <li className="hidden md:block">Addresses</li>
      </Link>
      <Link
        href="/account/orders/"
        className={`flex items-center gap-4 hover:bg-accent pr-10 pl-5 py-5 rounded transition-colors duration-300 ${
          pathname.startsWith("/account/orders") ? "bg-accent" : ""
        }`}
      >
        <Package />
        <li className="hidden md:block">Orders</li>
      </Link>
    </ul>
  );
}
