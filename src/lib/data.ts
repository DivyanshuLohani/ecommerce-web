import { Address, ProductReview } from "@prisma/client";
import { prisma } from "./prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

const ITEMS_PER_PAGE = 10;

export async function fetchCategories() {
  return await prisma.category.findMany();
}

export async function fetchProducts(
  currentPage: number,
  query: string = "",
  perPage: number = ITEMS_PER_PAGE,
  categoryId: number = -1
) {
  const offset = (currentPage - 1) * perPage;

  const whereClause: any =
    categoryId != -1
      ? {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
          categoryId,
        }
      : {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        };

  try {
    const [totalProducts, products] = await prisma.$transaction([
      prisma.product.count({
        where: whereClause,
      }),
      prisma.product.findMany({
        where: whereClause,
        orderBy: {
          createdAt: "desc",
        },
        skip: offset,
        take: perPage,
      }),
    ]);
    return { products, totalProducts };
  } catch (e) {
    console.log("Error fetching products", e);
    return { products: [], totalProducts: 0 };
  }
}

export async function fetchProduct(id: number) {
  return await prisma.product.findFirst({
    where: { id },
  });
}

export async function fetchProductWithSlug(slug: string) {
  return await prisma.product.findFirst({
    where: { slug },
    include: {
      images: true,
    },
  });
}
export async function fetchProductImages(id: number) {
  return await prisma.productImages.findMany({
    where: {
      productId: id,
    },
  });
}

export async function getProduct(id: number) {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
}

export async function getFeaturedProducts() {
  return await prisma.product.findMany({
    where: {
      featured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function findCategoryByString(s: string) {
  return await prisma.category.findFirst({
    where: {
      name: { contains: s, mode: "insensitive" },
    },
  });
}

export async function fetchBanners() {
  return await prisma.banner.findMany();
}

export async function getRelatedProducts(productId: number, limit: number = 5) {
  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { categoryId: true },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      id: { not: productId },
    },
    take: limit,
  });

  return relatedProducts;
}

export async function getAddresses(): Promise<Address[]> {
  const user = await getServerSession(authOptions);
  if (!user) return [];
  const addresses = await prisma.address.findMany({
    where: {
      userId: user.user.id,
    },
  });
  return addresses;
}

export async function getReviews(productId: number) {
  return await prisma.productReview.findMany({
    where: { productId },
    include: { user: true },
    orderBy: {
      createdAt: "desc",
    },
  });
}
