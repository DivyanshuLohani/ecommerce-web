"use client";
import { useCart } from "@/context/CartProvider";
import type { Product } from "@prisma/client";
import React from "react";
import { Button, ButtonProps } from "../ui/button";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  product: Product;
  quantity?: number;
}

const AddToCart = React.forwardRef<HTMLButtonElement, Props>(
  ({ product, quantity, className, ...props }, ref) => {
    const { addProduct } = useCart();
    return (
      <Button
        className={className}
        {...props}
        onClick={() => addProduct(product, quantity ?? 1)}
      >
        Add to Cart
      </Button>
    );
  }
);

AddToCart.displayName = "AddToCart";

export default AddToCart;
