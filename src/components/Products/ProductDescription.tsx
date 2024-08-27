"use client";
import { discountPercent, formatCurrency } from "@/lib/utils";
import type { Product } from "@prisma/client";
import { Suspense } from "react";
import AddToCart from "../Cart/AddToCart";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="flex gap-2 flex-col">
          {product.discountedPrice && (
            <span className="line-through">
              ₹ {formatCurrency(product.price)}
            </span>
          )}
          <h3 className="text-3xl">
            ₹
            {formatCurrency(
              product.discountedPrice ? product.discountedPrice : product.price
            )}
          </h3>
          {product.discountedPrice ? (
            <div className="flex flex-col">
              <span className="text-red-500 text-2xl font-bold">
                {discountPercent(product.price, product.discountedPrice)}% off
              </span>
            </div>
          ) : null}
        </div>
      </div>

      {product.description ? (
        <div className="mb-6 text-sm leading-tight dark:text-white/[60%]">
          {product.description}
        </div>
      ) : null}

      <Suspense fallback={null}>
        <AddToCart product={product} />
      </Suspense>
    </>
  );
}
