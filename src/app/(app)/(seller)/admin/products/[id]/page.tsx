import Form from "@/components/Products/EditProductFrom";
import { fetchCategories, fetchProduct } from "@/lib/data";

export default async function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const categories = await fetchCategories();
  const product = await fetchProduct(parseInt(params.id));
  if (!product) return null;
  return (
    <main>
      <Form product={product} categories={categories} />
    </main>
  );
}
