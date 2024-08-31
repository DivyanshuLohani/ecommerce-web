"use client";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import type { Category } from "@prisma/client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <motion.div
      variants={fadeUpVariant}
      whileInView={"visible"}
      initial="hidden"
      className={cn("flex flex-col items-center")}
      viewport={{ once: true, amount: 0.01 }}
    >
      <Link href={`/category/${category.name.toLowerCase()}`} className="">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-primary">
          <Image
            draggable={false}
            src={category.imageUrl ?? ""}
            alt={category.name}
            fill
            className="object-cover hover:scale-110 transition-transform duration-300"
            sizes="(max-width: 768px) 128px, 160px"
          />
        </div>
      </Link>
      <h3 className="mt-4 text-center font-medium text-sm md:text-base">
        {category.name}
      </h3>
    </motion.div>
  );
}
