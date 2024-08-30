import React from "react";
import ProductCard from "../Products/productCard";
import { fetchProducts, getFeaturedProducts } from "@/lib/data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

export default async function BestSellers() {
  const products = await getFeaturedProducts();
  return (
    <section className="flex flex-col w-full py-10 px-5 gap-10 md:px-10">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl mb-8 text-center">
        Best Sellers
      </h2>

      <Carousel>
        <CarouselContent className="w-full">
          {products.map((p, index) => (
            <CarouselItem key={p.id} className="basis-1/2 md:basis-1/4">
              <ProductCard product={p} key={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
