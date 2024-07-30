"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { v2 as c } from "cloudinary";
import { redirect } from "next/navigation";

c.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface ProductImageFormState {
  message: string;
  error?: string;
}

export async function createProductImage(
  id: number,
  state: ProductImageFormState,
  formData: FormData
) {
  const data = formData.getAll("images") as File[];
  if (!data)
    return {
      message: "No valid images",
      error: "At least one image required",
    };
  data.forEach(async (e) => {
    const dataArray = await e.arrayBuffer();
    try {
      const url: any = await new Promise((resolve, reject) => {
        c.uploader
          .upload_stream({}, function (err, result) {
            if (err) return reject(err);
            resolve(result);
          })
          .end(new Uint8Array(dataArray));
      });
      if (url)
        await prisma.productImages.create({
          data: {
            productId: id,
            imageUrl: url.secure_url,
          },
        });
    } catch (e) {
      console.log("Error Uploading Images", e);
      throw e;
    }
  });

  revalidatePath(`/admin/products/${id}/images/`);
  redirect(`/admin/products/${id}`);
}
