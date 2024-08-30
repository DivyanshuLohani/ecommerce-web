import React from "react";
import ProductCard from "../Products/productCard";
import CategoryCard from "../Products/CategoryCard";
import { fetchCategories } from "@/lib/data";

export default async function ShopByCategory() {
  const categories = await fetchCategories();
  return (
    <section className="flex flex-col w-full py-10 px-5 gap-10 md:px-10 justify-center">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl mb-8 text-center ">
        Shop By Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-5">
        {categories.map((c) => (
          <CategoryCard key={c.id} category={c} />
        ))}
      </div>
    </section>
  );
}
