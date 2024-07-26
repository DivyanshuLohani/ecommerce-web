import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import { formatCurrency } from "@/lib/utils";

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
        <div className="price">
          <span className="">Rs. {formatCurrency(product.price)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size={"lg"}>
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
