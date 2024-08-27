"use client";

import React, { useState } from "react";
import type { Category, Product } from "@prisma/client";
import Link from "next/link";
import { TagIcon, List, IndianRupeeIcon, Package, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";
import { createProduct, editProduct } from "@/lib/actions";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";

export default function ProductEditForm({
  categories,
  product,
}: {
  categories: Category[];
  product: Product;
}) {
  const initialState = { message: "", errors: {} };
  const [state, dispatch] = useFormState(editProduct, initialState);

  const [image, setImage] = useState<string>(product.imageUrl ?? "");

  const handleImage = (files: FileList | null) => {
    if (!files) return;
    if (files.length <= 0) return;
    let file = files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImage((fileReader.result as string) ?? "");
    };
    fileReader.readAsDataURL(file);
  };

  return (
    <form action={dispatch}>
      <Input
        name="id"
        className="hidden"
        type="number"
        defaultValue={product.id}
      />
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="mb-2 block text-sm font-medium">
            Choose Category
          </label>
          <div className="relative">
            <select
              id="category"
              name="categoryId"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue={product.categoryId.toString()}
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a Category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <List className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {state.errors?.categoryId ? (
            <div
              id="customer-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.categoryId.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        {/* Name */}
        <div className="mb-4">
          <Label htmlFor="name" className="mb-2 block text-sm font-medium">
            Name of the product
          </Label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter product name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="name-error"
                defaultValue={product.name}
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.name ? (
            <div
              id="name-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.name.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        {/* Description */}
        <div className="mb-4">
          <Label
            htmlFor="description"
            className="mb-2 block text-sm font-medium"
          >
            Description
          </Label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <Textarea
                id="description"
                name="description"
                placeholder="Enter product description"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue={product.description}
                aria-describedby="decription-error"
              />
              <TagIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.description ? (
            <div
              id="description-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.description.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        {/* Price */}
        <div className="mb-4">
          <Label htmlFor="price" className="mb-2 block text-sm font-medium">
            Price
          </Label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                placeholder="Enter product price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="amount-error"
                defaultValue={product.price / 100}
              />
              <IndianRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.price ? (
            <div
              id="price-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.price.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        {/* Discounted Price */}
        <div className="mb-4">
          <Label htmlFor="dprice" className="mb-2 block text-sm font-medium">
            Discounted Price
          </Label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <Input
                id="dprice"
                name="discountedPrice"
                type="number"
                step="0.01"
                placeholder="Enter a discount price"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="dprice-error"
                defaultValue={product.discountedPrice ?? 0 / 100}
              />
              <IndianRupeeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.discountedPrice ? (
            <div
              id="dprice-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.discountedPrice.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        {/* Stock */}
        <div className="mb-4">
          <Label htmlFor="stock" className="mb-2 block text-sm font-medium">
            Stock
          </Label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <Input
                id="stock"
                name="stock"
                type="number"
                placeholder="Enter product units for sale"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="stock-error"
                defaultValue={product.stock}
              />
              <Package className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          {state.errors?.stock ? (
            <div
              id="price-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.stock.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>

        <div className="mb-4">
          <Label htmlFor="image" className="mb-2 block text-sm font-medium">
            Image
          </Label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <Input
                id="image"
                type="file"
                accept="image/*"
                placeholder="Enter product units for sale"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="stock-error"
                onChange={(e) => handleImage(e.target.files)}
              />
              <Input
                name="imageUrl"
                type="text"
                className="hidden"
                value={image}
              />
              {
                // For some reason it gives a warning even though I am not using the image tag
                // eslint-disable-next-line jsx-a11y/alt-text
                <Image className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              }
            </div>
          </div>
          {state.errors?.stock ? (
            <div
              id="price-error"
              aria-live="polite"
              className="mt-2 text-sm text-red-500"
            >
              {state.errors.stock.map((error: string) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          ) : null}
        </div>
        <div className="mb-4 flex gap-5">
          <Switch
            name="featured"
            id="featured"
            defaultChecked={product.featured}
          />
          <Label htmlFor="featured" className="mb-2 block text-sm font-medium">
            Featured
          </Label>
        </div>
        {state.errors?.featured ? (
          <div
            id="price-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            {state.errors.featured.map((error: string) => (
              <p key={error}>{error}</p>
            ))}
          </div>
        ) : null}

        {state.message ? (
          <div
            id="message-error"
            aria-live="polite"
            className="mt-2 text-sm text-red-500"
          >
            <p key={state.message}>{state.message}</p>
          </div>
        ) : null}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/admin/products/"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}
