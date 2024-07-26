import { useCart } from "@/context/CartProvider";
import type { Product } from "@prisma/client";
import React from "react";
import { Button } from "../ui/button";

export default function AddToCart({
  product,
  quantity,
}: {
  product: Product;
  quantity?: number;
}) {
  const { addProduct } = useCart();
  return (
    <Button onClick={() => addProduct(product, quantity ?? 1)}>
      Add to Cart
    </Button>
  );
}
