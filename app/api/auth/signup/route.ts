import prisma from "@/prisma/prisma";
import bcrypt from "bcrypt";
import * as jose from "jose";

import { User } from "@prisma/client";
import { stdout } from "process";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const salt = bcrypt.genSaltSync();
  let user: User;

  try {
    const { email, password, username, avatar } = await req.json();
    user = await prisma.user.create({
      data: {
        email: email,
        password: bcrypt.hashSync(password, salt),
        username,
        avatar,
      },
    });
  } catch (error) {
    let msg: string = (error as Error).message;
    if (msg.includes("Unexpected end of JSON input")) {
      return Response.json(
        {
          message: "Bad User Input",
        },
        { status: 400 }
      );
    }
    //check if it is a jason parse error so send back bad innput instead of suplicate user
    return Response.json(
      {
        message: "A user with the same email alredy exists",
        forgotpassword: true,
      },
      { status: 500 }
    );
  }
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
  return Response.json(
    {
      id: user.id,
      email: user.email,
      createdAt: user.created_at,
    },
    { status: 201 }
  );

  return Response.json("ok");
}
