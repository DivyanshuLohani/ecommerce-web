import React from "react";
import ProductCard from "../Products/productCard";

export default function BestSellers() {
  return (
    <section className="flex flex-col w-full py-10 px-5 gap-10 md:px-10">
      <h2 className="text-center w-full text-2xl font-bold">
        OUR BEST SELLERS
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {Array.from({ length: 4 }).map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </section>
  );
}
