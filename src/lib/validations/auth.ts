import * as z from "zod";

export const userAuthSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, "Must be 3 characters"),
});

export const userRegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, "Must be 3 characters"),
  name: z.string().min(1, "Required").max(128, "Must be less than 128."),
});
