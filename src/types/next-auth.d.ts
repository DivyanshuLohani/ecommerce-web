import "next-auth";
import { User as U } from "@prisma/client";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
  }
  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends User {}
}
