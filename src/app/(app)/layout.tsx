import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="w-full">{children}</main>
      <Footer />
    </>
  );
}
