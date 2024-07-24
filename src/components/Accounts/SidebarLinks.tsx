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
        className={`flex items-center gap-4 hover:bg-input pr-10 pl-5 py-5 rounded ${
          pathname.startsWith("/account/profile") ? "bg-input" : ""
        }`}
      >
        <User2 />
        <li>Account</li>
      </Link>
      <Link
        href="/account/addresses/"
        className={`flex items-center gap-4 hover:bg-input pr-10 pl-5 py-5 rounded ${
          pathname.startsWith("/account/addresses") ? "bg-input" : ""
        }`}
      >
        <Truck />
        <li>Addresses</li>
      </Link>
      <Link
        href="/account/orders/"
        className={`flex items-center gap-4 hover:bg-input pr-10 pl-5 py-5 rounded ${
          pathname.startsWith("/account/orders") ? "bg-input" : ""
        }`}
      >
        <Package />
        <li>Orders</li>
      </Link>
    </ul>
  );
}
