import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import { discountPercent, formatCurrency } from "@/lib/utils";
import AddToCart from "../Cart/AddToCart";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader className="p-0">
        <Image
          width={200}
          height={200}
          className="rounded-t-lg w-full"
          src={product.imageUrl ?? ""}
          alt=""
        />
      </CardHeader>
      <CardContent className="mt-5">
        <Link href={`/products/${product.slug}`}>
          <div className="title">
            <span className="font-semibold hover:underline">
              {product.name}
            </span>
          </div>
        </Link>
        <br />

        <div className="flex gap-3 items-center">
          <span className="text-lg">
            ₹{" "}
            {formatCurrency(
              product.discountedPrice != 0
                ? product.discountedPrice
                : product.price
            )}
          </span>
          {product.discountedPrice != 0 ? (
            <span>
              <span className="line-through">
                ₹ {formatCurrency(product.price)}
              </span>{" "}
              <span className="text-red-500 text-xl font-bold">
                {discountPercent(product.price, product.discountedPrice)}% off
              </span>
            </span>
          ) : null}
        </div>
      </CardContent>
      <CardFooter>
        <AddToCart className="w-full" product={product} />
      </CardFooter>
    </Card>
  );
}
