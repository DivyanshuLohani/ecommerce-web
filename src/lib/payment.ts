"use server";
import { clearCart, getCart } from "./cart";
import { prisma } from "./prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { getAddressFromCookie } from "./actions/addresses";
import { redirect } from "next/navigation";
import RazorPay from "razorpay";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { cookies } from "next/headers";
import { OrderStatus } from "@prisma/client";
import { createTransaction } from "./payments/phonepe";

// This function generate the order then also generates the payment information for
// Razor pay to return the data to client
export async function placeOrder(): Promise<{
  success: boolean;
  message: string;
  url: string;
}> {
  const cart = await getCart();

  if (cart.length === 0)
    return {
      success: false,
      message: "Cannot place an order when the cart is empty",
      url: "",
    };
  const address = await getAddressFromCookie();
  if (!address) redirect("/checkout");
  const session = await getServerSession(authOptions);

  let total = 0;
  cart.forEach(
    (e) =>
      (total += e.product.discountedPrice
        ? e.product.discountedPrice
        : e.product.price * e.quantity)
  );

  // TODO: Add features for discount

  const items = cart.map((e) => {
    return {
      productId: e.product.id,
      quantity: e.quantity,
      price: e.product.discountedPrice
        ? e.product.discountedPrice
        : e.product.price,
    };
  });
  const order = await prisma.order.create({
    data: {
      userId: session?.user.id,
      addressId: address.id,
      total,
      products: {
        createMany: { data: items },
      },
    },
  });
  const phonepeOrder = await createTransaction(total);
  if (!phonepeOrder)
    return {
      success: false,
      message: "Something Went Wrong try again after some time",
      url: "",
    };

  await prisma.payment.create({
    data: {
      orderId: order.id,
      paymentId: phonepeOrder.transactionid,
      status: "PENDING",
      amount: total,
    },
  });
  return {
    success: true,
    message: "",
    url: phonepeOrder.redirectUrl,
  };
}

export async function paymentFailure(id: string, code: string) {
  const payment = await prisma.payment.update({
    where: {
      paymentId: id,
    },
    data: {
      status: "FAILED",
    },
  });

  await prisma.order.update({
    where: {
      id: payment.orderId,
    },
    data: {
      status: "PENDING",
    },
  });
}

export async function paymentSuccess(transactionId: string) {
  const payment = await prisma.payment.update({
    where: {
      paymentId: transactionId,
    },
    data: {
      status: "COMPLETED",
    },
  });

  await prisma.order.update({
    where: {
      id: payment.orderId,
    },
    data: {
      status: OrderStatus.PENDING,
    },
  });
  cookies().delete("address");
  await clearCart();
}

export async function getOrder(id: string) {
  const payment = await prisma.payment.findUnique({
    where: {
      paymentId: id,
    },
  });
  if (!payment) return null;
  const order = await prisma.order.findUnique({
    where: {
      id: payment.orderId,
    },
    include: {
      products: true,
      address: true,
      payment: true,
    },
  });
  if (!order) return null;
  return order;
}

export async function getOrderProducts(id: number) {
  const items = await prisma.orderProduct.findMany({
    where: { orderId: id },
    include: {
      product: true,
    },
  });
  return items;
}
