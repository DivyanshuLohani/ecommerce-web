import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import CartProvider from "@/context/CartProvider";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <Navbar />
      <main className="w-full">{children}</main>
      <Footer />
    </CartProvider>
  );
}
