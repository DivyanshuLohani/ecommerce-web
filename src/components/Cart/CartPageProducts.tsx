"use client";
import { useCart } from "@/context/CartProvider";
import React from "react";
import { TableCell, TableRow } from "../ui/table";
import Image from "next/image";
import { formatCurrency } from "@/lib/utils";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

export default function CartPageProducts() {
  const { products, removeProduct } = useCart();

  return (
    <>
      {products.map((p) => {
        return (
          <TableRow key={p.product.id} suppressHydrationWarning>
            <TableCell className="flex items-center gap-5 flex-col md:flex-row">
              <Image
                src={p.product.imageUrl as string}
                width={200}
                height={150}
                alt={`${p.product.name} image`}
              />
              <span className="text-lg">{p.product.name}</span>
            </TableCell>
            <TableCell className="">
              ₹{" "}
              {formatCurrency(
                p.product.discountedPrice
                  ? p.product.discountedPrice
                  : p.product.price
              )}
            </TableCell>
            <TableCell className="">{p.quantity}</TableCell>
            <TableCell className="font-semibold">
              ₹{" "}
              {formatCurrency(
                p.quantity *
                  (p.product.discountedPrice
                    ? p.product.discountedPrice
                    : p.product.price)
              )}
            </TableCell>
            <TableCell>
              <Button onClick={() => removeProduct(p.product.id, p.quantity)}>
                <Trash2 />
              </Button>
            </TableCell>
          </TableRow>
        );
      })}
    </>
  );
}
