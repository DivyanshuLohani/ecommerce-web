import { Product } from "@prisma/client";
import React from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function TopProducts({ products }: { products: Product[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top products by sales</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {products.map((e) => {
          return (
            <div className="flex gap-2 items-center font-semibold" key={e.id}>
              <Image
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                height="64"
                src={e.imageUrl || "Placeholder"}
                width="64"
              />
              <span>{e.name}</span>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
