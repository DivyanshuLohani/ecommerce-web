import { z } from "zod";

const BannerScheme = z.object({
  id: z.number().int().positive().optional(),
  url: z.string().url("Must be a valid url").min(1, "Url is required"),
  imageUrl: z.string().min(1, "Required"),
  createdAt: z.date().optional(),
});

export const CreateBanner = BannerScheme.omit({
  id: true,
  createdAt: true,
});

export type BannerFormState = {
  errors?: {
    url?: string[] | undefined;
    imageUrl?: string[] | undefined;
  };
  message?: string | null;
};

export default BannerScheme;
