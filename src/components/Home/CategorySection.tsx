import ProductCard from "../Products/productCard";
import { fetchProducts } from "@/lib/data";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import { Category } from "@prisma/client";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Arrow } from "@radix-ui/react-select";

interface CategorySectionProps {
  category: Category;
}

export default async function CategorySection({
  category,
}: CategorySectionProps) {
  const { products } = await fetchProducts(1, "", 5, category.id);
  return (
    <section className="flex flex-col w-full py-10 px-5 gap-10 md:px-10">
      <div className={cn("flex items-center justify-center w-full my-8")}>
        <div className={cn("w-10 h-2", "bg-black")}></div>
        <h2
          className={cn(
            "mx-4 px-3 font-bold bg-background",
            "text-2xl md:text-3xl"
          )}
        >
          {category.name}
        </h2>
        <div className={cn("w-10 h-2", "bg-black")}></div>
      </div>

      <Carousel>
        <CarouselContent className="w-full">
          {products.map((p, index) => (
            <CarouselItem key={p.id} className="basis-1/2 md:basis-1/4">
              <ProductCard product={p} key={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex w-full items-center justify-center">
        <Button className="max-w-sm flex gap-2" asChild>
          <Link href={`/category/${category.name.toLowerCase()}`}>
            View All <ArrowRight size={20} />
          </Link>
        </Button>
      </div>
    </section>
  );
}
