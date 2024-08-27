import { z } from "zod";

const ProductStatusEnum = z.enum(["ACTIVE", "INACTIVE"]);

const ProductSchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.number().positive("Price must be a positive number"),
  discountedPrice: z
    .number()
    .nonnegative({ message: "Discounted price must be a non-negative integer" })
    .nullable(), // Optional, can be null or a non-negative integer
  stock: z.number().int().nonnegative("Stock must be a non-negative integer"),
  imageUrl: z.string().url().optional(),
  featured: z.boolean().optional().default(false),
  categoryId: z
    .number()
    .int()
    .positive("Category ID must be a positive integer"),
  status: ProductStatusEnum.default("ACTIVE"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateProduct = ProductSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export const EditProduct = ProductSchema.omit({
  createdAt: true,
  updatedAt: true,
});
export default ProductSchema;

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
