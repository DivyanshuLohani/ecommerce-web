import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import CartProvider from "@/context/CartProvider";
import { getCart, addProductToCart, removeProductFromCart } from "@/lib/cart";
import React from "react";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cartData = await getCart();
  return (
    <CartProvider
      cartData={cartData}
      addProductToCart={addProductToCart}
      removeProductFromCart={removeProductFromCart}
    >
      <Navbar />
      <main className="w-full">{children}</main>
      <Footer />
    </CartProvider>
  );
}
