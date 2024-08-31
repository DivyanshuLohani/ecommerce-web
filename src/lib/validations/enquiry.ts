import { z } from "zod";

export const WholesaleInquirySchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required." })
    .max(100, { message: "Name should not exceed 100 characters." }),

  email: z
    .string()
    .min(1, { message: "Email is required." })
    .max(100, { message: "Email should not exceed 100 characters." })
    .email({ message: "Invalid email address." }),

  phone: z.string().min(1, { message: "Phone number is required." }),

  companyName: z
    .string()
    .max(100, { message: "Company name should not exceed 100 characters." })
    .optional()
    .or(z.literal("").optional()),

  message: z
    .string()
    .min(1, { message: "Message is required." })
    .max(5000, { message: "Message should not exceed 5000 characters." }),

  productInterest: z.number().optional(),
});
