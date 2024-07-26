import React from "react";
import ProductCard from "../Products/productCard";
import { fetchProducts } from "@/lib/data";

export default async function BestSellers() {
  const { products } = await fetchProducts(1);
  return (
    <section className="flex flex-col w-full py-10 px-5 gap-10 md:px-10">
      <h2 className="text-center w-full text-2xl font-bold">
        OUR BEST SELLERS
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {products.slice(0, 4).map((p, index) => (
          <ProductCard product={p} key={index} />
        ))}
      </div>
    </section>
  );
}
