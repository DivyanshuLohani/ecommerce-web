import React from "react";
import { User2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Label } from "@radix-ui/react-label";
import { Input } from "postcss";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "../ui/sheet";

export default function Navlinks() {
  return (
    <ul className="flex md:gap-5">
      <Link
        href={"/account/profile/"}
        className="flex item-center gap-2 border-black md:px-4 py-2 md:border rounded-full bg-background"
      >
        <User2 />
        <span className="hidden md:block">Account</span>
      </Link>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className="flex item-center gap-2 border-black md:px-4 py-2 rounded-full"
            variant="outline"
          >
            <ShoppingCart />
            <span className="hidden md:block">Rs xxxx (x)</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-full md:w-4/5 ">
          <SheetHeader>
            <SheetTitle>Shoping Cart (x)</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4"></div>
        </SheetContent>
      </Sheet>
    </ul>
  );
}
