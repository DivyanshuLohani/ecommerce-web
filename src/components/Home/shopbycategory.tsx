import React from "react";
import ProductCard from "../Products/productCard";
import CategoryCard from "../Products/CategoryCard";

export default function ShopByCategory() {
  return (
    <section className="flex flex-col w-full py-10 px-5 gap-10 md:px-10 justify-center">
      <h2 className="text-center w-full text-2xl font-bold">
        SHOP BY CATEGORY
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {Array.from({ length: 3 }).map((_, index) => (
          <CategoryCard key={index} />
        ))}
      </div>
    </section>
  );
}
