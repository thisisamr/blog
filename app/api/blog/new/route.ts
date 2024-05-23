import prisma from "@/prisma/prisma";
import { User } from "@prisma/client";
import { cookies } from "next/headers";
import * as jose from "jose";
import { validateauth } from "@/lib/auth";

export const POST = validateauth(
  async (req: Request, res: Response, user: User) => {
    try {
      const { title, content, slug } = await req.json();
      const post = await prisma.post.create({
        data: {
          title,
          content,
          slug,
          author: {
            connectOrCreate: {
              where: {
                id: user.id,
              },
              create: {
                ...user,
              },
            },
          },
        },
      });
      return Response.json("post", { status: 201 });
    } catch (error) {
      console.log(error);
      return Response.json({ error: "Failed to create post" }, { status: 500 });
    }
  }
);
