"use client";
import CategoryCard from "../Products/CategoryCard";
import { Category } from "@prisma/client";
import { motion } from "framer-motion";

interface ShopByCategoryProps {
  categories: Category[];
}

export default function ShopByCategory({ categories }: ShopByCategoryProps) {
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="flex flex-col w-full py-10 px-5 gap-10 md:px-10 justify-center">
      <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl mb-8 text-center ">
        Shop By Categories
      </h2>
      <motion.div
        variants={fadeUpVariant}
        whileInView={"visible"}
        initial="hidden"
        className="grid grid-cols-2 md:grid-cols-6 gap-5"
        transition={{ duration: 0.8, delayChildren: 0.2, staggerChildren: 0.5 }}
        viewport={{ once: true, amount: 0.01 }}
      >
        {categories.map((c) => (
          <CategoryCard key={c.id} category={c} />
        ))}
      </motion.div>
    </section>
  );
}
