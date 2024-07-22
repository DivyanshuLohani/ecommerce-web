import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "./prisma";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

export const authOptions = {
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "hello@example.com",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Password",
        },
      },

      async authorize(credentials, req) {
        if (!credentials) return null;
        try {
          const user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
          });
          if (!user) return null;

          const passwordMatch = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!passwordMatch) throw new Error("Invalid Credentials");

          return user;
        } catch (e) {
          console.log("Erorr in authorize:", e);
        }

        throw Error("Something went wrong");
      },
    }),
  ],
};

export default NextAuth(authOptions);
