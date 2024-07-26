import { prisma } from "./prisma";

const ITEMS_PER_PAGE = 10;

export async function fetchCategories() {
  return await prisma.category.findMany();
}

export async function fetchProducts(currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const [totalProducts, products] = await prisma.$transaction([
      prisma.product.count(),
      prisma.product.findMany({
        orderBy: {
          createdAt: "asc",
        },
        skip: offset,
        take: ITEMS_PER_PAGE,
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
