"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useCart } from "@/context/CartProvider";
import { formatCurrency } from "@/lib/utils";
import CartProduct from "./CartProduct";
import Link from "next/link";
import SubtotalSection from "./SubtotalSection";
import { useRouter } from "next/navigation";

export default function CartButton() {
  const { products, setCartOpen, cartOpen, cartTotal } = useCart();
  const router = useRouter();
  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetTrigger asChild>
        <Button
          className="flex item-center gap-2 border-black md:px-4 py-2 rounded-full"
          variant="outline"
        >
          <ShoppingCart />
          <span className="hidden md:block" suppressHydrationWarning>
            Rs {formatCurrency(cartTotal)} ({products.length})
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full h-full md:w-4/5 px-0">
        <SheetHeader className="px-5">
          <SheetTitle>Shoping Cart ({products.length})</SheetTitle>
          <SheetDescription className="sr-only">Cart</SheetDescription>
        </SheetHeader>
        {cartTotal <= 0 && (
          <div className="flex flex-col gap-5 mt-10 items-center justify-center">
            No Products in your cart
            <Button
              onClick={() => {
                setCartOpen(false);
                router.push("/");
              }}
            >
              Browse Products
            </Button>
          </div>
        )}
        <div className="grid gap-4 py-4">
          {products.map((p, i) => (
            <CartProduct product={p} key={i} />
          ))}
        </div>
        <SubtotalSection />
      </SheetContent>
    </Sheet>
  );
}
