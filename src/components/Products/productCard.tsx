import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Image from "next/image";
import Link from "next/link";
import { Product } from "@prisma/client";
import { discountPercent, formatCurrency } from "@/lib/utils";
import AddToCart from "../Cart/AddToCart";
import { Badge } from "../ui/badge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="relative">
      {product.discountedPrice ? (
        <div className="absolute top-1 left-4 ">
          <Badge className="text-lg rounded-full" variant={"destructive"}>
            {discountPercent(product.price, product.discountedPrice)}% <br />
            Off
          </Badge>
        </div>
      ) : null}
      <Link href={`/products/${product.slug}`}>
        <CardHeader className="p-0 overflow-hidden">
          <Image
            width={200}
            height={200}
            className="rounded-t-lg w-full hover:scale-125 duration-500"
            src={product.imageUrl ?? ""}
            alt=""
          />
        </CardHeader>
      </Link>
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
          <span className="text-xl">
            ₹
            {formatCurrency(
              product.discountedPrice ? product.discountedPrice : product.price
            )}
          </span>
          {product.discountedPrice ? (
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
