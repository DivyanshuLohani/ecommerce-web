"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

export async function addReview(state: any, formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user)
    return { message: "User not logged in", success: false };

  const productId = formData.get("productId");
  const rating = formData.get("rating");
  const review = formData.get("review");
  if (!rating || Number(rating) < 0 || Number(rating) > 5)
    return { message: "Invalid rating", success: false };
  if (!review) return { message: "Review cannot be empty", success: false };

  const newReview = await prisma.productReview.create({
    data: {
      productId: Number(productId),
      rating: Number(rating),
      content: review as string,
      userId: session.user.id,
    },
    include: {
      product: true,
    },
  });

  revalidatePath(`/products/${newReview.product.slug}`);
  return { message: "Review added successfully", success: true };
}
