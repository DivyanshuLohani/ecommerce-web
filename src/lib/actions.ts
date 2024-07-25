"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CreateProduct } from "./validations/product";
import { prisma } from "./prisma";
import { ProductStatus } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export type ProductFormState = {
  errors?: {
    name?: string[] | undefined;
    description?: string[] | undefined;
    price?: string[] | undefined;
    stock?: string[] | undefined;
    imageUrl?: string[] | undefined;
    categoryId?: string[] | undefined;
    status?: string[] | undefined;
  };
  message?: string | null;
};

export async function createProduct(
  prevState: ProductFormState,
  formData: FormData
) {
  const validatedFields = CreateProduct.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price") as string),
    stock: parseInt(formData.get("stock") as string, 10),
    imageUrl: formData.get("imageUrl"),
    categoryId: parseInt(formData.get("categoryId") as string, 10),
    status: "ACTIVE",
  });

  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    };
  }

  let { name, description, price, stock, imageUrl, categoryId, status } =
    validatedFields.data;
  price *= 100;

  if (imageUrl) {
    const uploadResult = await cloudinary.uploader.upload(imageUrl);
    imageUrl = uploadResult.secure_url;
  }

  try {
    await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        imageUrl,
        categoryId,
        status: ProductStatus.ACTIVE,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Create Product.",
    };
  }

  revalidatePath("/admin/products/");
  revalidatePath("/admin/");
  redirect("/admin/products/");
}
