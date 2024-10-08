"use client";
import { Separator } from "@/components/ui/separator";
import type { Product, ProductReview } from "@prisma/client";
import { discountPercent, formatCurrency, plural } from "@/lib/utils";
import AddToCart from "../Cart/AddToCart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { motion } from "framer-motion"; // Import Framer Motion
import { StarIcon } from "lucide-react";

interface ProductDetailsProps {
  product: Product;
  reviews: ProductReview[];
}

export default function ProductDetails({
  product,
  reviews,
}: ProductDetailsProps) {
  // Animation variants for fading in elements
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
  const stars = Math.round(averageRating);

  return (
    <div className="space-y-6">
      <motion.h1
        className="text-3xl font-bold"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5 }}
      >
        {product.name}
      </motion.h1>

      {reviews.length > 0 && (
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2 justify-between"
        >
          {/* Ratings placeholder, uncomment and add animation if needed */}
          <motion.div
            className="flex gap-2"
            transition={{ staggerChildren: 0.3 }}
          >
            {[...Array(stars)].map((_, i) => (
              <motion.i key={i}>
                <StarIcon className="w-5 h-5 fill-primary stroke-primary" />
              </motion.i>
            ))}
            {[...Array(5 - stars)].map((_, i) => (
              <motion.i key={i}>
                <StarIcon className="w-5 h-5 stroke-muted-foreground" />
              </motion.i>
            ))}
          </motion.div>

          <motion.span className="text-sm text-muted-foreground">
            {reviews.length} {plural("review", reviews.length)}
          </motion.span>
        </motion.div>
      )}

      <motion.div
        className="flex gap-2 flex-col"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.05 }} // Hover animation for price section
      >
        {product.discountedPrice && (
          <motion.span className="line-through">
            ₹ {formatCurrency(product.price)}
          </motion.span>
        )}
        <h3 className="text-3xl">
          ₹
          {formatCurrency(
            product.discountedPrice ? product.discountedPrice : product.price
          )}
        </h3>
        {product.discountedPrice ? (
          <motion.div
            className="flex flex-col"
            whileHover={{ scale: 1.1 }} // Hover animation for discount label
          >
            <span className="text-red-500 text-2xl font-bold">
              {discountPercent(product.price, product.discountedPrice)}% off
            </span>
          </motion.div>
        ) : null}
      </motion.div>

      <Separator />

      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Tabs defaultValue="description" className="space-y-4">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            {/* Add more tabs as needed */}
          </TabsList>
          <TabsContent value="description" className="text-muted-foreground">
            <p>{product.description}</p>
          </TabsContent>
          {/* Add more tab content as needed */}
        </Tabs>
      </motion.div>

      <motion.div
        className="w-full"
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <AddToCart product={product} />
      </motion.div>
    </div>
  );
}
