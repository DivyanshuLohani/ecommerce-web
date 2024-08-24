"use client";
import { createProductImage } from "@/lib/admin";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { Product } from "@prisma/client";

export default function ProductImagesForm({ product }: { product: Product }) {
  const createProductImageWithId = createProductImage.bind(null, product.id);
  const [images, setImages] = useState<string[]>([]);
  const [state, dispatch] = useFormState(createProductImageWithId, {
    message: "",
    error: "",
  });

  const handleImage = (files: FileList | null) => {
    if (!files) return;
    if (files.length <= 0) return;
    setImages([]);
    let file = files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setImages((prev) => [...prev, (fileReader.result as string) ?? ""]);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <form action={dispatch}>
      {state.error && <span className="text-red-500 mb-2">{state.error}</span>}
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => {
          handleImage(e.target.files);
        }}
        name="images"
      />
      <Input className="hidden" value={images} />
      <Button className="mt-2">Submit</Button>
    </form>
  );
}
