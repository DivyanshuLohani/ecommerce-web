import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  if (isNaN(amount)) {
    throw new Error("Invalid number");
  }

  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount / 100);
}

export function slugify(string: string) {
  return string
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function discountPercent(orignal: number, discount: number) {
  if (isNaN(orignal) || isNaN(discount)) throw new Error("Invalid number");
  if (discount > orignal)
    throw new Error("Discount is higher than orignal number");

  const discountPercent = Math.abs(100 - (orignal / discount) * 100).toFixed(0);
  return discountPercent;
}
