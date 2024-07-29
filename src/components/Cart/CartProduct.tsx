"use client";
import type { Product } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useCart } from "@/context/CartProvider";

export default function CartProduct({
  product,
}: {
  product: { product: Product; quantity: number };
}) {
  const { removeProduct, addProduct } = useCart();
  return (
    <div className="flex justify-evenly">
      <Image
        width={200}
        height={200}
        sizes="(min-width: 200px)"
        className="w-1/3 h-full object-contain"
        src={product.product.imageUrl ?? ""}
        alt="product image"
      />
      <div>
        <span className="text-xl font-semibold">{product.product.name}</span>
        <div className="flex gap-5 items-center">
          <h3>₹ {formatCurrency(product.product.price * product.quantity)}</h3>
          <div className="flex flex-col">
            <span className=" line-through">₹ {formatCurrency(1999)}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Button onClick={() => removeProduct(product.product.id, 1)}>
            -
          </Button>
          <span>{product.quantity}</span>
          <Button onClick={() => addProduct(product.product, 1)}>+</Button>
          <Button
            onClick={() => removeProduct(product.product.id, product.quantity)}
            variant={"outline"}
          >
            <Trash2 />
          </Button>
        </div>
      </div>
    </div>
  );
}
