"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

interface BulkOrdersProps {
  productId: number;
}

export default function BulkOrders({ productId }: BulkOrdersProps) {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInUp}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 p-6 rounded-lg shadow-md "
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        For bulk orders
      </h2>
      <p className="text-gray-600 mb-6">
        If you are a wholesale customer or interested in purchasing in bulk,
        please get in touch with us for special pricing and offers.
      </p>
      <Button className="text-white py-2 px-4 rounded w-full" asChild>
        <Link href={`/contact?productId=${productId}`}>Contact Us</Link>
      </Button>
    </motion.div>
  );
}
