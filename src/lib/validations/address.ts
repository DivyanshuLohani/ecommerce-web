import { z } from "zod";

const addressSchema = z.object({
  id: z.number().int().positive(), // Assuming id is positive integers
  userId: z.number().int().positive(), // Same for userId
  name: z.string().min(1, "Name is required").max(255),
  address: z.string().min(1, "Address is required").max(500),
  address2: z.string().max(500).optional(), // Optional, can be empty
  state: z.string().min(1, "State is required").max(100),
  city: z.string().min(1, "City is required").max(100),
  pincode: z.string().min(1, "Pincode is required").max(20), // Adjust the max length as per requirements
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateAddress = addressSchema.omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export interface AddressState {
  message?: string;
  errors?: {
    name?: string[] | undefined;
    address?: string[] | undefined;
    address2?: string[] | undefined;
    state?: string[] | undefined;
    city?: string[] | undefined;
    pincode?: string[] | undefined;
  };
}

export default addressSchema;
