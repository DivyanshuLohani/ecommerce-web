"use server";
import { revalidatePath } from "next/cache";
import { prisma } from "./prisma";
import { v2 as c } from "cloudinary";
import { redirect } from "next/navigation";
import { OrderStatus } from "@prisma/client";

const ITEMS_PER_PAGE = 10;

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

export async function getOrders(
  currentPage: number,
  status: OrderStatus = "ACCEPTED",
  itemsPerPage: number = ITEMS_PER_PAGE
) {
  const offset = (currentPage - 1) * itemsPerPage;
  try {
    const [totalOrders, orders] = await prisma.$transaction([
      prisma.order.count({ where: { status } }),
      prisma.order.findMany({
        where: {
          status,
        },
        orderBy: {
          createdAt: "desc",
        },
        include: {
          address: true,
        },
        skip: offset,
        take: itemsPerPage,
      }),
    ]);

    return { orders, totalOrders };
  } catch (e) {
    console.log("Error fetching Orders", e);
    return { orders: [], totalOrders: 0 };
  }
}

export async function getOrder(id: number) {
  const order = await prisma.order.findUnique({
    where: {
      id,
    },
    include: {
      payment: true,
      address: true,
      products: true,
    },
  });
  return order;
}

export async function updateOrderStatus(id: number, status: OrderStatus) {
  await prisma.order.update({
    where: { id },
    data: {
      status,
    },
  });

  revalidatePath(`/admin/orders/${id}`);
}
