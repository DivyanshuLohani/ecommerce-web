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

export default function CartButton() {
  const { products, setCartOpen, cartOpen, cartTotal } = useCart();
  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetTrigger asChild>
        <Button
          className="flex item-center gap-2 border-black md:px-4 py-2 rounded-full"
          variant="outline"
        >
          <ShoppingCart />
          <span className="hidden md:block">
            Rs {formatCurrency(cartTotal)} ({products.length})
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full md:w-4/5 px-0">
        <SheetHeader className="px-5">
          <SheetTitle>Shoping Cart ({products.length})</SheetTitle>
          <SheetDescription className="sr-only">Cart</SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          {products.map((p, i) => (
            <CartProduct product={p} key={i} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
