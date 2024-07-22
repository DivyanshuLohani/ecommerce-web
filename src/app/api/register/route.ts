import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// export async function GET(request: NextRequest) {
//   return NextResponse.json({ message: "working" });
// }
export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  // const reqData = await request;
  // const {name, email, password} = await request.body ();

  const existingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (existingUser)
    return NextResponse.json(
      {
        success: false,
        error: "User already exists",
      },
      { status: 400 }
    );
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return NextResponse.json({ success: true, user: newUser }, { status: 201 });
}
