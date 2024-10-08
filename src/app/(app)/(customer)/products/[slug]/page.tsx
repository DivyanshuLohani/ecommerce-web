import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import { Suspense } from "react";
import {
  fetchProduct,
  fetchProductWithSlug,
  getRelatedProducts,
  getReviews,
} from "@/lib/data";
import ProductDescription from "@/components/Products/ProductDescription";
import { Separator } from "@radix-ui/react-select";
import { Product } from "@prisma/client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import ProductCard from "@/components/Products/productCard";
import BulkOrders from "./bulk-orders";
import { StarIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import StarRating from "./review-form";
import ProductReview from "./product-review";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await fetchProductWithSlug(params.slug);

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
  const productReviews = await getReviews(product.id);
  const averageRating =
    productReviews.reduce((acc, review) => acc + review.rating, 0) /
    productReviews.length;
  const session = await getServerSession(authOptions);

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
          <ProductDescription product={product} reviews={productReviews} />

          <Separator className="my-12" />
          <BulkOrders productId={product.id} />
        </div>
      </div>

      <div className="bg-background p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
        <div className="flex flex-col space-y-2 mb-2">
          {averageRating > 0 && (
            <div className="flex gap-2 items-baseline">
              {[...Array(Math.round(averageRating))].map((_, i) => (
                <StarIcon
                  key={i}
                  className="fill-primary stroke-primary"
                  size={30}
                />
              ))}
              {[...Array(5 - Math.round(averageRating))].map((_, i) => (
                <StarIcon
                  key={i}
                  className=" stroke-muted-foreground"
                  size={30}
                />
              ))}
              <span> {averageRating.toFixed(2)} stars out of 5</span>
            </div>
          )}
        </div>
        {session ? (
          <StarRating productId={product.id} />
        ) : (
          <div>You must be logged in to write a review</div>
        )}
        <Separator className="my-6" />
        <div className="grid gap-6">
          {productReviews.map((review) => (
            <ProductReview key={review.id} review={review} />
          ))}
        </div>
      </div>
      <Separator className="my-12" />
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
