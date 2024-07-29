"use client";
import { useCart } from "@/context/CartProvider";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function SubtotalSection() {
  const { cartTotal, setCartOpen } = useCart();
  if (cartTotal <= 0) return null;
  return (
    <div className="absolute bottom-0 flex p-5 flex-col border-t w-full">
      <h5 className="text-lg font-semibold">Subtotal</h5>
      <span className="text-2xl">₹ {formatCurrency(cartTotal)}</span>
      <div className="flex gap-2 mt-2 w-full">
        <Button
          variant={"outline"}
          asChild
          className="w-1/2"
          onClick={() => setCartOpen(false)}
        >
          <Link href="/cart/">View Cart</Link>
        </Button>
        <Button asChild className="w-1/2" onClick={() => setCartOpen(false)}>
          <Link href="/checkout/">Checkout</Link>
        </Button>
      </div>
    </div>
  );
}
