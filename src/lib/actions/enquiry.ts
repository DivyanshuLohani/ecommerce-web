"use server";

import { prisma } from "../prisma";
import { WholesaleInquirySchema } from "../validations/enquiry";

export async function sendEnquiry(state: any, data: FormData) {
  const name = data.get("name") as string;
  const email = data.get("email") as string;
  const company = (data.get("company") as string) || "";
  const phone = data.get("phone") as string;
  const message = data.get("message") as string;
  const productId = parseInt((data.get("productId") as string) ?? "Nan");

  const paredData = WholesaleInquirySchema.safeParse({
    name,
    email,
    message,
    company,
    phone,
    productId: Number.isNaN(productId) ? undefined : productId,
  });

  if (!paredData.success) {
    console.log(paredData.error);
    return false;
  }

  await prisma.wholesaleInquiry.create({
    data: {
      name,
      email,
      message,
      phone,
      companyName: company,
      productInterest: productId,
    },
  });

  return true;
}
