import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const hashedPassword = await hash(password, 10);

    await db.user.create({
      data: {
        login: email,
        email,
        password: hashedPassword,
        name: "",
        role_id: 0,
      },
    });
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}
