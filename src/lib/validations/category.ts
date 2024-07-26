import { z } from "zod";

const CategorySchema = z.object({
  id: z.number().int().positive().optional(),
  name: z.string().min(1, "Category name is required"),
  imageUrl: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateCategory = CategorySchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type CategoryFormState = {
  errors?: {
    name?: string[] | undefined;
    imageUrl?: string[] | undefined;
  };
  message?: string | null;
};

export default CategorySchema;
