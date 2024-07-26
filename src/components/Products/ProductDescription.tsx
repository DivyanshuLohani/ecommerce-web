import { formatCurrency } from "@/lib/utils";
import type { Product } from "@prisma/client";
import { Suspense } from "react";

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
        <div className="flex gap-5 items-center">
          <h3 className="text-2xl">Rs. {formatCurrency(product.price)}</h3>
          <div className="flex flex-col">
            <span className=" line-through">Rs. {formatCurrency(1999)}</span>
            <span>You save Rs. {formatCurrency(1999)}</span>
          </div>
        </div>
      </div>

      {product.description ? (
        <div className="mb-6 text-sm leading-tight dark:text-white/[60%]">
          {product.description}
        </div>
      ) : null}

      {/* <Suspense fallback={null}>
        <AddToCart
          variants={product.variants}
          availableForSale={product.availableForSale}
        />
      </Suspense> */}
    </>
  );
}
