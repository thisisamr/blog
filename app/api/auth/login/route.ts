import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = await new jose.SignJWT({
        id: user.id,
        email: user.email,
        avatar: user.avatar,
        username: user.username,
        admin: user.admin,
      })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt(Date.now())
        .setExpirationTime("2h")
        .sign(new TextEncoder().encode(process.env.TOKENSECRET));

      cookies().set("token", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      });
      return Response.json({ ...user, password: "" }, { status: 200 });
    } else {
      return Response.json("email or password incorrect", { status: 401 });
    }
  } catch (e) {
    console.log(e);
    return Response.json({ message: (e as Error).message }, { status: 401 });
  }
}
