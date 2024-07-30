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
