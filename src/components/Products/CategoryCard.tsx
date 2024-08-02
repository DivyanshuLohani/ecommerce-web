import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import type { Category } from "@prisma/client";
import Link from "next/link";

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Card>
      <CardHeader className="p-0 overflow-hidden">
        <Image
          width={200}
          height={200}
          className="rounded-t-lg w-full hover:scale-110 duration-700"
          src={category.imageUrl}
          alt=""
        />
      </CardHeader>
      <CardContent className="mt-5">
        <div className="subtitle">
          <span>Collection</span>
        </div>
        <div className="title">
          <span className="font-semibold">{category.name}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" size={"lg"} asChild>
          <Link href={`/category/${category.name.toLowerCase()}`}>Browse</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
