import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password, gender } = body;

    if (!email || !name || !password || !gender) {
      return new NextResponse("Missing Fields", { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.error();
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email: email,
        name,
        gender,
        hashedPassword,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.error();
  }
}
