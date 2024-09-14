"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CreateProduct,
  EditProduct,
  ProductFormState,
} from "../validations/product";
import { prisma } from "../prisma";
import { ProductStatus } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import { CategoryFormState, CreateCategory } from "../validations/category";
import { slugify } from "../utils";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function getProductData(formData: FormData) {
  const dPField = formData.get("discountedPrice") as string;
  let dp;
  if (dPField) {
    dp = parseFloat(dPField);
  } else {
    dp = null;
  }
  const validatedFields = CreateProduct.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price") as string),
    discountedPrice: dp,
    stock: parseInt(formData.get("stock") as string, 10),
    imageUrl: formData.get("imageUrl"),
    featured: formData.get("featured") === "on",
    categoryId: parseInt(formData.get("categoryId") as string, 10),
    status: "ACTIVE",
  });
  return validatedFields;
}

export async function createProduct(
  prevState: ProductFormState,
  formData: FormData
) {
  const validatedFields = getProductData(formData);
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Product.",
    };
  }

  let {
    name,
    description,
    price,
    stock,
    imageUrl,
    categoryId,
    featured,
    discountedPrice,
  } = validatedFields.data;

  // Convert to paise
  price *= 100;
  if (discountedPrice) discountedPrice *= 100;

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
        featured,
        slug: slugify(name),
        status: ProductStatus.ACTIVE,
        discountedPrice,
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

export async function editProduct(
  prevState: ProductFormState,
  formData: FormData
) {
  const dPField = formData.get("discountedPrice") as string;
  let dp;
  if (dPField) {
    dp = parseFloat(dPField);
  } else {
    dp = null;
  }
  const validatedFields = EditProduct.safeParse({
    id: parseInt(formData.get("id") as string),
    name: formData.get("name"),
    description: formData.get("description"),
    price: parseFloat(formData.get("price") as string),
    discountedPrice: parseFloat(
      (formData.get("discountedPrice") as string) ?? "0"
    ),
    stock: parseInt(formData.get("stock") as string, 10),
    imageUrl: formData.get("imageUrl"),
    featured: formData.get("featured") === "on",
    categoryId: parseInt(formData.get("categoryId") as string, 10),
    status: "ACTIVE",
  });
  // Send Error
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Edit Product.",
    };
  }

  // Find the product
  const product = await prisma.product.findFirst({
    where: { id: validatedFields.data.id },
  });
  if (!product) {
    return {
      message: "Invalid Product Id",
    };
  }

  let {
    id,
    name,
    description,
    price,
    stock,
    imageUrl,
    categoryId,
    featured,
    discountedPrice,
  } = validatedFields.data;

  // Convert to paise
  price *= 100;
  if (discountedPrice) discountedPrice *= 100;

  if (imageUrl && imageUrl != product?.imageUrl) {
    const uploadResult = await cloudinary.uploader.upload(imageUrl);
    imageUrl = uploadResult.secure_url;
  }

  try {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        name,
        description,
        price,
        stock,
        imageUrl,
        categoryId,
        discountedPrice,
        slug: slugify(name),
        status: ProductStatus.ACTIVE,
        featured,
      },
    });
  } catch (error) {
    return {
      message: "Database Error: Failed to Edit Product.",
    };
  }

  revalidatePath("/admin/products/");
  redirect("/admin/products/");
}

export async function createCategory(state: CategoryFormState, data: FormData) {
  const validatedFormData = CreateCategory.safeParse({
    name: (data.get("name") as string) ?? "",
    imageUrl: (data.get("image") as string) ?? "",
  });

  if (!validatedFormData.success) {
    return {
      errors: validatedFormData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Category.",
    };
  }

  let { name, imageUrl } = validatedFormData.data;

  if (imageUrl) {
    const uploadResult = await cloudinary.uploader.upload(imageUrl);
    imageUrl = uploadResult.secure_url;
  }

  try {
    await prisma.category.create({
      data: {
        name,
        imageUrl,
      },
    });
  } catch (e) {
    console.log("Error creating category", e);
    return {
      message: "Database Error please try again later.",
    };
  }

  revalidatePath("/admin/products/");
  revalidatePath("/admin/products/create/");
  revalidatePath("/admin/");
  redirect("/admin/products/");
}
