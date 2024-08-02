"use server";
import { clearCart, getCart, updateCart } from "./cart";
import { OrderProduct } from "@prisma/client";
import { prisma } from "./prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { getAddressFromCookie } from "./actions";
import { redirect } from "next/navigation";
import RazorPay from "razorpay";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import { cookies } from "next/headers";

const razorpay = new RazorPay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_ID || "",
  key_secret: process.env.RAZORPAY_SECRET,
});

export async function getRazorpayOptions(amount: number, order_id: string) {
  const session = await getServerSession(authOptions);

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
    amount,
    currency: "INR",
    name: "Maa Kali Griha Udyog",
    description: "Order Payment",
    image: "/logo.jpg",
    order_id,
    prefill: {
      name: session?.user,
      email: session?.user.email,
    },
    theme: {
      color: "#4050f8",
    },
  };
  return options;
}

// This function generate the order then also generates the payment information for
// Razor pay to return the data to client
export async function placeOrder() {
  const cart = await getCart();

  if (cart.length === 0)
    return {
      message: "No items in cart please add some items to continue",
    };
  const address = await getAddressFromCookie();
  if (!address) redirect("/checkout");
  const session = await getServerSession(authOptions);

  let total = 0;
  cart.forEach(
    (e) =>
      (total +=
        e.product.discountedPrice != 0
          ? e.product.discountedPrice
          : e.product.price * e.quantity)
  );

  // TODO: Add features for discount

  const items = cart.map((e) => {
    return {
      productId: e.product.id,
      quantity: e.quantity,
      price:
        e.product.discountedPrice != 0
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

  const rzpOrder = await razorpay.orders.create({
    amount: total,
    currency: "INR",
  });

  await prisma.payment.create({
    data: {
      orderId: order.id,
      paymentId: rzpOrder.id,
      status: "PENDING",
      amount: total,
    },
  });

  redirect(`/checkout/payment/${rzpOrder.id}`);
}

export async function getPaymentDetails(id: string) {
  try {
    const data = await prisma.payment.findUnique({
      where: {
        paymentId: id,
      },
    });
    if (data) {
      return await getRazorpayOptions(data.amount, id);
    }
  } catch {}
  redirect("/checkout");
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

export async function paymentSuccess(
  razorpay_order_id: string,
  razorpay_payment_id: string,
  razorpay_signature: string
) {
  const paymentValid = validatePaymentVerification(
    {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
    },
    razorpay_signature,
    process.env.RAZORPAY_SECRET || ""
  );

  if (!paymentValid)
    return await paymentFailure(razorpay_order_id, "SIGNATURE_ERROR");

  const payment = await prisma.payment.update({
    where: {
      paymentId: razorpay_order_id,
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
      status: "ACCEPTED",
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
