import About from "@/components/Home/about";
import BannerSection from "@/components/Home/banner";
import BestSellers from "@/components/Home/bestSellers";
import ShopByCategory from "@/components/Home/shopbycategory";
import React from "react";

export default function Home() {
  return (
    <>
      <BannerSection />
      <BestSellers />
      <ShopByCategory />
      <About />
    </>
  );
}
