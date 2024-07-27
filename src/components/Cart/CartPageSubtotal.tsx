"use client";
import { useCart } from "@/context/CartProvider";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export default function SubtotalSection() {
  const { cartTotal } = useCart();
  if (cartTotal <= 0) return null;
  return (
    <div className="flex p-5 flex-col border-t w-full" suppressHydrationWarning>
      <h5 className="text-lg font-semibold">Subtotal</h5>
      <span className="text-2xl">Rs. {formatCurrency(cartTotal)}</span>
      <Button asChild className="w-full">
        <Link href="/checkout/">Checkout</Link>
      </Button>
    </div>
  );
}
