"use client";
import { Separator } from "@/components/ui/separator";
import { Product } from "@prisma/client";
import { discountPercent, formatCurrency } from "@/lib/utils";
import AddToCart from "../Cart/AddToCart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <div className="flex items-center space-x-2">
        {/* <div className="flex">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-primary" />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">(128 reviews)</span> */}
      </div>
      <div className="flex gap-2 flex-col">
        {product.discountedPrice && (
          <span className="line-through">
            ₹ {formatCurrency(product.price)}
          </span>
        )}
        <h3 className="text-3xl">
          ₹
          {formatCurrency(
            product.discountedPrice ? product.discountedPrice : product.price
          )}
        </h3>
        {product.discountedPrice ? (
          <div className="flex flex-col">
            <span className="text-red-500 text-2xl font-bold">
              {discountPercent(product.price, product.discountedPrice)}% off
            </span>
          </div>
        ) : null}
      </div>

      <Separator />
      <Tabs defaultValue="description" className="space-y-4">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          {/* <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
        </TabsList>
        <TabsContent value="description" className="text-muted-foreground">
          <p>{product.description}</p>
        </TabsContent>
        {/* <TabsContent value="specifications">
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                {product.specifications.map((spec, index) => (
                  <li key={index}>
                    <span className="font-semibold">{spec.name}:</span>{" "}
                    {spec.value}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="reviews">
              <p className="text-muted-foreground">
                Customer reviews coming soon.
              </p>
            </TabsContent> */}
      </Tabs>

      <AddToCart product={product} className="w-full" />
    </div>
  );
}
