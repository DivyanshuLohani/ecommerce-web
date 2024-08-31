import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { Suspense } from "react";
import {
  fetchProduct,
  fetchProductWithSlug,
  getRelatedProducts,
} from "@/lib/data";
import ProductDescription from "@/components/Products/ProductDescription";
import { Separator } from "@radix-ui/react-select";
import { Product } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/Products/productCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function generateMetadata({
  params,
}: {
  params: { handle: string };
}): Promise<Metadata> {
  const product = await fetchProduct(3);

  if (!product) return notFound();

  return {
    title: product.name,
    description: product.description,

    openGraph: product.imageUrl
      ? {
          images: [
            {
              url: product.imageUrl,
              width: 512,
              height: 512,
              alt: "Product Image",
            },
          ],
        }
      : null,
  };
}

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await fetchProductWithSlug(params.slug);
  if (!product) return notFound();
  const relatedProducts = await getRelatedProducts(product.id);

  return (
    <div className="mx-auto max-w-screen-2xl px-4">
      <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 dark:border-neutral-800 dark:bg-black">
        <div className="h-full basis-full lg:basis-4/6 md:w-2/5">
          <Suspense
            fallback={
              <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
            }
          >
            <Gallery
              // productName={product.name}
              images={[
                {
                  src: product.imageUrl ?? "",
                  altText: "Featured Image",
                },
                ...product.images.map((e) => ({
                  src: e.imageUrl,
                  altText: "Product Image",
                })),
              ]}
            />
          </Suspense>
        </div>

        <div className="basis-full lg:basis-2/6 space-y-10 w-full">
          <ProductDescription product={product} />

          <Separator className="my-12" />
          <div className="bg-gray-100 p-6 rounded-lg shadow-md ">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
              For bulk orders
            </h2>
            <p className="text-gray-600 mb-6">
              If you are a wholesale customer or interested in purchasing in
              bulk, please get in touch with us for special pricing and offers.
            </p>
            <Button className="text-white py-2 px-4 rounded w-full" asChild>
              <Link href={`/contact?productId=${product.id}`}>Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
      <RelatedProducts products={relatedProducts} />
    </div>
  );
}

interface RelatedProductsProps {
  products: Product[];
}

async function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <div className="flex flex-col w-full py-10 px-5 gap-10 md:px-10">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>

      <Carousel>
        <CarouselContent className="w-full">
          {products.map((p, index) => (
            <CarouselItem key={p.id} className="basis-1/2 md:basis-1/4">
              <ProductCard product={p} key={index} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      {/* <div className="flex w-full items-center justify-center">
        <Button className="max-w-sm flex gap-2" asChild>
          <Link href={`/category/${category.name.toLowerCase()}`}>
            View All <ArrowRight size={20} />
          </Link>
        </Button>
      </div> */}
    </div>
  );
}
