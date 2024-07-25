import { prisma } from "./prisma";

export async function fetchCategories() {
  return await prisma.category.findMany();
}
