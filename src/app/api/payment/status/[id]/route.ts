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
    const payment = (await prisma.payment.findUnique({
      where: { paymentId: phonePayJson.transactionId as string },
    })) as Payment;
    const amount = payment.amount;
    if (phonePayJson.amount !== amount.toString()) {
      paymentFailure(phonePayJson.transactionId as string, "INVALID_AMOUNT");
    }
    await paymentSuccess(phonePayJson.transactionId as string);
  }
  return redirect(`/orders/${phonePayJson.transactionId}`);
}
