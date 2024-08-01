"use client";
import { useCart } from "@/context/CartProvider";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@prisma/client";
import React from "react";

const CartSummary = () => {
  const { products, cartTotal } = useCart();

  return (
    <div className="mb-6 md:mb-0 md:w-1/2">
      <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
      <ul className="space-y-4" suppressHydrationWarning>
        {products.map((item) => (
          <li
            key={item.product.id}
            className="flex justify-between"
            suppressHydrationWarning
          >
            {item.product.name} - ₹{" "}
            {formatCurrency(
              item.product.discountedPrice != 0
                ? item.product.discountedPrice
                : item.product.price
            )}{" "}
            x {item.quantity}
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <h3 className="text-lg font-bold">
          Total: ₹ {formatCurrency(cartTotal)}
        </h3>
      </div>
    </div>
  );
};

export default CartSummary;
