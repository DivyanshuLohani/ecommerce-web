"use server";

import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import { Address } from "@prisma/client";
import { AddressState, CreateAddress } from "../validations/address";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import { cookies } from "next/headers";

export async function addAddress(state: AddressState, data: FormData) {
  const existingAddress = await getAddressFromCookie();
  if (existingAddress) {
    redirect("/checkout/payment/");
  }
  const formData = {
    name: data.get("name"),
    phoneNumber: data.get("phone"),
    email: data.get("email"),
    address: data.get("address"),
    address2: data.get("address2") || "", // Provide a default empty string if not provided
    state: data.get("state"),
    city: data.get("city"),
    pincode: data.get("pincode"),
  };
  const validatedFormData = CreateAddress.safeParse(formData);

  if (!validatedFormData.success) {
    return {
      errors: validatedFormData.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Category.",
    };
  }

  const {
    name,
    phoneNumber,
    email,
    address,
    address2,
    state: st,
    city,
    pincode,
  } = validatedFormData.data;

  const session = await getServerSession(authOptions);

  try {
    const addressObj = await prisma.address.create({
      data: {
        name,
        phoneNumber,
        email,
        userId: session?.user.id,
        address,
        address2,
        state: st,
        city,
        pincode,
      },
    });
    // For payment we store the address in the cookies once its done we clear the cookies
    cookies().set("address", JSON.stringify(addressObj), {
      expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 15,
      secure: true,
      sameSite: true,
    });
  } catch (e) {
    console.log(e);
    return { message: "Database error" };
  }

  redirect("/checkout/payment/");
}

// Checkout using pre saved address
export async function selectedAddressCheckout(addessId: number) {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  const address = await prisma.address.findUnique({
    where: {
      id: addessId,
    },
  });
  if (!address || address.userId != session.user.id) return null;
  cookies().set("address", JSON.stringify(address), {
    expires: new Date().getTime() + 1000 * 60,
    secure: true,
    sameSite: true,
  });
  redirect("/checkout/payment/");
}

export async function getAddressFromCookie() {
  const data = cookies().get("address");
  if (!data) return null;
  try {
    const address: Address = JSON.parse(data.value);
    if (!address.id) return null;
    return address;
  } catch {
    return null;
  }
}
