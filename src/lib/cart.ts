"use server";

/* 
  The cart system works diffrently for authenticated users as well as for guest users
  The guest user cart is saved by id which is stored in cookies of the guest user
  Authenticated users have their cart items stored by the normal database table using their id

  There are seperate functions for each case which is checked in the begining of each function

*/

import type { Product } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "./prisma";
import { cookies } from "next/headers";

export interface CartItem {
  product: Product;
  quantity: number;
}

function getCartToken(length: number = 16): string {
  const token = cookies().get("cart");
  if (token) return token.value;

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let newToken = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    newToken += characters.charAt(randomIndex);
  }

  cookies().set("cart", newToken);
  return newToken;
}

async function getCartFromToken() {
  const token = cookies().get("cart");
  if (!token) return [];

  return await prisma.anonymousCartItem.findMany({
    where: {
      token: token.value,
    },
    include: {
      product: true,
    },
  });
}

async function addItemtoCartToken(product: Product, quantity: number) {
  const token = getCartToken();
  const productExists = await prisma.anonymousCartItem.findUnique({
    where: {
      token_productId: {
        token: token,
        productId: product.id,
      },
    },
  });
  if (productExists) {
    await prisma.anonymousCartItem.update({
      where: {
        token_productId: {
          token: token,
          productId: product.id,
        },
      },
      data: {
        quantity: productExists.quantity + quantity,
      },
    });
  } else {
    await prisma.anonymousCartItem.create({
      data: {
        token,
        productId: product.id,
        quantity: quantity,
      },
    });
  }
}

async function removeItemFromCartToken(id: number, quantity: number) {
  const token = getCartToken();
  const productExists = await prisma.anonymousCartItem.findUnique({
    where: {
      token_productId: {
        token,
        productId: id,
      },
    },
  });
  if (productExists) {
    if (productExists.quantity > quantity) {
      await prisma.anonymousCartItem.update({
        where: {
          token_productId: {
            token,
            productId: id,
          },
        },
        data: {
          quantity: productExists.quantity - quantity,
        },
      });
    } else {
      await prisma.anonymousCartItem.delete({
        where: {
          token_productId: {
            token,
            productId: id,
          },
        },
      });
    }
  }
}

async function updateCartWithToken(data: CartItem[]) {
  const token = getCartToken();
  await prisma.anonymousCartItem.createMany({
    data: data.map((e) => {
      return {
        token,
        productId: e.product.id,
        quantity: e.quantity,
      };
    }),
  });
}

export async function getCart(): Promise<CartItem[]> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return await getCartFromToken();
  }

  const data = await prisma.cartItem.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      product: true,
    },
  });
  return data;
}

export async function addProductToCart(product: Product, quantity: number) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return await addItemtoCartToken(product, quantity);
  }

  const productExists = await prisma.cartItem.findUnique({
    where: {
      userId_productId: {
        userId: session.user.id,
        productId: product.id,
      },
    },
  });
  if (productExists) {
    await prisma.cartItem.update({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId: product.id,
        },
      },
      data: {
        quantity: productExists.quantity + quantity,
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        userId: session.user.id,
        productId: product.id,
        quantity: quantity,
      },
    });
  }
}

export async function removeProductFromCart(id: number, quantity: number) {
  const session = await getServerSession(authOptions);
  if (!session) {
    await removeItemFromCartToken(id, quantity);
    return;
  }

  const productExists = await prisma.cartItem.findUnique({
    where: {
      userId_productId: {
        userId: session.user.id,
        productId: id,
      },
    },
  });
  if (productExists) {
    if (productExists.quantity > quantity) {
      await prisma.cartItem.update({
        where: {
          userId_productId: {
            userId: session.user.id,
            productId: id,
          },
        },
        data: {
          quantity: productExists.quantity - quantity,
        },
      });
    } else {
      await prisma.cartItem.delete({
        where: {
          userId_productId: {
            userId: session.user.id,
            productId: id,
          },
        },
      });
    }
  }
}

export async function updateCart(d: CartItem[]) {
  const session = await getServerSession(authOptions);
  if (!session) {
    await updateCartWithToken(d);
    return;
  }

  const data = d.map((e) => {
    return {
      userId: session.user.id,
      productId: e.product.id,
      quantity: e.quantity,
    };
  });

  await prisma.cartItem.createMany({
    data,
  });
}

export async function clearCart() {
  const session = await getServerSession(authOptions);
  if (!session) {
    const token = getCartToken();
    cookies().delete("cart");
    await prisma.anonymousCartItem.deleteMany({
      where: {
        token,
      },
    });
    return;
  }

  await prisma.cartItem.deleteMany({
    where: {
      userId: session.user.id,
    },
  });
}
