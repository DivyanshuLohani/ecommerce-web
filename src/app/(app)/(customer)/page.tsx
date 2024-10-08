import BannerSection from "@/components/Home/banner";
import BestSellers from "@/components/Home/bestSellers";
import CategorySection from "@/components/Home/CategorySection";
import ShopByCategory from "@/components/Home/shopbycategory";
import { fetchCategories } from "@/lib/data";

export default async function Home() {
  const categories = await fetchCategories();
  return (
    <>
      <BannerSection />
      <ShopByCategory categories={categories} />
      <BestSellers />
      {categories.map((c) => (
        <CategorySection category={c} key={c.id} />
      ))}
      {/* <About /> */}
    </>
  );
}
