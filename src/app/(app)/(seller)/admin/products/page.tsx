import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductsTable } from "@/components/admin/ProductTable";
import Link from "next/link";
import { fetchProducts } from "@/lib/data";
// import { getProducts } from '@/lib/db';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { q: string; page: string };
}) {
  const search = searchParams.q ?? "";
  const page = searchParams.page ?? 1;
  const { products, totalProducts } = await fetchProducts(parseInt(page));

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {/* <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger> */}
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link href={"/admin/products/create"}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sm:not-sr-only sm:whitespace-nowrap">
                Add Product
              </span>
            </Link>
          </Button>
          <Button size="sm" className="h-8 gap-1" asChild>
            <Link href={"/admin/products/createcategory"}>
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sm:not-sr-only sm:whitespace-nowrap">
                Add Category
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <TabsContent value="all">
        <ProductsTable
          products={products}
          page={parseInt(page)}
          totalProducts={totalProducts}
        />
      </TabsContent>
    </Tabs>
  );
}
