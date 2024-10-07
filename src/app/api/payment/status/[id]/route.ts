import { paymentFailure, paymentSuccess } from "@/lib/payment";
import { prisma } from "@/lib/prisma";
import { Payment } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const phonePayResponse = await request.formData();
  const phonePayJson = Object.fromEntries(phonePayResponse);
  if (phonePayJson.code !== "PAYMENT_SUCCESS") {
    // Payment failed
    // Will always be a string
    await paymentFailure(
      phonePayJson.transactionId as string,
      phonePayJson.code as string
    );
  } else {
    // Payment Successful
    const payment = await prisma.payment.findUnique({
      where: { paymentId: phonePayJson.transactionId as string },
    });
    if (!payment) redirect("/checkout");
    const checksum = phonePayJson.checksum;
    if (checksum != payment.checksum) {
      paymentFailure(phonePayJson.transactionId as string, "INVALID_CHECKSUM");
    } else {
      await paymentSuccess(phonePayJson.transactionId as string);
    }
  }
  return redirect(`/orders/${phonePayJson.transactionId}`);
}
