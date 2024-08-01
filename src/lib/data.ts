import { prisma } from "./prisma";

const ITEMS_PER_PAGE = 10;

export async function fetchCategories() {
  return await prisma.category.findMany();
}

export async function fetchProducts(
  currentPage: number,
  query: string = "",
  perPage: number = ITEMS_PER_PAGE
) {
  const offset = (currentPage - 1) * perPage;

  try {
    const [totalProducts, products] = await prisma.$transaction([
      prisma.product.count({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
      }),
      prisma.product.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: "insensitive" } },
            { description: { contains: query, mode: "insensitive" } },
          ],
        },
        orderBy: {
          createdAt: "asc",
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
  });
}
