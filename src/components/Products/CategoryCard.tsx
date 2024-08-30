import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import type { Category } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <div className={cn("flex flex-col items-center")}>
      <Link href={`/category/${category.name.toLowerCase()}`} className="group">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary transition-transform duration-300 group-hover:scale-105">
          <Image
            draggable={false}
            src={category.imageUrl ?? ""}
            alt={category.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 128px, 160px"
          />
        </div>
      </Link>
      <h3 className="mt-4 text-center font-medium text-sm md:text-base">
        {category.name}
      </h3>
    </div>
    // <Card>
    //   <CardHeader className="p-0 overflow-hidden">
    //     <Image
    //       width={200}
    //       height={200}
    //       className="rounded-t-lg w-full hover:scale-110 duration-700"
    //       src={category.imageUrl}
    //       alt=""
    //     />
    //   </CardHeader>
    //   <CardContent className="mt-5">
    //     <div className="subtitle">
    //       <span>Collection</span>
    //     </div>
    //     <div className="title">
    //       <span className="font-semibold">{category.name}</span>
    //     </div>
    //   </CardContent>
    //   <CardFooter>
    //     <Button className="w-full" size={"lg"} asChild>
    //       <Link href={`/category/${category.name.toLowerCase()}`}>Browse</Link>
    //     </Button>
    //   </CardFooter>
    // </Card>
  );
}
