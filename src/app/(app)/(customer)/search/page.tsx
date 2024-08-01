import ProductCard from "@/components/Products/productCard";
import Paginator from "@/components/ui/paginator";
import { fetchProducts } from "@/lib/data";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) {
  const perPage = 25;
  const page = parseInt(searchParams.page ?? "1");
  const { products, totalProducts } = await fetchProducts(
    page,
    searchParams.q ?? "",
    perPage
  );

  return (
    <div className="px-5 md:px-10 py-10">
      <div className="heading text-lg">
        {totalProducts} result{totalProducts > 1 ? "s" : ""} found for &quot;
        {searchParams.q}&quot; <br />
        <span className="text-sm">
          Showing {Math.min((page - 1) * perPage, totalProducts) + 1} -{" "}
          {Math.min(page * perPage, totalProducts)} of {totalProducts} results
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-10">
        {products.map((e) => {
          return <ProductCard key={e.id} product={e} />;
        })}
      </div>
      <Paginator perPage={perPage} total={totalProducts} />
    </div>
  );
}
