import ProductImagesForm from "@/components/admin/ProductImagesForm";

import { getProduct, fetchProductImages } from "@/lib/data";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({ params }: { params: { id: string } }) {
  const images = await fetchProductImages(parseInt(params.id));
  const product = await getProduct(parseInt(params.id));
  if (!product) notFound();
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {images.map((e) => {
          return (
            <Image
              height={300}
              width={300}
              src={e.imageUrl}
              alt={`Product Image ${e.id}`}
              key={e.id}
            />
          );
        })}
      </div>

      <ProductImagesForm product={product} />
    </div>
  );
}
